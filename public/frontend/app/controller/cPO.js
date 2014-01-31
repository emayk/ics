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

Ext.define('App.controller.cPO', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.PO.vPO',
		'App.view.PO.formAddPoKain',
		'App.view.PO.listItems',
		'App.view.PO.winContact',
		'App.view.PO.winSupplier',
		'App.view.PO.winProduct'
	],
	models: [
		'App.model.PO.mPO'
	],
	stores: [
		'App.store.PO.sPO',
		'App.store.PO.ssupplier',
		'App.store.PO.products',
		'App.store.PO.sContact',
		'App.store.combo.cbSuppliers',
		'App.store.combo.cbWarehouseStore',
		'App.store.combo.cbCurrency',
		'App.store.combo.cbTypeTax',
		'App.store.combo.cbTypePaymentStore'
	],
	refs: [
		{
			ref: 'formAddKain', selector: 'formAddPoKain'
		},
		{
			ref: 'valSupplierId', selector: 'formAddPoKain [name=supplier_id]'
		}
	],
	init: function () {
		var me = this;
		me.control({

			/**
			 * Form
			 */

			/*Pilih Supplier*/
			'formAddPoKain [action=selectsupplier]': {
				click: me.showWindowselectSupplier
			},
			/*Pilih Contact*/
			'formAddPoKain [action=selectcontact]': {
				click: me.showWindowselectContactFromSupplier
			},
			'formAddPoKain [action=selectproduct]': {
				click: me.showWindowselectProductFromSupplier
			},
			/**
			 * Supplier Window
			 */
			'winPoSupplier': {
				beforeshow: me.clearContactBeforeShowWinSupplier
			},
			'winPoSupplier grid': {
				itemdblclick: me.selectSupplierAndCloseWindow
			},
			'winPoSupplier > toolbar [action=selectandclose]': {
				click: me.selectSupplierAndcloseWindow
			},
			'winPoSupplier [action=searchsupplier]': {
				specialkey: me.typeAndSearchSupplier
			},
			/**
			 * Contact Person
			 */
			'winPoContact grid': {
				itemdblclick: me.selectContactAndCloseWindow
			},
			'winPoContact > toolbar [action=selectandclose]': {
				click: me.toolbarselectContactAndcloseWindow
			},

			'winPoContact [action=searchcontact]': {
				specialkey: me.typeAndSearchContact
			},
			/**
			 * Product Window
			 */
			'winPoProduct grid': {
				itemdblclick: me.selectProductAndCloseWindow
			},
			'winPoProduct > toolbar [action=quickaddproduct]': {
				click: me.showQuickAddProductWindow
			},
			'winPoProduct [action=searchproduct]': {
				specialkey: me.typeAndSearchProduct
			}
		});
		me.callParent(arguments);
	},

	showQuickAddProductWindow: function(btn){
	/*Menambahkan Product dengan cepat*/
		var supname = btn.up('window').getSupplierName();
		var win;
		if (!win){
			win = Ext.create('Ext.window.Window',{
				title: 'Tambah Product untuk Supplier ' + supname,
				height: App.util.box.maxHeightwindow() - 200,
				width: App.util.box.maxWidthWindow() - 100,
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Cari Supplier
	 * @param field
	 * @param e
	 */
	typeAndSearchSupplier: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var grid = field.up('grid'),
				store = grid.getStore(),
				suppliername = field.getValue(),
				proxy = store.getProxy();
			proxy.setExtraParam('suppliername',suppliername);
			store.load();
		}
	},
	/**
	 * Cari Contact
	 * @param field
	 * @param e
	 */
	typeAndSearchContact: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var grid = field.up('grid'),
				store = grid.getStore(),
				contactname = field.getValue(),
				proxy = store.getProxy();
			proxy.setExtraParam('contactname',contactname);
			store.load();
		}
	},
	/**
	 * Clear Contact Sebelum Window Tampil
	 */
	clearContactBeforeShowWinSupplier: function () {
		var form = this.getFormAddKain();
		/*Clear Combo Contact */

		form.down('[name=cp_id]').setValue('');
		form.down('[name=cp_name]').setValue('');
	},
	typeAndSearchProduct: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var grid = field.up('grid'),
				store = grid.getStore(),
				productname = field.getValue(),
				proxy = store.getProxy();
			proxy.setExtraParam('productname',productname);
			store.load();
		}
	},
	toolbarselectContactAndcloseWindow: function (btn) {
		/*Dapatkan record yang dipilih*/
		var win = btn.up('window'),
			grid = win.down('grid'),
			selection = grid.getSelectionModel();

		if (selection.selected.length == 0) {
			App.util.box.error('Silahkan Pilih Contact Terlebih Dahulu');
			return false;
		}
		var record = selection.selected.items[0],
			form = this.getFormAddKain();
		/*Set Combo Contact */
		form.down('[name=cp_id]').setValue(record.get('id'));
		form.down('[name=cp_name]').setValue(record.get('name'));
		/*Setup Proxy Contact di set di initComponent Window */
		/*Close Window*/
		win.close();

	},
	selectContactAndCloseWindow: function (grid, record) {
		/*Select Record Contact*/
		var win = grid.up('window'), me = this,
			form = me.getFormAddKain(),
			cpid = form.down('[name=cp_id]'),
			cpname = form.down('[name=cp_name]');

		/*Setup Combobox Contact id*/
		me.setupValueCombo(record.get('id'), cpid);
		/*Setup Combobox Contact name*/
		me.setupValueCombo(record.get('name'), cpname);
		/*Close Window*/
		win.close();

	},
	selectProductAndCloseWindow: function (grid, record) {
		/*Select Record*/
		/*Added to Grid Order Item*/
		/*Close Window*/
	},
	/**
	 * Memilih Record dan Window Langsung Close saat double click
	 * @param grid
	 * @param record
	 */
	selectSupplierAndCloseWindow: function (grid, record) {
		var win = grid.up('window'), me = this,
			form = me.getFormAddKain(),
			cbsupplierid = form.down('[name=supplier_id]'),
			cbsuppliername = form.down('[name=supplier_name]');

		me.setupValueCombo(record.get('id'), cbsupplierid);
		me.setupValueCombo(record.get('name'), cbsuppliername);
		win.close();
	},
	/**
	 * Setup Combo Box
	 * @param val
	 * @param comboid
	 */
	setupValueCombo: function (val, comboid) {
		comboid.setValue(val);
	},
	/**
	 * Menampilkan Window Supplier untuk dipilih
	 * @param btn
	 * @returns {boolean}
	 */
	showWindowselectProductFromSupplier: function (btn) {
		var form = btn.up('formAddPoKain');
		var supplierId = form.down('[name=supplier_id]').getValue();
		if (!supplierId) {
			App.util.box.error('Silahkan Pilih Supplier/Pemasok terlebih dahulu');
			return false;
		}
		var win;
		if (!win) {
			var supplierId = 2;
			var supplierName = form.down('[name=supplier_name]').getValue();
			/*Ambil dari combo Form */
			var store = Ext.create('App.store.PO.products');
			store.getProxy().setExtraParam('supplierid', supplierId)
			/*Butuh ID Supplier */
			win = Ext.create('App.view.PO.winProduct', {
				supplierName: supplierName,
				supplierId: supplierId,
				storeProduct: store
			});
			win.show();
		}
	},
	/**
	 * Memilih Supplier dan Close Window dari Button
	 * @param btn
	 * @returns {boolean}
	 */
	selectSupplierAndcloseWindow: function (btn) {
		/*Dapatkan record yang dipilih*/
		var grid = btn.up('winPoSupplier').down('grid');
		var win = btn.up('window');
		var selection = grid.getSelectionModel();

		if (selection.selected.length == 0) {
			App.util.box.error('Silahkan Pilih Supplier Terlebih Dahulu');
			return false;
		}

		var record = selection.selected.items[0];
		var form = this.getFormAddKain();
		/*Set Combo Supplier */
		form.down('[name=supplier_id]').setValue(record.get('id'));
		form.down('[name=supplier_name]').setValue(record.get('name'));
		/*Clear Contact*/
		form.down('[name=cp_id]').clearValue();
		form.down('[name=cp_name]').clearValue();

		/*Setup Proxy Contact*/

		/*Close Window*/
		win.close();

	},
	/**
	 * Menampilkan Window Supplier Untuk Dipilih
	 * @param btn
	 */
	showWindowselectSupplier: function (btn) {
		var storeSupplier = Ext.create('App.store.PO.ssupplier');
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winSupplier', {
				storeSupplier: storeSupplier,
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Menampilkan Window Contact Untuk Dipilih
	 * @param btn
	 */
	showWindowselectContactFromSupplier: function (btn) {
		/*cari parameter supplier_id*/
		var supplierId = this.getValSupplierId().getValue();
		var supplierName = this.getFormAddKain().down('[name=supplier_name]').getValue();
		var storeContacts = Ext.create('App.store.PO.sContact');
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winContact', {
				supplierName: supplierName,
				supplierId: supplierId,
				storeContact: storeContacts,
				modal: true
			});
			win.show();
		}
	}
});

