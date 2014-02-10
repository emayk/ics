/**
 * View users
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
Ext.define('App.view.users.vusers', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appusersvusers',
	requires: [
		'App.view.users.treemenu'
	],
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			fields: [
				'id', 'username',

			],
			data: [
				{ id: 1, fullname: 'administrator', username: 'admin' },
				{ id: 2, fullname: 'pengguna ', username: 'user' }
			],
			proxy: {
				type: 'memory'
			}
		});
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					activeTab:1,
					itemId: 'tabusers',

					items: [
						/*Daftar User*/
						{
							xtype: 'grid',
							itemId: 'gridusers',
							title: 'Daftar Pengguna',
							store: store,
							columns: [
								{
									xtype: 'rownumberer',
									text: '#'
								},
								{
									text: 'username',
									dataIndex: 'username'
								},
								{
									header: 'Action',
									xtype: 'actioncolumn',
									width: 60,
									items: [
										{
											iconCls: 'delete',
											tooltip: 'Actif/non aktif',
											handler: function (grid, rowIndex, colIndex) {
												Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
													if (btn == 'yes') {
														var rec = grid.getStore().getAt(rowIndex);
														log(rec);
//														grid.getStore().remove(rec);
//														grid.getStore().sync();
//														grid.getStore().load();
													}
												});
											}
										},
										{
											iconCls: 'show',
											tooltip: 'Delete',
											handler: function (grid, rowIndex, colIndex) {
												Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
													if (btn == 'yes') {
														var rec = grid.getStore().getAt(rowIndex);
														log(rec);
//														grid.getStore().remove(rec);
//														grid.getStore().sync();
//														grid.getStore().load();
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
									xtype: 'pagingtoolbar',
									displayInfo: true,
									store: store
								}
							]

						},
						/*Form penambahan / Edit user */
						{
							xtype: 'form',
							bodyPadding: 10,
							defaults:{
								anchor: '95%'
							},
							title: 'Informasi [user]',
							itemId: 'formuser',
							closable: true,
							items: [
								{ xtype: 'textfield', fieldLabel: 'Nama Lengkap', name: 'fullname' },
								{ xtype: 'textfield', fieldLabel: 'Username', name: 'username'},
								{ xtype: 'textfield', fieldLabel: 'Alamat Email', name: 'email', vtype: 'email'},
								{
									xtype: 'container',
									items: [
										{
											xtype: 'tabpanel',
											items: [
												{
													xtype: 'container',
													title: 'Menu',
													layout: { type: 'hbox', align: 'stretch'},
													items: [
														/*Hak Akses dan wewenang */
														{
															xtype: 'container',
															flex: .5,
//															html: 'Menu2 yang akan dipilih User'
//															xtype: 'appviewuserstreemenu',
														},
														{
															xtype: 'container',
															flex: .5,
//															html: 'Space Kosong'
														}
													]
												}
											]
										}
									]
								}
							]

						}
					]
				}
			]
		});
		me.callParent(arguments);
	}

});
