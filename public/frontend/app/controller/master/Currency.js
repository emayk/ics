/**
 *
 * Controller Color
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 **/

Ext.define('App.controller.master.Currency', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.master.currency.List',
		'App.form.combobox.cbCountries'
	],
	models: [
		'App.model.Currency',
		'App.model.Country'
	],
	stores: [
		'App.store.Currencies',
		'App.store.curCountries',
		'App.store.Countries',
		'App.store.Cbcountries'
	],
	/*==========  Referensi  ==========*/

	refs: [
		{
			ref: 'grid',
			selector: 'currencyGridList'
		}
	],
	/*==========  Inisialisasi  ==========*/

	init: function () {
		var me = this;

		me.control({

			'currencyGridList': {
				edit: me.processEdit,
				selectionchange: me.processSelectionChange,
                render: function (grid) {
                    grid.getStore().load();
                }
			},

			'currencyGridList > toolbar > button[action=add]': {
				click: me.Addrow
			},

			'currencyGridList > toolbar > button[action=remove]': {
				click: me.Removerow
			}

		});
	},

	processEdit: function (editor, object) {
		log('Save Process');
		object.store.sync();
		this.RefreshRow();
	},

	processSelectionChange: function (current, selections) {
		this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
	},

	Addrow: function (button) {
		log('Add');
		var me = this, grid = me.getGrid(),
			rowEditing = grid.getPlugin('cellEditorCurrency'),
			model = Ext.create('App.model.Currency');

		grid.getStore().insert(0, model);
		rowEditing.startEdit(0, 0);
	},

	Removerow: function (button) {
//		log('Remove' + button.text);
//
//		var me = this,
//			selection = me.getGrid().getSelectionModel(),
//			store = me.getGrid().getStore();
//
//		Ext.each(selection.selected.items, function (dept) {
//			me.getGrid().getStore().remove(dept);
//		});
//		store.sync();
//		this.RefreshRow;

		var grid = button.up('currencyGridList'),
			selections = grid.getSelectionModel().getSelection(),
			store = grid.getStore();


		if (selections[0] === undefined) {
			msgError('Pilih Record terlebih dahulu');
			return false;
		}

		Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus semua Record yang dipilih ? ', function (btn) {

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

	},
	RefreshRow: function () {
		this.getGrid().getStore().reload();
	}

});
