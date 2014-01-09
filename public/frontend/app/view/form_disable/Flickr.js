Ext.define('App.view.form.Flickr',{
	extend : 'Ext.grid.Panel',
	title: 'Contoh :: Flickr',
	columns: [
            { header: 'Title', dataIndex: 'title', flex: 1},
	{ 
		header: 'URL', 
		dataIndex: 'link', 
		flex: 1,
        renderer: function(value) {
            return Ext.String.format('<a href="{0}" target="_blank">{1}</a>', value, value);
            // window.open(Ext.String.format('<a href="{0}">{1}</a>', value, value) );
        }
    }
	],
	alias : 'widget.gridFlickr',
	// autoScroll: true,
	store: 'Flickrs',

	initComponent : function(){
		Ext.getStore(this.store).load();
		log('Grid Flickrs Loaded initComponent');
		this.dockedItems = [{
		        xtype: 'pagingtoolbar',
		        id: 'pageFlickrs',
		        dock:'bottom',
		        store: 'Flickrs',
		        displayInfo: true
			}];
		this.callParent(arguments);

	}
});