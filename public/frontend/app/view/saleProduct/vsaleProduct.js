/**
 * View saleProduct
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
Ext.define('App.view.saleProduct.vsaleProduct', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appsaleProductvsaleProduct',
	padding: 10,
	layout: {type: 'vbox', align: 'stretch'},
	frame: true,
	requires: [
		'App.form.combobox.cbBuyer',
		'App.form.combobox.cbProduct'
	],
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			items: [
				{
					xtype: 'container', flex: .2,
					itemId: 'panelform',
					layout: { type: 'hbox', align: 'stretch' },
					items: [
						{
							xtype: 'form',
							itemId: 'formsale',
							flex: 8,
							bodyPadding: 5,
							defaults: {
								anchor: '95%'
							},
							items: [
								{
									xtype: 'textfield',
									readOnly: true,
									fieldLabel: 'Document Sale',
									name: 'ref'
								},{
									xtype: 'datefield',
									fieldLabel: 'Date',
									name: 'saledate',
									value : new Date()
								},
								{
									xtype: 'fieldcontainer',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{
											xtype: 'cbBuyer',
											fieldLabel: 'Buyer',
											flex: 0.8,
											name: 'buyer_id',
											allowblank:false
										},
										{
											/*Button Add Buyer */
											margin: '0 0 0 5',
											xtype: 'button',
											action: 'addbuyer',
											text: 'Buyer',
											iconCls: 'add',
											itemId: 'addbuyer'
										}
									]
								}
							]
						},
						{
							margin: '0 0 0 5',
							xtype: 'container',
							flex: 2 ,
							layout: { type: 'fit' ,align: 'stretch'},
							bodyPadding: 2,
							items: [
								{
									/*Button Set Doc */
									xtype: 'button',
									flex: 1,
									action: 'setdoc',
									text: 'Get Doc',
									iconCls: 'save',
									itemId: 'setdoc'
								}
							]
						}
					]
				},
				{
					xtype: 'splitter'
				},
				{
					xtype: 'container',
					itemId: 'containergrid',
					layout: {type: 'vbox',align: 'stretch'},
					flex:.8,
					items:[
						{
							xtype: 'container',
							itemId: 'panelgrid',
							flex:.8,
							layout: {type: 'vbox',align: 'stretch'},
//							layout: 'vbox',
							items: [
								{
									/**
									 * Grid Reserve Product
									 */
									xtype: 'grid',
									flex:.6,
									itemId: 'gridItemsale',
									store: 'App.store.saleProduct.ssaleProduct',
									defaults: {
										flex: 1
									},
									emptyText: 'Empty Product, Please click add',
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Product',
											dataIndex: 'product_id',
											renderer: function (v, m, rec) {
												return rec.get('productname');
											},
											flex: 2,
											editor: {
												allowblank: false,
												xtype: 'cbProduct',
												pageSize: 100,
												fieldLabel:''
											}
										},
										{
											text: 'Qty',
											dataIndex: 'qty',
											editor: {
												allowblank: false
											},
											renderer: function(v){
												return Ext.util.Format.number(v,'0,0');
											}
										},
										{
											text: 'Price',
											dataIndex: 'price',
											editor: {
												allowblank: false
											},
											renderer: function(v){
												return Ext.util.Format.currency(v,'Rp ',2);
											}

										},
										{
											text: 'Description',
											dataIndex: 'desc',flex: 1,
											editor: {
												allowblank: true
											}
										},
										{
											text: 'Sub Total',
											dataIndex: 'subtotal',
											renderer: function (v, m, rec) {
												var price = rec.get('price');
												var qty = rec.get('qty'),
												value = (qty > 0) ? (price * qty) : 0;
												return Ext.util.Format.currency(value,'Rp ',2);
											}
										}
									],
									columnLines: true,
									selModel: 'rowmodel',
									/*==========  Plugins  ==========*/
									plugins: [
										Ext.create('Ext.grid.plugin.RowEditing', {
											clicksToEdit: !1,
											pluginId: 'cellEditorSaleProduct',
											clicksToMoveEditor: 1
										})
									],
									dockedItems: [
										{
											xtype: 'toolbar',
											dock: 'top',
											items: [
												{
													text: 'Add',
													iconCls: 'add',
													action: 'addproduct',
													itemId: 'addproduct'
												},
												{
													text: 'Remove',
													tooltip: 'Remove From Order',
													iconCls: 'delete',
													action: 'removeproduct',
													itemId: 'removeproduct'
												}
											]
										},
										{
											dock: 'bottom',
											xtype: 'pagingtoolbar',
											store: 'App.store.saleProduct.ssaleProduct',
											displayInfo: true
										}
									]
								},
								{
									xtype: 'splitter'
								},
								{
									xtype: 'container',
									itemId: 'gridFooter',
									flex: .3,
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{
											xtype: 'container',
											flex: .5,
											html: "Catatan:(*) <ul>" +
												"<li>Semua Barang Yang dibeli tidak bisa dikembalikan </li>" +
												"<li>Semua harga barang belum termasuk biaya kirim</li>" +
												"</ul>"
										},
										{
											xtype: 'container',
											flex: .5,
											items: [
												{
													xtype: 'textfield',
													readOnly: true,
													fieldLabel: 'Total Item',
													name: 'totalItem',
													value : "Empty"
												},
												{
													xtype: 'textfield',
													fieldLabel: 'Total ',
													itemId: 'sumtotal',
													readOnly: true,
													name : 'sumtotal',
													value: 'Empty'
												}
//								{
//									xtype: 'combobox',
//									store: Ext.create('Ext.data.Store', {
//										fields: ['id', 'name'],
//										data: [
//											{ id: 1, name: '(%)'},
//											{ id: 2, name: 'Currency'}
//										]
//									}),
//									fieldLabel: 'Disc'
//								}
											]
										}

									]
								}
							]
						}
					]
				}
			],
			buttons: [
//				{
//					xtype: 'toolbar',
//					dock: 'bottom',
//					items: [
				{
					text: 'Help',
					action: 'help',
					itemId: 'help',
					iconCls: 'help',
					handler: function(){
						belumImplement();
					}
				},
				'->',
				{
					text: 'Save',
					action: 'save',
					itemId: 'save',
					iconCls: 'save'
				},
				{
					text: 'Cancel',
					action: 'cancel',
					itemId: 'cancel',
					iconCls: 'close'
				}
			]
//				}
//			]
		});
		me.callParent(arguments);
	}
});
