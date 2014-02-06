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
	autoScroll: true,
	requires: [
		'App.form.combobox.cbSupplier',
		'App.form.combobox.cbWarehouse',
		'App.form.combobox.cbCurrencies',
		'App.form.combobox.cbTypeTax',
		'App.form.combobox.cbTypePayment',

		'App.view.PO.winPayment'
	],
	initComponent: function () {
		var me = this;
		var today = new Date();
		Ext.apply(me, {
			bodyPadding: 10,
			frame: true,
			defaults: {
				labelWidth: 100,
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
						labelWidth: 75,
						anchor: '95%'
					},
					layout: 'anchor',
					items: [
						/*Pilih Supplier*/
						{
							xtype: 'fieldcontainer',
							labelWidth: 100,
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
							labelWidth: 100,
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
								{ xtype: 'cbwarehouse', name: 'wh_id', fieldLabel: '', flex: 1, emptyText: 'Pilih Gudang'},
								{ xtype: 'button', text: '', iconCls: 'add', action: 'quickaddwarehouse', margin: '0 5 0 5'}
							]
						}
					]
				},

				{
					xtype: 'container', flex: .3,
					defaults: {
						labelAlign: 'left',
						labelWidth: 100,
						anchor: '95%'
					},
					layout: 'anchor',
					items: [
						{
							xtype: 'fieldcontainer',
							flex:.3,
							fieldLabel: 'Metoda Pembayaran',
							labelWidth: 90,
							layout: { type: 'hbox', pack: 'center'},
							items: [
								{ xtype: 'cbTypePayment', name: 'payment_id', fieldLabel: '', emptyText: 'Pilih Pembayaran',
									minWidth: 150,
										flex:1},
								{ xtype: 'button', text: '', iconCls: 'add', action: 'quickaddpayment', margin: '0 0 0 5'}
							]
						},
						{
							xtype: 'fieldcontainer',
							flex:.3,
							fieldLabel: 'Kredit (hari)',
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
							flex:.3,
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
						labelWidth: 100,
						anchor: '95%'
					},
					layout: 'anchor',
					items: [
						{ labelWidth: 100, xtype: 'datefield', name: 'deliverydate', fieldLabel: 'Tanggal Rencana Kirim', minValue: today, emptyText: 'Pilih Tanggal',flex:.95 },
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Jenis Pajak',

							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'cbtypetax', name: 'tax_id', fieldLabel: '', emptyText: 'Pilih Jenis Pajak',
									flex: .8},
								{ xtype: 'button', text: '', iconCls: 'add', action: 'quickaddtax', margin: '0 5 0 5'}
							]
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Mata Uang',

							layout: { type: 'hbox', align: 'stretch'},
							items: [
								/*@todo : Setiap perubahan pemilihan Mata Uang , Prefix mata DP berubah */
								{ xtype: 'cbcurrencies', name: 'currency_id', fieldLabel: '', emptyText: 'Pilih Mata Uang',
									flex: .8},
								{ xtype: 'button', text: '', iconCls: 'add', action: 'quickaddcurrency', margin: '0 5 0 5'}
							]
						}
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