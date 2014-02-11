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

Ext.define('App.view.payment.formprepare', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apppaymentvformpreparepayment',
	iconCls: 'add',
	closable: true,
	bodyPadding: 2,
	frame: true,
	title: 'Informasi PO',
	config: {
		poid: 1,
		supname: 'PT ABCD',
		ponumber: 'PO-12345',
		storegridpoitems: Ext.create('Ext.data.Store', {
			pageSize: 100,
			fields: [
				'id', 'code', 'name', 'nodesign', 'color', 'width', 'length', 'lengthunitname', 'price', 'type',
				/*Realisasi*/
				'r_length',
				'r_roll',
				'r_totalprice',
				/*Yang belum diterima*/
				/*Jumlah Yard yang belum diterima*/
			/**
			 * dihitung dari length - r_length = nr_length
			 */
				'nr_length'
			],
			data: [
				{ id: 1, code: 'xyz1', name: 'Kain Putih', nodesign: 'Putih Merah', color: 'white', width: '58/9"', length: 50, lengthunitname: 'yard', price: '2000', type: 'polyester', r_length: 25, r_roll: 5 },
				{ id: 2, code: 'xyz2', name: 'Kain Merah', nodesign: '999', color: '-', width: '58/9"', length: 60, lengthunitname: 'yard', price: '3000', type: 'polyester', r_length: 30, r_roll: 5 },
				{ id: 3, code: 'xyz3', name: 'Kain Merah', nodesign: '999', color: 'hear broken', width: '58/9"', length: 200, lengthunitname: 'yard', price: '1000', type: 'polyester', r_length: 100, r_roll: 5 },
				{ id: 4, code: 'xyz4', name: 'Kain Merah', nodesign: '9991', color: 'hear broken', width: '58/9"', length: 200, lengthunitname: 'yard', price: '1000', type: 'polyester', r_length: 200, r_roll: 20 },
				{ id: 5, code: 'xyz5', name: 'Kain Merah', nodesign: '9299', color: 'hear broken', width: '58/9"', length: 300, lengthunitname: 'yard', price: '3000', type: 'polyester', r_length: 300, r_roll: 30 },
				{ id: 6, code: 'xyz6', name: 'Kain Merah', nodesign: '4999', color: 'hear broken', width: '58/9"', length: 300, lengthunitname: 'yard', price: '1000', type: 'polyester', r_length: 300, r_roll: 10 },
				{ id: 7, code: 'xyz7', name: 'Kain Merah', nodesign: '4991', color: 'hear broken', width: '58/9"', length: 100, lengthunitname: 'yard', price: '2000', type: 'polyester', r_length: 75, r_roll: 30 },
				{ id: 8, code: 'xyz8', name: 'Kain Merah', nodesign: '4992', color: 'hear broken', width: '58/9"', length: 120, lengthunitname: 'yard', price: '1000', type: 'polyester', r_length: 25, r_roll: 10 }
			],
			proxy: {
				type: 'memory'
			}
		})
	},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			layout: { type: 'vbox', align: 'stretch'},
			items: [
				{
					xtype: 'form',
					flex: .15,
					margin: '0 0 10 0',
					bodyPadding: 10,
					items: [
						{ xtype: 'displayfield', name: 'nopo', fieldLabel: 'Nomor PO', value: me.getPonumber() },
						{ xtype: 'displayfield', name: 'supname', fieldLabel: 'Nama Supplier', value: me.getSupname() }
					]
				},
				{
					/*grid daftar PO*/
					xtype: 'grid',
					title: 'Daftar Item PO ' + me.getPonumber(),
					flex: .85,
					itemId: 'gridPoPayment',
					store: me.getStoregridpoitems(),
					columns: [
						{
							xtype: 'rownumberer',
							text: '#'
						},
						{ text: 'Kode', dataIndex: 'code', flex: 1 },
						{ text: 'Nama Kain', dataIndex: 'name', flex: 1 },
						{ text: 'Design', dataIndex: 'nodesign', flex: 1 },
						{ text: 'Warna', dataIndex: 'color', flex: 1 },
						{ text: 'Panjang', dataIndex: 'length', flex: 1, renderer: function (v, m, rec) {
							var lengthname = rec.get('lengthunitname');
							return v + ' ' + lengthname;
						} },
						{ text: 'Harga', dataIndex: 'price', flex: 1 },
						{ text: 'Tipe', dataIndex: 'type', flex: 1 },
						/*Realisasi*/
						{ text: 'Panjang', dataIndex: 'r_length', flex: 1 },
						{ text: 'Roll', dataIndex: 'r_roll', flex: 1 },
						{ text: 'SubTotal', dataIndex: 'r_totalprice', flex: 1, renderer: function (v, m, rec) {
							var price = parseFloat(rec.get('price'));
							var length = parseFloat(rec.get('length'));
							var subtotal = price * length;
							return subtotal;
						} },
						/*Belum Terima*/
						{ text: 'Belum Terima', dataIndex: 'nr_length', flex: 1,
							renderer: function (v, m, rec) {
								var total = parseFloat(rec.get('length'));
								var receive = parseFloat(rec.get('r_length'));
								var elapse = (total - receive);
								var lengthname = rec.get('lengthunitname');
								return elapse + ' ' + lengthname;
							}}
					],

//					dockedItems: [
//						{
//							xtype: 'pagingtoolbar',
//							dock: 'bottom',
//							store: me.getStoregridpoitems(),
//							displayInfo: true
//						}
//					],
					margin: '0 0 10 0'
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar', dock: 'bottom',
					items: [
						{
							text: translations.help,
							iconCls: 'help',
							action: 'help'
						},
						'->',
						{
							text: 'Proses',
							iconCls: 'add',
							action: 'proses'
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});