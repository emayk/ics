// List user
Ext.define('App.view.master.user.List',{
	extend : 'Ext.grid.Panel',
	title: 'All Users',
	alias: 'widget.gridUsers',
	columns: [
			{xtype: 'rownumberer'},
			// { header: 'ID', dataIndex: 'id', flex: 1},
            { header: 'Name', dataIndex: 'name', flex: 1},
			// { header: 'Information', dataIndex: 'info', flex: 1},
            // { header: 'Universal ID', dataIndex: 'uuid', flex: 1},
			// { header: 'Updated At', dataIndex: 'updated_at', flex: 1},
	        {   
            header: 'Action',
            xtype:'actioncolumn', 
            flex: .4,
            tdCls:'delete',
            items: [{
                icon: '/assets/img/cancel-on.png',  // Use a URL in the icon config
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', 
                        	function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('pagingUser').doRefresh();
                            }});
                    }
                }]
        }
		],
    // autoRefresh: true,
	autoScroll: true,
	store: 'Users',
	// store: 'Status',
	initComponent : function(){
		Ext.getStore(this.store).load();
		log('User grid Active');

			this.dockedItems =  [{
		        xtype: 'pagingtoolbar',
		        store: 'Legalitas',
		        id: 'pagingUser',
		        dock: 'bottom',
		        displayInfo: true,
    		}];

		this.callParent(arguments);
		Ext.getStore(this.store).load();
	},
	fbar: ['Edit : Double click Row'],

})