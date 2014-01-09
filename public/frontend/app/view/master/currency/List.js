Ext.define('App.view.master.currency.List',{
	extend : 'Ext.grid.Panel',
	title: 'List Currencies',
	alias: 'widget.currencyGridList',
	store: 'App.store.Currencies',
	columns: [
			{
				xtype: 'rownumberer'
			},
			{
				header: 'Name',
				dataIndex : 'name',
				flex: 1,
				editor: {
					allowBlank: true
				}
			},
			{
				header: 'Symbol',
				dataIndex : 'shortname',
				flex: .2,
				editor: {
					allowBlank: true
				}
			},
			{
				header: 'Country',
				flex: .3,
                itemId: 'cbCountry',
				dataIndex : 'country_id',
				renderer: function(v,m,rec){
                    return rec.get('country');
				},
                editor:
                    {
                        xtype: 'combobox',
                        store: 'App.store.Cbcountries',
                        displayField: 'name',
                        valueField: 'id'
                    }

			},
			{
				header: 'UUID',
				dataIndex : 'uuid',
				flex: 1
			},
			        {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            items: [{
                iconCls:'delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                            }
                            });
                    }
                }]
        }
			],
	columnLines: true,
	selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
     		clicksToEdit: !1,
     		pluginId: 'cellEditorCurrency',
     		clicksToMoveEditor: 1
     	})
     ],
	/*==========  DockedItems  ==========*/
	dockedItems: [
	{
		xtype: 'toolbar',
		items: [
		{
				action: 'add',
				text: 'Add'
		},
		{
			action: 'remove',
			text: 'Remove',
			disabled : true
		}
		]
	},
	{
        xtype: 'pagingtoolbar',
        id: 'pagingCurrency',
        dock:'bottom',
        store: 'App.store.Currencies',
        displayInfo: true
	}]
});





