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




Ext.define('App.view.PO.winContact', {
	extend: 'Ext.window.Window',
	alias: 'widget.winPoContact',
	requires: [
		'App.view.PO.listContact'
	],
	config: {
		supplierName: null,
		supplierId : null,
		storeContact : null
	},
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			title: 'Pilih Kontak dari ' + me.getSupplierName(),
			height: 400,
			width: 500,
			layout: { type: 'fit', align: 'stretch'},
			modal: true,
			items: [
				{
					xtype: 'grid',
					margin: '5 5 5 5',
					frame: true,
					/*@todo : ganti dengan store contact */
					store: me.getStoreContact(),
					columns: [
						{ xtype: 'rownumberer', text: '#' },
						{ dataIndex: 'name', text: 'Nama Pemasok',flex:1 },
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
									xtype: 'textfield',
									emptyText: 'Cari Contact',
									minWidth: 250,
									action:'searchcontact'
								},
								'->',
								{
									xtype: 'tbtext',
									text: 'Silahkan ketik Kontak dan Tekan Enter'
								}
							]
						},

						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: me.getStoreContact()
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
		me.down('grid').getStore().getProxy().setExtraParam('parent_id',me.supplierId);
		me.down('grid').getStore().getProxy().setExtraParam('parenttype','supplier');
		me.down('grid').getStore().load();
	}
});