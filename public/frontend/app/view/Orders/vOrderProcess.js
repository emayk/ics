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

//

var orderNo = Ext.Number.randomInt(1,100);
Ext.define('App.view.Orders.vOrderProcess', {
	extend: 'Ext.window.Window',
	alias: 'widget.vOrderWin',
//	alias: 'widget.vOrderProcess',
	requires: [
		'App.view.Orders.vOrderFormAdd',
		'App.view.Orders.vOrderNewItemsList'
	],
	layout: { type : 'vbox' ,align: 'stretch' } ,
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			height: (hWinMax() - 100),
			width: (wWinMax() - 50),
			title: 'Add Order\'s Process',
			bodyPadding: 10,
			items: [
				{ xtype : 'vOrderFormAdd', itemId : 'formOrder', flex: .45, layout: 'fit', bodyPadding: 10,frame: false, margin: '0 0 10 0' },
				{ xtype : 'panel', bodyPadding: 10,  itemId: 'panelFormOrderItem' ,/*disabled : true,*/
					flex: .55 , layout: { type: 'card', align: 'stretch'},
					items : [
						{xtype: 'container', html: 'Silahkan Input Form Diatas', itemId:'welcome'},
						{ xtype: 'panel', title: 'Order Items ',layout: { type: 'hbox', align: 'stretch'}, itemId:'pageitem', items:[
							{xtype:'tabpanel',flex : .6, activeTab: 0, defaults:{height: 200, frame: false },
								items:[
									{ xtype : 'vOrderNewItemsList', title: 'Order Items',autoScroll: true },
									{ xtype : 'vStockProducts', title: 'Stock Product', autoScroll: true }
								]
							},
							{ xtype: 'vOrderItemAddForm', itemId: 'formOrderItem', flex: .4, bodyPadding: 10}
						] }
					] }
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					flex: 1,
					dock: 'bottom',
					items: [
						{
							xtype: 'button',
							text: 'Help',
							itemId: 'help',
							iconCls: 'help'
						},
						'->',
						{
							xtype: 'button',
							text: 'Close',
							itemId: 'close',
							iconCls: 'close'
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});