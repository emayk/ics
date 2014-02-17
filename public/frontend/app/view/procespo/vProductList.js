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


Ext.define('App.view.procespo.vProductList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appprocespovProductList',
	config: {
		store: Ext.create('App.store.procespo.products')
	},
	initComponent: function () {
		var me = this;
		/*Initialize Component*/
		Ext.apply(me, {
			store: me.getStore(),
			autoScroll: true,
			selModel: App.util.box.createSelectionModel(),
			columns: {
				plugins: [
					{
						ptype: 'gridautoresizer'
					}
				],
				items: [
					{
						xtype: 'rownumberer'
					},
					{
						text: 'Nama',
						dataIndex: 'name'
					},
					{
						/*CL 7 */
						text: 'Total Panjang',
						dataIndex: 'totallength',
						flex: 1
					},
					{
						/*CL 7 */
						text: 'Total Roll',
						dataIndex: 'totalroll',
						flex: 1
					},
					{
						text: translations.field.design,
						dataIndex: 'nodesign',
						filter: true, flex: .5,
						flex: 1
					},
					{
						text: translations.field.contruction,
						dataIndex: 'contruction',
						filter: true, flex: .5,
						flex: 1
					},
					{
						text: translations.field.category.default,
						dataIndex: 'category',
						filter: true, flex: .5,
						flex: 1
					},
					{
						text: translations.field.type.default,
						dataIndex: 'type',
						filter: true, flex: .5,
						flex: 1
					},
					{
						text: translations.field.width,
						dataIndex: 'width',
						flex: .5
					}
				]
			},
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					store: me.getStore(),
					dock: 'bottom',
					displayInfo: true
				},
				{
					xtype: 'toolbar',
					layout: 'hbox',
					dock: 'top',
					items: [
						{ text: 'Pesan', action: 'order', iconCls: 'add', tooltip: 'Pesan Barang Yang terpilih' },
						'->',
						{
							xtype: 'textfield', fieldLabel: '', name: 'search', width:'50%', emptyText:'Cari Produk'
						},
						{
							text: '', iconCls: 'find', action: 'searchbtn'
						}
					]
				}
			]
		});
		me.callParent(arguments);
		me.getStore().load();
//		me.getStore().loadData(me.generateData());
	}
});
