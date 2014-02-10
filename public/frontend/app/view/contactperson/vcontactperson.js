/**
 * View contactperson
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
Ext.define('App.view.contactperson.vcontactperson', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appcontactpersonvcontactperson',
	config: {
		parentId: null,
		parentName: null,
		parenttype: null,

		/*Simulasi*/
//		parentId: 2,
//		parentName: 'test aja',
//		parenttype: 'supplier',

		storeGrid: 'App.store.contactperson.scontactperson'
	},
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {

			items: [
				{
					xtype: 'grid',
					itemId: 'listcontacts',
					store: me.getStoreGrid(),
					selModel: App.util.box.createSelectionModel(),
					defaults: {
						flex: 1
					},
					columns: [
						{
							xtype: 'rownumberer',
							text: '#'
						},
						{
							dataIndex: 'name',
							text: translations.name,
							flex: 2
						},
						{
							dataIndex: 'dept_id',
							text: translations.deptname,
							renderer : function(v, m,r){
								return r.get('deptname');
							}
						},
						{
							dataIndex: 'pos_id',
							text: translations.posname,
							renderer : function(v, m,r){
								return r.get('posname');
							}
						},
						{
							dataIndex: 'phone',
							text: translations.phonenumber
						},
						{
							dataIndex: 'fax',
							text: translations.fax
						},
						{
							header: 'act',
							xtype: 'actioncolumn',
							width: 40,
							items: [
								{
									iconCls: 'delete',
									tooltip: 'Delete',
									handler: function (grid, rowIndex, colIndex) {
										Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin menghapus record ini ?', function (btn, text) {
											if (btn == 'yes') {
												var rec = grid.getStore().getAt(rowIndex);
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
							items: [
								{
									text: translations.add,
									iconCls: 'add',
									action: 'add',
//									disabled : (me.getParentId() == null)
								},
								{
									text: translations.remove,
									iconCls: 'delete',
									action: 'remove',
//									disabled : (me.getParentId() == null)
								},
								'->',
								{
									text: translations.import,
									iconCls: 'excel',
									action: 'import'
								},
								{
									text: translations.export,
									iconCls: 'excel',
									action: 'export'
								},
								{
									text: translations.help,
									iconCls: 'help',
									action: 'help'
								}
							]
						},
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: me.getStoreGrid(),
							displayInfo: true
						}
					]
				}
			]
		});
		me.callParent(arguments);
//		me.down('#listcontacts').getStore().load();
	}
});
