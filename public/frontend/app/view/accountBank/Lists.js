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

Ext.define('App.view.accountBank.Lists', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appaccountBankvaccountBankList',
	store: 'App.store.accountBank.saccountBank',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			frame: true,
			columns: [
				{
					xtype: 'rownumberer',
					text: '#'
				},
				{
					header: translations.accountbank.header.name,
					dataIndex: 'name',
					flex: 2
				},
				{
					header: translations.accountbank.header.number,
					dataIndex: 'number',
					flex: 1
				},
				{
					header: translations.accountbank.header.bankname,
					dataIndex: 'bankname',
					flex: 2
				}
			],


			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					items: [
						{
							text: translations.add,
							iconCls: 'add',
							action: 'add',
							itemId: 'add'
						},
						{
							text: translations.remove,
							iconCls: 'delete',
							action: 'remove',
							itemId: 'remove'
						},
						'->',
						{
							xtype: 'tbtext',
							text: 'Aksi Edit: Klik Dua Kali pada record'
						},
						{
							text: translations.import,
							iconCls: 'excel',
							action: 'import',
							itemId: 'import'
						},
						{
							text: translations.export,
							iconCls: 'excel',
							action: 'export',
							itemId: 'export'
						},
						{
							text: translations.help,
							iconCls: 'help',
							action: 'help',
							itemId: 'help'
						}
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					itemId: 'pgAccountBank',
					store: this.store,
					displayInfo: true
				}
			]
		});
		me.callParent(arguments);
	}
});
