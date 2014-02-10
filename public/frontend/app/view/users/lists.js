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

Ext.define('App.view.users.lists', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appusersvgridusers',
	initComponent: function () {
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			fields: [ 'id', 'username', 'fullname' , 'status'],
			data: [
				{ id: 1, fullname: 'administrator', username: 'admin', status: 1 },
				{ id: 2, fullname: 'pengguna 1', username: 'user1', status: 0},
				{ id: 3, fullname: 'pengguna 2', username: 'user2', status: 1}
			],
			proxy: {
				type: 'memory'
			}
		});

		Ext.apply(me, {
			xtype: 'grid',
			itemId: 'gridusers',
			title: 'Daftar Pengguna',
			selModel: App.util.box.createSelectionModel(),
			store: store,
			columns: [
				{
					xtype: 'rownumberer',
					text: '#'
				},
				{
					text: 'Nama Lengkap',
					flex: 2,
					dataIndex: 'fullname',
					renderer: function (v) {
						return Ext.util.Format.capitalize(v);
					}
				},
				{
					text: 'Username',
					flex: 2,
					dataIndex: 'username',
					renderer: function (v) {
						return Ext.util.Format.capitalize(v);
					}
				},
				{
					header: 'Status',
					xtype: 'actioncolumn',
					width: 40,
					items: [
						{
							iconCls: 'setup',
							tooltip: 'Actif/non aktif',
							handler: function (grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var status = rec.get('status');
								var msg = (parseInt(status) == 1 ) ? 'di aktifkan' : 'di nonaktifkan';

								Ext.MessageBox.confirm('Confirm', 'Apakah user [' + rec.get('username') + '] akan ' + msg + ' ? ', function (btn, text) {
									if (btn == 'yes') {
										log(rec);
										/*Proses Aktif atau menon aktifkan */
										log(gettoken());
									}
								});
							}
						}
					]},
				{
					header: translations.remove,
					xtype: 'actioncolumn',
					width: 40,
					items: [
						{
							iconCls: 'delete',
							tooltip: 'Delete',
							handler: function (grid, rowIndex, colIndex) {
								Ext.MessageBox.confirm('Confirm', 'Apakah Anda Yakin akan menghapus data pengguna ini ?', function (btn, text) {
									if (btn == 'yes') {
										var rec = grid.getStore().getAt(rowIndex);
//										log(rec);
										grid.getStore().remove(rec);
										grid.getStore().sync();
										grid.getStore().load();
									}
								});
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
							text: translations.add,
							iconCls: 'add',
							action: 'add'
						},
						{
							text: translations.remove,
							iconCls: 'delete',
							action: 'remove'
						}
					]
				},
				{
					dock: 'bottom',
					xtype: 'pagingtoolbar',
					displayInfo: true,
					store: store
				}
			]

		});
		me.callParent(arguments);
	}
});
