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

Ext.define('App.controller.ccontacts', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.contacts.vcontacts',
		'App.view.contacts.winForm',
//		'App.view.contacts.vForm',
		'App.view.contacts.vform',
		'App.form.combobox.cbDept',
		'App.form.combobox.cbPositions'
	],
	models: [
		'App.model.contacts.mcontacts'
	],
	stores: [
		'App.store.contacts.scontacts',
		'App.store.combo.cbDept',
		'App.store.combo.cbPosition'

	],
	refs: [
		{ ref: 'grid', selector: 'appcontactsvcontactslist appcontactsvcontactslist' }
	],
	init: function () {
		var me = this;
		me.control({
			'appcontactsvcontactslist': {
				itemdblclick: me.showAndEditRecord
			},
			'appcontactsvcontactslist [action=addcontact]': {
				click: me.addRecordContact
			},
			'appcontactsvcontactslist [action=removecontact]': {
				click: me.removeRecordContact
			},
			'appcontactswin': {
//				resize: me.windowContactsResize
			},

			'appcontactswin [action=save]': {
				click: me.saveRecordContact
			},
			'appcontactswin [action=help]': {
				click: me.helpRecordContact
			},
			'appcontactswin [action=close]': {
				click: me.cancelRecordContact
			}

		});
	},
	showAndEditRecord: function (grid, record, item, index, e, eOpts) {
		this.openNewWindowContact(record);
	},
	cancelRecordContact: function (btn) {
		btn.up('window').close();
	},
	helpRecordContact: function (btn) {
		belumImplement();
	},
	saveRecordContact: function (btn) {
		var win = btn.up('window'),
			form = win.down('form').getForm(),
			store = Ext.getStore('App.store.contacts.scontacts'),
			record = form.getRecord(),
			values = form.getValues();
		record.set(values);
		var errors = record.validate();

		if (!errors.isValid()){
			App.util.box.error('Silahkan Perbaiki Masukan');
			return false;
		}

		record.save({
			success: function (rec, opts) {
				App.util.box.info(rec.get('name') + ' Berhasil disimpan');
				/*reload grid contacts*/
				win.close();
				store.load();
			},
			failure: function (rec, opts) {
				App.util.box.error('Tidak Bisa Simpan, Silahkan coba lagi');
			}
		})
	},
//	windowContactsResize: function (windows, width, height, eOpts) {
//		log(windows);
//		log(width, height);
//	},
	getParentId: function (grid) {
		var params = grid.getStore().getProxy().extraParams;
		return params.parent_id;
	},
	getParentType: function (grid) {
		var params = grid.getStore().getProxy().extraParams;
		return params.parenttype;
	},
	addRecordContact: function (btn) {
		/*add window contact*/
		log(btn.text + "ad controller contact");
		var me = this;
		var grid = btn.up('appcontactsvcontactslist');
		var params = grid.getStore().getProxy().extraParams;
		var parentid = params.parent_id;
		var parentType = params.parenttype;
		var record = Ext.create('App.model.contacts.mcontacts', {
			"name": 'New Contact',
			"info": ' ',
			"pos_id": null,
			"dept_id": null,
			"phone": '022-',
			"email": null,
			"fax": '022-',
			"parent_id": parentid,
			"parenttype": parentType
		});
		me.openNewWindowContact(record);
	},
	removeRecordContact: function (btn) {
		log(btn.text + " ad controller contact");
		/*check selection*/
		var grid = btn.up('appcontactsvcontactslist'),
			selection = grid.getSelectionModel(),
			store = grid.getStore();
		log(grid);
		log(selection);
		if (selection.selected.length == 0) {
			msgError('Silahkan Pilih terlebih dahulu Record Contact Yang akan dihapus');
			return false;
		}

		Ext.each(selection.selected.items, function (contact) {
			store.remove(contact);
		});

		store.sync();
		store.load();
	},
	setRemoveRecord: function (record) {

	},
	setAddRecord: function (record) {

	},
	openNewWindowContact: function (record ) {
		var win;
		/**
		 * Pastikan sebelum ini dipanggil
		 * parameter di proxy store grid disetup
		 * */

		if (!win) {
			win = Ext.create('App.view.contacts.winForm', {
				title: 'New Record '
			});

			var form = win.down('appcontactsform').getForm();

			form.loadRecord(record);
			win.show();
		}
	}


});

