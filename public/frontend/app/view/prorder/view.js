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


/**
 * Menampilkan Detail Purchase Order
 * - aksi = print, close
 */
Ext.define('App.view.prorder.view', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appprordervprorderview',
	iconCls: 'grid',
	itemId: 'appprordervprorderviewId',
	config: {
		ponumber: undefined,
		poid: undefined,
		record: undefined,
		title: null,
		store: 'App.store.prorder.sitem'
	},
	record: null,
	layout: { type: 'vbox', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [

			/**
			 * Informasi PO
			 */
				{ xtype: 'appprordervprorderviewform',
					itemId: 'formpo',
					bodyPadding: 10,
					flex: .2,
					record: me.record
				},
			/**
			 * Daftar Item Order
			 */
				{
					flex: .8,
					xtype: 'appprordervprorderviewgrid',
					itemId: 'griditempo',
					store: me.getStore(),
					record: me.record,
					poid: me.getPoid(),
					ponumber: me.getPonumber()
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						'->',
						{text: 'Print', iconCls: 'print', action: 'print',
							handler: me.processPrint
						},
						{text: 'Keluar', iconCls: 'close', action: 'close', handler: me.closePanel }
					]
				}
			]

		});
		me.callParent(arguments);
		me.setupGridOrderItem();
	},
	/**
	 * Proses Print
	 * @param btn
	 */
	processPrint: function (btn) {
		var me = btn.up('appprordervprorderview');
		me.requestPrint();
	},
	requestPrint: function () {
		var panel = this;
		var id = panel.getPoid();
		var number = panel.getPonumber();


		App.util.box.printDocument('po', id, number, true);
		var tab = panel.up('tabpanel');
		tab.remove(panel);
//		Ext.Ajax.request({
//			url: getApiUrl() + '/transaction/purchase/order',
//			params: {
//				cmd: 'print',
//				orderid: id,
//				ordernumber: number,
//				uid: uid
//			},
//			success: function (res, opts) {
//				log('Success Request, Lakukan Print');
//				log(res);
//				var response = res.responseText;
//
//				var html = response.html;
//				if (!html) {
//					html = response;
//				}
//				log(html);
//				App.util.box.print(html, true, true);
//			},
//			failure: function (res, opts) {
//				App.util.box.error('Tidak Bisa Print, Ada Kesalahan');
//				return false;
//			}
//		})
	},
	closePanel: function (btn) {
		var me = this;
		var panel = btn.up('appprordervprorderview');
		panel.close();
	},
	setupGridOrderItem: function () {
		var me = this;
		var id = me.getPoid();
		var rec = me.getRecord();
		if (rec) {
			var form = me.down('appprordervprorderviewform');
			form.getForm().loadRecord(rec);
		}

		if (id) {
			var number = me.getPonumber();
			var grid = me.down('#griditempo');
			var store = grid.getStore();
			var proxy = store.getProxy();
			proxy.setExtraParam('cmd', 'getitems');
			proxy.setExtraParam('orderid', id);
			proxy.setExtraParam('ordernumber', number);
			store.load();
		}
	}
});