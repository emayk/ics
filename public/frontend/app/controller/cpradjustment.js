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

Ext.define('App.controller.cpradjustment', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.pradjustment.vpradjustment',
		'App.view.pradjustment.edit',
		'App.view.pradjustment.tab',
		'App.view.pradjustment.lists',
		'App.view.pradjustment.suppliercontact',
		'App.view.pradjustment.warehouse',
		'App.view.pradjustment.other',
		'App.view.pradjustment.form',

		/*Combox*/
		'App.form.combobox.cbSupplier',
		'App.form.combobox.cbWarehouse',
		'App.form.combobox.cbTypePayment',
		'App.form.combobox.cbCurrencies',
		'App.form.combobox.cbContactPerson',
		'App.form.combobox.cbTypeTax'
	],
	models: [
		'App.model.pradjustment.mpradjustment',
		'App.model.pradjustment.item'
	],
	stores: [
		'App.store.pradjustment.spradjustment',
		'App.store.pradjustment.item',
		'App.store.pradjustment.warehouse',
		'App.store.pradjustment.supplier',
		/*Combox*/
		'App.store.combo.cbSuppliers',
		'App.store.combo.cbWarehouseStore',
		'App.store.combo.cbTypePaymentStore',
		'App.store.combo.cbCurrency',
		'App.store.combo.cbContactPerson',
		'App.store.combo.cbTypeTax'
	],
	refs: [
		{ ref: 'property', selector: 'apppradjustmentvpradjustmentedit > propertygrid'},
		{ ref: 'btnsaveProperty', selector: 'apppradjustmentvpradjustmentedit #gridproperty > toolbar [action=save]'}
	],
	init: function () {
		var me = this;
		me.listen({
			component: {
				'appdashboardvdashboard button[action=listadjustmentpr]': {
					'click': me.openListAdjustmentPrFromBtn
				}
			}
		});

		me.control({
			'apppradjustmentvpradjustmentedit': {
//				beforeactive: function () {
//					return false;
//				},
				beforerender: function (panel) {
					/*Jika tidak memiliki Adjustment ID maka render tidak bisa dilakukan*/
					if (!panel.getAdjid()) {
						var tab = panel.up('#tabadjustment');
						App.util.box.error('Adjustment Id tidak ada, tidak bisa dilanjutkan');
						tab.remove(panel);
						return false;
					}

				},
				render: function (panel) {
				}
			},
			/*Pengajuan Pemesanan barang dan Ajukan ke atasan*/
			'apppradjustmentvpradjustmentedit >toolbar [action=save]': {
				/*Save Record Penyesuaian Pembelian */
				click: function (btn) {
					log('Adjustmen dan akan diajukan ke Atasan', btn.text);
					/*Checking apakah ada Status yang masih belum diproses*/
//					Url : /ba/api/transaction/purchase/adjustment/process
					var panel = btn.up('apppradjustmentvpradjustmentedit');
					var mainpanel = btn.up('apppradjustmentvpradjustment');
					var tab = mainpanel.down('#tabadjustment');
					var gridlistadjustment = mainpanel.down('apppradjustmentvpradjustmentlists');
					var grid = panel.down('#listitempr');
					var store = grid.getStore();
					var statusunprocess = false;
					var record_approve = 'Record Disetujui<br/>', cnt_approve = 0;
					var record_processed = 'Record Disetujui<br/>', cnt_processed = 0;
					var record_pending = 'Record Ditunda<br/>', cnt_pending = 0;
					var record_denied = 'Record Ditolak<br/>', cnt_denied = 0;
					var record_unprocess = 'Record Belum diproses<br/>', cnt_unprocess = 0;
					var adjpr = panel.getAdjid();
					var adjnumber = panel.getAdjtrx();


					var itemapproved = [];
					store.each(function (rec) {
						var status = parseInt(rec.get('status')), prodname = rec.get('prodname');
						switch (status) {
							case 2 :
								cnt_approve++;
								record_approve += prodname + '<br/>';
								itemapproved.push(rec.get('id'));
								break;
							case 3 :
								cnt_denied++;
								record_denied += prodname + '<br/>';
								break;
							case 4 :
								cnt_pending++;
								record_pending += prodname + '<br/>';
								break;
							case 5 :
								cnt_processed++;
								record_processed += prodname + '<br/>';
								break;
							default :
								statusunprocess = true;
								record_unprocess += prodname + '<br/>';
								cnt_unprocess++;
						}
					});
					if (statusunprocess) {
						var msg = (cnt_unprocess > 3) ? 'sebanyak ' + cnt_unprocess + ' record' : '<br/><br/>' + record_unprocess;
						App.util.box.error('Masih ada Record yang belum diproses ' + msg);
						return false;
					}

					var msgApproved = 'disetujui sebanyak ' + cnt_approve + ' record<br/>';
					var returnRecordMsg = ' record dan akan dikembalikan ke daftar pengajuan <br/>';
					var msgDenied = (cnt_denied > 0) ? 'ditolak sebanyak ' + cnt_denied + returnRecordMsg : ' ';
					var msgPending = (cnt_pending > 0) ? 'ditunda sebanyak ' + cnt_pending + returnRecordMsg : ' ';

					var msgConfirm = 'Product pengajuan pembelian <br/>' + msgApproved + msgDenied + msgPending;

					App.util.box.confirm('Konfirmasi', 'Apakah anda akan mengajukan pembelian ini ke management ? <br/><br/>' + msgConfirm, function (btn) {
						if (btn == 'yes') {
							/*itemid yang diapprove saja yang akan diajukan ke management*/
							log('Anda Akan Mengajukan Product');
							log('Parameter ', adjpr, adjnumber, itemapproved);
							var setitems = '';
							Ext.each(itemapproved, function (r, k) {
								setitems += r + ',';
							});
							var setitemapproved = setitems.slice(0, -1);

							var params = {
								adjpr: adjpr,
								adjnumber: adjnumber,
								setitemapproved: setitemapproved,
								_token: gettoken()
							};
							Ext.Ajax.request({
								url: getApiUrl() + '/transaction/purchase/adjustment/process',
								params: params,
								success: function (response, opts) {
									var r = Ext.JSON.decode(response.responseText, true);
									if (r) {
										if (r.success) {
											/*Success*/
											gridlistadjustment.getStore().load();
											var msg = (r.msg) ? r.msg : 'Penyesuaian Pembelian sudah berhasil diajukan ke management untuk diproses<br/>';
											App.util.box.info('Terima Kasih,<br/>' + msg);
											tab.remove(panel);
										} else {
											/*Failure*/
											var reason = (!r.reason) ? 'Gagal ajukan, Silahkan coba lagi' : r.reason;
											App.util.box.error(reason);
											return false;
										}
									}
								},
								failure: function (response, opts) {
									App.util.box.error('Gagal pengajuan pembelian, silahkan coba lagi');
									return false;
								}
							})
						} else {
							App.util.box.error('Anda Membatalkan Pengajuan Pembelian');
							return false;
						}
					})
				}
			},
			'apppradjustmentvpradjustmentedit > #listitempr': {
				edit: function (editor, object) {
					var grid = object.grid;
					var store = grid.getStore();
					store.sync();
				},
				selectionchange: me.on_selection_grid
			},
			'apppradjustmentvpradjustmentlists': {
				render: function (panel) {
					panel.store.load();
				}
			},

			'apppradjustmentvpradjustmentform [name=price]': {
				keyup: function (eprice, ev, eOpts) {
					var form = eprice.up('#priceandqty');
					var qty = form.down('[name=qty]').getValue();
					var price = eprice.getValue();
					var esubtotal = form.down('displayfield[name=subtotal]');
					var subtotal = (parseFloat(price) * parseInt(qty));
					esubtotal.setValue(subtotal);
				}
			},
			'apppradjustmentvpradjustmentform [name=qty]': {
				keyup: function (field, ev, eOpts) {
					var form = field.up('#priceandqty');
					var price = form.down('[name=price]').getValue();
					var qty = field.getValue();
					var esubtotal = form.down('displayfield[name=subtotal]');
					var subtotal = (parseFloat(price) * parseInt(qty));
					esubtotal.setValue(subtotal);
				}
			},
			'apppradjustmentvpradjustmentform >toolbar [action=save]': {
				/*Save Record Item*/
				click: function (btn) {
					var form = btn.up('form');
					var values = form.getValues();
					var record = form.getRecord();
					if (!record) {
						App.util.box.error('Silahkan Pilih Product Yang akan di edit didalam daftar');
						return false;
					}

					if (parseFloat(values.price) == 0) {
						App.util.box.error('Silahkan Masukan Harga diatas nilai 0');
						return false;
					}

					if (parseFloat(values.qty) == 0) {
						App.util.box.error('Silahkan Masukan Qty diatas nilai 0');
						return false;
					}

					if (!form.isValid()) {
						App.util.box.error('Silahkan Perbaiki Form Masukan');
						return false;
					}
					var grid = btn.up('apppradjustmentvpradjustmentedit').down('#listitempr');
					var store = grid.getStore();
					record.set(values);
					if (record.get('status') == 1) {
						App.util.box.error('Silahkan tentukan status ');
						return false;
					}
					grid.getView().refresh();

					var r = record;
					var route = 'Route Is ' +

					log(record);
					log(values);

					store.sync();

				}
			}
		});
	},
	calculateSubtotal: function (val1, val2, cbresults) {
		var subtotal = (val1 * val2);
		cbresults.setValue(subtotal);
	},
	setupGridItem: function (panel) {
		var me = panel;
		var grid = me.down('#listsproduct');
		var store = grid.getStore();
		var proxy = store.getProxy();
		log(proxy);
		proxy.setExtraParam('getitems', true);
		proxy.setExtraParam('adjid', me.getAdjid());
		store.load();
	},
	on_selection_grid: function (view, records) {
		if (records.length) {
			var grid = view.view.ownerCt;
			this.load_record_to_form(grid, records[0]);
		}
	},
	/**
	 * Shows a specified record by binding it to
	 */
	load_record_to_form: function (grid, record) {
		var me = this;
		var panel = grid.up('apppradjustmentvpradjustmentedit');
		var propertygrid = panel.down('#gridproperty');
		var data = record.data;
		if (propertygrid) {
			propertygrid.setSource(data);
		}

		var form = panel.down('apppradjustmentvpradjustmentform');
		form.setProductname(record.get('prodname'));
		form.setTitle('Form Penyesuaian Pembelian Product ' + record.get('prodname'));
		form.down('[name=delivery_at]').setMinValue(record.get('delivery_at'));

		var btnsave = form.down('[action=save]');

		var processed = (record.get('status') == 5);
		btnsave.setDisabled(processed);
		var fcstatus = form.down('#fcstatus');
		me.setVisibiltyStatus(fcstatus, processed);
		form.update();
		form.getForm().loadRecord(record);
	},

	setVisibiltyStatus: function (fcstatus, processed) {
		if (processed) {
			fcstatus.down('#status1').setVisible(!processed);
			fcstatus.down('#status2').setVisible(!processed);
			fcstatus.down('#status3').setVisible(!processed);
			fcstatus.down('#status4').setVisible(!processed);
		} else {
			fcstatus.down('#status5').setVisible(processed);
		}
	},
	/**
	 * Buka Daftar Pengajuan Pembelian untuk di sesuaikan
	 * @param btn
	 */
	openListAdjustmentPrFromBtn: function (btn) {
		var tabpanel = btn.up('tabpanel');
		var title = 'Pengajuan Pembelian';
		var fileview = 'App.view.pradjustment.vpradjustment';
		var config = {
			iconCls: 'grid',
			title: title,
			closable: true
		};
		this.fireEvent('createlog', 'User membuka Daftar ' + title)
		App.util.box.openNewtab(tabpanel, title, fileview, config);
	}
});

