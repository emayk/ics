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

Ext.define('App.view.pradjustment.form', {
	extend: 'Ext.form.Panel',
	title: 'Form Penyesuaian Pembelian',
	alias: 'widget.apppradjustmentvpradjustmentform',
	requires: [
		'App.form.combobox.cbSupplier',
		'App.store.combo.cbWarehouseStore'

	],
	bodyPadding: 10,
	config: {
		productname: undefined,
		currencyval: undefined,
		taxname: undefined,
		supname: undefined,
		delivery_at: undefined,
		warehousename: undefined,
		cpname: undefined,
		currname: undefined,
		paymenttypename: undefined,
		credit: undefined
	},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: { type: 'anchor', align: 'stretch'},
			autoScroll: true,
			flex: .5,
			items: [
				{xtype: 'hiddenfield', name: 'adjprid' },
				{ xtype: 'displayfield', name: 'trxnumber', fieldLabel: 'Nomor Transaksi' },
				/*Informasi Product*/
				{
					defaults: {
						anchor: '100%'
					},
					xtype: 'fieldset',
					title: 'Informasi Product ',
					collapsible: true,
					collapsed: true,
					labelWidth: 100,
					items: [

						{ xtype: 'displayfield', name: 'prodname', fieldLabel: 'Nama' },
						{ xtype: 'displayfield', name: 'prodcode', fieldLabel: 'Kode' },
						{ xtype: 'displayfield', name: 'catname', fieldLabel: 'Kategory' },
						{ xtype: 'displayfield', name: 'typename', fieldLabel: 'Jenis' },
						{ xtype: 'displayfield', name: 'produnit', fieldLabel: 'Satuan' },
						{ xtype: 'displayfield', name: 'qtypr', fieldLabel: 'Qty yg diajukan', renderer: App.util.box.rendererDisplayField }
					]
				},
				/*harga dan Qty*/
				{
					defaults: {
						anchor: '100%'
					},
					xtype: 'fieldset',
					itemId: 'priceandqty',
					title: 'Harga dan Quantity',
					collapsible: true,
					items: [
						{
							xtype: 'fieldcontainer',
							layout: { type: 'hbox', align: 'stretch'},
							fieldLabel: '',
							itemId: 'fccurrency',
							anchor: '100%',
							items: [
								{ xtype: 'cbcurrencies', fieldLabel: 'Mata Uang', name: 'currname', valueField: 'name', editable: false, flex: .9 },
								{ xtype: 'button', enableToggle: true, iconCls: 'key', margin: '0 0 0 5',
									listeners: {
										toggle: function (btn, pressed, opts) {
											var cb = btn.up('#fccurrency').down('cbcurrencies');
//											log(cbcurrency);
											/*Jika value belum ada setdisable = false*/
											/*Jika Belum ada record maka fire dari controller*/
//											log(me.getRecord());
											cb.setReadOnly(pressed);
											if (pressed) {
												var val = cb.getValue();
												/*check value sudah dipilih belum */
												if (!val) {
													/*Jika tidak ada value*/
													cb.setReadOnly(false);
												} else {
													/*Jika ada value*/
													me.setCurrencyval(val);
												}
											}

										}
									}
								}
							]
						},

						{
							xtype: 'fieldcontainer',
							layout: { type: 'hbox', align: 'stretch'},
							fieldLabel: '',
							itemId: 'fccbtypetax',
							anchor: '100%',
							items: [
								{ xtype: 'cbtypetax', fieldLabel: 'Jenis Pajak', name: 'taxname', valueField: 'name', editable: false, flex: .9  },
								{ xtype: 'button', enableToggle: true, iconCls: 'key', margin: '0 0 0 5',
									listeners: {
										toggle: function (btn, pressed, opts) {
											var cb = btn.up('#fccbtypetax').down('cbtypetax');
											cb.setReadOnly(pressed);
											if (pressed) {
												var val = cb.getValue();
												/*check value sudah dipilih belum */
												if (!val) {
													/*Jika tidak ada value*/
													cb.setReadOnly(false);
												} else {
													/*Jika ada value*/
													me.setTaxname(val);
												}
											}
										}
									}
								}
							]
						},


						{
							xtype: 'fieldcontainer',
							layout: { type: 'hbox', align: 'stretch'},
							fieldLabel: '',
							defaults: {
								labelAlign: 'top'
							},
							items: [
								{ xtype: 'displayfield', fieldLabel: 'Sub Total', name: 'subtotal',
									flex: .5,
									renderer: App.util.box.rendererDisplayField
								},
								{ xtype: 'displayfield', fieldLabel: 'Setelah DP', name: 'subtotalafterdp', flex: .5,
									renderer: App.util.box.rendererDisplayField
								}
							]
						},
						{ xtype: 'numberfield', fieldLabel: 'Kurs', name: 'rate', step: .1, minValue: 1, hideTrigger: true, enableKeyEvents: true},
						{ xtype: 'numberfield', fieldLabel: 'Qty Penyesuaian', name: 'qty', minValue: 0, hideTrigger: true, enableKeyEvents: true},
						{ xtype: 'numberfield', fieldLabel: 'Harga', name: 'price', minValue: 0, hideTrigger: true, enableKeyEvents: true},
						{ xtype: 'numberfield', fieldLabel: 'Down Payment(DP)', name: 'dp', minValue: 0, hideTrigger: true, enableKeyEvents: true}
					]
				},
				/*Pemasok dan Pengiriman*/
				{
					defaults: {
						anchor: '100%'
					},
					xtype: 'fieldset',
					title: 'Pemasok & Pengiriman',
					collapsible: true,
					items: [
						{
							xtype: 'fieldset',
							title: 'Pemasok',
							defaults: {
								anchor: '100%'
							},
							itemId: 'fdsupplier',
							items: [
								{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									fieldLabel: '',
									itemId: 'fccbSupplier',
									anchor: '100%',
									items: [
										{ xtype: 'cbSupplier', fieldLabel: 'Nama Pemasok', name: 'supname', valueField: 'name', editable: false, flex: .9,
											hiddenName: 'suppliername',
											listeners: {
												'select': {
													fn: function (combo, records, index) {
														var fieldset = combo.up('#fdsupplier');
														var cbContact = fieldset.down('cbContactperson');
														var txtcredit = fieldset.down('[name=credit]');
														var record = records[0];
														var valueterm = record.get('kredit');
														if (valueterm) me.setCredit(valueterm);
														txtcredit.setDisabled(true);
														txtcredit.setValue(valueterm);
														txtcredit.setDisabled(false);

														cbContact.setDisabled(true);
														cbContact.clearInvalid();
														cbContact.clearValue();
														var store = cbContact.getStore();
														store.clearFilter(true);
														store.removeAll();
														var proxy = store.getProxy();
														var val = combo.getValue();
														if (val) me.setSupname(val);
														proxy.setExtraParam('pname', val);
														proxy.setExtraParam('ptype', 'supplier');
														store.load();
														cbContact.setDisabled(false);
													}
												}
											}},
										{ xtype: 'button', enableToggle: true, iconCls: 'key', margin: '0 0 0 5',
											listeners: {
												toggle: function (btn, pressed, opts) {
													var cb = btn.up('#fccbSupplier').down('cbSupplier');
													cb.setReadOnly(pressed);
													if (pressed) {
														var val = cb.getValue();
														/*check value sudah dipilih belum */
														if (!val) {
															/*Jika tidak ada value*/
															cb.setReadOnly(false);
														} else {
															/*Jika ada value*/
															me.setSupname(val);

														}
													}
												}
											}
										}
									]
								},

								{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									fieldLabel: '',
									itemId: 'fccbContactperson',
									anchor: '100%',
									items: [
										{ xtype: 'cbContactperson', editable: false, fieldLabel: 'Nama Kontak', name: 'cpname', valueField: 'name', flex: .9  },
										{ xtype: 'button', enableToggle: true, iconCls: 'key', margin: '0 0 0 5',
											listeners: {
												toggle: function (btn, pressed, opts) {
													var cb = btn.up('#fccbContactperson').down('cbContactperson');
													cb.setReadOnly(pressed);
													if (pressed) {
														var val = cb.getValue();
														/*check value sudah dipilih belum */
														if (!val) {
															/*Jika tidak ada value*/
															cb.setReadOnly(false);
														} else {
															/*Jika ada value*/
															me.setCpname(val);
														}
													}
												}
											}
										}
									]
								},

								{ xtype: 'numberfield', fieldLabel: 'Jangka Waktu', name: 'credit', minValue: 0, hideTrigger: true },
								{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									fieldLabel: '',
									itemId: 'fccbTypePayment',
									anchor: '100%',
									items: [
//										{ xtype: 'cbContactperson', editable: false, fieldLabel: 'Nama Kontak', name: 'cpname', valueField: 'name' , flex: .8  },
										{ xtype: 'cbTypePayment', fieldLabel: 'Jenis Pembayaran', name: 'paymenttypename', valueField: 'name', editable: false, flex: .9  },
										{ xtype: 'button', enableToggle: true, iconCls: 'key', margin: '0 0 0 5',
											listeners: {
												toggle: function (btn, pressed, opts) {
													var cb = btn.up('#fccbTypePayment').down('cbTypePayment');
													cb.setReadOnly(pressed);
													if (pressed) {
														var val = cb.getValue();
														/*check value sudah dipilih belum */
														if (!val) {
															/*Jika tidak ada value*/
															cb.setReadOnly(false);
														} else {
															/*Jika ada value*/
															me.setPaymenttypename(val);
														}
													}
												}
											}
										}
									]
								}
							]
						},
						{
							xtype: 'fieldset',
							title: 'Pengiriman',
							defaults: {
								anchor: '100%'
							},
							items: [
								{ xtype: 'datefield', fieldLabel: 'Tanggal', name: 'delivery_at',
									format: 'd F Y', submitFormat: 'Y-m-d'
								},

								{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									fieldLabel: '',
									itemId: 'fccbwarehouse',
									anchor: '100%',
									items: [
										{ xtype: 'cbwarehouse', fieldLabel: 'Ke Gudang', name: 'warehousename', valueField: 'name', editable: false, editable: false, flex: .9 },
										{ xtype: 'button', enableToggle: true, iconCls: 'key',  margin: '0 0 0 5',
											listeners: {
												toggle: function (btn, pressed, opts) {
													var cb = btn.up('#fccbwarehouse').down('cbwarehouse');
													cb.setReadOnly(pressed);
													if (pressed) {
														var val = cb.getValue();
														/*check value sudah dipilih belum */
														if (!val) {
															/*Jika tidak ada value*/
															cb.setReadOnly(false);
														} else {
															/*Jika ada value*/
															me.setWarehousename(val);
														}
													}
												}
											}
										}
									]
								}
							]
						}
					]
				},
				/*Status*/
				{
					xtype: 'fieldcontainer',
					fieldLabel: 'Status',
					itemId: 'fcstatus',
					defaultType: 'radiofield',
					defaults: {
						flex: 1
					},
					layout: 'vbox',
					items: [
						{
							boxLabel: 'Sudah diproses',
							name: 'status',
							itemId: 'status5',
							inputValue: '5'
						},
						{
							boxLabel: 'Belum diproses',
							name: 'status',
							itemId: 'status1',
							inputValue: '1'
						},
						{
							boxLabel: 'Disetujui',
							name: 'status',
							itemId: 'status2',
							inputValue: '2'
						},
						{
							boxLabel: 'Ditolak',
							name: 'status',
							itemId: 'status3',
							inputValue: '3'
						},
						{
							boxLabel: 'Ditunda',
							name: 'status',
							inputValue: '4',
							itemId: 'status4'
						}
					]
				}
			],
			dockedItems: App.util.box.dockedItemsForm
		});
		me.callParent(arguments);
	}
});