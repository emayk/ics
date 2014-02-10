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

Ext.define('App.controller.cusers', {
	extend: 'Ext.app.Controller',
	views: ['App.view.users.vusers',
		'App.view.users.lists',
		'App.view.users.form',
		'App.view.users.treemenu'
	],
	models: ['App.model.users.musers'],
	stores: ['App.store.users.susers'],
	init: function () {
		var me = this;
		me.control({
			/*Panel*/
			'appusersvusers': { },

			/*Grid User*/
			'appusersvgridusers': {
				itemdblclick: function (grid, record) {
					log(record);
				}
			},
			/*Tambah Record*/
			'appusersvgridusers > toolbar button[action=add]': {
				click: function (btn) {
					log(btn.text + 'fire!!!');
				}
			},
			/*remove Record*/
			'appusersvgridusers > toolbar button[action=remove]': {
				click: function (btn) {
					var gridusers = btn.up('grid');
					var selections = gridusers.getSelectionModel().getSelection();
					var selected = (selections.length > 0);

					if (!selected) {
						App.util.box.error('Silahkan Pilih Record Pengguna yang akan dihapus ');
						return false;
					}

					var store = gridusers.getStore();
					Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus semua Tipe yang dipilih ? ', function (btn) {
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
				}
			},

			/*Form*/
			'appusersvform': { },
			/*Simpan atau Update User */
			'appusersvform > toolbar button[action=addorupdate]': {
				click: function (btn) {
					log(btn.text + 'fire!!!');
				}
			},
			'appusersvform > toolbar button[action=close]': {
				click: function (btn) {
					log(btn.text + 'fire!!!');
				}
			},
			'appusersvform > toolbar button[action=help]': {
				click: function (btn) {
					log(btn.text + 'fire!!!');
				}
			},

			/*Tree Menu*/
			'appviewuserstreemenu': {

			}
		});
	}
});

