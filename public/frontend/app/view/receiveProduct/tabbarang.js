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

/** Terdiri dari Daftar
 * Terima Barang
 * Cetak Bukti
 **/

Ext.define('App.view.receiveProduct.tabbarang', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.appreceiveProductvtabbarang',
	requires: [
		'App.view.receiveProduct.vreceiveProduct'
	],
	store: 'App.store.receiveProduct.sreceiveProduct',
	padding: 10,
	frame: true,
	title: 'Terima Barang',
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			activeTab: 2,
			items: [
				{
					xtype: 'container',
					layout: { type: 'vbox', align: 'stretch'},
					title: 'Daftar Penerimaan Barang ',
					iconCls: 'tab',
					items: [
					/**
					 * Form Pencarian Penerimaan Barang
					 */
						{
							margin: '5 0 5 0',
							iconCls: 'form',
							title: 'Form Pencarian Penerimaan Barang',
							bodyPadding: 5,
							xtype: 'form',
							itemId: 'search',
							layout: 'anchor',
							items: [
								{
									xtype: 'fieldcontainer',
									anchor: '95%',
									frame: false,
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{
											xtype: 'combobox',
											store: Ext.create('Ext.data.Store', {
												fields: ['id', 'name', 'value'],
												data: [
													{ id: 1, name: 'Nama Pemasok', value: 'supname' },
													{ id: 2, name: 'No PO', value: 'ponumber' }
												]
											}),
											fieldLabel: 'Cari Berdasarkan',
											name: 'searchby',
											queryMode: 'local',
											displayField: 'name',
											valueField: 'value',
											value: 'supname',
											forceSelection: true,
											editable: false
										},
										{
											xtype: 'textfield',
											emptyText: 'Ketik disini', anchor: '70%',
											name: 'valsearch'
										},
										{
											xtype: 'button',
											iconCls: 'find',
											action: 'searchpo',
											handler: function (btn) {
												var form = btn.up('form').getForm(),
													val = form.getValues();
												log(val);
												/*@todo : setup extra param proxy store grid*/
											}
										}
									]
								}
							]
						},
					/**
					 * Grid List Penerimaan Barang
					 * Yang Belum diCetak
					 */
						{
							flex: .9,
							xtype: 'grid',
							iconCls: 'grid',
							itemId: 'gridreceivegood',
							title: 'Daftar Bukti Penerimaan Barang',
							store: me.store,
							defaults: {
								flex: 1
							},
							columns: [
								{
									xtype: 'rownumberer'
								},
								{
									text: 'Purchase Order',
									columns: [
										{
											text: 'Nomor PO',
											dataIndex: 'ponumber',
											flex: 1
										},
										{
											text: 'Tanggal<br/>Buat',
											dataIndex: 'podate',
											xtype: 'datecolumn', format: 'd F Y'
										}
									]
								},
								{
									text: 'Pemasok',
									columns: [
										{
											text: 'Nama',
											dataIndex: 'supplier'

										},
										{
											text: 'Kontak',
											dataIndex: 'contact'
										}
									]
								},
								{
									text: 'Jumlah <br/>Barang',
									dataIndex: 'totalorderitem'
								},
								{
									text: 'Gudang',
									dataIndex: 'warehouse'
								},
								{
									header: 'Proses',
									xtype: 'actioncolumn',
									width: 40,
									items: [
										{
											iconCls: 'forward',
											tooltip: 'Proses PO',
											handler: function (grid, rowIndex, colIndex) {
												var rec = grid.getStore().getAt(rowIndex);
												log(rec);
												var tab = grid.up('appreceiveProductvtabbarang');
												var title = 'Form Terima Barang [ PO : ' + rec.get('ponumber') + ' ]',
													config = {
														iconCls: 'form',
														title: title,
														closable: true,
														receivenumber: rec.get('receivenumber'),
														receiveid: rec.get('id'),
														ponumber: rec.get('ponumber'),
														tglpo: rec.get('podate'),
														supname: rec.get('supplier'),
														warehouse: rec.get('warehouse'),
														record: rec,
														store: Ext.create('App.store.receiveProduct.sreceiveProductItem'),
														storePrintItem: Ext.create('App.store.receiveProduct.sprintProductItem')
													};
												App.util.box.openNewtab(tab, title, 'App.view.receiveProduct.vreceiveProduct', config);
											}
										}
									]
								}
							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar',
									dock: 'bottom',
									store: me.store
								}
							]
						}
					]
				}
//				{
//					/*Cetak Bukti Terima Barang */
//					title: 'Cetak Bukti',
//					iconCls: 'print',
//					xtype: 'container',
//					items: [
//						{
//							xtype: 'panel',
//							bodyPadding: 10,
//							html: 'Cetak Bukti Terima Barang'
//						}
//					]
//				}
//				{
//					/*Daftar Terima Barang*/
//					title: 'Form Terima Barang[simulasi]',
//					iconCls: 'form',
//					closable: true,
//					xtype: 'appreceiveProductvreceiveProduct',
//					ponumber: 'APO 12233/1/2013',
//					tglpo: '12/1/2013',
//					supname: 'PT Kahatex',
//					warehouse: 'KOPO',
//					poid: 123
//				}
			]
		});
		me.callParent(arguments);
		me.down('#gridreceivegood').getStore().load();
	}
});