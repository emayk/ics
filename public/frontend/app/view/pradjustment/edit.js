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

Ext.define('App.view.pradjustment.edit', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apppradjustmentvpradjustmentedit',
	groupid: 5,
	bodyPadding: 2,
	frame: true,
	autoScroll: true,
	config: {
		adjid: undefined,
		adjtrx: undefined,
//		status: undefined,
		store: Ext.create('App.store.pradjustment.item')
	},
	requires: [
		'App.view.pradjustment.form'
	],
	layout: { type: 'hbox', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					title: 'Daftar Barang [ ' + me.getAdjtrx() + ' ]',
					flex: .7,
					autoScroll: true,
					xtype: 'grid',
					itemId: 'listitempr',
					viewConfig: {
						getRowClass: function (record) {
							if (record) {
								var approve = 'cgreen';
								var denied = 'cred';
								var unprocess = 'corange';
								var pending = 'cpending';
								var processed = 'row-processed';
								var color;
								var status = parseInt(record.get('status'));
								switch (status) {
									case 2:
										color = approve;
										break;
									case 3:
										color = denied;
										break;
									case 4:
										color = pending;
										break;
									/*Sudah diproses*/
									case 5:
										color = processed;
										break;
									default:
										color = unprocess
								}
								return color;
							}
						}
					},
					columns: [
						{xtype: 'rownumberer'},
						{
							text: 'Product',

							locked: true,
							columns: [
								{text: 'Kode', dataIndex: 'prodcode'},
								{text: 'Nama', dataIndex: 'prodname'},
								{text: 'Jenis', dataIndex: 'typename'},
								{text: 'Kategory', dataIndex: 'catname',
									renderer: function (v, m, r) {
										return Ext.String.trim(v);
									}
								}
							]
						},
						{
							text: 'Supplier',

							columns: [
								{text: 'Name', dataIndex: 'supname',
									renderer: function (v, m, r) {
										var spname = r.get('supplier_id');
										return (spname == 0 ) ? 'Belum di set' : v;
									}
								},
								{
									text: 'Kontak', dataIndex: 'cpname',
									renderer: function (v, m, r) {
										var cpid = r.get('cp_id');
										return (cpid == 0 ) ? 'Belum di set' : v;
									}
								}
							]
						},
						{
							text: 'Pengiriman',
							columns: [
								{text: 'Tanggal', dataIndex: 'delivery_at', xtype: 'datecolumn'},
								{text: 'Gudang', dataIndex: 'warehousename',
									renderer: function (v, m, r) {
										var warehouse_id = r.get('warehouse_id');
										return (warehouse_id == 0 ) ? 'Belum di set' : v;
									}
								}
							]
						},
						{
							text: 'Kuantitas',
							columns: [
								{text: 'Pengajuan', dataIndex: 'qtypr',
									renderer: function (v, m, r) {
										var formattedval = Ext.util.Format.number(v, '0,00');
										return formattedval + ' ' + r.get('produnit');
									}
								},
								{
									text: 'Disetujui', dataIndex: 'qty',
									renderer: function (v, m, r) {
										var formattedval = Ext.util.Format.number(v, '0,00');
										return formattedval + ' ' + r.get('produnit');
									},
									editor: {
										xtype: 'numberfield',
										minValue: 0
									}
								}
							]
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
					selModel: 'rowmodel',
					store: me.getStore(),
					dockedItems: [
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							displayInfo: true,
							store: me.getStore()
						}
					]
				},
				/*Splitter*/
				{ xtype: 'splitter' },
				/*Form Edit Item*/
				{
					xtype: 'apppradjustmentvpradjustmentform',
					itemId: 'formedit'
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{ text: translations.help, action: 'help', iconCls: 'help' },
						'->',
						{ text: 'Proses dan Ajukan ke Atasan', action: 'save', iconCls: 'save'},
						{ text: 'Batal', action: 'close', iconCls: 'close'}
					]
				}
			]
		});
		me.callParent(arguments);
		me.setupGridItem();
	},
	setupGridItem: function () {
		var me = this;
		var adjid = me.getAdjid();
		if (adjid) {
			var grid = me.down('#listitempr');
			var store = grid.getStore();
			var proxy = store.getProxy();
			proxy.setExtraParam('getitems', true);
			proxy.setExtraParam('adjid', me.getAdjid());
			store.load();
		}
	}
});