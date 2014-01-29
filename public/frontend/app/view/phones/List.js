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

Ext.define('App.view.phones.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appphonesgrid',
	layout: {
		type: 'fit',
		align: 'stretch'
	},
	initComponent: function () {
		var me = this;
		var store = Ext.create('App.store.phones.sphones');
		Ext.apply(me, {
			store: store,
			columns: [
				{
					xtype: 'rownumberer', text: '#'
				},
				{
					text: translations.phonenumber,
					flex: 1,
					dataIndex: 'number'
				},{
					text: translations.field.info,
					dataIndex: 'info',
					flex: 2
				},{
					text: translations.type,
					dataIndex: 'type',
					flex: 2,
					renderer: function(v){
						return (v == 0 ) ? translations.typephone : translations.typefax ;
					}
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							text: translations.add, iconCls: 'add', action: 'add'
						},
						{
							text: translations.remove, iconCls: 'delete', action: 'remove'
						},
						'->',
						{
							text: translations.import, iconCls: 'excel', action: 'import'
						},
						{
							text: translations.export, iconCls: 'excel', action: 'export'
						},
						{
							text: translations.help, iconCls: 'help', action: 'help'
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					store: store, dock: 'bottom',
					displayInfo: true
				}
			]
		});
		me.callParent(arguments);
	}
});