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

Ext.define('App.controller.cSuppliers', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.Suppliers.vSuppliers',
		'App.view.Suppliers.Lists',
		'App.view.Suppliers.Edit',

		'App.form.combobox.cbCountries',
		'App.form.combobox.cbProvinces',
		'App.form.combobox.cbCities',
		'App.form.combobox.cbTypeSupBuy',
		'App.form.combobox.cbLegalitas',
		'App.form.combobox.cbTypeProduct',

		'App.form.combobox.cbBank',
		'App.form.combobox.cbTypeBank',
		/*Account Bank*/
//		'App.view.accountBank.vaccountBank',
//		'App.view.accountBank.WinForm',
//		'App.view.accountBank.Lists',

		'App.form.combobox.location'
//        'App.view.accountBank.Lists',
//        'App.view.accountBank.form'
		/*Window Tambah Legalitas*/
//		'App.view.master.legalitas.Edit'
	],
	models: [
		'App.model.Suppliers.mSuppliers',
		/*Account Bank*/
		'App.model.accountBank.maccountBank'
	],
	stores: [
		'App.store.Suppliers.sSuppliers',
		'App.store.combo.cbCountries',
		'App.store.combo.cbProvinces',
		'App.store.combo.cbCities',
		'App.store.combo.cbTypeSupBuy',
		'App.store.combo.cbLegalitas',
		'App.store.combo.cbTypeProduct',
		'App.store.combo.cbBank',
		'App.store.combo.cbTypeBank',
		/*Account Bank*/
		'App.store.accountBank.saccountBank',
		'App.store.combo.cbTypeTax',
		'App.store.combo.cbCurrency'
	],
	refs: [
		{
			/*Grid Supplier*/
			ref: 'grid',
			selector: 'appSuppliersvSuppliersLists'
		},
		{
			/*Page Info Supplier*/
			ref: 'pageInfo',
			selector: 'appSuppliersvSuppliersEdit'
		},
		{
			/*Tab Supplier*/
			ref: 'tabs',
			selector: 'appSuppliersvSuppliers'
		},

		{
			/*Tombol Add/Save Account Bank */
			ref: 'btnSaveAccountBank',
			selector: 'appSuppliersvSuppliersEdit #formsupplier appaccountBankvaccountBank #formaccount #add'
		},
		{
			/*Tombol remove Account Bank*/
			ref: 'btnRemoveAccountBank',
			selector: 'appSuppliersvSuppliersEdit #formsupplier appaccountBankvaccountBank #formaccount #remove'
		},
//		{
//			/*Grid Account bank*/
//			ref: 'gridAccountBank',
//			selector: 'appSuppliersvSuppliersEdit appaccountBankvaccountBank appaccountBankvaccountBankList'
//		},
//		{
//			/*Form Account Bank */
//			ref: 'formAccountBank',
//			selector: 'appSuppliersvSuppliersEdit appaccountBankvaccountBank appaccountBankform'
//		}
	],
	init: function () {
		var me = this;
		me.control({
			/*Begin Control*/
			/**
			 * Grid List Buyer
			 */
			'appSuppliersvSuppliersLists': {
				render: me.onRenderGridBuyer,
				itemdblclick: me.showInfo
			},

			/**
			 * tambah Buyer
			 */
			'appSuppliersvSuppliersLists button[action=add]': {
				click: me.addRecord
			},

			/**
			 * Hapus Buyer
			 */
			'appSuppliersvSuppliersLists button[action=remove]': {
				click: me.removeRecord
			},

			/**
			 * Edit Buyer/Info
			 */
			'appSuppliersvSuppliersEdit': {
				render: function (panel) {
					log(panel.mode);
				}
			},

			/**
			 * Tombol save
			 */
			'appSuppliersvSuppliersEdit #formsupplier #save': {
				click: me.saveRecord
			},

			/**
			 * Tombol Help
			 */
			'appSuppliersvSuppliersEdit #formsupplier #help': {
				click: function (btn) {
					log(btn);
					belumImplement();
				}
			},

			/**
			 * Tombol Reset
			 */
			'appSuppliersvSuppliersEdit #formsupplier #reset': {
				click: function (btn) {
					btn.up('form').getForm().reset();
				}
			},

			/**
			 * Tombol Close / Remove Form
			 */
			'appSuppliersvSuppliersEdit #formsupplier #close': {
				click: me.closeFormEdit
			},

			/**
			 * Section Account Bank
			 *
			 */
			'form#formsupplier appaccountBankvaccountBankList': {
				render: me.taboAccountBankRender
			},
			'appaccountBankvaccountBankList [action=addaccountBank]': {
				click : function(btn){
					log(btn.text);
				}
			} ,
//			'appaccountBankvaccountBankList [action=remove]': {
//				click : function(btn){
//					log(btn.text);
//				}
//			},
			/**
			 * Grid Account Bank
			 */
//
//			'appSuppliersvSuppliersEdit #formsupplier appaccountBankvaccountBank #gridlist': {
//				itemclick: me.showInfoAccountBank
//			},
//			'appSuppliersvSuppliersEdit #formsupplier appaccountBankvaccountBank #formaccount': {
//
//			},
//
//			'appSuppliersvSuppliersEdit appaccountBankvaccountBank appaccountBankform #addnew': {
//				/*Add Bank Account*/
//				click: me.addRecordAccountBank
//			},
//			'appSuppliersvSuppliersEdit #accountbank appaccountBankform #saverecord': {
//				/*Add Bank Account*/
//				click: me.saveRecordAccountBank
//			},
//
//			'appSuppliersvSuppliersEdit appaccountBankvaccountBank appaccountBankform #remove': {
//				/*remove Bank Account*/
//				click: me.removeRecordAccountBank
//			},

			/**
			 * Grid Record Account Bank
			 */
//			'appSuppliersvSuppliersEdit appaccountBankvaccountBank appaccountBankvaccountBankList': {
//				itemclick: me.showRecordAccountBank,
//				selectionchange: me.showInfoAccountBank
//			},

			/**
			 * Office
			 */
			'appSuppliersvSuppliersEdit form#formsupplier #taboffice [action=addtypesupbuy]': {
				/*Add Type Supplier*/
				click: me.addTypeSupplier
			},
			'appSuppliersvSuppliersEdit form#formsupplier #taboffice [action=addlegality]': {
				/*Add Legalitas*/
				click: me.addLegalitas
			},

			'appphonesgrid#gridphone': {
				itemdblclick: me.showOrEditRecordPhone
			},

			'appphonesgrid#gridphone [action=add]': {
				click: me.addRecordPhoneFromGrid
			},

			/**
			 * Locations
			 */

			'form#formsupplier #tablocations': {
				render: me.tablocationRender
			},
			/**
			 * Tab Office
			 */
			'form#formsupplier #taboffice': {
				render: me.tabofficeRender
			}
			/*End Control*/
		});
		/*@todo: setup store phone dan account bank */
	},
	taboAccountBankRender: function (tab) {
		var record = tab.up('form').getForm().getRecord(),
			grid = tab,
			store = grid.getStore(),
			proxy = store.getProxy();
		proxy.setExtraParam('parent_id',record.get('id'));
		proxy.setExtraParam('parenttype','supplier');
		store.load();
	},
	tabofficeRender: function (tab) {
		tab.down('cbTypeSupBuy').getStore().load();
		tab.down('cbLegalitas').getStore().load();
	},
	tablocationRender: function (tab) {
		tab.down('cbCountries').getStore().load();
		tab.down('cbProvinces').getStore().load();
		tab.down('cbCities').getStore().load();
	},
	showOrEditRecordPhone: function (grid, record) {
		var win;
		/*parentId */
		/*parentType == supplier */
		if (!win) {
			var params = grid.getStore().getProxy().extraParams,
				parentId = params.parent_id;

			win = Ext.create('App.view.phones.winPhone', {
				parentId: parentId,
				parentType: 'supplier',
				title: translations.update_record_phone_number + ' ' +
					translations.supplier
			});
			var form = win.down('form').getForm();
			form.loadRecord(record);
			win.show();
		}
	},
	addRecordPhoneFromGrid: function (btn) {
		var win;
		/*parentId */
		/*parentType == supplier */
		if (!win) {
			var gridphone = btn.up('grid'),
				params = gridphone.getStore().getProxy().extraParams,
				parentId = params.parent_id;

			win = Ext.create('App.view.phones.winPhone', {
				parentId: parentId,
				parentType: 'supplier',
				title: translations.add_record_phone_number + ' ' +
					translations.supplier
			});
			win.show();
		}

	},
	addTypeSupplier: function (btn) {
		/*Tampilkan WinForm Type Supplier*/
		/*Create model */
		var win = Ext.create('App.view.typesupbuy.wintype', {
			title: 'Add Type Supplier',
			modal: true
		});
		win.show();

	},

	addLegalitas: function (btn) {
		/*Tampilkan WinForm Legalitas*/
		var win = Ext.create('App.view.master.legalitas.Edit', {
			title: 'Add Legalitas',
			modal: true
		});
		win.show();
	},
	addRecordLegalitas: function (btn) {
		/*create model*/
//		'App.model.Legality'
	},
	showRecordAccountBank: function (grid, record) {
		this.getFormAccountBank().getForm().loadRecord(record);
	},
	/**
	 * Menampilkan Record pada Form Account Bank
	 *
	 * @param grid
	 * @param record
	 */
	showInfoAccountBank: function (grid, record) {
		this.getFormAccountBank().getForm().loadRecord(record[0]);
	},
	/**
	 * Remove Account Bank
	 * @param btn
	 */
	removeRecordAccountBank: function (btn) {
		var form = btn.up('form').getForm(),
			record = form.getRecord(),
			values = form.getValues();
		log(values);
	},
	currentRecordSupplier: 0,
	/**
	 * Save Account Bank
	 * @param btn
	 */
	saveRecordAccountBank: function (btn) {
		var me = this, form = btn.up('form').getForm(),
			record = form.getRecord(),
			values = form.getValues(),
			grid = me.getGridAccountBank(),
			store = grid.getStore();

		if (!form.isValid()) {
			App.util.box.error('Silahkan Perbaiki Masukan');
			return false;
		}
		if (record) {
			record.set(values);
			record.save();
			form.updateRecord(record);
			store.sync();
			store.reload();
			grid.getView().refresh();
		}
	},
	/**
	 * Add Record Account Bank
	 * @param btn
	 */
	addRecordAccountBank: function (btn) {
		var win;
		if (!win) {
			win = Ext.create('App.view.accountBank.WinForm', {
				title: 'Add New Account Bank',
				modal: true
			});
//			var record =
//			win.down('form').loadRecord(record);
			win.show();
		}

//		var me = this, form = btn.up('form');
//		form.getForm().reset();
//		var record = Ext.create('App.model.accountBank.maccountBank', {
//			owner_id: me.currentRecordSupplier,
//			owner_type: 'supplier'
//		});
//		var name = form.down('[name=name]'),
//			number = form.down('[name=number]'),
//			bankid = form.down('[name=bank_id]'),
//			currencyid = form.down('[name=currency_id]'),
//			typeid = form.down('[name=tax_id]');
//
//		me.setComponentEnabled(name);
//		me.setComponentEnabled(number);
//		me.setComponentEnabled(bankid);
//		me.setComponentEnabled(currencyid);
//		me.setComponentEnabled(typeid);
//
//		form.getForm().loadRecord(record);
	},
	setComponentEnabled: function (component) {
		if (component.isDisabled()) component.setDisabled(false);
	},
	/**
	 * Save Record Supplier
	 * @param btn
	 */
	saveRecord: function (btn) {
		var me = this,
			form = btn.up('form').getForm(),
			record = form.getRecord(),
			values = form.getValues(),
			store = me.getGrid().getStore();
		if (!record) {
			var record = Ext.create('App.model.Suppliers.mSuppliers');
			record.set(values);
			var errors = record.validate();
			log(errors);
			store.add(record);
		} else {
			form.updateRecord(record);
		}
		store.sync();
		me.closeFormEdit(btn);
	},
	/**
	 * Close Window/Form Info
	 * @param btn
	 */
	closeFormEdit: function (btn) {
		btn.up('appSuppliersvSuppliersEdit').close();
	},
	/**
	 * Menampilkan Informasi Buyer
	 *
	 * @param grid
	 * @param record
	 */
	showInfo: function (grid, record) {
		var me = this, id = record.get('id'),
			title = '[ ' + id + ' ] ' + translations.information + ' Supplier ' + record.get('name'),
			tabinfo = Ext.create('App.view.Suppliers.Edit', {
				title: title,
				closable: true,
				iconCls: 'home',
				mode: 'edit'
			});
		tabinfo.down('#formsupplier').getForm().loadRecord(record);

//		var storeAccountBank = Ext.create('App.store.accountBank.saccountBank');
//		tabinfo.down('#accountbank').setStore(storeAccountBank);

		var storeGridPhone = tabinfo.down('appphonesgrid#gridphone').getStore();
		storeGridPhone.getProxy().setExtraParam('parent_id', id);
		storeGridPhone.getProxy().setExtraParam('parenttype', 'supplier');
		storeGridPhone.load();

		var gridAccount = tabinfo.down('#gridaccountbank');
		var pgAccount = tabinfo.down('#pgAccountBank');


//        gridAccount.reconfigure(storeAccountBank);
//        pgAccount.bindStore(storeAccountBank);
//        storeAccountBank.getProxy().setExtraParam('type','supplier');
//        storeAccountBank.getProxy().setExtraParam('typeid',id);
//        storeAccountBank.load();

//		me.setupAccountBank(id, storeAccountBank, gridAccount, pgAccount);

		me.currentRecordSupplier = id;
		me.openNewTab(title, tabinfo);
	},
	setupAccountBank: function (id, store, grid, pagingtoolbar) {
		grid.reconfigure(store);
		pagingtoolbar.bindStore(store);
		store.getProxy().setExtraParam('type', 'supplier');
		store.getProxy().setExtraParam('typeid', id);
		store.load();
	},
	setProxy: function (store, key, value) {
		store.getProxy().setExtraParam(key, value);
	},
	/**
	 * Saat Render
	 */
	onRenderGridBuyer: function () {
		this.getGrid().getStore().load();
	},
	/**
	 * Add Buyer
	 * @param btn
	 */
	addRecord: function (btn) {
		var me = this, cnt = me.newtab,
			title = 'New Supplier ' + cnt,
			newtab = Ext.create('App.view.Suppliers.Edit', {
				title: title,
				closable: true,
				iconCls: 'home',
				mode: 'edit'
			});
		me.openNewTab(title, newtab);
		me.newtab++;
	},
	/**
	 * Counter New Record
	 */
	newtab: 1,
	/**
	 * Menampilkan pada tab baru
	 * @param titleS judul
	 * @param xtypeS type X
	 */
	openNewTab: function (titleS, xtypeS) {
		var me = this,
			mainPanel = this.getTabs(),
			title = titleS || '[Untitled ' + cnt + ']',
			newTab = mainPanel.items.findBy(function (tab) {
				return tab.title === title
			});

		if (!newTab) {
			newTab = mainPanel.add(xtypeS);
		}

		mainPanel.setActiveTab(newTab);
	},
	/**
	 * Remove Record
	 * @param btn
	 */
	removeRecord: function (btn) {
		var me = this, grid = me.getGrid(),
			store = grid.getStore(),
			selection = grid.getSelectionModel();

		Ext.each(selection.selected.items, function (record) {
			store.remove(record);
		});
		store.sync();

	}
});

