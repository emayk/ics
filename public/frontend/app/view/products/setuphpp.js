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


/**
 * Panel Untuk setup Hpp per produk
 * Hanya mengupdate harga produk (harga penjualan harus lebih besar dari harga penjualan minimal).
 */
Ext.define('App.view.products.setuphpp', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appviewproductsetuphpp',
	config: {
		title: 'Setting Hpp Produk',
		closable: true,
		iconCls: 'grid'
	},
	storehpp: Ext.create('App.store.product.hpp'),
	bodyPadding: 10,
	frame: true,

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: { type: 'fit', align: 'stretch'},
			items: [
				{
					/**
					 * Grid dengan Row editing
					 */
					layout: { type: 'fit', align: 'stretch'},
					xtype: 'grid',
					itemId: 'gridproduct',
					store: me.storehpp,
					defaults: {
						flex: 1
					},
//					selModel: App.util.box.createSelectionModel(),
					columns: [
						{ xtype: 'rownumberer', text: 'No' },
						{
							text: 'Produk',
							columns: [
								{
									text: 'Nama', dataIndex: 'name'
								},
								{
									text: 'Kategori', dataIndex: 'catname'
								},
								{
									text: 'Jenis', dataIndex: 'typename'
								}
							]
						},
						{
							text: 'Setup Harga Penjualan',
							columns: [
								{ text: 'Harga Minimal', dataIndex: 'pricemin',
									editor: {
										xtype: 'numberfield',
										minValue: 0

									},
									xtype: 'numbercolumn'
								},
								{ text: 'Harga', dataIndex: 'pricevalue',
									editor: {
										xtype: 'numberfield',
										minValue: 0
									},
									xtype: 'numbercolumn'
								}
							]
						}
					],
					dockedItems: [
						{
							xtype: 'pagingtoolbar',
							store: me.storehpp,
							displayInfo: true, dock: 'bottom'
						}
					],
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToEdit: 1
						})
					]
				}
			]
		});
		me.callParent(arguments);
		if (me.storehpp) {
			me.down('#gridproduct').getStore().load();
		}

	}
});