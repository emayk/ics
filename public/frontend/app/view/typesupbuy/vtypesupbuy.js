/**
 * View typesupbuy
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
Ext.define('App.view.typesupbuy.vtypesupbuy', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apptypesupbuyvtypesupbuy',
	padding: 10,
	frame: true,
	layout: { type : 'fit', align: 'stretch'},
	store: 'App.store.typesupbuy.stypesupbuy',
	initComponent: function () {
		Ext.apply(this, {
			items: [
				{xtype: 'grid',
					itemId: 'gridtype',
					store: this.store,
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToEdit: !1,
							pluginId: 'cellEditorType',
							clicksToMoveEditor: 1
						})
					],
					columns: [
						{
							text: '#',
							xtype: 'rownumberer'
						},
						{
							text: 'Name',
							dataIndex: 'name',
							flex: 2,
							editor: {
								allowblank: false
							}
						},
						{
							text: 'Description',
							dataIndex: 'info',
							flex: 2,
							editor: {
								allowblank: true
							}
						}
					],
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{ text: 'Add', action: 'add', iconCls: 'add', tooltip: 'Add Record Type'},
								{ text: 'Remove', action: 'remove', iconCls: 'delete', tooltip: 'Remove Record Type'},
								'->',
								{ text: 'Import', action: 'import', iconCls: 'excel', tooltip: 'Import Record From Excel'},
								{ text: 'Export', action: 'export', iconCls: 'excel', tooltip: 'Export Record To Excel'},
								{ text: 'Help', action: 'help', iconCls: 'help', tooltip: 'Help'}
							]
						},
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: this.store,
							displayInfo: true
						}
					]
				}
			]
		});
		this.callParent(arguments);
		this.down('grid').getStore().load();
	}

});
