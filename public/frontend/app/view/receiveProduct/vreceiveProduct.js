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
								anchor: '95%'
							},
							itemId: 'formreceive',
							items: [
								{
									/**
									 * Menampilkan No Order Yang Masih Open
									 */
									xtype: 'fieldcontainer',
									fieldLabel: 'Order No ',
									tooltip: 'Order No status Open',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{ xtype: 'textfield', fieldLabel: '', name: 'orderno', flex: 0.8, readOnly: true },
										{ xtype: 'hiddenfield', fieldLabel: '', name: 'orderid', flex: 0.8, readOnly: true },
										{ xtype: 'button', itemId: 'selectorderid', text: 'Select', flex: 0.2, margin: '0 0 0 10' }
									]
								},
								{
									xtype: 'fieldset',
									title: 'Document From Supplier',
									items: [
										{
											/*Surat Jalan*/
											xtype: 'fieldcontainer',
											fieldLabel: 'Document Permit',
											tooltip: 'Surat Jalan dari Supplier',
											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{ xtype: 'textfield', fieldLabel: '', name: 'sjno', flex: 0.8, readOnly: false },
												{ xtype: 'button', itemId: 'getdoc', text: 'Get', flex: 0.2, margin: '0 0 0 10' }
											]
										},
										{
											xtype: 'datefield',
											fieldLabel: 'Permit Date',
											name: 'sjdate',
											value: new Date(),
											maxValue: new Date()
										}
									]
								},
								{
									xtype: 'datefield',
									fieldLabel: 'Receive Date',
									name: 'receivedate',
									value: new Date(),
									maxValue: new Date()
								},
								{
									xtype: 'fieldcontainer',
									anchor: '95%',
									layout: 'hbox',
									items: [
										{ xtype: 'cbSupplier', fieldLabel: 'Supplier', name: 'supplier_id', flex: .8},
										{
											xtype: 'button',
											margin: '0 0 0 10',
											text: '',
											iconCls: 'add',
											action: 'quickaddsupplier'
										}
									]
								}

							]
						},
//						{
//							xtype: 'splitter'
//						},
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
												{ text: 'Add', iconCls: 'add', action: 'additem'},
												{ text: 'Remove', iconCls: 'delete', action: 'removeitem'}
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
