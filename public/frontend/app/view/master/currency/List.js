Ext.define('App.view.master.currency.List', {
	extend: 'Ext.grid.Panel',

	autoScroll: true,
	alias: 'widget.currencyGridList',
	requires: [
		'App.form.combobox.cbCountries'
	],
	config : {
		title: 'List Currencies'
	},
	store: 'App.store.Currencies',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {

			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					header: 'Name',
					dataIndex: 'name',
					flex: 1,
					editor: {
						allowBlank: true
					}
				},
				{
					header: 'Symbol',
					dataIndex: 'shortname',
					flex: .2,
					editor: {
						allowBlank: true
					}
				},
				{
					header: 'Country',
					flex: .3,
					dataIndex: 'country_id',
					renderer: function (v, m, rec) {
						return rec.get('country');
					},
					editor: {
						xtype: 'cbCountries',
						fieldLabel: ''
					}

				},
//        {
//            header: 'UUID',
//            dataIndex: 'uuid',
//            flex: 1
//        },
				{
					header: 'Action',
					xtype: 'actioncolumn',
					flex: .4,
					items: [
						{
							iconCls: 'delete',
							tooltip: 'Delete',
							handler: function (grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
									if (btn == 'yes') {
										var rec = grid.getStore().getAt(rowIndex);
										grid.getStore().remove(rec);
										grid.getStore().sync();
										grid.getStore().load();
									}
								});
							}
						}
					]
				}
			],
			columnLines: true,
			selModel: 'rowmodel',
			/*==========  Plugins  ==========*/
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
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
							action: 'add', itemId: 'add',
							text: 'Add',
							iconCls: 'add'
						},
						{
							action: 'remove', itemId: 'remove',
							text: 'Remove',
							iconCls: 'delete',
							disabled: true
						},
						'->',
						{
							action: 'import', itemId: 'import',
							text: 'Import',
							iconCls: 'excel',
							handler: function () {
								belumImplement();
							}
						},
						{
							action: 'export',
							text: 'Export',
							iconCls: 'excel',
							handler: function () {
								belumImplement();
							}
						},
						{
							action: 'help', itemId: 'help',
							text: 'Help',
							iconCls: 'help',
							handler: function () {
								belumImplement();
							}
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
//					store: 'App.store.Currencies',
					store: me.getStore(),
					displayInfo: true
				}
			]
		});
		me.callParent(arguments);
	}


});





