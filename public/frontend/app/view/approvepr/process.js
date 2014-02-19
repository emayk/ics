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
		aprid: undefined,
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
					defaults: {
						flex: 1
					},
					flex: 1,
					columns: [
						{xtype: 'rownumberer'},
						{text: 'Kode', dataIndex: 'code', flex: 1},
						{text: 'Nama Produk', dataIndex: 'name', flex: 1.5},
						{text: 'Kategory', dataIndex: 'category', flex: 1},
//						{text: 'Supplier', dataIndex: 'supplierid'},
//						{text: 'Sales', dataIndex: 'contactid'},
						{text: 'Jenis', dataIndex: 'type', flex: 1.5},
						{text: 'Qty Pengajuan', dataIndex: 'qtypr',
							renderer: function (v, m, r) {
								var formattedval = Ext.util.Format.number(v, '0,00');
								return formattedval + ' ' + r.get('unit');
							}
						},
						{
							text: 'Qty', dataIndex: 'qty',
							renderer: function (v, m, r) {
								var formattedval = Ext.util.Format.number(v, '0,00');
								return formattedval + ' ' + r.get('unit');
//								return v + ' ' + r.get('unit');
							},
							flex: 1,
							editor: {
								xtype: 'numberfield',
								minValue: 0
							}
						},
						{
							text: 'Harga', dataIndex: 'price', flex: 1,
							editor: {
								xtype: 'numberfield',
								minValue: 0
							},
							renderer: Ext.util.Format.numberRenderer('0,00')
						},
						{
							text: 'Total', flex: 1,
							dataIndex: 'subtotal',
							renderer: function (v, m, r) {
								var price = r.get('price'), length = r.get('qty');
								var subtotal = parseFloat(price) * parseFloat(length);
								return Ext.util.Format.number(subtotal, '0,00');
							}
						},
						{ xtype: 'checkcolumn', text: 'Disetujui ?',
							dataIndex: 'approved',
							editor: {
								xtype: 'checkbox'
							},
							listeners: {
								checkchange: function (column, recordIndex, checked) {
									log(checked);
									log(column);
									column.up('grid').getStore().sync();
//									column.fireEvent('debug','checkchange',column);
								}
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
						{ text: 'Process', iconCls: 'add', action: 'prapproved' },
						{ text: 'Tolak', iconCls: 'cancel', action: 'prdenied' },
						{ text: 'Batal', iconCls: 'close', action: 'close' }
					]
				}
			]
		});
		me.callParent(arguments);
		if (me.getAprid()) {
			var grid = me.down('grid#listsproduct'), store = grid.getStore();
			store.getProxy().setExtraParam('aprid', me.getAprid());
			store.getProxy().setExtraParam('aprnumber', me.getAprnumber());
			store.load();
		}
	}
});