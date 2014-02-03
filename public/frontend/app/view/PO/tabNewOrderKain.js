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
								/*Total*/
								{
									xtype: 'textfield', readOnly: true,
									name: 'total', fieldLabel: 'Total', margin: '0 0 5 5',
									anchor: '95%', value: 0
								},
								/*Discount*/
								{
									flex: .3,
									xtype: 'numberfield',
									fieldLabel: 'Discount(%)',
									name : 'discpercent',
									emptyText: 'Discount (%)',
									step: .1,
									minValue: 0,
									maxValue: 100,
									value: 0,
									hideTrigger: true,
									anchor: '95%',
									margin: '0 0 5 5'
								},
								/*Uang Muka*/
								{
									xtype: 'fieldcontainer',
									fieldLabel: 'Uang Muka',
									anchor: '95%',
									layout: { type: 'hbox', align: 'stretch'},
									items: [
										{
											xtype: 'displayfield', name: 'currency_name', value: 'Rp ',
											flex: .1
										},
										{
											margin: '0 5 0 5',
											flex: .5,
											xtype: 'numberfield',
											name: 'dp_amount',
											fieldLabel: '',
											minValue: 0,
											value: 0,
											hideTrigger: true,
//															anchor: '95%',
											step: 1000,
											keyNavEnabled: true,
											mouseWheelEnabled: false
										}
									]
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