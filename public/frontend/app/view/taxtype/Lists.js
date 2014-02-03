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

Ext.define('App.view.taxtype.Lists', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.apptaxtypevtaxtypeLists',
    emptyText: 'Empty Tax Type',
	config:{
		store: 'App.store.taxtype.staxtype'
	},

	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			selModel:App.util.box.createSelectionModel(),

			columns:[
				{
					xtype:'rownumberer'
				},
				{
					dataIndex: 'name',
					header: 'Name',flex: 1
				},{
					dataIndex: 'info',
					header: 'Description',flex: 2
				},
				{
					header: 'Action',
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
			dockedItems:[
				{
					xtype: 'toolbar',
					dock: 'top',
					items:[
						{
							text: 'Add',
							iconCls: 'add',
							itemId: 'add'
						},{
							text: 'Remove',
							iconCls: 'delete',
							itemId: 'remove'
						},'->',
						{
							text: 'Import',
							iconCls: 'excel',
							itemId: 'import',
							handler: function(){ belumImplement();}
						},{
							text: 'Export',
							iconCls: 'excel',
							itemId: 'export',
							handler: function(){ belumImplement();}
						},{
							text: 'Help',
							iconCls: 'help',
							itemId: 'help',
							handler: function(){ belumImplement();}
						}
					]
				},
				{
					xtype : 'pagingtoolbar',
					dock: 'bottom',
					displayInfo:true,
					store: me.getStore()
				}
			]
		});
		me.callParent(arguments);
	}

});