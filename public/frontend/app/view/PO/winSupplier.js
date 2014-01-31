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




Ext.define('App.view.PO.winSupplier', {
	extend: 'Ext.window.Window',
	alias: 'widget.winPoSupplier',
	config: {
		storeSupplier  : null
	},
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			title: 'Pilih Supplier',
			height: 400,
			width: 500,
			layout: { type: 'fit', align: 'stretch'},
			modal: true,
			items: [
				{
					xtype: 'grid',
					margin: '5 5 5 5',
					frame: true,
					store: me.getStoreSupplier(),
					columns: [
						{ xtype: 'rownumberer', text: '#' },
						{ dataIndex: 'name', text: 'Nama Pemasok',flex:1 },
						{ dataIndex: 'address', text: translations.address,flex:2 },
						{ dataIndex: 'email', text: translations.email ,flex:1},
						{ dataIndex: 'phone', text: translations.phonenumber ,flex:1},
						{ dataIndex: 'fax', text: translations.fax,flex:1 }
					],
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{
									xtype: 'textfield',minWidth: 250,
									emptyText: 'Cari Supplier',
									action: 'searchsupplier'
								},
								{
									xtype: 'tbtext',
									text: 'Silahkan ketik Supplier dan Tekan Enter'
								}
							]
						},

						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: me.getStoreSupplier()
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{ text: 'Help', iconCls: 'help', handler: function () {
							belumImplement();
						} },
						'->',
						{ text: 'Pilih', iconCls: 'add', action: 'selectandclose' }
					]
				}
			]
		});
		me.callParent(arguments);
		me.down('grid').getStore().load();
	}
});