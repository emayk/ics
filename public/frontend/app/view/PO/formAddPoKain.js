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



Ext.define('App.view.PO.formAddPoKain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.formAddPoKain',
	requires: [
		'App.form.combobox.cbSupplier',
		'App.form.combobox.cbWarehouse',
		'App.form.combobox.cbCurrencies',
		'App.form.combobox.cbTypeTax',
		'App.form.combobox.cbTypePayment'
	],
	initComponent: function () {
		var me = this;
		var today = new Date();
		Ext.apply(me, {
			bodyPadding: 10,
			frame: true,
			defaults: {
				widthLabel: 150,
				flex: .3,
				anchor: '95%',
				labelAlign: 'left'
			},
			layout: { type: 'hbox', align: 'stretch'},
			items: [
				{
					xtype: 'container', flex: .3,
					defaults: {
						labelAlign: 'left',
						labelWidth: 100,
						anchor: '95%'
					},
					layout: 'anchor',
					items: [
						/*Pilih Supplier*/
						{
							xtype: 'fieldcontainer',
//													anchor: '100%',
							fieldLabel: 'Nama Pemasok',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'hiddenfield', name: 'supplier_id'},
								{ xtype: 'textfield', name: 'supplier_name', fieldLabel: '', flex: .8, readOnly: true,
									emptyText: 'Pilih Supplier'},
								{ xtype: 'button', text: '', iconCls: 'find', action: 'selectsupplier', margin: '0 5 0 5'}
							]
						},

						/*Contact Person*/
						/*
						 * Contact person tergantung pada supplier
						 * */

						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Kontak Person',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'hiddenfield', name: 'cp_id'},
								{ xtype: 'textfield', readOnly: true, fieldLabel: '', name: 'cp_name', flex: .8, readOnly: true,
									emptyText: 'Pilih Contact Person'
								},
								{ xtype: 'button', text: '', iconCls: 'find', action: 'selectcontact', margin: '0 5 0 5'}
							]
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Dikirim ke',
							labelWidth: 100,
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'cbwarehouse', name: 'wh_id', fieldLabel: '', flex: 1, emptyText: 'Pilih Gudang'}
							]
						}
					]
				},
				{
					xtype: 'container', flex: .3,
					defaults: {
						labelAlign: 'left',
						labelWidth: 150,
						anchor: '95%'
					},
					layout: 'anchor',
					items: [
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Metoda Pembayaran',

							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'cbTypePayment', name: 'payment_id', fieldLabel: '',emptyText: 'Pilih Pembayaran',
									flex: .8},
							]
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Kredit',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'numberfield', name: 'kredit', fieldLabel: '', flex: .5,
									value: 1, step: 10000,
									minValue: 0,
									hideTrigger: true,
									keyNavEnabled: true,
									anchor: '50%'
								}
							]
						},
						{
							/*Selalu Default 1 */
							xtype: 'fieldcontainer',
							fieldLabel: 'Kurs',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'numberfield', name: 'rate', fieldLabel: '', flex: .5,
									value: 1, step: .1,
									minValue: 0,
									hideTrigger: true,
									anchor: '50%',
									keyNavEnabled: true}

							]
						}
					]
				},
				{
					xtype: 'container', flex: .3,
					defaults: {
						labelAlign: 'left',
						labelWidth: 150,
						anchor: '95%'
					},
					layout: 'anchor',
					items: [
						{ xtype: 'datefield', name: 'deliverydate', fieldLabel: 'Tanggal Rencana Kirim', minValue: today, emptyText: 'Pilih Tanggal' },
						{ xtype: 'cbtypetax', name: 'tax_id', fieldLabel: 'Jenis Pajak', emptyText: 'Pilih Jenis Pajak' },
						/*@todo : Setiap perubahan pemilihan Mata Uang , Prefix mata DP berubah */
						{ xtype: 'cbcurrencies', name: 'currency_id', fieldLabel: 'Mata Uang', emptyText: 'Pilih Mata Uang' }
					]
				}
			],
			buttons: [
				{
					text: 'Help', action: 'help', iconCls: 'help'
				},
				'->',
				{
					text: 'Cari Product', action: 'selectproduct', iconCls: 'find'
				}
			]
		});
		me.callParent(arguments);
	}
});