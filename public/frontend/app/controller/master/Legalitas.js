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
		}
		;
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
		var me = this,
			record = object.record,
			name = record.get('name'),
			grid = object.grid,
			store = grid.getStore();

		record.save({
			success: function (rec, opts) {
				App.util.box.info(rec.get('name') + ' Berhasil disimpan');
				store.load();
			},
			failure: function (rec, opts) {
				me.msgError('Ada Kesalahan , saat simpan ' + rec.get('name') + ' Silahkan Ulangi Kembali');
				store.load();
				return false;
			}
		})
	},
	msgError: function (text) {
		App.util.box.error(text);
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
		var me = this, grid = button.up('grid'),
			model = Ext.create('App.model.Legality',{name: ' '}),
			rowEditing = grid.getPlugin('cellEditorLegalitas');
		grid.getStore().insert(0, model);
		rowEditing.startEdit(0, 0);
	},
	Removerow: function (button) {
		var grid = button.up('masterlegalitasGridList'),
			selections = grid.getSelectionModel().getSelection(),
			store = grid.getStore();
		if (selections[0] === undefined) {
			this.msgError('Pilih Record Badan Hukum terlebih dahulu');
			return false;
		}

		Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus Badan Hukum yang dipilih ? ', function (btn) {
			if (btn == 'yes') {
				Ext.each(selections, function (rec, index, value) {
					rec.destroy({
						callback: function (records, ops, s) {
							if (ops.error) {
								App.util.box.error('Ada Record terpilih yang gagal dihapus');
							} else {
								App.util.box.info('Record terpilih berhasil dihapus');
							}
						}
					});
				});
				store.load();
			}
		});
	},
	renderGridList: function () {
		var me = this;
		me.getGrid().getStore().load();
	}

});
