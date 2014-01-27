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

Ext.define('App.view.contacts.vLists', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appcontactsvcontactslist',
	store: 'App.store.contacts.scontacts',
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
					flex: 1,
					store: me.store,
					columns: [
						{xtype: 'rownumberer', text: '#' },
						{
							text: 'Name',
							flex: 2,
							dataIndex: 'name'
						}
					],
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{ text: 'Tambah', itemId: 'addcontact', action: 'addcontact', iconCls: 'add' },
								{ text: 'Hapus', itemId: 'removecontact', action: 'removecontact', iconCls: 'delete' },
								'->',
								{ text: 'Informasi Contact Person ', xtype: 'tbtext'}
							]
						},
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							displayInfo: true,
							store: me.store
						}
					]
		});
		me.callParent(arguments);
	}
});
