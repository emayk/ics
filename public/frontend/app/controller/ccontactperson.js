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

Ext.define('App.controller.ccontactperson', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.contactperson.vcontactperson',
		'App.view.contactperson.winForm'
	],
	models: ['App.model.contactperson.mcontactperson'],
	stores: ['App.store.contactperson.scontactperson',
		'App.store.combo.cbDept',
		'App.store.combo.cbPosition'
	],
	refs: [
		{
			ref: 'panelcontacts',
			selector: 'appcontactpersonvcontactperson'
		},
		{
			ref: 'gridcontacts',
			selector: 'appcontactpersonvcontactperson grid#listcontacts'
		}
	],
	init: function () {
		var me = this;
		me.control({
			/*Main Panel Contact Person*/
			'appcontactpersonvcontactperson': {
			},
			/**
			 * Grid Contact Person
			 */
			'appcontactpersonvcontactperson grid#listcontacts': {
				/*Menampilkan sesuai dengan parameter*/
				render: function (grid) {
					var panel = grid.up('appcontactpersonvcontactperson'),
						id = panel.getParentId(),
						name = panel.getParentName(),
						type = panel.getParenttype();

					if ((!id) || (!name) || (!type)) {
						App.util.box.error('Required Parameter');
						return false;
					}
					var store = grid.getStore(),
						proxy = store.getProxy();

					store.clearFilter();
					store.removeAll();
					proxy.setExtraParam('parent_id', id);
					proxy.setExtraParam('parenttype', type);

					store.load();
				},
				itemdblclick: function (grid, record, item, index, e, eOpts) {
					log('Double Click');
					log(grid, record);

					/*Show Window and Load Record*/
					var win,
						panel = grid.up('appcontactpersonvcontactperson'),
						idparent = panel.getParentId(),
						type = panel.getParenttype(),
						name = panel.getParentName();

					if (!win) {
						win = Ext.create('App.view.contactperson.winForm', {
							modal: true,
							title: translations.information + ' Contact ' + record.get('name'),
							parentId: idparent,
							parenttype: type,
							parentName: name,
							isnewrecord: false
						});

						var form = win.down('form').getForm();
						win.down('form').getForm().loadRecord(record);
						var cbdept = win.down('form cbdept');
						var deptid = record.get('dept_id');

						cbdept.getStore().load({
							params: {
								id: deptid,
								idselected: deptid
							}
						});


						var cbpos = win.down('[name=pos_id]');
						var posid = record.get('pos_id');

						cbpos.getStore().load({
							params: {
								id: posid,
								idselected: posid
							}
						});

						win.show();
					}
				}
			},
			/**
			 * Tambah Record
			 */
			'appcontactpersonvcontactperson grid#listcontacts [action=add]': {
				click: function (btn) {
					/*Penambahan Record Contact Person*/
					var panel = btn.up('appcontactpersonvcontactperson');
					log('Penambahan Record Contact Person Untuk ' + panel.getParentName());
					/*Buat Window Contact Person */
					var win,
						panel = btn.up('appcontactpersonvcontactperson'),
						idparent = panel.getParentId(),
						type = panel.getParenttype(),
						name = panel.getParentName();

					if (!win) {
						win = Ext.create('App.view.contactperson.winForm', {
							modal: true,
							/*@todo: translate */
							title: 'Kontak baru',
							parentId: idparent,
							parenttype: type,
							parentName: name,
							isnewrecord: true
						});
						win.show();
					}

				}
			},
			/**
			 * Remove Record
			 */
			'appcontactpersonvcontactperson grid#listcontacts [action=remove]': {
				click: function (btn) {
					var grid = btn.up('grid'),
						panel = btn.up('appcontactpersonvcontactperson'),
						idparent = panel.getParentId(),
						type = panel.getParenttype(),
						selections = grid.getSelectionModel().getSelection(),
						store = grid.getStore();
					if (selections[0] === undefined) {
						this.msgError('Pilih Record Kontak terlebih dahulu');
						return false;
					}

					Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan menghapus semua record kontak yang dipilih ? ', function (btn) {
						if (btn == 'yes') {
							Ext.each(selections, function (rec, index, value) {
								rec.destroy({
									params: {
										parent_id: idparent,
										parenttype: type
									},
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
			/**
			 * Import Record
			 */
			'appcontactpersonvcontactperson grid#listcontacts [action=import]': {
				click: function (btn) {
					belumImplement();
				}
			},
			/**
			 * Export Record
			 */
			'appcontactpersonvcontactperson grid#listcontacts [action=export]': {
				click: function (btn) {
					belumImplement();
				}
			},
			/**
			 * Help Record
			 */
			'appcontactpersonvcontactperson grid#listcontacts [action=help]': {
				click: function (btn) {
					belumImplement();
				}
			},

			/**
			 * Window Form Contact
			 */
			'appcontactpersonwinform': {

				afterrender: function (win, opts) {


//					log('After Render', win);
				}
			},
			'appcontactpersonwinform [action=help]': {
				click: function (btn) {
					belumImplement();
				}
			},
			'appcontactpersonwinform [action=close]': {
				click: function (btn) {
					btn.up('window').close();
				}
			},
			'appcontactpersonwinform [action=addorsave]': {
				click: function (btn) {
					var win = btn.up('window'),
						form = win.down('form').getForm(),
						record = form.getRecord(),
						msgmode ,
						values = form.getValues();
					/*Check Record Ada ?*/
					if (!record) {
						record = Ext.create('App.model.contactperson.mcontactperson', values);
						msgmode = 'buat';
					} else {
						record.set(values);
						msgmode = 'update';
					}

					record.save({
						params: {
							parent_id: values.parent_id,
							parenttype: values.parenttype
						},
						success: function (rec, o) {
							App.util.box.info(rec.get('name') + ' berhasil di ' + msgmode);
							win.close();
						},
						failure: function (rec, o) {
							App.util.box.error('Ada Kesalahan dalam proses penyimpanan ke server, silahkan coba lagi');
							return false;
						}
					});
				}
			}
		});
	}
});

