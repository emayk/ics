/**
 * View prorder
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
Ext.define('App.view.prorder.vprorder', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appprordervprorder',
	iconCls: 'grid',
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		var store = Ext.create('App.store.prorder.sprorder');
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					itemId: 'taborder',

					layout: { type: 'fit', align: 'stretch'},
					items: [
						{
							title: 'PO aktif',
							xtype: 'grid',
							flex: 1,
							iconCls: 'grid',
							store: store,
							columns: [
								{ xtype: 'rownumberer'},
								{ text: 'Nomor', dataIndex: 'trxnumber' },
							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar', dock: 'bottom',
									store: store
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
