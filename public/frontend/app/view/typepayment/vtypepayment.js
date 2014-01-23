/**
 * View typepayment
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
Ext.define('App.view.typepayment.vtypepayment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apptypepaymentvtypepayment',
	bodyPadding: 5,
	frame: true,
	layout: { type : 'fit', align: 'stretch'},
	storegrid : 'App.store.typepayment.stypepayment',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'grid',
					itemId: 'gridtypepayment',
					store: this.storegrid,
					defaults: {
						flex: 1
					},
					columnLines: true,
					columns: [
						{
							xtype: 'rownumberer',
							text: '#'
						},
						{text: "Name", dataIndex: "name", flex: 2, editor: {
							allowBlank: false
						}},
						{text: "Description", dataIndex: "info", flex: 2, editor: {
							allowBlank: true
						}},

//						{text: "Uuid", dataIndex: "uuid", flex: 2 },
//						{text: "Create By", dataIndex: "createby", flex: 1 },
//						{text: "Last Update", dataIndex: "updater", flex: 1 },
						{text: "Created At", dataIndex: "created_at", flex: 2, renderer: Ext.util.Format.dateRenderer('d F Y') },
						{text: "Updated At", dataIndex: "updated_at", flex: 2, renderer: Ext.util.Format.dateRenderer('d F Y') },
						{
							header: 'Action',
							xtype: 'actioncolumn',
							flex: .4,
							items: [
								{
									iconCls: 'delete',
									tooltip: 'Delete',
									handler: function (grid, rowIndex, colIndex) {
										Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
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
					columnLines: true,
					selModel: 'rowmodel',
					/*==========  Plugins  ==========*/
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToEdit: !1,
							pluginId: 'cellEditorTypePayment',
							clicksToMoveEditor: 1
						})
					],
					/**
					 * @todo : tambah Action Delete Disini
					 */

					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{
									text: 'Add',
									iconCls: 'add',
									itemId: 'add',
									action: 'add'
								},
								{
									text: 'Remove',
									iconCls: 'delete',
									itemId: 'remove',
									action: 'remove'
								},
								'->',
								{
									text: 'Import',
									iconCls: 'excel',
									itemId: 'import',
									action: 'import'
								},
								{
									text: 'Export',
									iconCls: 'excel',
									itemId: 'export',
									action: 'export'
								},
								{
									text: 'Help',
									iconCls: 'help',
									itemId: 'help',
									action: 'help'
								}
							]
						},
						{
							xtype: 'pagingtoolbar',
							displayInfo: true,
							dock: 'bottom',
							store: this.storegrid
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}

});
