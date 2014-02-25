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
		productname: undefined
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
						{ xtype: 'cbcurrencies', fieldLabel: 'Mata Uang', name: 'currname', valueField: 'name', editable: false },
						{ xtype: 'cbtypetax', fieldLabel: 'Jenis Pajak', name: 'taxname', valueField: 'name', editable: false },
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
							items: [
								{ xtype: 'cbSupplier', fieldLabel: 'Nama Pemasok', name: 'supname', valueField: 'name',
									hiddenName: 'suppliername',
									listeners: {
										'select': {
											fn: function (combo, records, index) {
												var fieldset = combo.up('fieldset');
												var cbContact = fieldset.down('cbContactperson');
												var txtcredit = fieldset.down('[name=credit]');
												var record = records[0];
												txtcredit.setDisabled(true);
												txtcredit.setValue(record.get('kredit'));
												txtcredit.setDisabled(false);
												cbContact.setDisabled(true);
												cbContact.clearInvalid()
												cbContact.clearValue();
												var store = cbContact.getStore();
												store.clearFilter(true);
												store.removeAll();
												var proxy = store.getProxy();
												var val = combo.getValue();
												proxy.setExtraParam('pname', val);
												proxy.setExtraParam('ptype', 'supplier');
												store.load();
												cbContact.setDisabled(false);

											}
										}
									}},
								{ xtype: 'cbContactperson', editable: false, fieldLabel: 'Nama Kontak', name: 'cpname', valueField: 'name' },
								{ xtype: 'numberfield', fieldLabel: 'Jangka Waktu', name: 'credit', minValue: 0, hideTrigger: true },
								{ xtype: 'cbTypePayment', fieldLabel: 'Jenis Pembayaran', name: 'paymenttypename', valueField: 'name' }
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
								{ xtype: 'cbwarehouse', fieldLabel: 'Ke Gudang', name: 'warehousename',
									valueField: 'name'
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