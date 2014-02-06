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

			var data = [];
			for (var i=1;i<201;i++){
				var qty = randomInt(900);
				var price = randomInt(900) * 100;
				var total = parseFloat(qty) * parseFloat(price);
				var disc = (total - qty )/ 100;
				if (disc > total) disc = 0;
				data.push(
					{ id: i, name: 'Product '+ i , qty: qty, price: price, discount: disc }
				)
			}

			var store = Ext.create('Ext.data.Store', {
				model: 'App.model.PO.items',
				data: data,
				pageSize: 100,
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
						text: 'Qty',
						editor: {
							allowblank: false,
							minValue: 0
						},
						renderer: function (v) {
							return Ext.util.Format.number(v, '0,00');
						}
					},
					{
						dataIndex: 'price', flex: 2,
						text: 'Harga',
						renderer: function (v) {
							return Ext.util.Format.number(v, '0,00');
						},
						editor: {
							allowblank: false,
							minValue: 0
						}
					},
					{
						dataIndex: 'discount',
						flex: 1,
						text: 'Discount',
						renderer: function (v) {
							var val = (v == null) ? 0 : v;
							return Ext.util.Format.number(val, '0,00');
						},
						editor: {
							allowblank: true,
							minValue: 0
						}
					},
					{
						dataIndex: 'subtotal',
						flex: 2,
						text: 'Sub Total',
						renderer: function (v, meta, rec) {
							var price = rec.get('price');
							var qty = rec.get('qty');
							var disc = rec.get('discount');
							var total = parseFloat(price) * parseFloat(qty);
							if (disc > 0) {
								total = total - disc;
							}
							return Ext.util.Format.number(total, '0,00');
						}
					},
					{
						header: 'Action',
						xtype: 'actioncolumn',
						width: 40,
						items: [
							{
								iconCls: 'delete',
								tooltip: 'Delete',
								handler: App.util.box.deleteSingleRecordFromGrid
							}
						]
					}
				],
				columnLines: true,
				selModel: App.util.box.createSelectionModel(),
				/*==========  Plugins  ==========*/
				plugins: [
					Ext.create('Ext.grid.plugin.RowEditing', {
						clicksToEdit: !1,
						pluginId: 'cellEditorOrderItems',
						clicksToMoveEditor: 1
					})
				],
				dockedItems: [
					{
						xtype: 'pagingtoolbar',
						store: store,
						displayInfo: true,
						dock: 'bottom'
					}
				]
			});
			me.callParent(arguments);
		}


	});