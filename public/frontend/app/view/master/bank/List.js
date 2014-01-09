Ext.define('App.view.master.bank.List',{
	extend: 'Ext.grid.Panel',
	title: 'All Banks',
	alias: 'widget.bankListGrid',
	columns:[
		{xtype: 'rownumberer'},
		{header: 'Name',dataIndex: 'name',flex: 1},
		{header: 'Alamat',dataIndex: 'address',flex: 1},
		{header: 'Phone',dataIndex: 'notelp',flex: 1},
        {
            header: 'Action',
            xtype:'actioncolumn',
            width:40,
            // tdCls:'delete',
            items: [{
                // icon: '/assets/img/cancel-on.png',  // Use a URL in the icon config
                // icon: '/assets/fugue/icons/cross-shield.png',
                iconCls:'delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('pagingBank').doRefresh();

                            }
                            });
                    }
                }
                ]
        }
	],
	autoScroll: true,
	store: 'Banks',
	initComponent: function(){
		  log('List Bank Loaded');
			this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-save',
                itemId: 'add',
                text: 'Add',
                action: 'add'
            }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            id: 'pagingBank',
            dock:'bottom',
            store: 'Banks',
            displayInfo: true,
        }];

		this.callParent(arguments);
        Ext.getStore(this.store).load();
	}
});