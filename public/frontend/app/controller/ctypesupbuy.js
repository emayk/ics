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

Ext.define('App.controller.ctypesupbuy', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.typesupbuy.vtypesupbuy',
		'App.view.typesupbuy.wintype'
	],
	models: ['App.model.typesupbuy.mtypesupbuy'],
	stores: ['App.store.typesupbuy.stypesupbuy'],
	refs: [
		{ ref: 'grid', selector: 'apptypesupbuyvtypesupbuy grid#gridtype'}
	],
	init: function () {
		var me = this;
		me.control({
			'apptypesupbuyvtypesupbuy grid#gridtype': {
				edit: me.processSave
			},
			'apptypesupbuyvtypesupbuy button[action=add]': {
				/*add type*/
				click: me.addRecord
			},
			'apptypesupbuyvtypesupbuy button[action=remove]': {
				/*remove*/
				click: me.removeRecord
			},
			'apptypesupbuyvtypesupbuy button[action=import]': {
				/*Import Record dari Excel */
				click: me.importRecord
			},
			'apptypesupbuyvtypesupbuy button[action=export]': {
				/*Export Record ke excel*/
				click: me.exportRecord
			},
			'apptypesupbuyvtypesupbuy button[action=help]': {
				/*Tampilkan Bantuan*/
				click: me.help
			},
			/**
			 * Window
			 */
			'apptypesupbuywintype [action=help]': {
				click: me.help
			},

			'apptypesupbuywintype [action=save]': {
				/*Process Simpan Record */
				click: me.saveRecord
			}

		});
	},
	saveRecord: function (btn) {
		var win = btn.up('apptypesupbuywintype'),
			form = win.down('form').getForm(),
			values = form.getValues(),
			record = form.getRecord();

		if (!form.isValid()) {
			App.util.box.error('Silahkan Perbaiki Masukan Form');
			return false;
		}
		;

		if (!record) {
			record = Ext.create('App.model.typesupbuy.mtypesupbuy', values);
		} else {
			record.set(values);
		}
		record.save({
			success: function (rec, opts) {
				App.util.box.info(rec.get('name') + ' Berhasil ditambahkan');
				win.close();
			},
			failure: function (rec, opts) {
				App.util.box.error('Gagal menambahkan');
			}
		});
	},
	/**
	 * Tampilkan Bantuan
	 * @param btn
	 */
	help: function (btn) {
		belumImplement();
	},
	/**
	 * Export Data ke Format Excel
	 * @param btn
	 */
	exportRecord: function (btn) {
		belumImplement();
	},
	/**
	 * Import Data dari Excel
	 * @param btn
	 */
	importRecord: function (btn) {
		belumImplement();
	},
	/**
	 * Add Record Type
	 * @param btn
	 */
	addRecord: function (btn) {
		log('add record');
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();
//		var cnt = me.cntNewRecord;
		var editor = grid.getPlugin('cellEditorType');
		var model = Ext.create('App.model.typesupbuy.mtypesupbuy', {
			name: '',
			info: ''
		});
		store.insert(0, model);
		editor.startEdit(0, 0);
//		me.setNewRecordCounter();
	},
	setNewRecordCounter: function () {
		this.cntNewRecord++;
	},
	/**
	 * Counter New Record (optional)
	 */
	cntNewRecord: 1,

	removeRecord: function (btn) {
		log('Remove');
		var me = this,
			grid = btn.up('apptypesupbuyvtypesupbuy').down('grid'),
			selection = grid.getSelectionModel().getSelection(),
			store = grid.getStore(),
			firstrecord = selection[0];

		if (firstrecord === undefined) {
			msgError('Pilih Record Tipe terlebih dahulu');
			return false;
		}

		Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus semua Tipe yang dipilih ? ', function (btn) {

			if (btn == 'yes') {
				var records = grid.getSelectionModel().getSelection();
				Ext.each(records, function (rec, index, value) {
					rec.destroy({
						failure: function (rec, opts) {
							var name = rec.get('name');
							App.util.box.error('Ada Record yang gagal dihapus');
						}
					});
				});
				store.load();
			}
		});

	},
	processSave: function (editor, object) {
		var store = object.store;
		var grid = object.grid;
		/*Save*/
		object.store.sync();
		/*Refresh*/
		grid.getView().refresh();
	}

});

