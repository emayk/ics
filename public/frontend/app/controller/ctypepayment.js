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

Ext.define('App.controller.ctypepayment', {
	extend: 'Ext.app.Controller',
	views: ['App.view.typepayment.vtypepayment'],
	models: ['App.model.typepayment.mtypepayment'],
	stores: ['App.store.typepayment.stypepayment'],
	refs: [
		{
			ref: 'panel', selector: 'apptypepaymentvtypepayment'
		},
		{
			ref: 'grid', selector: 'apptypepaymentvtypepayment grid#gridtypepayment'
		}
	],
	init: function () {
		var me = this;
		me.control({
			'apptypepaymentvtypepayment': {
				render: function (a) {
					a.down('grid#gridtypepayment').getStore().load();
				}
			},

			/**
			 * Grid Type Product
			 */
			'apptypepaymentvtypepayment grid': {
				render: me.gridrender,
				edit: me.processEdit,
				selectionchange: me.processSelectionChange
			},
			/**
			 * Save Record
			 */
			'apptypepaymentvtypepayment grid button#add': {
				click: me.addRecordType
			},

			'apptypepaymentvtypepayment grid button#remove': {
				click: me.removeRecordType
			},
			'apptypepaymentvtypepayment grid button#import': {
				click: function (btn) {
					log(btn.text + 'clicked');
				}

			},
			'apptypepaymentvtypepayment grid button#export': {
				click: function (btn) {
					log(btn.text + 'clicked');
				}
			},
			'apptypepaymentvtypepayment grid button#help': {
				click: function (btn) {
					log(btn.text + 'clicked');
				}
			}
		});
	},
	gridrender: function () {
		this.getGrid().getStore().load();
	},
	processEdit: function(editor, object){
		object.store.sync();
		object.store.reload();
	},
	processSelectionChange: function (current, selections) {
		this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
	},
	cntNewRecord : 1,
	addRecordType: function (button) {
		var me = this, grid = me.getGrid(),
//			cnt = me.cntNewRecord,
			rowEditing = grid.getPlugin('cellEditorTypePayment'),
			model = Ext.create('App.model.typepayment.mtypepayment',{
				name: ' '
			});
		grid.getStore().insert(0, model);
		rowEditing.startEdit(0, 0);
//		me.cntNewRecord++;
	},

	removeRecordType: function (button) {
		var me = this,
			selection = me.getGrid().getSelectionModel(),
			store = me.getGrid().getStore();

		Ext.each(selection.selected.items, function (type) {
			store.remove(type);
		});
		store.sync();
	}
});

