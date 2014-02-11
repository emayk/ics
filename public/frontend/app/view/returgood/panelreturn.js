/**
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
 **/

Ext.define('App.view.returgood.panelreturn', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appreturgoodvpanelreturgood',
	config: {
		title: 'Informasi Retur Barang',
		ponumber: '1234',
		bpbnumber: 'BPB-00012',
		tglpo: '21/12/2014',
		tglbpb: '22/12/2014',
		supname: 'PT Mutiara Garmen',
		storereturn: Ext.create('Ext.data.Store', {
			model : 'App.model.returgood.mreturgood',
			proxy: {
				type: 'memory'
			}
		})
	},
	iconCls: 'add',
	closable: true,
	layout: { type: 'vbox', align: 'stretch'},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'form',
					bodyPadding: 10,
					title: 'Form Penambahan Retur Barang',
					items: [
						{
							xtype: 'fieldset',
							title: 'Informasi Retur Barang',
							items:[
								{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{ xtype: 'displayfield', name: 'ponumber',fieldLabel:'Nomor PO',value: me.getPonumber() ,margin : '0 5 0 0',flex:.3},
										{ xtype: 'displayfield', name: 'tglpo',fieldLabel:'Tanggal PO',value: me.getTglpo(),margin : '0 5 0 5' ,flex:.3},
										{ xtype: 'displayfield', name: 'supname',fieldLabel:'Nama Supplier',value: me.getSupname(),flex:.3}
									]
								},{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{ xtype: 'displayfield', name: 'bpbnumber',fieldLabel:'Nomor BPB',value: me.getBpbnumber() ,margin : '0 5 0 0',flex:.3},
										{ xtype: 'displayfield', name: 'tglbpb',fieldLabel:'Tanggal BPB',value: me.getTglbpb(),margin : '0 0 0 5' ,flex:.3},
										{ xtype: 'displayfield', name: 'datecreate',flex:.3 }
									]
								}
							]
						},
						{ xtype: 'textfield', name: 'nomorcorak', fieldLabel: 'Nomor Corak' },
						{ xtype: 'textfield', name: 'warna', fieldLabel: 'Warna' },
						{ xtype: 'textfield', name: 'unit', fieldLabel: 'Satuan' },
						{ xtype: 'textfield', name: 'noroll', fieldLabel: 'Nomor Roll' },
						{ xtype: 'numberfield', hiddenTrigger: true, minValue: 0, step: 1, value:0, name: 'qty', fieldLabel: 'Quantity' }
					],
					dockedItems: [
						{
							xtype: 'toolbar', dock: 'bottom',
							items: [
								{ text: translations.help, action: 'help', iconCls: 'help'},
								'->',
								{ text: 'Tambah Baru', action: 'addnew', iconCls: 'add',
									handler: function (btn) {
										var f = btn.up('form');
										var form = f.getForm();
										var grid = btn.up('appreturgoodvpanelreturgood').down('grid');
										var store = grid.getStore();
										var values = form.getValues();
										if (parseFloat(values.qty) == 0 ){
											App.util.box.error('Qty barang tidak boleh 0 ');
											return false;
										}

										var model = Ext.create('App.model.returgood.mreturgood',values);
										var validate = model.validate();
										if (!validate.isValid()){
											App.util.box.error('Maaf sepertinya ada Inputan yang salah, Silahkan dilengkapi ');
											return false;
										}
										store.add(model);
										/*clear value*/
										f.down('[name=noroll]').setValue('');
										f.down('[name=qty]').setValue(0);

									}

								},
								{ text: 'Reset', action: 'reset', iconCls: 'reset',
									handler:function(btn){
										var f = btn.up('form');
										/*clear value*/
										f.down('[name=nomorcorak]').setValue('');
										f.down('[name=warna]').setValue('');
										f.down('[name=unit]').setValue('');
										f.down('[name=noroll]').setValue('');
										f.down('[name=qty]').setValue(0);
									}
								}
							]
						}
					]
				},
				{
					xtype: 'container',
					flex: 1,
					layout: { type: 'fit', align: 'stretch' },
					items: [
						{
							margin: '10 0 0 0',
							title: 'Daftar Barang Retur',
							xtype: 'grid',
							columns: [
								{ xtype: 'rownumberer', text: '#'},
								{ text: 'Nomor Corak', dataIndex: 'nomorcorak'},
								{ text: 'Warna', dataIndex: 'warna'},
								{ text: 'Roll', dataIndex: 'noroll'},
								{ text: 'Qty', dataIndex: 'qty'},
								{ text: 'Satuan', dataIndex: 'unit'},
								{
									header: 'Aksi',
									xtype: 'actioncolumn',
									width: 40,
									items: [
										{
											iconCls: 'delete',
											tooltip: 'Delete',
											handler: function (grid, rowIndex, colIndex) {
												Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin Akan Menghapus Record Return ini ?', function (btn, text) {
													if (btn == 'yes') {
														var rec = grid.getStore().getAt(rowIndex);
//														grid.getStore().remove(rec);
//														grid.getStore().sync();
//														grid.getStore().load();
													}
												});
											}
										}
									]
								}
							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar',
									dock: 'bottom',
									displayInfo: true
								}
							]
						}
					]
				}

			]
		});
		me.callParent(arguments);
	}
});