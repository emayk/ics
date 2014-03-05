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

Ext.define('App.controller.cprocespo', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.procespo.vprocespo',
		'App.view.procespo.vProductList', // daftar produk
		'App.view.procespo.gridItems' // daftar produk yang sudah dipilih
	],
	models: [
		'App.model.procespo.mprocespo',
		'App.model.procespo.items',
		'App.model.procespo.potemp'
	],
	stores: [
		'App.store.procespo.sprocespo',
		'App.store.procespo.items',
		'App.store.procespo.products'
	],
	refs: [
		{ ref: 'gridProducts', selector: 'appprocespovgridItems' },
		{ ref: 'gridItems', selector: 'appprocespovgridItems' },
		{ ref: 'panelcreate', selector: 'appprocespovprocespo' }
	],
	getTrxNumber: function () {
		return this.getPanelcreate().getTrxNumber();
	},
	init: function () {
		var me = this;
		me.control({
			'appprocespovprocespo #pageselectedproduct [action=next]': {
				/**
				 * Pengajuan Pembelian Barang dilakukan
				 * */

				click: function (btn) {
					var me = this;
					var panel = btn.up('appprocespovprocespo');
					/*Check Apakah Grid Item ada record dengan Qty 0*/
//					var gridItems = me.getGridItems();
					var gridItems = panel.down('appprocespovgridItems');
					var storeItems = gridItems.getStore();
					var QtyhaveZeroValue = false;
					var listProductHaveZeroQty = [];
					var listMsg = '';

					/*Check Apakah Item ada ? */
					if (storeItems.getCount() == 0) {
						App.util.box.error('Silahkan isi Produk yang akan dipesan');
						return false;
					}

					storeItems.each(function (rec) {
						var qty = rec.get('qty'), name = rec.get('prodname');
						if (parseInt(qty) == 0) {
							QtyhaveZeroValue = true;
							listMsg += name + '<br/>';
							listProductHaveZeroQty.push(name);
						}
					});

					if (QtyhaveZeroValue) {
						var countZeroQty = listProductHaveZeroQty.length;
						var msgZeroProduct = (countZeroQty > 5) ? ' sebanyak ' + countZeroQty + ' record' : listMsg;
						var msg = 'Maaf, Qty Barang harus diatas nilai 0 <br/><br/>' + msgZeroProduct;
						App.util.box.error(msg);
						return false;
					}

//					storeItems.sync();
					/**
					 * Lakukan Proses Pemindahan dari Tmp ke Pengajuan PR
					 */
					btn.disable();
					var idtmp = panel.getTrxId();
					var number = panel.getTrxNumber();
					Ext.Ajax.request({
//						url: getApiUrl() + '/transaction/pr',
						url: getApiUrl() + '/transaction/purchase/request',
						params: {
							tmptrxid: idtmp,
							tmpnumber: number,
							cmd: 'save',
							options: 'movetoadj'
						},
						method: 'POST',
						success: function (response, opts) {
							var msg = Ext.JSON.decode(response.responseText, true);
							if (msg) {
								var results = msg.results;
								var trxnumber = results.trxnumber;
								var trxmsg = (trxnumber) ? 'dengan No Pengajuan ' + trxnumber : '';
								App.util.box.info('Terima Kasih,<br/>' +
									'Pengajuan Pembelian Barang Sudah dilakukan ' + trxmsg
								);
								btn.enable();
								var tab = panel.up('tabpanel');
								if (tab) {
									tab.remove(panel);
								}
							}

						},
						failure: function (response, opts) {
							btn.enable();
							App.util.box.error('Maaf,<br/>' +
								'Pengajuan Pembelian Barang gagal dilakukan '
							);
							return false;
						}
					});
				}
			},
			'appprocespovprocespo #pagepreviewproductorder [action=next]': {
				/*Halaman Pengajuan  Pesanan dan Mendapatkan PR Number */
				click: function (btn) {
					var panel = btn.up('appprocespovprocespo');
					/*@todo: Jika yang mengajukan Admin bisa langsung ke Approval PR, jika bukan maka Finish*/
					var pageApprovePr = panel.down('#pageApprovalPR');
					var panelApprovePr = Ext.create('App.view.approvepr.process', {
						prnumber: '123-1232132102321321-test'
					});
					pageApprovePr.add(panelApprovePr);
					panel.getLayout().setActiveItem('pageApprovalPR');
				}
			},
			'appprocespovprocespo #pagepreviewproductorder [action=prev]': {
				/*Halaman Pengajuan  Pesanan dan Mendapatkan PR Number */
				click: function (btn) {
					var panel = btn.up('appprocespovprocespo');
					panel.getLayout().setActiveItem('pageselectedproduct');
				}
			},


			/**
			 * Produk List (Grid)
			 */


			/**
			 * Mencari Produk berdasarkan Nama Yang diberikan
			 */
			'appprocespovProductList [name=search]': {
				specialkey: function (field, e) {
					// e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
					// e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
					if (e.getKey() == e.ENTER) {
						var value = field.getValue();
						var grid = field.up('appprocespovProductList');
						var store = grid.getStore();
						if (store) {
							store.clearFilter();
							var proxy = store.getProxy();
							if (proxy) {
								proxy.setExtraParam('searchbyName', value);
							}
							store.load();
						}
					}
				}
			},

			/**
			 * Tambah Produk Pesanan
			 * (Tombol Pesan)
			 * */
			'appprocespovProductList [action=order]': {
				click: function (btn) {
					var me = this;
					var grid = btn.up('appprocespovProductList'),
						panel = btn.up('appprocespovprocespo'),
						gridItem = panel.down('appprocespovgridItems'),
						selections = grid.getSelectionModel().getSelection(),
						store = grid.getStore();
					if (selections[0] === undefined) {
						App.util.box.error('Pilih Produk yang akan dipesan terlebih dahulu');
						return false;
					}

					var storeitems = gridItem.getStore();
					var alreadyExist = [];
					var alreadyMsg = '';
					var failedAdded = false;
					var models = [];
					var recsAdded = [];
					Ext.each(selections, function (rec, index, value) {
						var alreadyAdded = storeitems.findRecord("prodname", rec.get('name'));
						if (alreadyAdded) {
							alreadyMsg += rec.get('name') + '<br/>';
							alreadyExist.push(rec.get('name'));
							failedAdded = true;
						} else {
							var record = {
								prodname: rec.get('name'),
								prodid: rec.get('id'),
								qty: 0,
								trxid: panel.getTrxId()
							};
							var model = Ext.create('App.model.procespo.items', record);
							storeitems.add(model);
						}
					});


					grid.getView().refresh();
					storeitems.sync();
					if (failedAdded) {
						var msg = (alreadyExist.length > 5)
							? ' sebanyak ' + alreadyExist.length + ' record'
							: alreadyMsg;

						App.util.box.error('Sudah ditambahkan sebelumnya<br/>' + msg);
						return false;
					}


//					log('reload');
//					storeitems.reload();
//
//					gridItem.getView().refresh();
//					log('load');

				}
			},

			/**
			 * Grid Items
			 *
			 */


			'appprocespovgridItems': {
				/*Saat Edit*/
				edit: function (editor, obj) {
					var grid = obj.grid;
					obj.store.sync();
					obj.store.load();
					grid.getView().refresh();
				}
			},
			'appprocespovgridItems [action=removeitem]': {
				/**
				 * Proses Hapus Barang Pesanan
				 * @param btn
				 * @returns {boolean}
				 */
				click: function (btn) {
					var me = this;
					var grid = btn.up('appprocespovgridItems'),
						selections = grid.getSelectionModel().getSelection(),
						store = grid.getStore();
					if (selections[0] === undefined) {
						App.util.box.error('Pilih Produk yang akan dihapus dari Daftar Pesanan');
						return false;
					}

					Ext.each(selections, function (rec, index, value) {
						store.remove(rec);
					});
					store.sync();
					store.load();
					grid.getView().refresh();
				}
			}

		});
	}
});

