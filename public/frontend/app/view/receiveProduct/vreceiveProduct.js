/**
 * View receiveProduct
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

/**
 * Menampilkan Tab Penerimaan Barang
 * dari supplier
 *
 * Flow :
 * penerimaan barang ini akan mempengaruhi ke banyaknya stock
 * terima = stock++ setelah Print akan menambahkan Stock Product
 *
 *
 */
Ext.define('App.view.receiveProduct.vreceiveProduct', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appreceiveProductvreceiveProduct',
	padding: 10,
	frame: true,
	autoScroll: true,
	layout: { type: 'fit', align: 'stretch'},
	config: {
		receiveid: undefined,
		receivenumber: undefined,
		ponumber: undefined,
		supplier: undefined,
		warehouse: undefined
	},
	record: undefined,
	getRecord: function () {
		return this.record;
	},
	getMaxTerima: function () {
		var record = this.getRecord();
		return record.get('qtyelapse');
	},
	initComponent: function () {
		var me = this;
		var store = Ext.create('App.store.receiveProduct.sreceiveProductItem');
		var storeprintItem = Ext.create('App.store.receiveProduct.sprintProductItem');
		Ext.apply(me, {
			buttons: [
				{ text: 'Help', iconCls: 'help', action: 'help'},
				'->',
				{ text: 'Simpan & Keluar ', iconCls: 'save', action: 'save'},
				{ text: 'Keluar', iconCls: 'close', action: 'cancel'}
			],
			items: [
				{
					xtype: 'container',
					autoScroll: true,
					layout: {
						type: 'vbox', align: 'stretch'
					},
					items: [
					/**
					 * Form Surat Jalan
					 * */
						{
							xtype: 'form',
							autoScroll: true,
							bodyPadding: 10,
							defaults: {
								anchor: '95%',
								labelWidth: 200
							},
							itemId: 'formreceive',
							items: [

								/*Dokument dari Pemasok*/
								{
									xtype: 'fieldset',
									title: 'Dokument dari Supplier/Pemasok',
									items: [
										{
											/*Surat Jalan*/
											xtype: 'fieldcontainer',
											labelWidth: 150,
											fieldLabel: 'Surat Jalan',
											tooltip: 'Surat Jalan dari Supplier',
											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{ xtype: 'textfield', fieldLabel: '', name: 'sjno', flex: 0.5, allowblank: false, minLengthText: 2 },
												{
													flex: .5,
													xtype: 'datefield',
													labelWidth: 150, allowblank: false,
													fieldLabel: 'Tanggal Surat Jalan',
													name: 'sjtgl', format: 'd F Y',
													margin: '0 0 0 10', submitFormat: 'Y-m-d'
												}
											]
										},
										{
											/**
											 * Supir, Plat Nomor
											 * */
											xtype: 'fieldcontainer',
											labelWidth: 150,
											fieldLabel: 'Nama Supir',
											tooltip: 'Nama Supir dari Barang yang diterima',
											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{ xtype: 'textfield', fieldLabel: '', name: 'drivername', flex: 0.5, readOnly: false },
												{ xtype: 'textfield', fieldLabel: 'Nomor Kendaraan', name: 'vehiclenumber', flex: 0.5, readOnly: false, margin: '0 0 0 10' }
											]
										}
									]
								},
								{
									/**
									 * Menampilkan Informasi No PO
									 */
									xtype: 'fieldcontainer',
									fieldLabel: '',
									tooltip: 'Informasi Order',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{ xtype: 'displayfield', fieldLabel: 'Nama Pemasok', name: 'supplier', flex: .25, tooltip: 'Pemasok'},
										{ xtype: 'displayfield', fieldLabel: 'Nama Contact', name: 'contact', flex: 0.25, readOnly: true, tooltip: 'Kontak', margin: '0 5 0 5'},
										{ xtype: 'displayfield', fieldLabel: 'Nomor PO', name: 'ponumber', flex: 0.25, readOnly: true, tooltip: 'Nomor Order' }
									]
								},
							/**
							 * Tanggal Terima Barang
							 */
								{ xtype: 'datefield', fieldLabel: 'Terima Tanggal', labelWidth: 200, name: 'receivedate',
									format: 'd F Y', allowBlank: false,
									submitFormat: 'Y-m-d'
								}
							]
						},
					/**
					 * Splitter
					 * */
						{
							xtype: 'splitter'
						},
					/**
					 * Tab daftar Barang Yang diterima
					 * */
						{
							margin: '5 0 5 0',
							xtype: 'tabpanel',
							layout: 'fit',
							flex: 1,
							emptyText: 'Empty Item',
							items: [
							/**
							 * Grid Receive Item
							 */
								{
									/**
									 * Grid Receive List Product
									 */
									itemId: 'gridreceiveitem',
									xtype: 'grid',
									iconCls: 'grid',
									title: 'Daftar Terima Barang dari PO [ ' + me.getPonumber() + ' ]',
									flex: 1,
									store: store,
									selType: 'rowmodel',
									columns: [
										{
											xtype: 'rownumberer', text: 'No'
										},
										{ dataIndex: "productname", text: "Product", flex: 1
//											renderer: function (v, m, r) {
//												return r.get('product');
//											}
										},
										{
											text: 'Quantity',
											columns: [
												{ dataIndex: 'qtyorder', text: 'Pesan', xtype: 'numbercolumn' },
												{
													text: 'Terima',
													columns: [
														{ dataIndex: 'qtyreceived', text: 'Sdh', xtype: 'numbercolumn' },
														{ dataIndex: 'qtyelapse', text: 'Belum', xtype: 'numbercolumn' },
														{ dataIndex: "totalrollreceived", text: 'Roll', xtype: 'numbercolumn' }
													]
												},
												{
													text: "Jumlah Terima<br/>Saat Ini",
													columns: [
														{
															dataIndex: "qty",
															text: 'Qty(Yard)',
															/*Jumlah Terima Harus Max Jumlah Sisa*/
															minValue: 0,
															editor: {
																xtype: 'numberfield',
																allowblank: false,
																minValue: 0,
																enableKeyEvents: true
															}
														},
														{
															dataIndex: "qtyroll",
															text: 'Qty(Roll)',
															/*Jumlah Terima Harus Max Jumlah Sisa*/
															minValue: 0,
															editor: {
																xtype: 'numberfield',
																allowblank: false,
																minValue: 0,
																enableKeyEvents: true
															}
														}
													]
												},
											]
										},
										{ dataIndex: "desc", text: "Description", flex: 1,
											editor: {
												maxLengthText: 100,
												allowblank: true,
												xtype: 'textfield'
											}}
									],
									plugins: [
										Ext.create('Ext.grid.plugin.RowEditing', {
											clicksToEdit: 1
										})
									],
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											store: store,
											dock: 'bottom',
											displayInfo: true
										}
									]
								},
							/**
							 * Tab Print History
							 */
								{
									/**
									 * Grid Print History Item
									 */
									itemId: 'printHistoryItem',
									xtype: 'appreceiveProductvreceiveProductprinthistory'
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
		me.setupGridReceiveItem();
	},
	setupGridReceiveItem: function () {
		var me = this;
		var grid = me.down('#gridreceiveitem');
		if (grid) {
			var store = grid.getStore();
			if (store) {
				var proxy = store.getProxy()
				proxy.setExtraParam('receiveid', me.getReceiveid());
				proxy.setExtraParam('receivenumber', me.getReceivenumber());
				proxy.setExtraParam('cmd', 'getitems');
				proxy.setExtraParam('option', 'wosale'); //tanpa harga
			}
			store.load();
		}

		var record = me.getRecord();
		if (record) {
			var form = me.down('#formreceive');
			/*Load Record*/
			if (form) {
				form.getForm().loadRecord(record);
			}
			/*Value Qty dan Total Item terima*/
			var contfooter = me.down('#contfooter');
			if (contfooter) {
				var totalItemToday = contfooter.down('[name=totalitem]'),
					totalQtyToday = contfooter.down('[name=totalqty]');
				totalItemToday.setValue(0);
				totalQtyToday.setValue(0);
			}
		}

	}

});
