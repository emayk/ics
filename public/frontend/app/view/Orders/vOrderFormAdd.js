/**
 *
 * Form Add Order
 *
 **/

Ext.define('App.view.Orders.vOrderFormAdd', {
	extend: 'Ext.form.Panel',
	alias: 'widget.vOrderFormAdd',
	requires: [
		'App.form.combobox.cbSupplier',
		'App.form.combobox.cbContactPerson',
		'App.form.combobox.cbTypePayment',
		'App.form.combobox.cbWarehouse',
		'App.form.combobox.cbCurrencies',
		'App.form.combobox.cbTypeOrder',
		'App.form.combobox.cbTypeTax'
	],
	bodyPadding: 5,
	modal: true,
//	Simulasi
	record: {
		supplier_id: 1,
		cp_id: 121,
		type_id: 7,
		ppn_id: 29,
		delivery_at: null,
		credit: 0,
		warehouse_id: 1,
		paymenttype_id: 10,
		curr_id: 234,
		kurs: 0
	},
//	record: {
//		supplier_id: null,
//		cp_id: null,
//		type_id: null,
//		ppn_id: null,
//		delivery_at: null,
//		credit: 0,
//		warehouse_id: null,
//		paymenttype_id: null,
//		curr_id: null,
//		kurs: 0
//	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'container', layout: { type: 'hbox', align: 'stretch'},
					items: [
						{
							xtype: 'container',
							flex: 1,
							border: false,
							layout: 'anchor',
							defaults: {
								allowBlank: false,
								forceSelection: true
							},
							defaultType: 'textfield',
							items: [
								/*Supplier*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'Supplier',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										/*==========  Combobox Supplier  ==========*/
										{
											xtype: 'cbSupplier', flex: .9,
											name: 'supplier_id',
											fieldLabel: '',
											value: this.record.supplier_id
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddsupplier',
											iconCls: 'add'
										}
									]
								},
								/*Contact*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'Contact Person',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										/*==========  Contact Person  ==========*/
										{
											xtype: 'cbContactperson', flex: .9,
											fieldLabel: '',
											name: 'cp_id',
											value: me.record.cp_id
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddcontact',
											iconCls: 'add'
										}
									]
								},
								/*Type Order*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'Type Order',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										/*==========  Tax Type Order  ==========*/
										{
											xtype: 'cbTypeOrder', flex: .9,
											value: me.record.type_id,
											name: 'type_id',
											fieldLabel: ''
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddtypeorder',
											iconCls: 'add'
										}
									]
								},
								/*Type Tax Order*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'Type Tax Order',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										{
											/*Tax Type*/
											xtype: 'cbtypetax', flex: .9,
											fieldLabel: '',
											value: me.record.ppn_id,
											forceSelection: true,
											name: 'ppn_id'
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddtypetax',
											iconCls: 'add'
										}
									]
								},
								/*Delivery At*/
								{
									xtype: 'datefield',
									fieldLabel: 'Delivery At',
									name: 'delivery_at',
									submitFormat: 'Y-m-d',
									value: new Date(),
									minValue: date_subtract(),
									maxValue: date_add(90),
									anchor: '95%',
									emptyText: 'Select Delivery Date'
								}
							]
						},
						{
							xtype: 'container', flex: 1, layout: 'anchor', defaultType: 'combobox',
							defaults: {
								allowBlank: false,
								forceSelection: true
							},
							items: [
								/*Warehouse*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'To Warehouse',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										{
											/*Warehouse*/
											xtype: 'cbwarehouse',
											flex: .9,
											fieldLabel: '',
											forceSelection: true,
											value: me.record.warehouse_id,
											anchor: '95%',
											name: 'warehouse_id'
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddwarehouse',
											iconCls: 'add'
										}
									]
								},
								/*Paymen With*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'Payment With',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										{
											anchor: '95%',
											flex: .9,
											forceSelection: true,
											xtype: 'cbTypePayment',
											fieldLabel: '',
											value: me.record.paymenttype_id,
											name: 'paymenttype_id'
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddtypepayment',
											iconCls: 'add'
										}
									]
								},
								/*Currencies*/
								{
									xtype: 'fieldcontainer', flex: 1,
									anchor: '95%',
									fieldLabel: 'Currency',
									layout: {type: 'hbox', align: 'stretch'},
									items: [
										{
											anchor: '95%',
											flex: .9,
											fieldLabel: '',
											forceSelection: true,
											xtype: 'cbcurrencies',
											value: me.record.curr_id,
											name: 'curr_id'
										},
										{
											xtype: 'button', margin: '0 0 0 5',
											action: 'quickaddcurr',
											iconCls: 'add'
										}
									]
								},
								/*Credit*/
								{
									xtype: 'numberfield',
									fieldLabel: 'Credit (days)',
									name: 'credit',
									anchor: '95%',
									hideTrigger: true,
									maxValue: 365,
									minValue: 0,
									emptyText: 'Credit Periode',
									tooltip: 'Kredit dalam hari, isikan 0 untuk Cash',
									value: me.record.credit
								}
								/*Rate*/
								/*{
								 xtype: 'numberfield',
								 fieldLabel: 'Rate',
								 value: me.record.kurs,
								 forceSelection: true,
								 name: 'kurs',
								 anchor: '95%',
								 hideTrigger: true,
								 emptyText: 'Insert Rate',
								 value: me.record.kurs,
								 minValue: 0,
								 step: 0.1,
								 maxValue: 5
								 }*/

							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
	},
	fieldDefaults: {
		/*labelAlign: 'top',*/
		msgTarget: 'side'
	},
	buttons: [
		{
			text: 'Save',
			action: 'save',
			itemId: 'save',
			iconCls: 'save'
		},
		{
			text: 'Cancel', itemId: 'cancel',
			action: 'cancel',
			iconCls: 'reset',
			handler: function () {
				this.up('form').getForm().reset();
			}
		}
	]
});


