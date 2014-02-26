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

Ext.define('App.view.import.vImport',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.appviewimportvimport',
	layout: 'card',
	activeItem: 1,
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			items: [
				{ xtype: 'container', html: 'page 1'},
				{ xtype: 'importdepartement', html: 'page 2', itemId: 'departement'},
				{ xtype: 'container', html: 'page 3', itemId: 'product'},
				{ xtype: 'container', html: 'page 4', itemId: 'legalitas'},
				{ xtype: 'container', html: 'page 5', itemId: 'currency'}
			]
		});
		me.callParent(arguments);
	},

	dockedItems : [
		{ xtype : 'toolbar', flex: 1, dock: 'top',
			items : [
				{
					text : 'Choose Type Import',
					iconCls : 'menu_country',
					menu: {
						xtype : 'menu',
						itemId : 'typeImport',
						items : [
							{ xtype : 'menuitem', text: 'Departement', itemId : 'departement', iconCls: 'chart_pie'},
							{ xtype : 'menuitem', text: 'Product', itemId : 'product', iconCls: 'chart_column'},
							{ xtype : 'menuitem', text: 'Legalitas', itemId : 'legalitas', iconCls: 'chart_column'},
							{ xtype : 'menuitem', text: 'Currency', itemId : 'currency', iconCls: 'chart_column'},
						]
					}
				},
				/*Download Menu*/
				// {
				// 	text : 'Download Chart',
				// 	iconCls : 'download',
				// 	menu : {
				// 		xtype: 'menu',
				// 		itemId: 'download',
				// 		items: [
				// 			{ xtype : 'menuitem', text: 'Download as Image', itemId: 'png', iconCls: 'image'},
				// 			{ xtype : 'menuitem', text: 'Download as SVG', itemId: 'svg', iconCls: 'svg'},
				// 			{ xtype : 'menuitem', text: 'Download as PDF', itemId: 'pdf', iconCls: 'pdf'},
				// 		]
				// 	}
				// }

			] }]
})