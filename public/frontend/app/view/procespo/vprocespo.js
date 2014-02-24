/**
 * View procespo
 *
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
 *
 *
 **/
Ext.define('App.view.procespo.vprocespo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appprocespovprocespo',
	requires: [
//		'App.view.checkgood.vcheckgood', /*Check Produk*/
		'App.view.procespo.vProductList', /*Daftar Produk*/
		'App.view.procespo.gridItems'
	],
	uses: [
		/*Page Approve PR*/
		'App.view.approvepr.process' // widget appapproveprvprocess
	],

	frame: true,
	bodyPadding: 10,
	layout: { type: 'fit', align: 'stretch'},
	config: {
		trxNumber: undefined,
		trxId: undefined
	},
	initComponent: function () {
		var me = this;
		var totalPage = 6;
		Ext.apply(me, {
			items: [
				{
					/*Halaman Pemesanan Produk*/
					xtype: 'panel',
					title: 'Buat Pengajuan pembelian barang',
					itemId: 'pageselectedproduct',
					frame: true,
					layout: { type: 'hbox', align: 'stretch'},
					autoScroll: true,
					flex: 1,
					items: [
						/*Daftar Produk*/
						{
							xtype: 'appprocespovProductList',
							margin: '0 5 0 0',
							flex: .5,
							title: 'Daftar Produk ',
							tooltip: 'Silahkan Pilih Produk2 yang akan dipesan'
						},
						{
							xtype: 'appprocespovgridItems',
							margin: '0 0 0 5',
							flex: .5,
							trxId: me.getTrxId(),
							trxNumber: me.getTrxNumber()
						}
					],
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								'->',
								{ text: 'Buat Pengajuan Barang', action: "next",iconCls: 'add' }
							]
						}
					]
				}
			]
		});
		me.callParent((arguments));
	}

});
