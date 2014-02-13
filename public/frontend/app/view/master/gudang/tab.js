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
Ext.define('App.view.master.gudang.tab', {
	extend: 'Ext.tab.Panel',
	title: 'Gudang',
	requires: [
		'App.view.master.gudang.List'
	],
	layout: { type: 'fit', align: 'stretch'},
	alias: 'widget.tabgudang',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'gudangGridList',
					title: 'Daftar'
				},
				{
					xtype: 'container',
					title: 'Kategori',
					layout: { type: 'fit', align: 'stretch'},
					items: [
						{
							xtype: 'grid',
							itemId: 'gridcategory',
							columns: [
								{ xtype: 'rownumberer'},
								{
									text: 'Nama',
									dataIndex: 'name',
									flex:1,
									editor: {
										allowBlank: false,
										minLength:2
									}
								},
								{
									text: 'Keterangan',
									dataIndex: 'info',
									flex:2,
									editor: {
										allowBlank: true
									}
								},
								{
									header: 'Aksi',
									xtype: 'actioncolumn',
									width: 40,
									items: [
										{
											iconCls: 'delete',
											tooltip: 'Hapus',
											handler: function (grid, rowIndex, colIndex) {
												var rec = grid.getStore().getAt(rowIndex);
												Ext.MessageBox.confirm('Konfirmasi', 'Apakah Anda Yakin Akan Menghapus Record ?', function (btn, text) {
													var rec = grid.getStore().getAt(rowIndex);
													if (btn == 'yes') {
														rec.destroy({
															callback: function (recs, ops, success) {
																if (!ops.error) {
																	App.util.box.info('Record Berhasil dihapus');
																	grid.getStore().load();
																} else {
																	App.util.box.error('Record Gagal dihapus');
																	return false;
																}
															},
															failure: function (r, o) {
																App.util.box.error('Record Gagal dihapus');
																return false;
															}
														})
//										grid.getStore().remove(rec);
//										grid.getStore().sync();
//										grid.getStore().load();
													}
												});
											}
										}
									]
								}
							],
							store: 'App.store.warehouse.category',
							columnLines: true,
							selModel: App.util.box.createSelectionModel(),
							/*==========  Plugins  ==========*/
							plugins: [
								Ext.create('Ext.grid.plugin.RowEditing', {
									clicksToEdit: !1,
									pluginId: 'cellEditorGudangC',
									clicksToMoveEditor: 1
								})
							],
							dockedItems: [
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{ text: 'Tambah', iconCls: 'add',action: 'add' }
									]
								},
								{
									xtype: 'pagingtoolbar',
									dock: 'bottom',
									displayInfo: true,
									store: 'App.store.warehouse.category'
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
//		me.down('#gridcategory').getStore().load();
	}
});
