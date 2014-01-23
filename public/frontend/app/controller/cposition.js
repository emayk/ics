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

Ext.define('App.controller.cposition', {
	extend: 'Ext.app.Controller',
	views: ['App.view.position.vposition'],
	models: ['App.model.position.mposition'],
	stores: ['App.store.position.sposition'],
	refs: [
		{
			ref: 'grid',
			selector: 'apppositionvposition'
		}
	],
	/**
	 * Initialisasi Count Record Baru
	 */
	newRecordCount: 1,
	init: function () {

		var me = this;
		me.control({

			'apppositionvposition grid#positionlist': {
				/**
				 * Proses Edit Record
				 * @param editor
				 * @param object
				 */
				edit: function (editor, object) {
					object.store.sync();
					me.doRefresh();
				},
				/**
				 * Saat Render Grid
				 */
				render: function (grid) {
					grid.getStore().load();
				},
				/**
				 * Saat Record pilih berubah
				 * @param current
				 * @param selections
				 */
				selectionchange: function (current, selections) {
					this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
				}
			},

			/**
			 * Tombol Proses Tambah record
			 */
			'apppositionvposition  toolbar > button[action=add]': {
				click: function (btn) {
					var grid = btn.up('apppositionvposition').down('grid#positionlist'),
						rowEditing = grid.getPlugin('cellEditorPosition'),
						record = Ext.create('App.model.position.mposition', {
							name: ' '
						});

					grid.getStore().insert(0, record);
					rowEditing.startEdit(0, 0);
				}
			},

			/**
			 * Proses Delete
			 */
			'apppositionvposition toolbar > button[action=remove]': {
				click: function (btn) {
					var grid = btn.up('apppositionvposition').down('grid#positionlist');
					var selection = grid.getSelectionModel();
					var store = grid.getStore();
					Ext.each(selection.selected.items, function (dept) {
						store.remove(dept);
					});

					store.sync();
					this.doRefresh();
				}
			}
		});
	},
	doRefresh: function () {
		this.getGrid().getStore().reload();
	}
});

