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

Ext.define('App.controller.csaleProduct', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.saleProduct.vsaleProduct',
		'App.form.combobox.cbBuyer'
	],
	models: [
		'App.model.saleProduct.msale',
		'App.model.saleProduct.msaleProduct'
	],
	stores: [
		'App.store.saleProduct.ssaleProduct',
		'App.store.combo.cbProduct',
		'App.store.combo.cbBuyer'
	],
	refs: [
		{ ref: 'panel', selector: 'appsaleProductvsaleProduct'}
	],
	modeloadrecord: false,
	saleid: null,
	init: function () {
		var me = this;
		me.control({
			'appsaleProductvsaleProduct #panelform button#setdoc': {
				click: function (btn) {
					var me = this,
						panel = btn.up('appsaleProductvsaleProduct'),
						form = panel.down('form').getForm();
					if (!form.isValid()) {
						return false;
					}

					var values = form.getValues();
					var record = form.getRecord();

					if (values.buyer_id == "") {
						msgError('Silahkan Pilih Buyer dulu');
						return false;
					}

					if (!me.modeloadrecord) {
						var sale = Ext.create('App.model.saleProduct.msale', record);
						sale.set(values);
						sale.save({
							success: function (record, ops) {
								form.loadRecord(record);
								var id = record.get('id');
								me.modeloadrecord = true;
								/*Enable Grid*/
								me.setupGridSale(
									record.get('id'),
									panel
								);
								me.saleid = id;
								msgInfo('Document Berhasil diset....');
								log('Record Berhasil ditambahkan');
							},
							failure: function () {
								msgError('Failure response');
							}
						});

					} else {
						record.set(values);
						record.save();
						msgInfo('Document Berhasil diupdate');
						log('Record Berhasil diupdate');
					}

				}
			},


			'appsaleProductvsaleProduct grid#gridItemsale': {
				edit: me.processSaveRecordSaleItems
			},
			'appsaleProductvsaleProduct grid#gridItemsale > toolbar #removeproduct': {
				click: function (btn) {
					var grid = btn.up('grid#gridItemsale'),
						panel = btn.up('appsaleProductvsaleProduct'),
						selection = grid.getSelectionModel(),
						store = grid.getStore();
					var recordDelete = null;
					Ext.each(selection.selected.items, function (item) {
						store.remove(item);
						recordDelete = item;
					});

					msgInfo(recordDelete.get('productname') + " Sudah dihapus");
					store.sync();
					store.load();
					me.setupCounterSubTotal(store,panel);
				}
			},
			/*Add Record*/
			'appsaleProductvsaleProduct grid#gridItemsale > toolbar #addproduct': {
				click: function (btn) {
					log('add record');
					var me = this;
					if (me.saleid == null) {
						msgError("Silahkan tekan Get Code terlebih dahulu");
						return false;
					}

					var grid = btn.up('grid#gridItemsale'),
						editor = grid.getPlugin('cellEditorSaleProduct');

					var model = Ext.create('App.model.saleProduct.msaleProduct', {
						product_id: 0,
						saleid: me.saleid,
						/**
						 * @todo Harusnya diambil dari harga beli product
						 *
						 * Idenya :
						 * saat pemilihan combo product, price diset value sesuai dengan harga
						 * product yang dipilih.
						 *
						 * */
						price: 0,
						qty: 0,
						desc: '-'
					});

					grid.getStore().insert(0, model);
					editor.startEdit(0, 0);
				}
			},

			'appsaleProductvsaleProduct button#save' :{
				click : function(btn){
					var me = this,
						panel = btn.up('appsaleProductvsaleProduct'),
						form = panel.down('form').getForm();
					if (!me.saleid){
						msgError('Sepertinya anda belum melakukan set Document');
						return false;
					}

					if (!form.isValid()) {
						return false;
					}

					var values = form.getValues();
					var record = form.getRecord();

					msgInfo(record.get('ref') + " Sudah Selesai disimpan");

				}
			},
			'appsaleProductvsaleProduct #addbuyer' : {
				click : function(btn){
					/*@todo: tambah buyer*/
					belumImplement();
				}
			},
			'appsaleProductvsaleProduct #cancel' : {
				click : function(btn){
					/*@todo Cancel*/
					belumImplement();
				}
			},
		});
	},

	setupGridSale: function (id, panel) {
		var me = this;
		log(id);
		var grid = panel.down('grid#gridItemsale');

		var gridfooter = panel.down('#gridFooter');
		gridfooter.setDisabled(false);
		grid.setDisabled(false);
		var store = grid.getStore();
		store.getProxy().setExtraParam('saleid', id);
		store.load();

//		me.setupCounterTotalItem(store.getCount(), panel);

	},
	setupCounterTotalItem: function (count, panel) {
		var count = (count > 0 ) ? count : ' Empty';
		panel.down('#gridFooter [name=totalItem]').setValue(count);

	},
	setupCounterSubTotal: function (store, panel) {
		var me = this;
		var total = 0,count = 0;
		Ext.each(store.data.items, function (rec) {
			total += me.getSubTotal(rec);
			count++;
		});
		var value =  Ext.util.Format.currency(total, 'Rp ', 2);

		panel.down('#gridFooter [name=sumtotal]').setValue(value);
		panel.down('#gridFooter [name=totalItem]').setValue(count);
	},
	getSubTotal: function (record) {
		var qty = record.get('qty');
		var price = record.get('price');
		return ( (qty > 0) || (price > 0 ) ) ? (qty * price) : 0;
	},
	processSaveRecordSaleItems: function (editor, object) {
		var me = this , record = object.record;

		if (record.get('product_id') == 0) {
			msgError('Silahkan Pilih Product Terlebih dahulu');
			return false;
		}
		var grid = object.grid;
		var panel = grid.up('appsaleProductvsaleProduct');
		var store = object.store;
		var is_exist = false;


		if (is_exist) {
			msgError('Product Sudah dimasukan');
			return false;
		}
		/*Save to Store , jika belum ada */
		object.store.sync();
		var count = store.getCount();

		me.setupCounterTotalItem(count, panel);
		// @todo : change too , harusnya menggunakan sesuai dengan currrency yang dipakai

		me.setupCounterSubTotal(store, panel);


	}
});

