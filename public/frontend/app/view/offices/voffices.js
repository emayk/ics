/**
 * View offices
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

Ext.define('App.view.offices.voffices', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.appofficesvoffices',
	requires: [
		'App.view.offices.viewOffice'
	],
	config: {
		/*Simulasi Parameter*/
		/*Ganti dengan parameter saat create*/
		parentId: 1,
		parentType: 'supplier',
//		parentId: null,
//		parentType: null,

		store: 'App.store.offices.soffices'
	},
	frame: true,
	plain: true,
	bodyPadding: 10,
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
				items: [
					{
						xtype: 'grid',
						columnLines: true,
						title: 'Lists',
						frame: true,
						flex: 1,
						itemId: 'office',
						store: this.getStore(),
						columns: [
							{
								xtype: 'rownumberer',
								text: '#'
							},
							{
								text: 'Main', flex: 1,
								dataIndex: 'mainoffice',
								renderer: function (v) {
									return (v == 0 ) ? 'Cabang' : 'Pusat';
								}
							},
							{
								text: 'Alamat', flex: 2,
								dataIndex: 'address',
								renderer: function (v, p, rec) {
									var city = (rec.get('cityname') == null ) ? ' ' : rec.get('cityname'),
										province = (rec.get('provincename') == null ) ? ' ' : rec.get('provincename'),
										country = (rec.get('countryname') == null ) ? ' ' : rec.get('countryname');
									return v + ' ' + rec.get('postcode') + ' ' + city +
										' ' + province + ' ' + country;
								}
							}
						],
						dockedItems: [
							{ xtype: 'toolbar',
								dock: 'top',
								items: [
									{ text: 'Add', iconCls: 'add', action: 'add', itemId: 'add' },
									{ text: 'Remove', iconCls: 'delete', action: 'remove', itemId: 'remove' },
									'->',
									{ text: 'Import', iconCls: 'excel', action: 'import', itemId: 'import' },
									{ text: 'Export', iconCls: 'excel', action: 'export', itemId: 'export' },
									{ text: 'Bantuan', iconCls: 'help', action: 'help', itemId: 'help' }
								]
							},
							{
								xtype: 'pagingtoolbar',
								store: this.getStore(),
								dock: 'bottom'
							}
						]
					}
//					{ xtype: 'appofficesviewoffices',itemId: 'viewoffice'}
				]
			}
		);
		me.callParent(arguments);
		me.down('grid#office').getStore().getProxy().setExtraParam('parenttype', me.getParentType());
		me.down('grid#office').getStore().getProxy().setExtraParam('parent_id', me.getParentId());
		me.down('grid#office').getStore().load();
	}
})
;
