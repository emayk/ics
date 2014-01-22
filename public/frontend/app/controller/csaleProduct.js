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
		'App.form.combobox.cbBuyer',
		'App.view.saleProduct.quickaddbuyer'
	],
	models: [
		'App.model.saleProduct.msale',
		'App.model.saleProduct.buyer',
		'App.model.saleProduct.msaleProduct'
	],
	stores: [
		'App.store.saleProduct.ssaleProduct',
		'App.store.combo.cbProduct',
		'App.store.combo.cbBuyer'
	],
	refs: [
		{ ref: 'tabindex', selector: 'mainpanel'},
		{ ref: 'panel', selector: 'appsaleProductvsaleProduct'},
		{ ref: 'winBuyer', selector: 'appsaleProductvsaleProductAddbuyer'}
	],
	modeloadrecord: false,
	saleid: null,
	init: function () {
		var me = this;
		me.control({
			/**
			 * Mendapatkan Generate Document dan Setup Value Form
			 */
			'appsaleProductvsaleProduct #panelform button#setdoc': {
				click: me.getDocAndSetDocumentSale
			},


			'appsaleProductvsaleProduct grid#gridItemsale': {
				/**
				 * Proses Simpan Record Product Item Sale
				 */
				edit: me.processSaveRecordSaleItems
			},
			/**
			 * Remove Product From Product Item Sale Grid
			 */
			'appsaleProductvsaleProduct grid#gridItemsale > toolbar #removeproduct': {
				click: me.removeProductFromGridProductItem
			},
			/*Add Record*/
			'appsaleProductvsaleProduct grid#gridItemsale > toolbar #addproduct': {
				click: me.addProductToSale
			},
			/**
			 * Save Product and close Panel
			 */
			'appsaleProductvsaleProduct button#save': {
				click: me.saveRecordSaleProductAndClose
			},
			/**
			 * Add Quick Buyer Window
			 */
			'appsaleProductvsaleProduct #addbuyer': {
				click: me.showWindowQuickAddbuyer
			},
			'appsaleProductvsaleProduct #cancel': {
				click: function (btn) {
					/*@todo Cancel*/
					belumImplement();
				}
			},
			/**
			 * Save Record Buyer
			 * pada window quick buyer
			 */
			'appsaleProductvsaleProductAddbuyer #formbuyer button#add': {
				click: me.saveRecordQuickAddbuyer
			}
		});
	},

	/**
	 * Add Product Sale Item to Grid/Store
	 * @param btn
	 * @returns {boolean}
	 */
	addProductToSale: function (btn) {
		log('add record');
		var me = this;
		if (me.saleid == null) {
			msgError("Silahkan tekan Get Code terlebih dahulu");
			return false;
		}

		var grid = me.getPanel().down('grid#gridItemsale'),
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

	},
	setupGridSale: function (id, panel) {
		var me = this;
		var grid = panel.down('grid#gridItemsale');

		var gridfooter = panel.down('#gridFooter');
		gridfooter.setDisabled(false);
		grid.setDisabled(false);
		var store = grid.getStore();
		store.getProxy().setExtraParam('saleid', id);
		store.load();
	},
	setupCounterTotalItem: function (count, panel) {
		var count = (count > 0 ) ? count : ' Empty';
		panel.down('#gridFooter [name=totalItem]').setValue(count);

	},
	totalprice: 0,
	totalitem: 0,
	setupCounterSubTotal: function (store, panel) {
		var me = this;
		var total = 0, count = 0;
		Ext.each(store.data.items, function (rec) {
			total += me.getSubTotal(rec);
			count++;
		});
		me.totalprice = total;
		me.totalitem = count;
		var value = Ext.util.Format.currency(total, 'Rp ', 2);

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

		var prodId = record.get('product_id');
		if (prodId == 0) {
			msgError('Silahkan Pilih Product Terlebih dahulu');
			return false;
		}
		var grid = object.grid;
		var panel = grid.up('appsaleProductvsaleProduct');
		var store = object.store;
		var is_exist = 0;

		Ext.each(store.data.items, function (rec) {
			if (rec.get('product_id') == prodId) is_exist++;
		});

		if (is_exist > 1) {
			msgError('Product Sudah dimasukan');
			return false;
		}

		/*Save to Store , jika belum ada */
		object.store.sync();
		// @todo : change too , harusnya menggunakan sesuai dengan currrency yang dipakai
		me.setupCounterSubTotal(store, panel);


		/*Set Focus to add button*/
//		me.getPanel().down('[action=addproduct]').focus();
//		Add Lagi ?
		Ext.MessageBox.confirm('Add Product ', 'Apakah akan menambahkan lagi product ? ', function (btn) {
			if (btn == 'yes') me.addProductToSale();
		});

	},
	showWindowQuickAddbuyer: function (btn) {
			/*@todo: tambah buyer*/
			var win;
			if (!win) {
				win = Ext.create('App.view.saleProduct.quickaddbuyer');
				win.show();
			}
	},
	saveRecordQuickAddbuyer: function (btn) {
		var me = this, win = btn.up('window'),
			form = win.down('form').getForm();
		if (!form.isValid()) {
			msgError('Ada Error, Silahkan Perbaiki');
			return false;
		}

		var values = form.getValues(),
			model = Ext.create('App.model.saleProduct.buyer', values);

		model.save({
			success: function (rec, ops) {
				win.close();
				msgInfo(rec.get('name') + " berhasil ditambahkan");
				me.getPanel().down('[name=buyer_id]').setValue(rec.get('id'));
			},
			failure: function (rec, ops) {
				msgError('Add Error saat simpan ke server, silahkan coba lagi');
				return false;
			}
		})
	},
	saveRecordSaleProductAndClose: function (btn) {
		var me = this,
			panel = btn.up('appsaleProductvsaleProduct'),
			form = panel.down('form').getForm();
		if (!me.saleid) {
			msgError('Sepertinya anda belum melakukan set Document');
			return false;
		}

		if (!form.isValid()) {
			return false;
		}

		var values = form.getValues();
		var record = form.getRecord();

		record.set('totalprice', me.totalprice);
		record.set('totalitem', me.totalitem);

		record.set(values);

		record.save({
			success: function (record, ops) {
				msgInfo(record.get('ref') + " Sudah Selesai disimpan");
			},
			failure: function () {
				msgError('Cannot Update ');
			}
		});
		me.getTabindex().remove(panel);
//					panel.remove();
	},

	removeProductFromGridProductItem: function (btn) {
		var me = this, grid = btn.up('grid#gridItemsale'),
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
		me.setupCounterSubTotal(store, panel);
	},
	getDocAndSetDocumentSale : function (btn) {
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
});

