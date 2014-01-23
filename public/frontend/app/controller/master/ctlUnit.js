/**
 *
 * Controller Satuan
 *
 **/

Ext.define('App.controller.master.ctlUnit', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.master.unit.ListUnit',
		'App.form.combobox.cbUnitType'
	],
	models: ['App.model.unit.allUnit'],
	stores: [
		'App.store.unit.Allunit',
		'App.store.combo.cbUnitType'
	],
	refs: [
		{
			ref: 'gridUnits',
			selector: 'gridAllunit'
		}
	],

	init: function () {

		var me = this;
		me.control({
			'gridAllunit': {
				render: function(grid){
					grid.getStore().load();
				},
				edit: function (editor, object) {
					object.store.save();
					// this.getUnitAllunitStore().load();
//					me.refresh();
					log('Save Process and refresh grid/store');
					object.store.load();
				},
				selectionchange: function (current, selections) {
					var disabled = (selections.length == 0);
					me.getGridUnits().down('button[action=remove]').setDisabled(disabled);
					log('selection change : ' + disabled);
				}
			},
			'gridAllunit > toolbar > button[action=add]': {
				click: function (button) {
					log('Add Unit');
					var me = this, grid = me.getGridUnits(),
						store = grid.getStore();
					var model = Ext.create('App.model.unit.allUnit');

					store.insert(0, model);
					var rowEditing = grid.getPlugin('ceAllUnits');
					rowEditing.startEdit(0, 0);

				}
			},
			'gridAllunit > toolbar > button[action=remove]': {
				click: function (button) {
					var me = this, grid = me.getGridUnits();
					var selection = grid.getSelectionModel();
					var store = grid.getStore();
					Ext.each(selection.selected.items, function (unit) {
						store.remove(unit);
					});
					store.sync();
					store.reload();
					log('Remove Unit');
				}
			}
		});
	}
});
