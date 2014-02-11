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
	config: {
		storeproductreceive: Ext.create('Ext.data.Store', {
			fields: ['id', 'ponumber', 'tglpo', 'supname', 'tglkirim'],
			data: [
				{ id: 1, ponumber: 'PO-1234', supname: 'Supplier Name1234', tglpo: '12/12/2014', tglkirim: '22/12/2014'},
				{ id: 2, ponumber: 'PO-1235', supname: 'Supplier Name1235', tglpo: '12/12/2014', tglkirim: '12/12/2014'},
				{ id: 3, ponumber: 'PO-1236', supname: 'Supplier Name1236', tglpo: '12/12/2014', tglkirim: '23/12/2014'},
				{ id: 4, ponumber: 'PO-1237', supname: 'Supplier Name1237', tglpo: '12/12/2014', tglkirim: '24/12/2014'},
				{ id: 5, ponumber: 'PO-1238', supname: 'Supplier Name1238', tglpo: '12/12/2014', tglkirim: '25/12/2014'}
			]
		})
	},
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
													{ id: 2, name: 'No PO', value: 'ponumber' },
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
						/*Grid BPB */
						{
							flex: .9,
							xtype: 'grid',
							iconCls: 'grid',
							title: 'Daftar Bukti Penerimaan Barang',
							store: me.getStoreproductreceive(),
							columns: [
								{
									xtype: 'rownumberer'
								},
								{
									text: 'Nomor PO',
									dataIndex: 'ponumber',
									flex: 2
								},
								{
									text: 'Tanggal',
									dataIndex: 'tglpo',
									flex: 1
								},
								{
									text: 'Tanggal Kirim',
									dataIndex: 'tglkirim',
									flex: 1
								},
								{
									text: 'Nama Supplier',
									dataIndex: 'supname',
									flex: 3
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
//														Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
//															if (btn == 'yes') {
//																var rec = grid.getStore().getAt(rowIndex);
//																grid.getStore().remove(rec);
//																grid.getStore().sync();
//																grid.getStore().load();
//															}
//														});
											}
										}
									]
								}
							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar',
									dock: 'bottom',
									store: me.getStoreproductreceive()
								}
							]
						}
					]
				},
				{
					/*Cetak Bukti Terima Barang */
					title: 'Cetak Bukti',
					iconCls: 'print',
					xtype: 'container',
					items: [
						{
							xtype: 'panel',
							bodyPadding: 10,
							html: 'Cetak Bukti Terima Barang'
						}
					]
				},
				{
					/*Daftar Terima Barang*/
					title: 'Form Terima Barang[simulasi]',
					iconCls: 'form',
					closable: true,
					xtype: 'appreceiveProductvreceiveProduct',
					ponumber: 'APO 12233/1/2013',
					tglpo : '12/1/2013',
					supname : 'PT Kahatex',
					warehouse: 'KOPO',
					poid: 123
				}
			]
		});
		me.callParent(arguments);
	}
});