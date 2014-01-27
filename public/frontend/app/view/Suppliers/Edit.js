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


/**
 * Proses Info Buyer atau delete
 */
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('App.view.Suppliers.Edit', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.appSuppliersvSuppliersEdit',
	requires: [
		'App.form.combobox.cbCountries',
		'App.form.combobox.cbProvinces',
		'App.form.combobox.cbCities',
		'App.form.combobox.cbTypeSupBuy',
		'App.form.combobox.cbLegalitas',
		'App.form.combobox.cbTypeProduct',
		'App.view.accountBank.vaccountBank'

	],
	layout: { type: 'fit', align: 'stretch'},
	padding: 10,
	mode: null,
	frame: true,
	items: [
		{
			xtype: 'form',
			itemId: 'formsupplier',
			frame: true,
			autoScroll: true,
			bodyPadding: 5,
			fieldDefaults: {
				labelAlign: 'top',
				msgTarget: 'side'
			},
			defaults: {
				anchor: '100%'
			},
			title: 'Information',
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					items: [
						{
							xtype: 'container',
							flex: 1,
							border: false,
							layout: 'anchor',
							defaultType: 'textfield',
							items: [
								{
									fieldLabel: 'Full Name',
									afterLabelTextTpl: required,
									allowBlank: false,
									name: 'name',
									anchor: '95%'
								},
								{
									fieldLabel: 'Email',
									allowBlank: true,
									name: 'email',
									vtype: 'email',
									anchor: '95%'
								}
							]
						},
						{
							xtype: 'container',
							flex: 1,
							layout: 'anchor',
							defaultType: 'textfield',
							items: [
								{
									fieldLabel: 'kredit',
									afterLabelTextTpl: required,
									allowBlank: false,
									name: 'kredit',
									anchor: '95%',
									xtype: 'numberfield',
									minValue: 0,
									value: 0,
									maxValue: 365
								},
								{
									fieldLabel: 'plafon',
									afterLabelTextTpl: required,
									allowBlank: false,
									name: 'plafon',
									xtype: 'numberfield',
									minValue: 0,
									anchor: '95%'
								}
							]
						}
					]
				},
				{
					xtype: 'tabpanel',
					plain: true,
					activeTab: 0,
					defaults: {
						bodyPadding: 10
					},
					layout: { type: 'fit', align: 'stretch'},
					items: [
						/* Tab Office Supplier*/
						{
							xtype: 'container',
							title: 'Office',
							itemId: 'taboffice',
							layout: { type: 'vbox', align: 'stretch'},
							items: [
								{
									defaults: {
										width: 230,
										anchor: '95%'
									},
									layout: 'anchor',
									defaultType: 'textfield',
									frame: true,

									items: [
										{
											fieldLabel: 'Npwp',
											name: 'npwp'
										},
										{
											/*Type Supplier */
											xtype: 'fieldcontainer',
											fieldLabel: 'Type',

											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{
													flex: 1,
													fieldLabel: '',
													name: 'tipe_id',
													xtype: 'cbTypeSupBuy'
												},
												{
													/*add Type Supplier Buyer */
													xtype: 'button',
													margin: '0 0 0 5',
													text: 'Add',
													iconCls: 'add',
													action: 'addtypesupbuy',
													itemId: 'addtypesupbuy'
												}
											]
										},
										{
											/*Legalitas*/
											xtype: 'fieldcontainer',
											fieldLabel: 'Legality',
											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{
													flex: 1,
													fieldLabel: '',
													name: 'legality_id',
													xtype: 'cbLegalitas'
												},
												{
													/*Add Legalitas*/
													xtype: 'button',
													iconCls: 'add',
													margin: '0 0 0 5',
													text: 'Add',
													action: 'addlegality',
													itemId: 'addlegality'
												}
											]
										},
									]
								}
							]
						},

						/*Phone Number*/
						/*{
						 flex: 1,
						 title: 'Phone Numbers',
						 frame: true,
						 defaults: {
						 width: 230
						 },
						 defaultType: 'textfield',
						 {
						 fieldLabel: 'Phone',
						 name: 'phone'
						 },
						 {
						 fieldLabel: 'Fax',
						 name: 'fax'
						 }
						 ]
						 },*/
						{
							flex: 1,
							title: 'Phone Numbers',
//							frame: true,
//							defaults: {
//								width: 230
//							},
//							defaultType: 'textfield',
							xtype: 'container',
							autoScroll: true,
							height: 300,
							bodyPadding: 10,
							layout: { type: 'fit', align: 'stretch'},
							items: [
								{
									flex: 1,
									xtype: 'appphonesgrid',
									itemId: 'gridphone'
								}
//								{
//									fieldLabel: 'Phone',
//									name: 'phone'
//								},
//								{
//									fieldLabel: 'Fax',
//									name: 'fax'
//								}
							]
						},
						/*Account Bank Supplier*/
						{
							xtype: 'appaccountBankvaccountBank',
							title: 'Account Bank',
							itemId: 'accountbank'
						},
						/*Locations*/
						{
							title: 'Locations',
							defaults: {
								width: 230
							},
							frame: true,
							defaultType: 'textfield',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'container',
									flex: 1,
									layout: 'anchor',
									items: [
										{
											xtype: 'cbCountries',
											name: 'country_id',
											fieldLabel: 'Country',
											afterLabelTextTpl: required,
											allowBlank: false,
											anchor: '95%'
										},
										{
											xtype: 'cbProvinces',
											name: 'province_id',
											fieldLabel: 'Province',
											afterLabelTextTpl: required,
											anchor: '95%',
											allowBlank: false
										},
										{
											xtype: 'cbCities',
											name: 'city_id',
											fieldLabel: 'City',
											afterLabelTextTpl: required,
											anchor: '95%',
											allowBlank: false
										}
									]
								},
								{
									xtype: 'container',
									flex: 1,
									layout: 'anchor',
									items: [
										{
											name: 'address',
											fieldLabel: 'Address',
											xtype: 'textareafield',
											flex: 1,
											afterLabelTextTpl: required,
											allowBlank: false,
											anchor: '95%'
										},
										{
											xtype: 'fieldcontainer',
											layout: 'hbox',
											fieldLabel: 'PostCode / Rt / Rw',
											items: [
												{
													xtype: 'textfield',
													name: 'codepos',
													anchor: '95%',
													width: 80,
													maxLengthText: 5
												},
												{
													xtype: 'splitter'
												},
												{
													xtype: 'textfield',
													name: 'rt',
													width: 50,
													maxLengthText: 3

												},
												{
													xtype: 'splitter'
												},
												{
													xtype: 'textfield',
													name: 'rw',
													width: 50,
													maxLengthText: 3

												}
											]
										}

									]
								}
							]
						},
						/*Note*/
						{
							cls: 'x-plain',
							title: 'Note',
							frame: true,
							layout: 'fit',
							items: {
								xtype: 'htmleditor',
								name: 'note'
							}
						}
					]
				},
				{
					xtype: 'checkbox',
					name: 'status_id',
					labelAlign: 'left',
					fieldLabel: 'Active ?'
				}
			],
			buttons: [
				{
					text: 'Help',
					itemId: 'help',
					iconCls: 'help'
				},
				'->',
				{
					text: 'Save',
					itemId: 'save',
					iconCls: 'save',
					formBind: true
				},
				{
					itemId: 'close',
					iconCls: 'close',
					text: 'Close'
				}
			]
		},
		{
			xtype: 'container',
			title: 'History',
			html: 'History Supplier'
		},
		{
			xtype: 'container',
			title: 'Chart',
			html: 'Stats Supplier'
		},
		{
			xtype: 'container',
			title: 'Products'
		}
	]
});
