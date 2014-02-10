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
		'App.view.accountBank.vaccountBank',
		'App.view.accountBank.Lists',
		'App.view.contactperson.vcontactperson'

	],
	layout: { type: 'fit', align: 'stretch'},
	padding: 10,
	mode: null,
	config: {
		parentId: null,
		parentName: null,
		parenttype: null
	},
	frame: true,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
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
					title: translations.information,
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
											fieldLabel: 'Nama Perusahaan',
//												translations.supplier.name,
											afterLabelTextTpl: required,
											allowBlank: false,
											name: 'name',
											anchor: '95%'
										},
										{
											fieldLabel: translations.email,
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
											fieldLabel: 'Jangka Waktu Kredit',
//												translations.supplier.credit,
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
											fieldLabel: 'Batas Max Pembelian',
//												translations.supplier.plafon,
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
							itemId: 'tabsupplierdetail',
							plain: true,
							activeTab: 0,
							defaults: {
//								bodyPadding: 10
							},
							layout: { type: 'fit', align: 'stretch'},
							items: [
								/* Tab Office Supplier*/
								{
									xtype: 'container',
									title: translations.office,
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
													fieldLabel: translations.typebussiness,

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
															text: translations.add,
															iconCls: 'add',
															action: 'addtypesupbuy',
															itemId: 'addtypesupbuy'
														}
													]
												},
												{
													/*Legalitas*/
													xtype: 'fieldcontainer',
													fieldLabel: translations.legality,
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
															text: translations.add,
															action: 'addlegality',
															itemId: 'addlegality'
														}
													]
												}
											]
										}
									]
								},
								/*Locations*/
								{
									title: translations.location,
									itemId: 'tablocations',
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
													fieldLabel: translations.address,
													xtype: 'textareafield',
													flex: 1,
													afterLabelTextTpl: required,
													allowBlank: false,
													anchor: '95%'
												},
												{
													xtype: 'fieldcontainer',
													layout: 'hbox',
//													fieldLabel: 'PostCode / Rt / Rw',
													items: [
														{
															xtype: 'textfield',
															fieldLabel: translations.postcode,
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
															fieldLabel: translations.rt,
															width: 50,
															maxLengthText: 3

														},
														{
															xtype: 'splitter'
														},
														{
															fieldLabel: translations.rw,
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
									title: translations.note,
									bodyPadding: 5,
									frame: true,
									layout: 'fit',
									items: {
										xtype: 'htmleditor',
										name: 'note'
									}
								},
								/*Kontak Person*/
								{
									flex: 1,
									height: 300,
									title: 'Kontak',
									xtype: 'appcontactpersonvcontactperson',
									itemId: 'tabcontactperson',
									parentId: me.getParentId(),
									parentName: me.getParentName(),
									parenttype: me.getParenttype()
								},
								/*Phone Number*/
								{
									flex: 1,
									height: 300,
									title: translations.phonenumber,
									xtype: 'appphonesgrid',
									itemId: 'gridphone'
								},
								/*Account Bank Supplier*/
								{
									flex: 1,
									height: 300,
									itemId: 'accountbank',
									title: translations.accountbank.title,
									xtype: 'appaccountBankvaccountBankList'
								}
							]
						},
						{
							xtype: 'fieldcontainer',
							anchor: '95%',
							layout: {type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'checkbox',
									flex: 1,
									name: 'status_id',
									labelAlign: 'left',
									labelWidth: 200,
									fieldLabel: translations.setup_as_active
								}
							]
						}

					],
					buttons: [
						{
							text: translations.help,
							itemId: 'help',
							iconCls: 'help'
						},
						'->',
						{
							text: translations.save,
							itemId: 'save',
							iconCls: 'save',
							formBind: true
						},
						{
							itemId: 'close',
							iconCls: 'close',
							text: translations.close
						}
					]
				},
				{
					xtype: 'container',
					title: translations.history,
					html: 'History Supplier berada di tab ini <br/><h1>Belum Di implementasi</h1>'
				},
				{
					xtype: 'container',
					title: translations.chart,
					html: 'Statistik Supplier berada di tab ini <br/><h1>Belum Di implementasi</h1>'
				},
				{
					xtype: 'container',
					title: translations.product,
					html: 'Product - Product Supplier berada di tab ini <br/><h1>Belum Di implementasi</h1>'
				}
			]
		});
		me.callParent(arguments);
	}

});
