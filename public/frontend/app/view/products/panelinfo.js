/**
 * Page Panel Informasi Product
 *
 * Edit / Show Detail Product
 */
Ext.define('App.view.products.panelinfo', {
	alias: 'widget.productinfo',
	requires: [
		'App.view.products.formbasicinfo',
		'App.view.products.formproductdetail',
		'App.form.combobox.cbUnitWeight',
		'App.form.combobox.cbUnitWidth',
		'App.view.products.productstocks',
		'App.view.products.history'
	],

	config: {
		new: false,
		prodId: null,
		prodName: null,
		stockStore: null,
		storeHistory: null,
		storeStockHistory: null,
		record: null
	},
	debug: false,
	title: 'Info',
	extend: 'Ext.tab.Panel',
	cls: 'item-ct',
	flex: 2,
	border: false,
	frame: true,
	autoScroll: true,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	initComponent: function () {
		var me = this;
		if (me.getNew() == true) {
			var items = [
				{
					xtype: 'formproductbasicinfo',
					itemId: 'formbasicinfo',
					record: me.getRecord(),
					prodId: me.getProdId(),
					prodName: me.getProdName(),
					new: me.getNew()
				},
//				{
//					xtype: 'formproductdetail',
//					itemId: 'formdetail',
//					title: 'Detail ' + ( (me.getProdName() == null) ? ' ' : me.getProdName() ),
//					record: me.getRecord(),
//					prodId: me.getProdId(),
//					prodName: me.getProdName()
//				}
			]
		} else {
			var items = [
				{
					xtype: 'formproductbasicinfo',
					itemId: 'formbasicinfo',
					record: me.getRecord(),
					prodId: me.getProdId(),
					prodName: me.getProdName()
				},
//				{
//					xtype: 'formproductdetail',
//					itemId: 'formdetail',
//					title: 'Detail ' + me.getProdName(),
//					record: me.getRecord(),
//					prodId: me.getProdId(),
//					prodName: me.getProdName()
//				},
				{
					xtype: 'productgridstocks',
					itemId: 'panelGridStock',
					stockStore: me.getStockStore(),
					storeStockHistory: me.getStoreStockHistory(),
					record: me.getRecord(),
					prodId: me.getProdId(),
					prodName: me.getProdName(),
					title: 'Stock ' + me.getProdName()
				},
				{
					xtype: 'productshistory',
					title: 'history',
					itemId: 'gridHistoryProduct',
					storeHistory: me.getStoreHistory(),
					record: me.getRecord(),
					prodId: me.getProdId(),
					prodName: me.getProdName(),
					html: 'History Product ' + me.getProdName()
				}
			]
		}
		Ext.apply(me, {
			items: items
		});
		me.callParent(arguments);
	}
});
