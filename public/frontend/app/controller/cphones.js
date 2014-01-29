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

Ext.define('App.controller.cphones', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.phones.vphones',
		'App.view.phones.winPhone',
		'App.view.phones.List'

	],
	models: ['App.model.phones.mphones'],
	stores: [
		'App.store.phones.sphones',
		'App.store.phones.typephone'
	],
	init: function () {
		var me = this;
		me.control({
			'appphonesgrid [action=remove]': {
				click: me.removeRecordFromGrid
			},
			'appphoneswinphone [action=add]': {
				click: me.saveRecord
			},
			'appphoneswinphone [action=help]': {
				click: me.help
			}
		});
	},
	/**
	 * Remove Record Phone
	 * @param btn
	 * @returns {boolean}
	 */
	removeRecordFromGrid: function (btn) {
		/*Remove Record*/
		var grid = btn.up('grid'),
			selection = grid.getSelectionModel(),
			store = grid.getStore();

		if (selection.selected.length == 0) {
			Ext.util.box.error('Silahkan Pilih terlebih dahulu Record Phone Yang akan dihapus');
			return false;
		}

		Ext.each(selection.selected.items, function (phone) {
			store.remove(phone);
		});
		store.sync();

	},
	help: function () {
		belumImplement();
	},
	saveRecord: function (btn) {
		var win = btn.up('window'),
			form = win.down('form'),
			record = form.getRecord(),
			values = form.getValues();
		if (!form.isValid()) {
			App.util.box.error('Silahkan Perbaiki Masukan pada form');
			return false;
		}

		if (!record) {
			record = Ext.create('App.model.phones.mphones', values);
		} else {
			record.set(values);
		}

		record.save({
			success: function (rec, opts) {
				App.util.box.info('Telp Berhasil disimpan');
				win.close();
			},
			failure: function (rec, opts) {
				App.util.box.error('Gagal Menambahan');
			}
		})

	}
});

