/**
 * Controller
 * Master Legalitas
 *
 *
 * @author : Emay K
 */
Ext.define('App.controller.master.Legalitas', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.master.legalitas.List',
		'App.view.master.legalitas.Edit'
	],
	models: ['App.model.Legality'],
	stores: ['App.store.Legalitas'],
	/*==========  Referensi  ==========*/

	refs: [
		{
			ref: 'grid',
			selector: 'masterlegalitasGridList'
		}
	],
	/*==========  Inisialisasi  ==========*/

	init: function () {
		var me = this;
		log('Legalitas Controller Init');
		this.control({
			/**
			 * Proses Pada Grid List Legalitas
			 */
			'masterlegalitasGridList': {
				/**
				 * Proses Edit
				 */
				edit: me.processEdit,
				render: me.renderGridList,
				/**
				 * Saat Pemilihan Record Berubah
				 */
				selectionchange: this.processSelectionChange
//                canceledit: function () {
//                    var store = this.getGrid().getStore();
//                    cancelEdit(store, this);
//                }
			},
			/**
			 * Tombol Add Ditekan
			 */
			'masterlegalitasGridList > toolbar > button[action=add]': {
				click: me.Addrow
			},
			/**
			 * Tombol remove ditekan
			 */
			'masterlegalitasGridList > toolbar > button[action=remove]': {
				click: me.Removerow
			},

			'legalitasEdit [action=save]': {
				click: me.addNewRecord
			},
			'legalitasEdit [action=save]': {
				click: me.addNewRecord
			}
		});

	},
	/**
	 * Simpan Record Legalitas
	 * @param btn
	 */
	addNewRecord: function (btn) {
		/*get record*/
		var form = btn.up('legalitasEdit').down('form').getForm(),
			win = btn.up('window'),
			record = form.getRecord(),
			values = form.getValues();

		if (!form.isValid()) {
			App.util.box.error('Silahkan Perbaiki Masukan ');
			return false;
		};
			if (!record) {
				record = Ext.create('App.model.Legality', values);
			} else {
				record.set(values);
			}
			record.save({
				success: function (rec, opts) {
					App.util.box.info(rec.get('name') + ' Berhasil disimpan');
					win.close();
				},
				failure: function (rec, opts) {
					App.util.box.error('Tidak Bisa Simpan,Silahkan coba lagi');
				}
			})

	},
	processEdit: function (editor, object) {
		log('Save Process');
		object.store.save();
		object.store.load();
	},
	processSelectionChange: function (current, selections) {
		log('selection change');
		var me = this , grid = me.getGrid();
		grid.down('button[action=remove]').setDisabled(selections.length == 0);
	},
	/**
	 * Saat Tombol Add Record
	 * @param button
	 * @constructor
	 */
	Addrow: function (button) {
		var me = this, grid = me.getGrid(),
			model = Ext.create('App.model.Legality'),
			rowEditing = grid.getPlugin('cellEditorLegalitas');
		grid.getStore().insert(0, model);
		rowEditing.startEdit(0, 0);
	},
	Removerow: function (button) {
		log('Remove');
		var me = this, grid = me.getGrid(),
			selection = grid.getSelectionModel();
		Ext.each(selection.selected.items, function (dept) {
			grid.getStore().remove(dept);
		});
		grid.getStore().sync();
		grid.getStore().load();
	},
	renderGridList: function () {
		var me = this;
		me.getGrid().getStore().load();
	}

});
