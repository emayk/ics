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

Ext.define('App.controller.coffices', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.offices.voffices',
		'App.view.offices.viewOffice',

		'App.form.combobox.cbCountries',
		'App.form.combobox.cbProvinces',
		'App.form.combobox.cbCities',

		'App.view.offices.winAddLocation',
		'App.view.offices.Phones',
//		'App.view.offices.contacts',
//		'App.view.contacts.vcontacts',
		'App.view.contacts.vLists',
//		'App.view.contacts.winForm',
//		'App.view.contacts.vForm'

	],
	models: [
		'App.model.offices.moffices',
		'App.model.offices.location',
		'App.model.offices.phone',
		'App.model.contacts.mcontacts'
	],
	stores: [
		'App.store.offices.soffices',
		'App.store.offices.sPhones',
		'App.store.combo.cbCountries',
		'App.store.combo.cbProvinces',
		'App.store.combo.cbCities',
		'App.store.contacts.scontacts'

	],
	refs: [
		{ ref: 'btnAdd', selector: 'appofficesvoffices grid#office [action=save]'},
		{ ref: 'comboCountry', selector: 'appofficesviewoffices form#formoffice [name=country_id]'},
		{ ref: 'comboProvince', selector: 'appofficesviewoffices form#formoffice [name=province_id]'},
		{ ref: 'comboCity', selector: 'appofficesviewoffices form#formoffice [name=city_id]'},
		{ ref: 'panelInfo', selector: 'appofficesviewoffices'},
		{ ref: 'formOffice', selector: 'appofficesviewoffices form#formoffice'},

		{ ref: 'gridOffice', selector: 'appofficesvoffices grid#office'},
		{ ref: 'gridContact', selector: 'appofficesviewoffices appcontactsvcontactslist'},
		{ ref: 'gridPhone', selector: 'appofficesviewoffices appofficesgridphone'}
	],
	init: function () {
		var me = this;

		me.control({
			/**
			 * Office
			 */

			/**
			 * List
			 */
			'appofficesvoffices grid#office': {
				itemdblclick: me.showOfficeInfo
			},
			/**
			 * Tombol Tambah Record Office
			 */
			'appofficesvoffices grid#office [action=add]': {
				click: me.addRecordOffice
			},
			/**
			 * Simpan Office
			 */
			'appofficesviewoffices form#formoffice [action=save]': {
				click: me.saveRecordOffice
			},
			'appofficesviewoffices form#formoffice [action=cancel]': {
				click: me.cancelRecordOffice
			},

			/**
			 * Pemilihan saat Perubahan Record Negara (combobox)
			 */
			'appofficesviewoffices form#formoffice [name=country_id]': {
				change: me.changeSelectCountry
			},
			/**
			 * Pemilihan saat Perubahan Record Province (combobox)
			 */
			'appofficesviewoffices form#formoffice [name=province_id]': {
				change: me.changeSelectProvince
			},
			/**
			 * Pemilihan saat Perubahan Record Kota (combobox)
			 */
			'appofficesviewoffices form#formoffice [name=city_id]': {

			},
			/**
			 * Penambahan Record Lokasi Negara
			 */
			'appofficesviewoffices form#formoffice #addcountry': {
				click: me.addQuickCountry
			},
			/**
			 * Penambahan Record Province
			 */
			'appofficesviewoffices form#formoffice #addprovince': {
				click: me.addQuickProvince
			},
			/**
			 * Penambahan Record Kota
			 */
			'appofficesviewoffices form#formoffice #addcity': {
				click: me.addQuickCity
			},

			/**
			 * Quick Add Window
			 *
			 *
			 * */
			'appofficeswinaddlocation [action=save]': {
				click: me.saveNewRecordLocation
			},

			/**
			 * Grid Phones
			 *
			 *
			 */

			'appofficesgridphone': {
				edit: me.ProcessSaveRecordPhone
			},
			/**
			 * Penambahan Record Phone Office
			 */
			'appofficesgridphone > toolbar [action=addphoneoffice]': {
				click: me.addRecordOfficePhone
			},
			/**
			 * Penghapusan Record Phone Office
			 */
			'appofficesgridphone > toolbar [action=removephoneoffice]': {
				click: me.removeRecordOfficePhone
			}
		});
		me.callParent(arguments);
	},
	/**
	 * Menampilkan Informasi Record Office
	 * @param grid
	 * @param selections
	 */
	showOfficeInfo: function (grid, record, item, index, e, eOpts) {
		var me = this,
			idOffice = record.get('id'),
			tab = grid.up('appofficesvoffices'),
			title = '['+ idOffice + '] New Record Office' ;
		var panel = Ext.create('App.view.offices.viewOffice', {
			title: title,
			closable: true,
			iconCls: 'home'
		});

		var form = panel.down('form#formoffice').getForm(),
			gridPhone = panel.down('appofficesgridphone'),
			gridContact = panel.down('appcontactsvcontactslist');
		form.loadRecord(record);
		/*Setup Store Phone dan Contact ke Id record*/
		me.setupStoreGrids(gridPhone, idOffice);
		me.setupStoreGrids(gridContact, idOffice);
		/*Show Panel */
		me.open_new_tab(tab, title, panel);
	},
	/**
	 * Proses Penghapusan Record
	 * @param btn
	 */
	removeRecordOfficePhone: function (btn) {
		var panelinfo = btn.up('appofficesviewoffices');
		var newrecord = ( panelinfo.down('[name=newrecord]').getValue() == "true" );

		if (newrecord) {
			this.msgError('Sepertinya anda belum simpan Record' +
				'<br/> Silahkan Lakukan Penyimpanan terlebih dahulu'
			);
			return false;
		}

		var grid = btn.up('appofficesgridphone'),
			selection = grid.getSelectionModel(),
			store = grid.getStore();

		if (selection.selected.length == 0) {
			this.msgError('Silahkan Pilih terlebih dahulu Record Phone Yang akan dihapus');
			return false;
		}

		Ext.each(selection.selected.items, function (phone) {
			store.remove(phone);
		});
		store.sync();
	},
	/**
	 * Menambahkan Record Office Phone
	 * @param btn
	 * @returns {boolean}
	 */
	addRecordOfficePhone: function (btn) {
		/**
		 * Proses Simpan Record Phone Office
		 */
		var me = this, grid = btn.up('appofficesgridphone'),
			forminfo = btn.up('appofficesviewoffices').down('#formoffice'),
			store = grid.getStore();

		var newrecord = ( forminfo.down('[name=newrecord]').getValue() == "true" );

		if (newrecord) {
			me.msgError('Sepertinya anda belum simpan Record' +
				'<br/> Silahkan Lakukan Penyimpanan terlebih dahulu'
			);
			return false;
		}
		var proxyParams = grid.getStore().getProxy().extraParams;

		var editor = grid.getPlugin('cellEditorPhoneOffice');
		/*@todo : jika grid (record dipilih) terpilih maka yang akan dibuat adalah child category*/
		var model = Ext.create('App.model.offices.phone', {
			number: '',
			info: '',
			parenttype: proxyParams.parenttype,
			parent_id: proxyParams.parent_id
		});
		store.insert(0, model);
		editor.startEdit(0, 0);
	},
	/**
	 * Proses Simpan Record Phone Office
	 *
	 * @param editor
	 * @param object
	 * @constructor
	 */
	ProcessSaveRecordPhone: function (editor, object) {
		var store = object.store;
		var grid = object.grid;
		/*Save*/
		store.sync();
		/*Refresh*/
		grid.getView().refresh();
	},
	/**
	 * Save Record Location
	 *
	 * @param btn
	 */
	saveNewRecordLocation: function (btn) {
		var win = btn.up('window'), form = win.down('form').getForm(),
			record = form.getRecord(),
			me = this,
			values = form.getValues();
		record.set(values);
		record.save({
			success: function (rec, opts) {
				me.msgInfo(rec.get('name') + ' Berhasil disimpan', 'Tersimpan');
				/*@todo : simpan record ke combo */
				win.close();
			},
			failure: function (rec, opts) {
				App.util.box.error('Ada Kesalahan saat Penyimpanan di server, Silahkan Coba Lagi');
			}
		});
	},
	/**
	 * Buat Record Lokasi Negara
	 * @param btn
	 */
	addQuickCountry: function (btn) {
		this.createPanelQuickAddLocation(0, 1, 'country', 'Country');
	},
	/**
	 * Penambahan Province
	 * @param btn
	 * @returns {boolean}
	 *
	 * level 2
	 */
	addQuickProvince: function (btn) {
		/**
		 * Ambil Country ID dari combobox
		 * @type {getValue|*|String|Number|Object|Boolean|Number[]}
		 */
		var countryId = btn.up('form').down('[name=country_id]').getValue();
		if (countryId == typeof undefined) {
			this.msgError('Silahkan Pilih [ Negara ] Terlebih dahulu ');
			return false;
		}
		this.createPanelQuickAddLocation(countryId, 2, 'province', 'Province');
	},
	/**
	 * Menambahkan Record City
	 * @param btn
	 * @returns {boolean}
	 */
	addQuickCity: function (btn) {
		var provinceId = btn.up('form').down('[name=province_id]').getValue();
		if (provinceId == typeof undefined) {
			this.msgError('Silahkan Pilih [ Province ] Terlebih dahulu ');
			return false;
		}
		this.createPanelQuickAddLocation(provinceId, 3, 'city', 'City');
	},
	/**
	 * Menampilkan Message Box Info
	 * @param msg
	 */
	msgInfo: function (msg) {
		App.util.box.info(msg, 'Informasi');
	},
	/**
	 * Menampilkan Message Box Error
	 *
	 * @param text
	 */
	msgError: function (text) {
		App.util.box.error(text, 'Error');
	},
	/**
	 * Membuat Panel Penambahan Cepat Lokasi
	 * @param parentid
	 * @param level
	 * @param type
	 * @param title
	 */
	createPanelQuickAddLocation: function (parentid, level, type, title) {
		var win;
		log(parentid, level);
		if (!win) {
			win = Ext.create('App.view.offices.winAddLocation', {
				modal: true,
				title: 'New Record ' + title,
				parentId: parentid,
				levelId: level
			});

			var location = Ext.create('App.model.offices.location', {
				level: level,
				parent_id: parentid,
				type: type
			});

			win.down('form').loadRecord(location);
			win.show();
		}
	},
	/**
	 * Counter New Record
	 */
	cntNewRecord: 1,
	/**
	 * Perubahan Pemilihan Record pada combox
	 * @param combo
	 * @param newValue
	 * @param oldValue
	 * @param eOpts
	 * @returns {boolean}
	 */
	changeSelectCountry: function (combo, newValue, oldValue, eOpts) {
		if ((oldValue == typeof undefined) || (newValue == typeof undefined)) return false;
		var me = this,
			form = combo.up('form'),
			cbProvince = form.down('[name=province_id]'),
			cbCity = form.down('[name=city_id]'),
			storeCity = cbCity.getStore();
		me.locationSetParentId(cbProvince, newValue);
		cbCity.setDisabled(true);
		cbCity.clearValue('');
		storeCity.removeAll();
	},
	/**
	 * Melakukan Proses Cascade antar combox
	 *
	 * @param grid
	 * @param parentId
	 */
	locationSetParentId: function (grid, parentId) {
		grid.clearValue('');
		grid.getStore().removeAll();
		grid.getStore().getProxy().setExtraParam('parent_id', parentId);
		grid.getStore().load();
		grid.setDisabled(false);
	},
	/**
	 * Perubahan Pemilihan Record pada combox Province
	 * @param combo
	 * @param newValue
	 * @param oldValue
	 * @param eOpts
	 * @returns {boolean}
	 */
	changeSelectProvince: function (combo, newValue, oldValue, eOpts) {
		if ((oldValue == typeof undefined) || (newValue == typeof undefined)) return false;
		var me = this,
			form = combo.up('form'),
			cbCity = form.down('[name=city_id]');
		me.locationSetParentId(cbCity, newValue);
		cbCity.setDisabled(false);
	},
	/**
	 * Cancel Record and close Panel
	 * @param btn
	 */
	cancelRecordOffice: function (btn) {
		btn.up('appofficesviewoffices').close();
	},
	/**
	 * Save Record Office
	 * @param btn
	 */
	saveRecordOffice: function (btn) {
		var panel = btn.up('appofficesvoffices'),
			panelinfo = btn.up('appofficesviewoffices'),
			form = btn.up('form').getForm(),
			me = this,
			values = form.getValues(),
			storegridoffice = panel.down('grid#office').getStore(),
			btnCancel = panelinfo.down('form#formoffice [action=cancel]');
		var newrecord = panelinfo.down('[name=newrecord]');


		if (newrecord.getValue() == "true") {
			/*Save*/
			var record = Ext.create('App.model.offices.moffices', values);
			record.set('parent_id', panel.getParentId());
			record.set('parenttype', panel.getParentType());

			record.save({
				success: function (rec, opts) {
					me.msgInfo('Data Berhasil Disimpan');
					/*Setup Phone Office ke record id office*/
//				panelinfo.close();
					storegridoffice.load();
					/*Set newRecord ke false*/
					/*@todo : Ubah button dari cancel jadi Keluar*/
					/*@todo : reload grid phone dan contact ke id baru office */
					var idOffice = rec.get('id');
					var gridPhone = panel.down('appofficesgridphone');
					var gridContact = panel.down('appcontactsvcontactslist');
					me.setupStoreGrids(gridPhone, idOffice);
					me.setupStoreGrids(gridContact, idOffice);
					btnCancel.setText('Close');
					form.loadRecord(record);
					newrecord.setValue(false);
				},
				failure: function (rec, opts) {
					me.msgError('Terjadi kesalahan pada saat proses simpan di server, silahkan coba lagi');
				}
			});
		} else {
			/*Update*/
			var record = form.getRecord();
			record.set(values);
			record.save();
			me.msgInfo('Data Sudah Berhasil Disimpan Sebelumnya' +
				'<br/> Proses Update'
			);
		}

	},
	setupStoreGrids: function (grid, parentId) {
		var storePhone = grid.getStore();
		storePhone.getProxy().setExtraParam('parent_id', parentId);
		storePhone.getProxy().setExtraParam('parenttype', 'office');
		storePhone.load();
	},
	/**
	 * Add New Record Office
	 *
	 * @param btn
	 */
	addRecordOffice: function (btn) {
		var me = this,
			tab = btn.up('appofficesvoffices'),
			title = 'New Record Office',
			panelinfo = tab.down('appofficesviewoffices'),
			cnt = me.cntNewRecord;
		var panelNewRecord = Ext.create('App.view.offices.viewOffice', {
			title: title,
			closable: true,
			iconCls: 'home'
		});

		/*SetMode New*/
		panelNewRecord.down('[name=newrecord]').setValue(true);
		panelNewRecord.down('[name=province_id]').setDisabled(true);
		panelNewRecord.down('[name=city_id]').setDisabled(true);
		me.open_new_tab(tab, title, panelNewRecord);
		me.cntNewRecord++;
	},
	/**
	 * Buka Panel pada Tab
	 * @param mp
	 * @param title
	 * @param component
	 */
	open_new_tab: function (mp, title, component) {
		var tabs = mp;
		var newTab = tabs.items.findBy(
			function (tab) {
				return tab.title === title;
			});

		if (!newTab) {
			newTab = tabs.add(component);
		}
		tabs.setActiveTab(newTab);
	},
	/**
	 * Mendapatkan Controller Contact
	 * @returns {Controller}
	 */
	ctlContacts: function () {
		return this.getController('ccontacts');
	}
});

