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

Ext.define('App.view.catprod.treegrid', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.appcatprodtreegrid',
	config: {
		store: 'App.store.catprod.treegrid'
	},

//	storetree: 'App.store.catprod.treegrid',

	initComponent: function() {

		Ext.apply(this, {
//			title: 'Core Team Projects',
//			height: 300,
//			useArrows: true,
//			rootVisible: false,
//			multiSelect: true,
//			singleExpand: false,
//			width : 600,
////			store: new Ext.data.TreeStore({
////				model: App.model.catprod.treegrid
////			}),
////			store : 'App.store.catprod.treegrid',
//			store : this.getStore(),
//			columns: [{
//				xtype: 'treecolumn', //this is so we know which column will show the tree
//				text: 'Task',
//				flex: 2,
//				sortable: true,
//				dataIndex: 'task'
//			},{
//				//we must use the templateheader component so we can use a custom tpl
//				xtype: 'templatecolumn',
//				text: 'Duration',
//				flex: 1,
//				sortable: true,
//				dataIndex: 'duration',
//				align: 'center',
//				//add in the custom tpl for the rows
//				tpl: Ext.create('Ext.XTemplate', '{duration:this.formatHours}', {
//					formatHours: function(v) {
//						if (v < 1) {
//							return Math.round(v * 60) + ' mins';
//						} else if (Math.floor(v) !== v) {
//							var min = v - Math.floor(v);
//							return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
//						} else {
//							return v + ' hour' + (v === 1 ? '' : 's');
//						}
//					}
//				})
//			},{
//				text: 'Assigned To',
//				flex: 1,
//				dataIndex: 'user',
//				sortable: true
//			}, {
//				xtype: 'checkcolumn',
//				header: 'Done',
//				dataIndex: 'done',
//				width: 55,
//				stopSelection: false,
//				menuDisabled: true
//			}, {
//				text: 'Edit',
//				width: 55,
//				menuDisabled: true,
//				xtype: 'actioncolumn',
//				tooltip: 'Edit task',
//				align: 'center',
//				iconCls: 'edit',
//				handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
//					Ext.MessageBox.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
////					Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
//				},
//				// Only leaf level tasks may be edited
//				isDisabled: function(view, rowIdx, colIdx, item, record) {
//					return !record.data.leaf;
//				}
//			}],
//			dockedItems:[
//				{
//					xtype : 'toolbar',
//					items:[
//						{text:'refresh',action: 'refresh',iconCls: 'refresh',
//							handler: function(btn){
//								var treegrid = btn.up('appcatprodtreegrid');
//								treegrid.getStore().reload();
//							}
//						}
//					]
//				}
////				{
////					xtype: 'pagingtoolbar',
////					store: this.storetree,
////					displayInfo: true
////				}
//			]



			collapsible: true,
			loadMask: true,
			useArrows: true,
			rootVisible: false,
			store: this.getStore(),
			animate: true,
			plugins: [{
				ptype: 'bufferedrenderer'
			}],
			columns: [{
				xtype: 'treecolumn', //this is so we know which column will show the tree
				text: 'Forum',
				flex: 2.5,
				sortable: true,
				dataIndex: 'forumtitle'
			},{
				text: 'User',
				flex: 1,
				dataIndex: 'username',
				sortable: true
			}, {
				text: 'Title',
				flex: 2,
				dataIndex: 'title',
				renderer:  function renderTitle(value, p, record) {
					return value ? Ext.String.format(
						'<a href="http://sencha.com/forum/showthread.php?t={1}" target="_blank">{0}</a>',
						value,
						record.data.threadid
					) : '';
				}
			}]

		});
		this.callParent(arguments);

	}
});

