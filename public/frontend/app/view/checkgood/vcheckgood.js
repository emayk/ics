/**
 * View checkgood
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
 * @see CL 6 Dev 17 Pic 1
 *
 **/
Ext.define('App.view.checkgood.vcheckgood', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appcheckgoodvcheckgood',
	layout: { type: 'fit', align: 'stretch'},
	config: {
		storegrid: Ext.create('Ext.data.Store', {
			fields: ['id', 'name', 'countstock'],
			data: [
				{ id: 1, name: 'Produk A', countstock: 100 },
				{ id: 2, name: 'Produk B', countstock: 100 },
				{ id: 3, name: 'Produk C', countstock: 100 }
			]
		})
	},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					bodyPadding: 4,
					frame: true,
					activeTab: 1,
					items: [
						{
							xtype: 'container',
							title: 'Daftar Produk',
							iconCls: 'grid',
							layout: { type: 'fit', align: 'stretch'},
							flex: 1,
							items: [
								{
									xtype: 'grid',
									title: 'Daftar Produk Yang ada',
									flex: 1,
									store: me.getStoregrid(),
									selModel: App.util.box.createSelectionModel(),
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nama Produk',
											dataIndex: 'name',
											flex: 2
										},
										{
											text: 'Stok',
											dataIndex: 'countstock',
											flex: 1
										},
										{
											header: 'Proses',
											xtype: 'actioncolumn',
											width: 40,
											items: [
												{
													iconCls: 'forward',
													tooltip: 'Proses',
													handler: function (grid, rowIndex, colIndex) {
														var rec = grid.getStore().getAt(rowIndex);
														log(rec);
													}
												}
											]
										}
									],
									dockedItems: [
										{
											xtype: 'toolbar',
											dock: 'top',
											items: [
												{
													/*Semua Produk Yang terpilih akan dibuat sbg Purchase Request/Pengajuan Pembelian */
													text: 'Pesan',
													iconCls: 'add',
													action: 'add',
													handler: me.selectedforprocess
												}
											]
										},
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: me.getStoregrid()
										}
									]
								}
							]
						},
						/*Form Purchase Request*/
						{
							xtype: 'appcheckgoodvformpr'
						}

					]

				}
			]
		});
		me.callParent(arguments);
	},
	selectedforprocess: function (btn) {
		/*Digunakan untuk memilih dan menampilkan semua produk yang terpilih kedalam grid berikutnya*/
		var grid = btn.up('grid'),
			selections = grid.getSelectionModel().getSelection();

		if (selections[0] === undefined) {
			App.util.box.error('Pilih Produk terlebih dahulu yang akan diproses');
			return false;
		}
		log(selections);
		/*Lakukan Pembuatan View*/
		/*Insert data model ke dalam grid*/
		/*Tampilkan*/
	}
});
