/**
 * Part Of ICS
 *
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
 *
 *
 **/

Ext.define('App.controller.cpurchase', {
	extend: 'Ext.app.Controller',
	views: ['App.view.purchase.vpurchase'],
	models: ['App.model.purchase.mpurchase'],
	stores: ['App.store.purchase.spurchase'],
	init: function () {
		var me = this;
		me.control({
			'apppurchasevpurchase [action=createpr]': {
				click: function (btn) {
					var tab = btn.up('tabpanel');
					/*Dapatkan id trx tmp melalui Ajax*/
					Ext.Ajax.request({
						url: getApiUrl() + '/transaction/pr',
						params: {
							gdoc: true
						},
						method: 'POST',
						success: function (response, opts) {
							var msg = Ext.JSON.decode(response.responseText, true);
							var results = msg.results;
							var trxnumber = results.trxnumber;
							var id = results.id;
							var title =  'Buat Pengajuan Barang';


							var newtab = tab.items.findBy(function (t) {
								return t.title === title
							});

							if (!newtab) {
								var panelcreatepr = Ext.create('App.view.procespo.vprocespo', {
									trxNumber: trxnumber,
									title : title,
									trxId: id,
									closable: true,
									iconCls: 'add'
								});
								panelcreatepr.setTrxId(id);
								panelcreatepr.setTrxNumber(trxnumber);
								newtab = tab.add(panelcreatepr);
							}

							tab.setActiveTab(newtab);
						},
						failure: function (response, opts) {
							App.util.box.error('Maaf,<br/>' +
								' Server sedang bermasalah (Code:' + response.status + ')'
							);
							return false;
						}
					});


				}
			}
		})
	}
});

