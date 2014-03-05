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

/**
 * @startuml
 * title Controller Terima Barang
 * Ext.app.Controller <|-- App.controller.creceiveProduct
 * App.controller.creceiveProduct : view[]
 * App.controller.creceiveProduct : model[]
 * App.controller.creceiveProduct : store []
 * App.controller.creceiveProduct : init()
 * App.controller.creceiveProduct : listen()
 * App.controller.creceiveProduct : control()
 *
 * @enduml
 */
Ext.define('App.controller.creceiveProduct', {
	extend: 'Ext.app.Controller',
	views: [
		/*tab*/
		'App.view.receiveProduct.tabbarang',
		'App.view.receiveProduct.vreceiveProduct',
		'App.view.receiveProduct.gridPrintHistoryItem'
	],
	models: [
		'App.model.receiveProduct.mreceiveProduct',
		'App.model.receiveProduct.mreceiveProductItem',
		'App.model.receiveProduct.mprintProductItem'
	],
	stores: [
		'App.store.receiveProduct.sreceiveProduct',
		'App.store.receiveProduct.sreceiveProductItem',
		'App.store.receiveProduct.sprintProductItem',
		'App.store.receiveProduct.sOrder',
		'App.store.combo.cbSuppliers'

	],
	init: function () {
		var me = this;

		me.listen({
			/**
			 * Listen Komponent
			 */
			component: {
				appreceiveProductvreceiveProductprinthistory: {
					/**
					 * Print Document History Item
					 * @param grid
					 * @param record
					 */
					printItemHistory: function (grid, record) {
						if (record) {
							App.util.box.printDocument('bpbitemhistory', record.get('id'), 'CETAK-PRINT-ITEM-HISTORY', true);
						}
					}
				}
			}
		});
		me.control({
			'appreceiveProductvreceiveProduct grid#gridreceiveitem': {
				/*viewready: function (grid) {
				 grid.selModel.doSelect(grid.store.data.items[0]);
				 },*/
				/**
				 * Menyimpan Hasil Edit Receive Item
				 * @param editor
				 * @param o
				 */
				edit: function (editor, o) {
					var me = this;
					var store = o.store;
					var grid = o.grid;
					var panel = grid.up('appreceiveProductvreceiveProduct');

					/*Check Value Surat Jalan*/
					var sjno = panel.down('form#formreceive [name=sjno]');
					if (sjno) {
						var valsjno = sjno.getRawValue();
						if (valsjno.length == 0) {
							me.msgError('Surat Jalan Tidak Boleh Kosong');
							return false;
						}
					}
					var sjdate = panel.down('form#formreceive [name=sjtgl]').getSubmitData().sjtgl;
					if (sjdate.length == 0) {
						me.msgError('Tanggal Surat Jalan Tidak Boleh Kosong');
						return false;
					}
					var drivername = panel.down('form#formreceive [name=drivername]').getRawValue();
					var platnomor = panel.down('form#formreceive [name=vehiclenumber]').getRawValue();
					var receivedate = panel.down('form#formreceive [name=receivedate]').getSubmitData().receivedate;

					if (receivedate.length == 0) {
						me.msgError('Tanggal Terima Tidak Boleh Kosong');
						return false;
					}
					log(sjno, sjdate, drivername, platnomor, receivedate);

					/*Check Value Tanggal Surat Jalan*/
					var originalValues = o.originalValues;
					var record = o.record;
					if (record) {
						var qtySisa = record.get('qtyelapse');
						var formatQtySisa = Ext.util.Format.number(qtySisa, '0,000.00');
						var newValues = o.newValues;
						log(record, newValues);

						record.set("sjno", valsjno);
						record.set("sjdate", sjdate);
						record.set("platnomor", platnomor);
						record.set("drivername", drivername);
						record.set("receivedate", receivedate);

						if (newValues) {
							var qtybaru = newValues.qty;
							/**
							 * Jika Qty Baru yang diinput lebih besar dari
							 * Qty Sisa Terima.
							 */
							if (parseFloat(qtybaru) > parseFloat(qtySisa)) {
								me.msgError('Qty yang diterima harus sama atau kurang dari Qty Sisa [ ' + formatQtySisa + ' ]' +
									'<br/>Jika Merasa Salah, Silahkan Refresh Grid Untuk lebih Akurat');
								newValues.qty = originalValues.qty;
								return false;
							}
							var qtyRoll = newValues.qtyroll;
							if (parseFloat(qtyRoll) == 0) {
								me.msgError('Qty Roll Harus diatas 0');
								newValues.qtyroll = originalValues.qtyroll;
								return false;
							}

						}
						store.sync({
//							params: {
//								sjno: sjno,
//								sjdate: sjdate,
//								drivername: drivername,
//								platnomor: platnomor
//							},
							success: function (res, operation, opts) {
								me.msgSuccess('Proses Simpan berhasil');
							},
							failure: function (res, ops, opts) {
								me.msgError('Gagal Simpan ');
							}
						});
						var rowIdx = o.rowIdx;
						grid.selModel.doSelect(grid.store.data.items[rowIdx]);
					}
				},
				/**
				 * Setup Row Editing sebelum Edit
				 * @param editor
				 * @param context
				 * @param eOpts
				 * @returns {boolean}
				 */
				beforeedit: function (editor, context, eOpts) {
					var record = context.record,
						remain = record.get('qtyelapse'),
						column = context.column,
						colqty = (column.dataIndex == "qty");
					if (colqty) {
						var qtyEditor = column.getEditor();
						if (qtyEditor) {
							qtyEditor.setMaxValue(remain);
						}
					}

					if (record) {
						/**
						 * Tidak akan Edit kalau Qty Sisa == 0
						 */
						return (remain > 0);
					}
				},
				canceledit: function (editor, context, opts) {
					var record = context.record;
					record.cancelEdit();
				}
			},
			/**
			 * Tombol Simpan Record
			 */
			'appreceiveProductvreceiveProduct button[action=save]': {
				/**
				 * Simpan Record dan Keluar
				 * @param btn
				 */
				click: function (btn) {
					var me = this;
					var tab = btn.up('tabpanel');
					if (!tab) Ext.Error.raise('Tidak diketemukan Komponen Tab');
					/**
					 * Ambil Value dan Record dari Form
					 */
					var panel = btn.up('appreceiveProductvreceiveProduct');
//					var totalItemToday = panel.down('#contfooter [name=totalitem]');
//					var totalQtyToday = panel.down('#contfooter [name=totalqty]');
					var form = panel.down('#formreceive').getForm(),
						record = form.getRecord(),
						values = form.getValues(),
						ponumber = record.get('ponumber'),
						receiveId = record.get('id'),
						receiveNumber = record.get('receivenumber');

					if (!form.isValid()) {
						me.msgError('Silahkan Perbaiki Form');
						return false;
					}

					record.set(values);
					record.save(
						{
							params: {
								receiveid: receiveId,
								receivenumber: receiveNumber,
								_token: gettoken(),
								uid: user_login_id(),
								cmd: 'updatereceive'
							},
							callback: function (record, operation, success) {
//								var res = Ext.JSON.decode(response.responseText, true);
								log(record, operation);
								var respon = operation.response,
									res = Ext.JSON.decode(respon.responseText, true);
								var codestatus = respon.status;

								if (success) {
									log(res.success);
									log(res);
									if (res.success) {
										/**
										 * Qty Barang sudah sama dengan Qty Barang Pesanan
										 */
										if (!res.canprint) {
											var msg = 'Terima Barang Sudah Tersimpan';
											msg = (ponumber) ? '[ Nomor PO : ' + ponumber + ' ] ' + msg : msg;
											App.util.box.info(msg);
										} else {
											/**
											 * Jika Qty Terima Sudah Sesuai dengan Total Pesan
											 */
											tab.remove(panel);
											App.util.box.confirm('Konfirmasi', 'Sepertinya Semua Qty Sudah diterima pada PO ini ,' +
												'<br/><br/>Apakah Anda Akan Melakukan Cetak Bukti Terima barang ? ', function (confbtn) {
												if (confbtn == 'yes') {
													/**
													 * Proses Print Document
													 */
													me.prosesCetakBuktiTerimaBarang(receiveId, receiveNumber);
												}
											});
										}
										/**
										 * Close
										 */
										tab.remove(panel);
									} else {
										var msg = 'Ada Kesalahan di server saat Update, Silahkan Coba lagi';
										var msg = (res.reason) ? res.reason : msg;
										App.util.box.error(msg);
										return false;
									}
								} else {
									App.util.box.error('Ada Kesalahan Saat Menghubungi Server');
								}
							}/*,
						 failure: function (response, opts) {
						 log(response);
						 App.util.box.error('Ada Kesalahan Saat Menghubungi Server');
						 return false;
						 }*/
						}
					);

					return;

				}
			}
		});
	},
	/**
	 * Pesan Error
	 * @param msg
	 */
	msgError: function (msg) {
		App.util.box.error(msg, 'Error : Terima barang');
	},
	msgSuccess: function (msg) {
		App.util.box.info(msg, 'Informasi : Terima barang');
	},
	getTotalItemsToday: function () {
		return this.getCounter().qty;
	},
	getTotalQtyToday: function () {
		return this.getCounter().items;
	},
	setTotalItemsToday: function (value) {
		this.getCounter().items = value;
	},
	setTotalQtyToday: function (value) {
		this.getCounter().qty = value;
	},
	setValueQtyAndItems: function (panel, qty, items) {
		var me = this, currentQty = me.getTotalQtyToday(),
			currentItems = me.getTotalItemsToday(),
			newqty = currentQty + qty,
			newitems = currentItems + items;
		log(currentItems, currentQty);
		me.setTotalItemsToday(newitems);
		me.setTotalQtyToday(newqty);
		/*Update*/
		var totalItemToday = panel.down('#contfooter [name=totalitem]');
		var totalQtyToday = panel.down('#contfooter [name=totalqty]');
		log(currentItems, currentQty);
		totalItemToday.setValue(currentItems);
		totalQtyToday.setValue(currentQty);
	},
	config: {
		counter: {
			qty: 0,
			items: 0
		}
	},
	/**
	 * Melakukan Proses Cetak
	 * @param receiveId
	 * @param receiveNumber
	 */
	prosesCetakBuktiTerimaBarang: function (receiveId, receiveNumber) {
		var me = this;
		var preview = true;
		App.util.box.printDocument('bpb', receiveId, receiveNumber, preview);
	}
});

