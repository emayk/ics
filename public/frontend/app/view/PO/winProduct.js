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





Ext.define('App.view.PO.winProduct', {
	extend: 'Ext.window.Window',
	alias: 'widget.winPoProduct',
	config: {
		supplierName : null,
		supplierId : null,
		storeProduct : null
	},
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			title: 'Pilih Product dari ' + me.getSupplierName(),
			height: 500,
			width: 500,
			layout: { type: 'fit', align: 'stretch'},
			modal: true,
			items: [
				{
					xtype: 'grid',
					margin: '5 5 5 5',
					frame: true,
					store: me.getStoreProduct(),
					columns: [
						{ xtype: 'rownumberer', text: '#' },
						{ dataIndex: 'name', text: 'Nama Product',flex: 2 },
						{ dataIndex: 'stock', text: 'Stock',flex: 1 }
					],
					selModel: App.util.box.createSelectionModel(),
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{
									xtype: 'textfield',
									emptyText: 'Cari Product',
									minWidth: 250,
									action: 'searchproduct'
								},
								'->',
								{
									xtype: 'tbtext',
									text: 'Silahkan ketik Produk dan Tekan Enter'
								}
							]
						},

						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: me.getStoreProduct()
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

						{ text: 'Tambah', iconCls: 'add', action: 'quickaddproduct' },
						{ text: 'Pilih', iconCls: 'add', action: 'selectandclose' }
					]
				}
			]
		});
		me.callParent(arguments);
		me.down('grid').getStore().getProxy().setExtraParam('supplierid',me.getSupplierId());
		me.down('grid').getStore().load();
	}
});