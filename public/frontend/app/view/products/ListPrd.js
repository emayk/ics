Ext.define('App.view.products.ListPrd', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.productList',
//	bodyPadding: 10,
	frame: true,
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'grid',
					flex: 1,
					margin: '10 0 0 0',
					autoScroll: true,
					itemId: 'gridProducts',
					store: 'App.store.product.Product',
					defaults: {
						flex: 1
					},
					columns: [
							{ xtype: 'rownumberer' },
							{
								text: 'Total Stok',
								columns: [
									{ /*CL 7 */ text: 'Panjang', dataIndex: 'totallength' },
									{ /*CL 7 */ text: 'Roll', dataIndex: 'totalroll' }
								]
							},
							{ text: translations.field.design, dataIndex: 'nodesign', filter: true},
							{ text: translations.field.contruction, dataIndex: 'contruction', filter: true},
							{ text: translations.field.category.default, dataIndex: 'catname', filter: true},
							{ text: translations.field.type.default, dataIndex: 'typename', filter: true},
							{ text: translations.field.width, dataIndex: 'width',
								renderer: function (v, meta, rec) {
									return v + ' ' + rec.get('widthname');
								}
							},
							{ text: translations.field.weight, dataIndex: 'weight',
								renderer: function (v, meta, rec) {
									return v + ' ' + rec.get('weightname');
								}
							}
						],
					dockedItems: [
						{ xtype: 'pagingtoolbar', store: 'App.store.product.Product', dock: 'bottom', displayInfo: true }
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					items: [
						{ text: 'Add', itemId: 'add', iconCls: 'add' },
						{ text: 'Remove', itemId: 'remove', iconCls: 'delete' },
						'->',
						{ text: 'Import', itemId: 'import', iconCls: 'excel',
							handler: function (btn) {
								var title = 'Import Produk';
								var config = {
									iconCls: 'excel',
									title: title,
									closable: true
								};
								var tab = btn.up('tabpanel');
								App.util.box.openNewtab(tab, title, 'App.view.products.import', config);
							}
						},
						{
							text: 'Export',
							itemId: 'export',
							iconCls: 'excel',
							handler: function (btn) {
								// todo : implement btn product
								msgError(btn.text + ' Not Implement Yet')
							}
						},
						'-',
						{
							xtype: 'textfield',
							flex:.5,
							itemId: 'searchtext',
							emptyText: 'Cari Product'
						},
						{
							xtype: 'button',
							itemId: 'searchbtn',
							iconCls: 'find',
							handler: function (btn) {
								// todo : implement btn product
								msgError(btn.textbtn + ' Not Implement Yet')
							}

						},
						'-',
						{
							text: 'Help',
							itemId: 'help',
							iconCls: 'help',
							handler: function (btn) {
								// todo : implement btn product
								msgError(btn.text + ' Not Implement Yet')
							}
						}
					]
				}
			]

		});
		me.callParent(arguments);
	}
});