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
					text: 'Nomor',
					flex: 1,
					dataIndex: 'number'
				},{
					text: 'Keterangan',
					dataIndex: 'info',
					flex: 2
				},
//				{
//					text: 'Parent',
//					dataIndex: 'parenttype'
//				},
//				{
//					text: 'Parent ID',
//					dataIndex: 'parent_id'
//				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							text: 'Add', iconCls: 'add', action: 'add'
						},
						{
							text: 'Remove', iconCls: 'delete', action: 'remove'
						},
						'->',
						{
							text: 'Import', iconCls: 'excel', action: 'import'
						},
						{
							text: 'Export', iconCls: 'excel', action: 'export'
						},
						{
							text: 'Bantuan', iconCls: 'help', action: 'help'
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