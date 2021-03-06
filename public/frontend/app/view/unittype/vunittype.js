/**
 * View unittype
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
Ext.define('App.view.unittype.vunittype', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appunittypevunittype',
	layout: { type: 'vbox', align: 'stretch'},
	storegrid : 'App.store.unittype.sunittype',
	initComponent: function(){
		Ext.apply(this,{
			items: [
				{
					xtype: 'grid',
					itemId: 'type',
					flex: 1,
					store: this.storegrid,
					columns: [
						{
							xtype: 'rownumberer'
						},
						{
							header: 'Name',
							dataIndex: 'name',
							flex: 1,
							editor: { allowBlank: false }
						},
						{
							header: 'Description ',
							dataIndex: 'info',
							flex: 1,
							editor: {
								allowBlank: true
							}
						},
//						{
//							header: 'UUID',
//							flex: 1,
//							dataIndex: 'uuid'
//						},
						{
							header: 'Action',
							xtype: 'actioncolumn',
							width: 40,
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
							pluginId: 'cellEditor',
							clicksToMoveEditor: 1
						})
					],
					/*==========  DockedItems  ==========*/
					dockedItems: [
						{
							xtype: 'toolbar',
							items: [
								{
									action: 'add',
									itemId: 'add',
									iconCls: 'add',
									text: 'Add'
								},
								{
									action: 'remove',
									text: 'Remove',
									itemId: 'remove',
									iconCls: 'delete',
									disabled: true
								},
								'->',
								{

									text: 'Import',
									itemId: 'import',
									iconCls: 'excel',
									handler: function () {
										belumImplement()
									}
								},
								{
									text: 'Export',
									itemId: 'export',
									iconCls: 'excel',
									handler: function () {
										belumImplement()
									}
								},
								{
									text: 'Help',
									itemId: 'help',
									iconCls: 'help',
									handler: function () {
										belumImplement()
									}
								}
							]
						},
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: this.storegrid,
							displayInfo: true
						}
					]
				}
			]
		});
		this.callParent(arguments);
	}

});
