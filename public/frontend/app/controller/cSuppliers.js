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
				render: me.taboAccountBankRender,
				beforeactivate: function (tab) {
					/*check Account Supplier sudah disave?*/
					var record = tab.up('form').getForm().getRecord();

					if (!record) {
						App.util.box.error('Silahkan Simpan data Supplier terlebih dahulu');
						return false;
					} else {
						return true;
					}
				}
			},
			'appaccountBankvaccountBankList [action=addaccountBank]': {
				click: function (btn) {
					log(btn.text);
				}
			},

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


			/**
			 * Phones
			 */
			'form#formsupplier appphonesgrid': {
				beforeactivate: function (tab) {
					/*check Account Supplier sudah disave?*/
					var record = tab.up('form').getForm().getRecord();

					if (!record) {
						App.util.box.error('Silahkan Simpan data Supplier terlebih dahulu');
						return false;
					} else {
						return true;
					}
				}
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
			},
			/**
			 * Kontak Person
			 */
			'form#formsupplier #tabcontactperson': {
				render: me.tabcontactpersonRender,
				beforeactivate: function (tab) {
					/*check Account Supplier sudah disave?*/
					var record = tab.up('form').getForm().getRecord();
					if (!record) {
						App.util.box.error('Silahkan Simpan data Supplier terlebih dahulu');
						return false;
					} else {
						/*setup proxy grid contact*/
						var cp = tab;
						cp.parentId = record.get('id');
						cp.parenttype = 'supplier';
						cp.parentName = record.get('name');
						return true;
					}
				}
			}
			/*End Control*/
		});
		/*@todo: setup store phone dan account bank */
	},
	tabcontactpersonRender: function(tab){
//		var record = tab.up('form').getForm().getRecord();
//		if (!record){
//			App.util.box.error('Silahkan Simpan Pemasok Terlebih dahulu');
//			return false;
//		}
	},
	taboAccountBankRender: function (tab) {
		var record = tab.up('form').getForm().getRecord();
		var grid = tab,
			store = grid.getStore(),
			proxy = store.getProxy();
		proxy.setExtraParam('parent_id', record.get('id'));
		proxy.setExtraParam('parenttype', 'supplier');
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

	/**
	 * Save Record Supplier
	 * @param btn
	 */
	saveRecord: function (btn) {
		var me = this,
			form = btn.up('form').getForm(),
			record = form.getRecord(),
			values = form.getValues(),
			isnew = false,
			tabs = btn.up('appSuppliersvSuppliersEdit').down('#tabsupplierdetail'),
			store = me.getGrid().getStore();
		if (!record) {
			isnew = true;
			var record = Ext.create('App.model.Suppliers.mSuppliers');
			record.set(values);
		}else{
			isnew = false;
		}

		var errors = record.validate();
		if (!errors.isValid()) {
			var errornamemsg = errors.getByField('name');
			log(errornamemsg);
			var msg = 'Ada Error Pada Form Silahkan Coba lagi , <br/>' + errornamemsg.message
			App.util.box.error(msg);
			return false;
		}

		record.save({
			success: function (rec, ops) {
				var idSupplier = rec.get('id');
				App.util.box.info(rec.get('name') + ' berhasil disimpan');
				Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda akan keluar ?', function (btnconfirm) {
					if (btnconfirm == 'yes') {
						store.load();
						me.closeFormEdit(btn);
					} else {
						/*Load Record dl ke form*/
						form.loadRecord(rec);
						/*Tidak Jadi Keluar*/
						if (isnew) {
							/*Aktifkan Nomor Telp atau Rekening Bank */
							Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda ingin mengisi Rekening Bank ? ', function (btn) {
								var gridaccountbank = tabs.down('appaccountBankvaccountBankList#accountbank'),
									gridphone = tabs.down('appphonesgrid#gridphone');
								if (btn == 'yes') {
									/*Tampilkan Tab Rekening Bank*/
									tabs.setActiveTab(gridaccountbank);
								} else {
									/*Tampilkan Tab Nomor Telp*/
									tabs.setActiveTab(gridphone);
								}
								me.setupProxyGridAndLoadStore(gridaccountbank,idSupplier);
								me.setupProxyGridAndLoadStore(gridphone,idSupplier);
							});

						}
					}
				});
			}, failure: function (r, o) {
				App.util.box.error('Ada kesalahan, silahkan perbaiki');
				return false;
			}
		});


	},
	setupProxyGridAndLoadStore: function(grid,idSupplier){
		var store = grid.getStore(),
			proxy = store.getProxy();
		proxy.setExtraParam('parent_id', idSupplier);
		proxy.setExtraParam('parenttype', 'supplier');
		store.load();
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
				mode: 'edit',
				parentId: id,
				parenttype: 'supplier',
				parentName: record.get('name')
			});
		tabinfo.down('#formsupplier').getForm().loadRecord(record);

//		var storeAccountBank = Ext.create('App.store.accountBank.saccountBank');
//		tabinfo.down('#accountbank').setStore(storeAccountBank);

		var storeGridPhone = tabinfo.down('appphonesgrid#gridphone').getStore();
		storeGridPhone.getProxy().setExtraParam('parent_id', id);
		storeGridPhone.getProxy().setExtraParam('parenttype', 'supplier');
		storeGridPhone.load();

//		var gridAccount = tabinfo.down('#gridaccountbank');
//		var pgAccount = tabinfo.down('#pgAccountBank');


//        gridAccount.reconfigure(storeAccountBank);
//        pgAccount.bindStore(storeAccountBank);
//        storeAccountBank.getProxy().setExtraParam('type','supplier');
//        storeAccountBank.getProxy().setExtraParam('typeid',id);
//        storeAccountBank.load();

//		me.setupAccountBank(id, storeAccountBank, gridAccount, pgAccount);

		me.currentRecordSupplier = id;
		me.openNewTab(title, tabinfo);
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
				mode: 'edit',
				parentId: null,
				parentName: null,
				parenttype: null
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

