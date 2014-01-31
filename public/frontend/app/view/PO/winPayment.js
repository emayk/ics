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


Ext.define('App.view.PO.winPayment', {
	extend: 'Ext.window.Window',
	alias: 'widget.winPayment',
	requires:[
		'App.view.typepayment.vtypepayment'
	],

	layout: { type: 'fit', align: 'stretch'},
	initComponent:function(btn){
		var me = this;
		Ext.apply(me,{
			width: App.util.box.maxWidthWindow() - 100 ,
			height: App.util.box.maxHeightwindow() - 100,
			items: [
				{xtype: 'apptypepaymentvtypepayment',itemId:'panelpayment'}
			],
			buttons: [
				{ text: 'Tutup',iconCls: 'close',handler:function(btn){
					btn.up('window').close();
				} }
			]
		});
		me.callParent(arguments);
	}

});