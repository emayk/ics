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
 * terima = stock++
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
	store: 'App.store.receiveProduct.sreceiveProductItem',
	requires: [
		'App.form.combobox.cbSupplier'
	],
	config: {
		ponumber: undefined,
		tglpo: undefined,
		supname: undefined,
		warehouse: undefined,
		poid: undefined
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			buttons: [
				{ text: 'Help', iconCls: 'help', action: 'help'},
				'->',
				{ text: 'Save & Close', iconCls: 'save', action: 'save'},
				{ text: 'Cancel', iconCls: 'close', action: 'cancel'}
			],
			items: [
				{
					xtype: 'container',
					autoScroll: true,
					layout: {
						type: 'vbox', align: 'stretch'
					},
					items: [
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
												{ xtype: 'textfield', fieldLabel: '', name: 'sjno', flex: 0.5, readOnly: false },
												{
													flex: .5,
													xtype: 'datefield',
													labelWidth: 150,
													fieldLabel: 'Tanggal Surat Jalan',
													name: 'sjdate',
													value: new Date(),
													maxValue: new Date(), margin: '0 0 0 10'
												}
											]
										},
										{
											/*Surat Jalan*/
											xtype: 'fieldcontainer',
											labelWidth: 150,
											fieldLabel: 'Nama Supir',
											tooltip: 'Nama Supir dari Barang yang diterima',
											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{ xtype: 'textfield', fieldLabel: '', name: 'drivername', flex: 0.5, readOnly: false },
												{ xtype: 'textfield', fieldLabel: 'Nomor Kendaraan', name: 'platno', flex: 0.5, readOnly: false, margin: '0 0 0 10' }
											]
										}
									]
								},
								{ xtype: 'displayfield', fieldLabel: 'Nama Pemasok', name: 'supname', flex: .8, value: me.getSupname() },
								{
									/**
									 * Menampilkan No Order Yang Masih Open
									 */
									xtype: 'fieldcontainer',
									fieldLabel: 'Nomor PO',
									tooltip: 'Nomor Order',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{ xtype: 'textfield', fieldLabel: '', name: 'orderno', flex: 0.8, readOnly: true, value: me.getPonumber() },
										{ xtype: 'hiddenfield', fieldLabel: '', name: 'orderid', flex: 0.8, readOnly: true, value: me.getPoid() }
									]
								},
								{ xtype: 'datefield', fieldLabel: 'Terima Tanggal', labelWidth: 200, name: 'receivedate', value: new Date(), maxValue: new Date() },

							]
						},
						/*Grid daftar Barang Yang diterima*/
						{
							margin: '5 0 5 0',
							xtype: 'container',
							layout: 'fit',
							flex: 1,
							emptyText: 'Empty Item',
							items: [
								{
									/**
									 * Grid Receive List Product
									 */
									xtype: 'grid',
									title: 'Daftar Terima Barang dari PO [ ' + me.getPonumber() + ' ]',
									flex: 1,
									store: me.store,
									columns: [
										{
											xtype: 'rownumberer'
										},
//										{ dataIndex: "id", text: "id", flex: 1},
										{ dataIndex: "receiveid", text: "receiveid", flex: 1},
										{ dataIndex: "product_id", text: "Product", flex: 1},
										{ dataIndex: "qty", text: "Qty", flex: 1},
//										{ dataIndex: "price", text: "Price", flex: 1},
										{ dataIndex: "desc", text: "Description", flex: 1},
//										{ dataIndex: "subtotal", text: "subtotal", flex: 1}
//										{ dataIndex: "created_at", text: "created_at", flex: 1},
//										{ dataIndex: "updated_at", text: "updated_at", flex: 1}
									],
									dockedItems: [
										{
											xtype: 'toolbar',
											dock: 'top',
											items: [
												{ text: 'Tambah Terima Barang', iconCls: 'add', action: 'additem'}
//												{ text: 'Remove', iconCls: 'delete', action: 'removeitem'}
//												'->',
//												{ text: 'Help', iconCls: 'excel', action: 'helpitem'}
											]
										},
										{
											xtype: 'pagingtoolbar',
											store: me.store,
											dock: 'bottom',
											displayInfo: true
										}
									]
								}
							]
						},
//						{
//							xtype: 'splitter'
//						},
						{
							xtype: 'container',
							flex: .3,
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'container',
									flex: 0.5,
									html: '<b>Note : (sample) </b>' +
										'<ul>' +
										'<li>Aturan 1 : </li>' +
										'<li>Aturan 2 : </li>' +
										'</ul>'
								},
								{
									xtype: 'container',
									flex: 0.5,
									layout: 'anchor',
									defaults: {
										anchor: '95%'
									},
									items: [
										{ xtype: 'textfield', name: 'totalitem', readOnly: true, fieldLabel: 'Total Item'},
										{ xtype: 'textfield', name: 'totalqty', readOnly: true, fieldLabel: 'Total Qty'}
									]
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
