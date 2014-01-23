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

Ext.define('App.controller.cunittype', {
	extend: 'Ext.app.Controller',
	views: ['App.view.unittype.vunittype'],
	models: ['App.model.unittype.munittype'],
	stores: ['App.store.unittype.sunittype'],
	refs: [
		{ ref: 'panel', selector: 'appunittypevunittype'},
		{ ref: 'grid', selector: 'appunittypevunittype grid'}
	],


	init: function () {
		var me = this;
		me.control({
			'appunittypevunittype grid': {
				render: function(grid){
					grid.getStore().load();
				},
				edit: function (editor, object) {
					object.store.save();
					object.store.load();
				},
				selectionchange: function (current, selections) {
					var disabled = (selections.length == 0);
					me.getGrid().down('button[action=remove]').setDisabled(disabled);
				}
			},
			'appunittypevunittype grid > toolbar > button[action=add]': {
				click: function (button) {
					var me = this, grid = me.getGrid(),
						store = grid.getStore();
					var model = Ext.create('App.model.unittype.munittype',{name: ' '});

					store.insert(0, model);
					var rowEditing = grid.getPlugin('cellEditor');
					rowEditing.startEdit(0, 0);

				}
			},
			'appunittypevunittype grid > toolbar > button[action=remove]': {
				click: function (button) {
					var me = this, grid = me.getGrid();
					var selection = grid.getSelectionModel();
					var store = grid.getStore();
					Ext.each(selection.selected.items, function (unit) {
						store.remove(unit);
					});
					store.sync();
					store.reload();
				}
			}
		});
	}
});

