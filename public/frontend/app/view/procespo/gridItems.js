/**
 * Copyright (C) 2013  Emay Komarudin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author Emay Komarudin
 *
 **/




Ext.define('App.view.procespo.gridItems', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appprocespovgridItems',
	config: {
		info: false,
		title: 'Daftar Produk Yang Akan Dipesan',
		tooltip: 'Daftar - daftar produk yang sudah dipilih',
		preview: false,
		trxId: undefined,
		trxNumber: undefined,
//		store: Ext.create('App.store.procespo.items')
	},
	store: 'App.store.procespo.items',
	layout: 'fit',
	/*Generate Kolom Qty*/
	columnQty: function () {
		var me = this;
		var columnQty;
		if (me.getPreview()) {
			columnQty =
			{
				text: 'Qty',
				dataIndex: 'qty',
				flex: .5

			};
		} else {
			columnQty =
			{
				text: 'Qty',
				dataIndex: 'qty',
				flex: .5,
				editor: {
					xtype: 'numberfield',
					minValue: 0
				}
			};
		}
		return columnQty
	},
//	getFullTitle: function () {
//		var me = this, title = me.getTitle() + '(' + me.getTrxId() + '/' + me.getTrxNumber() + ')';
//		return title;
//	},
//	generateStore: function () {
//		var me = this, store = Ext.create('App.store.procespo.items');
//		store.getProxy().setExtraParam('tmptrxid', me.getTrxId());
//		return store;
//	},
	initComponent: function () {
		var me = this, columnQty = me.columnQty();
//		var store = me.generateStore();
		/*Initialize Component*/
		Ext.apply(me, {
//			store: store,
			store: me.getStore(),
			autoScroll: true,
			title: me.getTitle(),
			selModel: App.util.box.createSelectionModel(),
			columns: {
				plugins: [
					{
						ptype: 'gridautoresizer'
					}
				],
				items: [
					{
						xtype: 'rownumberer', text: 'No'
					},
					{
						text: 'Nama ',
						dataIndex: 'prodname',
						filter: true, flex: .5,
						flex: 1
					},
					columnQty
				]
			},
			columnLines: true,
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: 1,
					clicksToMoveEditor: 1
				})
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
//					store: store,
					store: me.store,
					dock: 'bottom',
					displayInfo: me.getInfo()
				},
				{
					xtype: 'toolbar',
					hidden: (me.getPreview()),
					dock: 'top',
					items: [
						{ text: 'Hapus', action: 'removeitem', iconCls: 'delete', tooltip: 'Hapus Barang dari Daftar Pesanan' }
					]
				}
			]
		});
		me.callParent(arguments);

		var store = me.getStore();
		if (store) {
			var proxy = store.getProxy();
			if (proxy) {
				proxy.setExtraParam('tmptrxid', me.getTrxId());
			}
			me.getStore().load();
		}


	}
});