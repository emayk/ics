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


Ext.define('App.controller.cDomain', {
	extend: 'Ext.app.Controller',
	views: [ ],
	models: [],
	stores: [ ],
	init: function () {
		var me = this;
		me.listen({
			/*Listen Controller*/
			controller: {
				'*': {
					'approvePrFromButton': me.approvedPurchaseRequest,
					'deniedPrFromButton': me.deniedPurchaseRequest,
					'debug': me.debugConsole
				}
			},
			/*Lister Component*/
			component: {
				'appapproveprvprocess': {
					'debug': me.debugConsole
				}
			},
//				/*Listen Store*/
			store: {},
		});
	},

	debugConsole: function (eventName, component) {
		log('Debug ....', eventName, component);
	},
	controlStore: function () {

	},
	deniedPurchaseRequest: function (btn) {
//		var approved = false;
		log('Denied PR', btn);
		this.processPRFromButton(btn, false);
	},
	processPRFromButton: function (btn, approve) {
		var me = this;
		var msgApprove = '';
		var panel = btn.up('appapproveprvprocess');
		var griditems = panel.down('#listsproduct');
		var store = griditems.getStore();
		var deniedcnt = 0;
		var countproduct = store.getCount();
		var approved = approve;
		var status;

		if (approved) {
			/*Approve*/
			msgApprove = ' disetujui';
			/**
			 * Check Store apakah Checkcolum Disetujui / ditolak semua
			 *
			 * tidak mungkin sebuah Produk di tolak semua sedangkan disetujui.
			 * */
			var hasZeroPrice = false, cntZeroPrice = 0, listZeroProduct = ' ';
			store.each(function (record) {
				var denied = (record.get('approved') == false );
				deniedcnt = denied ? deniedcnt + 1 : deniedcnt;
				if (parseFloat(record.get('price')) == 0) {
					hasZeroPrice = true;
					cntZeroPrice++;
					listZeroProduct += record.get('name') + '<br/>';
				}

			});

			if (deniedcnt == countproduct) {
				App.util.box.error('Maaf, Anda tidak setujui ' + countproduct + ' barang , sedangkan anda approve');
				return false;
			}
			/*Check apakah Harga ada yang 0 */
			if (hasZeroPrice) {
				var msgZ = 'Maaf, anda menyetujui tapi ada ' + cntZeroPrice + ' produk yang harganya diisi kosong [0],<br/> Mohon diisi Harga lebih dari 0 ';
				var msgZero = msgZ + ( (cntZeroPrice > 3 ) ? ' ' : '<br/><br/>Productnya : <br/>' + listZeroProduct );
				App.util.box.error(msgZero);
				return false;
			}

			status = 'approve';
		} else {
			/*Denied PR*/
			msgApprove = ' ditolak';
			status = 'denied';
		}

		var aprid = panel.getAprid();
		var tab = panel.up('tabpanel');

		griditems.getStore().sync();
		Ext.Ajax.request({
			url: getApiUrl() + '/transaction/prapprove/' + aprid,
			params: {
				cmd: 'setstatus',
				status: btoa(status),
				id: aprid,
				_token: gettoken(),
				_method: 'PUT'
			},
			method: 'POST',
			success: function (r, o) {
				var res = Ext.JSON.decode(r.responseText, true);
				var msg = 'Persetujuan Pemesanan Barang ' ,
					number = res.trxnumber,
					idapr = res.id;
				if (number) {
					msg = msg + '[ ' + number + ' ] '
				}
				msg = msg + ' telah' + msgApprove + '<br/>';
				if (approved) {
					App.util.box.confirm('Konfirmasi', msg + '<br/> Apakah Anda Akan Print PO yang baru saja di ' + msgApprove + ' ?', function (button) {
						log(button);
						if (button == 'yes') {
							me.printPurchaseWithidApr(idapr, tab);
						}
						tab.remove(panel);
					});
				} else {
					App.util.box.info(msg);
					tab.remove(panel);
				}
			},
			failure: function (r, o) {
				App.util.box.error('Terjadi Kesalahan');
			}
		})
	},
	printPurchaseWithidApr: function (idApr, tabpanel) {
		log('Proses Cetak dengan id Approve PR => ', idApr);
		/*Create View */
		var id = idApr;

		var newtab;
		if (!newtab) {
//			var component = Ext.create(fileview, config);
			var component = Ext.create('Ext.panel.Panel', {
				title: 'Panel Print',
				iconCls: 'print',
				closable: true,
				items: [
					{
						xtype: 'container',
						html: 'Proses Print untuk APR ' + id
					}
				]
			});
			newtab = tabpanel.add(component);
		}
		tabpanel.setActiveTab(newtab);
	},
	/**
	 * Approved Purchase Request
	 * @param aprid Id APR
	 * @param component component untuk
	 */
	approvedPurchaseRequest: function (btn) {
		this.processPRFromButton(btn, true);
	},
	approvedPurchaseRequestVersiOld: function (btn) {
		var approved = true;
		var panel = btn.up('appapproveprvprocess');
		var griditems = panel.down('#listsproduct');
		var store = griditems.getStore();
		var deniedcnt = 0;
		var countproduct = store.getCount();

		/**
		 * Check Store apakah Checkcolum Disetujui / ditolak semua
		 *
		 * tidak mungkin sebuah Produk di tolak semua sedangkan disetujui.
		 * */
		store.each(function (record) {
			var denied = (record.get('approved') == false );
			deniedcnt = denied ? deniedcnt + 1 : deniedcnt;
		});

		if (deniedcnt == countproduct) {
			App.util.box.error('Maaf, Anda tidak setujui ' + store.getCount() + ' barang , sedangkan anda approve');
			return false;
		}
		var aprid = panel.getAprid();
		var tab = panel.up('tabpanel');
		griditems.getStore().sync();
		Ext.Ajax.request({
			url: getApiUrl() + '/transaction/prapprove/' + aprid,
			params: {
				cmd: 'setstatus',
				status: btoa('approve'),
				id: aprid,
				_token: gettoken(),
				_method: 'PUT'
			},
			method: 'POST',
			success: function (r, o) {
				var res = Ext.JSON.decode(r.responseText, true);
				var msg = 'Persetujuan Pemesanan Barang ' ,
					number = res.trxnumber;
				if (number) {
					msg = msg + '[ ' + number + ' ] '
				}
				App.util.box.info(msg + ' telah disetujui ');
				tab.remove(panel);
			},
			failure: function (r, o) {
				App.util.box.error('Terjadi Kesalahan');
			}
		})
	}
});
