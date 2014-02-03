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


Ext.define('App.view.PO.listItems',
	{
		extend: 'Ext.grid.Panel',
		alias: 'widget.gridorderItems',
		initComponent: function () {

			var data = [
				{ id: 1, name: 'Product A', qty: 100, price: 90000 },
				{ id: 2, name: 'Product B', qty: 200, price: 10000 },
				{ id: 3, name: 'Product C', qty: 30, price: 1000 },
				{ id: 4, name: 'Product D', qty: 40, price: 2000 }
			];
			var store = Ext.create('Ext.data.Store', {
//				fields: ['id', 'name','qty','subtotal','price'],
				model: 'App.model.PO.items',
				data: data,
				proxy: {
					type: 'memory'
				}
			});

			var me = this;
			Ext.apply(me, {
				store: store,
				columns: [
					{
						xtype: 'rownumberer',
						text: '#'
					},
					{
						dataIndex: 'name', flex: 2,
						text: 'Nama Produk'
					},
					{
						dataIndex: 'qty', flex: 1,
						text: 'Qty'
					},
					{
						dataIndex: 'price', flex: 2,
						text: 'Harga',
						renderer: function (v, m, rec) {
							return v;
						}
					},
					{
						dataIndex: 'subtotal',
						flex: 2,
						text: 'Sub Total',
						renderer: function (v, meta, rec) {
							var price = rec.get('price');
							var qty = rec.get('qty');
							return parseFloat(price) * parseFloat(qty);
						}
					}
				],
				dockedItems: [
					{xtype: 'pagingtoolbar', store: store, displayInfo: true, dock: 'bottom'}
				]
			});
			me.callParent(arguments);
		}


	});