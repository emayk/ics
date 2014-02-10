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



Ext.define('App.view.users.treemenu', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.appviewuserstreemenu',
	requires: [
		'Ext.data.TreeStore'
	],
//	xtype: 'check-tree',
	autoScroll: true,
	layout: {
		type: 'fit', align: 'stretch'
	},
	rootVisible: false,
	useArrows: true,
	initComponent: function () {
		log(App.util.box.maxHeightwindow());

		Ext.apply(this, {
			height: 350 ,
			store: new Ext.data.TreeStore({
				proxy: {
					type: 'ajax',
					url: '/packages/emayk/ics/frontend/app/data/treemenu.json'
				},
				sorters: [
					{
						property: 'leaf',
						direction: 'ASC'
					},
					{
						property: 'text',
						direction: 'ASC'
					}
				]
			}),
			tbar: [
				{
					text: 'Get checked nodes',
					scope: this,
					handler: this.onCheckedNodesClick
				}
			]
		});
		this.callParent();

	},

	onCheckedNodesClick: function () {
		var records = this.getView().getChecked(),
			names = [];

		Ext.Array.each(records, function (rec) {
			names.push(rec.get('id'));
		});

		/*Lakukan kirim ke server */

//		Ext.MessageBox.show({
//			title: 'Selected Nodes',
//			msg: names.join('<br />'),
//			icon: Ext.MessageBox.INFO
//		});
	}
});


