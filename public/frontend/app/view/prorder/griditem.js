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

Ext.define('App.view.prorder.griditem', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appprordervprorderviewgrid',
	iconCls: 'grid',
//	store: 'App.store.prorder.sitem',
	config: {
		poId: null,
		poNumber: null,
		record: null,
		store:  null
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			iconCls: 'grid',
			columns: [
				{ xtype: "rownumberer", text: "No"},
				{ dataIndex: "productname", text: "Product"},
				{ dataIndex: "qty", text: "qty"},
				{ dataIndex: "price", text: "Harga"},
				{ dataIndex: "dp", text: "dp"},
				{ dataIndex: "subtotal", text: "Subtotal"}
			],
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					store: me.getStore(),
					dock: 'bottom',
					displayInfo: true
				}
			]
		});
		me.callParent(arguments);
//		var store = me.storegrid;
//		if (store) {
//			var record = me.record;
//			if (record) {
//				var id = record.get('id');
//				var number = record.get('ponumber');
//				store.clearFilter();
//				store.getProxy().setExtraParam('orderid', id);
//				store.getProxy().setExtraParam('ordernumber', number);
//				store.load();
//			}
//		}


//		log(me.getPoid());
//		log(me.getPonumber());
//		log('Saat init Component');
//		log('record', me.record);
//		log('poid', me.poid);
//		log('ponumber', me.ponumber);
//		var store = me.store;
//		store.getProxy().setExtraParam('orderid', me.record.get('id'));
//		store.getProxy().setExtraParam('ordernumber', me.record.get('ponumber'));

//		var id = me.poid;
//		if (me.poid) {
//			if (me.ponumber) {
//
//			}
//		}

//		log(me.getStore())
//		var store = me.getStore();
//		log(me.poid);
//		if (!store) {
//			var store2 = Ext.create('App.store.prorder.sitem');
//			store2.getProxy().setExtraParam('orderid', me.poid);
//			store2.getProxy().setExtraParam('ordernumber', me.ponumber);
//			me.reconfigure(store2);
//			store2.load();
//		}
//		if (me.store) {
//			me.store.load();
//			var grid = me;
//			var panel = me;
//			var store = me.store;
//			var proxy = store.getProxy();
//			proxy.setExtraParam('orderid', panel.getPoid());
//			proxy.setExtraParam('ordernumber', panel.getPonumber());

//		}
	}
});