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

Ext.define('App.controller.ccatprod',{
	extend: 'Ext.app.Controller',
	views: [
		'App.view.catprod.vcatprod',
		'App.view.catprod.treegrid'
	],
	models:[
		'App.model.catprod.mcatprod',
		'App.model.catprod.treegrid'
	],
	stores:[
		'App.store.catprod.scatprod',
		'App.store.catprod.treegrid'
	],
	refs: [
		{ ref: 'grid', selector: 'appcatprodvcatprod grid#gridcatprod'}
	],

	init: function () {
		var me = this;
		me.control({
			'appcatprodvcatprod grid#gridcatprod': {
				edit: me.processSave
			},
			'appcatprodvcatprod button[action=add]': {
				/*add type*/
				click: me.addRecord
			},
			'appcatprodvcatprod button[action=remove]': {
				/*remove*/
				click: me.removeRecord
			},
			'appcatprodvcatprod button[action=import]': {
				/*Import Record dari Excel */
				click: me.importRecord
			},
			'appcatprodvcatprod button[action=export]': {
				/*Export Record ke excel*/
				click: me.exportRecord
			},
			'appcatprodvcatprod button[action=help]': {
				/*Tampilkan Bantuan*/
				click: me.help
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
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();
//		var cnt = me.cntNewRecord;
		var editor = grid.getPlugin('cellEditor');
		/*@todo : jika grid (record dipilih) terpilih maka yang akan dibuat adalah child category*/
		var model = Ext.create('App.model.catprod.mcatprod', {
			name : ' ',
			info : ' '
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
		var grid = btn.up('appcatprodvcatprod').down('grid'),
			selections = grid.getSelectionModel().getSelection(),
			store = grid.getStore();
		if (selections[0] === undefined) {
			this.msgError('Pilih Record Kategori terlebih dahulu');
			return false;
		}

		Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus semua Kategori yang dipilih ? ', function (btn) {
			if (btn == 'yes') {
				Ext.each(selections, function (rec, index, value) {
					rec.destroy({
						failure: function (rec, opts) {
							App.util.box.error('Ada Record yang gagal dihapus');
						}
					});
				});
				store.load();
			}
		});

	},
	msgError: function (text) {
		App.util.box.error(text);
	},
	processSave: function (editor, object) {
		var me = this,
			record = object.record,
			name = record.get('name'),
			grid = object.grid,
			store = grid.getStore(),
			fabrictype_id = record.get('fabrictype_id');

		record.save({
			success: function(rec,opts){
				App.util.box.info(rec.get('name') + ' Berhasil disimpan');
				store.load();
			},
			failure: function(rec,opts){
				me.msgError('Ada Kesalahan , saat simpan '+ rec.get('name') +' Silahkan Ulangi Kembali');
				store.load();
				return false;
			}
		})
	}

});

