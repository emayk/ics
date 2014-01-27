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


Ext.define('App.view.offices.Phones', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appofficesgridphone',
	layout: { type: 'fit', align: 'stretch'},
	flex: 1,
	title: 'Phones',
	itemId: 'gridPhone',
	columnLines: true,
	storeGrid: 'App.store.offices.sPhones',
	initComponent: function(){

		var me = this;
		var store = Ext.create(me.storeGrid);
		Ext.apply(me,{
			store : store,
			columns: [
				{
					xtype: 'rownumberer',
					text: '#'
				},
				{
					text: 'Number',
					flex: 2,
					dataIndex: 'number',
					editor: {
						allowblank: false
					}
				},
				{
					text: 'Number',
					flex: 2,
					dataIndex: 'info',
					editor: {
						allowblank: true
					}
				}
			],
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: !1,
					pluginId: 'cellEditorPhoneOffice',
					clicksToMoveEditor: 1
				})
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{ text: 'Tambah', itemId: 'addphoneoffice', action: 'addphoneoffice', iconCls: 'add' },
						{ text: 'Hapus', itemId: 'removephoneoffice', action: 'removephoneoffice', iconCls: 'delete' },
						'->',
						{ text: 'Untuk Edit Lakukan Klik Dua Kali Pada Record ', xtype: 'tbtext'}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true,
					store: store
				}
			]
		});
		me.callParent(arguments);
	}
});
