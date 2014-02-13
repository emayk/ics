/**
 * View catprod
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
Ext.define('App.view.catprod.vcatprod', {
    extend: 'Ext.panel.Panel',
//    extend: 'Ext.tab.Panel',
    alias: 'widget.appcatprodvcatprod',
	padding: 10,
	frame: true,
	layout: { type : 'fit', align: 'stretch'},
	config: {
		store: 'App.store.catprod.scatprod'
	},
	initComponent: function () {
		Ext.apply(this, {
			items: [
				{xtype: 'grid',
					itemId: 'gridcatprod',
					store: this.getStore(),
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToEdit: !1,
							pluginId: 'cellEditor',
							clicksToMoveEditor: 1
						})
					],
					columns: [
						{
							text: '#',
							xtype: 'rownumberer'
						},
						{
							text: 'Nama',
							dataIndex: 'name',
							flex: 2,
							editor: {
								allowblank: false
							}
						},
						{
							text: 'Keterangan',
							dataIndex: 'info',
							flex: 2,
							editor: {
								allowblank: true
							}
						},
						{
							header: 'Aksi',
							xtype: 'actioncolumn',
							flex: .4,
							items: [
								{
									tooltip: 'Delete',
									iconCls: 'delete',
									handler: App.util.box.deleteSingleRecordFromGrid
								}
							]
						}
					],
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{ text: translations.add, action: 'add', iconCls: 'add', tooltip: 'Add Record Type'},
								{ text: translations.remove, action: 'remove', iconCls: 'delete', tooltip: 'Remove Record Type'},
								'->',
								{ text: translations.import, action: 'import', iconCls: 'excel', tooltip: 'Import Record From Excel'},
								{ text: translations.export, action: 'export', iconCls: 'excel', tooltip: 'Export Record To Excel'},
								{ text: translations.help, action: 'help', iconCls: 'help', tooltip: 'Help'}
							]
						},
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							store: this.store,
							displayInfo: true
						}
					],
					selModel:App.util.box.createSelectionModel()
				}
			]
		});
		this.callParent(arguments);
		this.down('grid').getStore().load();
	}
});
