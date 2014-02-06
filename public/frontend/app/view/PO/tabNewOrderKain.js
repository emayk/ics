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



Ext.define('App.view.PO.tabNewOrderKain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.panelNewOrderKain',
	requires: [
		'App.view.PO.formAddPoKain',
		'App.view.PO.listItems'
	],
	autoScroll: true,
	bodyPadding: 5,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				/*Form PO*/
				{
					margin: '5 5 5 5',
					xtype: 'formAddPoKain',
					itemId: 'formaddfabric'
				},
				{
					xtype: 'splitter'
				},
				/*Grid Order Items*/
				{
					margin: '5 5 5 5',
					height: 250,
					xtype: 'gridorderItems',
					title: 'Daftar Item Order'
				},
				/*Statistic Order*/
				{
					xtype: 'container',
					layout: { type: 'hbox', align: 'stretch'},
					items: [
						{
							xtype: 'container',
							flex: .5
						},
						{
							flex: .5,
							xtype: 'container',
							layout: 'anchor',
							items: [
								{
									xtype: 'fieldcontainer',
									fieldLabel: 'Total Harga',
									anchor: '95%',
									defaults: {
										labelWidth: 50
									},
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										/*Total*/
										{
											flex: .5,
											xtype: 'textfield', readOnly: true,
											name: 'total', fieldLabel: '', margin: '0 0 5 5',
											anchor: '95%', value: 0
										},
										/*Discount*/
										{
											flex: .5,
											xtype: 'textfield',
											readOnly: true,
											fieldLabel: 'Discount',
											name: 'totaldiscount',
											emptyText: 'Empty Discount',
											anchor: '95%',
											margin: '0 0 5 5'
										}
									]
								},
								/*Uang Muka*/
								{
									xtype: 'fieldcontainer',
									fieldLabel: 'Total Bayar Stlh Discount',
									anchor: '95%',
									layout: { type: 'hbox', /*align: 'stretch'*/ pack: 'center'},
									items: [
										{
											flex: .4,
											xtype: 'textfield', readOnly: true,
											name: 'totalafterdisc', fieldLabel: '', margin: '0 0 5 5',
											anchor: '95%', value: 0
										},


										{
											flex:.6,
											margin: '0 5 0 5',
											xtype: 'fieldcontainer',
											labelWidth: 75,
											fieldLabel: 'Uang Muka',
											anchor: '100%',
											layout: { type: 'hbox', /*align: 'stretch'*/ pack: 'center'},
											items: [
												{
													margin: '0 0 0 2',
													xtype: 'displayfield', name: 'currency_name', value: 'Rp ',
													flex: .2
												},
												{
													flex:.8,
													margin: '0 1 0 0',
													xtype: 'numberfield',
													name: 'dp_amount',
													fieldLabel: '',
													anchor: '100%',
													minValue: 0,
													value: 0,
													hideTrigger: true,
													step: 1000,
													keyNavEnabled: true,
													mouseWheelEnabled: false
												}
											]
										}
									]
								},
								{
									xtype: 'textfield', readOnly: true,
									name: 'totalafterdp', fieldLabel: 'Total Bayar Stlh Uang Muka', margin: '0 0 5 5',
									anchor: '95%', value: 0
								}
							]
						}
					]
				}
			],
			buttons: [
				{
					text: 'help', action: 'help', iconCls: 'help'
				},
				'->',
				{
					text: 'Buat Po Kain', action: 'createpo', iconCls: 'save'
				},
				{
					text: 'Batal', action: 'cancel', iconCls: 'close'
				}
			]
		});
		me.callParent(arguments);
	}
});