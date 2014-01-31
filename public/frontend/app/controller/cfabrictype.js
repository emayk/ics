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

Ext.define('App.controller.cfabrictype', {
	extend: 'Ext.app.Controller',
	views: ['App.view.fabrictype.vfabrictype'],
	models: ['App.model.fabrictype.mfabrictype'],
	stores: ['App.store.fabrictype.sfabrictype'],
	refs: [
		{ ref: 'grid', selector: 'appfabrictypevfabrictype grid#gridFType'}
	],
	init: function () {
		var me = this;
		me.control({
			'appfabrictypevfabrictype grid#gridFType': {
				render: me.gridRender,
				edit: me.processEdit,
				selectionchange: me.processSelectionChange
			},
			'appfabrictypevfabrictype grid#gridFType button#add': {
				click: me.addRecordType
			},
			'appfabrictypevfabrictype grid#gridFType button#remove': {
				click: me.removeRecordType
			},
			'appfabrictypevfabrictype grid#gridFType button#import': {
				click: function (btn) {
					log(btn.text + 'clicked');
				}
			},
			'appfabrictypevfabrictype grid#gridFType button#export': {
				click: function (btn) {
					log(btn.text + 'clicked');
				}
			},
			'appfabrictypevfabrictype grid#gridFType button#help': {
				click: function (btn) {
					log(btn.text + 'clicked');
				}
			}
		});

	},
	gridRender: function () {
		this.getGrid().getStore().load();
	},
	processEdit: function (editor, object) {
		log(object);
		object.store.sync();
		this.getGrid().getStore().reload();
	},
	processSelectionChange: function (current, selections) {
		this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
	},
	cntNewRecord: 1,
	addRecordType: function (button) {
		var me = this, grid = me.getGrid(),
			cnt = me.cntNewRecord,
			rowEditing = grid.getPlugin('cellEditorFabricType'),
			model = Ext.create('App.model.fabrictype.mfabrictype', {
				name: 'New Fabric Type ' + cnt
			});
		grid.getStore().insert(0, model);
		rowEditing.startEdit(0, 0);
		me.cntNewRecord++;
	},

	removeRecordType: function (button) {
		var grid = button.up('grid'),
			selections = grid.getSelectionModel().getSelection(),
			store = grid.getStore();


		if (selections[0] === undefined) {
			msgError('Pilih Record Tipe terlebih dahulu');
			return false;
		}

		Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus semua Tipe yang dipilih ? ', function (btn) {

			if (btn == 'yes') {
				Ext.each(selections, function (rec, index, value) {
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
	}
});

