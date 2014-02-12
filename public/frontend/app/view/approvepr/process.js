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
	iconCls: 'add',
	closable: true,
	config: {
		prnumber: 'PR1-11feb2014-timothy',
		tgl: '02/11/2014',
		status: 1,
		storegrid: undefined
//		storegrid: Ext.create('Ext.data.Store', {
//			fields: [ 'id', 'code', 'name', 'category', 'jenis', { name: 'length', type: 'int' }, 'unitname', 'price'],
//			data: [
//				{ id: 1, code: 'ab1', name: 'kain1', category: 'Kategory', jenis: '12e', length: 200, unitname: 'yard', price: 0},
//				{ id: 2, code: 'ab2', name: 'kain2', category: 'Kategory1', jenis: '12e', length: 150, unitname: 'yard', price: 0},
//				{ id: 3, code: 'ab3', name: 'kain3', category: 'Kategory1', jenis: 'r4', length: 300, unitname: 'yard', price: 0}
//			],
//			proxy: {
//				type: 'memory'
//			}
//		})
	},
	bodyPadding: 2,
	frame: true,
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: { type: 'fit', align: 'stretch'},
			items: [
				{
					title: 'Daftar Barang [ ' + me.getPrnumber() + ' ]',
					xtype: 'grid',
					flex: 1,
					columns: [
						{xtype: 'rownumberer'},
						{text: 'Kode', dataIndex: 'code'},
						{text: 'Nama Produk', dataIndex: 'name'},
						{text: 'Kategory', dataIndex: 'category'},
						{text: 'Jenis', dataIndex: 'jenis'},
						{
							text: 'Panjang', dataIndex: 'length',
							renderer: function (v, m, r) {
								return v + ' ' + r.get('unitname');
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
								var price = r.get('price'), length = r.get('length');
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
	}
});