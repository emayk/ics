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
 * Fungsi :
 * untuk menentukan Harga dan Supplier
 * pengguna : Bagian Pembelian
 */
Ext.define('App.view.approvepr.process', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appapproveprvprocess',
	config: {
		closable: false,
		iconCls: 'add',
		aprnumber: undefined,
		tgl: '02/11/2014',
		status: 1,
		aprid : undefined,
		storegrid: Ext.create('App.store.approvepr.items')
	},

	bodyPadding: 2,
	frame: true,
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: { type: 'fit', align: 'stretch'},
			items: [
				{
					title: 'Daftar Barang [ ' + me.getAprnumber() + ' ]',
					xtype: 'grid',
					itemId: 'listsproduct',
					flex: 1,
					columns: [
						{xtype: 'rownumberer'},
						{text: 'Kode', dataIndex: 'code'},
						{text: 'Nama Produk', dataIndex: 'name'},
						{text: 'Kategory', dataIndex: 'category'},
						{text: 'Jenis', dataIndex: 'type'},
						{
							text: 'Panjang', dataIndex: 'qty',
							renderer: function (v, m, r) {
								return v + ' ' + r.get('unit');
							},
							editor: {
								xtype: 'numberfield',
								minValue: 0
							}
						},
						{
							text: 'Harga', dataIndex: 'price',
							editor: {
								xtype: 'numberfield',
								minValue: 0
							},
							renderer: Ext.util.Format.numberRenderer('0,00')
						},
						{
							text: 'Total',
							dataIndex: 'subtotal',
							renderer: function (v, m, r) {
								var price = r.get('price'), length = r.get('qty');
								var subtotal = parseFloat(price) * parseFloat(length);
								return Ext.util.Format.number(subtotal, '0,00');
							}
						}
					],
					columnLines: true,
					/*==========  Plugins  ==========*/
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToEdit: !1,
							clicksToMoveEditor: 1
						})
					],
					store: me.getStoregrid(),
					dockedItems: [
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							displayInfo: true,
							store: me.getStoregrid()
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{ text: translations.help, iconCls: 'help', action: 'help'},
						'->',
						{ text: 'Process', iconCls: 'add', action: 'approvepr' },
						{ text: 'Tolak', iconCls: 'cancel', action: 'deniedpr' },
						{ text: 'Batal', iconCls: 'close', action: 'closepr' }
					]
				}
			]
		});
		me.callParent(arguments);
		if (me.getAprid()){
			var grid = me.down('grid#listsproduct'), store = grid.getStore();
			store.getProxy().setExtraParam('aprid',me.getAprid());
			store.getProxy().setExtraParam('aprnumber',me.getAprnumber());
			store.load();
		}
	}
});