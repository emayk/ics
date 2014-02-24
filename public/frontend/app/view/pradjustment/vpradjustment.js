/**
 * View pradjustment
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
Ext.define('App.view.pradjustment.vpradjustment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apppradjustmentvpradjustment',
	requires: [
		'App.view.pradjustment.lists'
	],
	layout: { type: 'fit', align: 'stretch'},
	groupid: 5,
	bodyPadding: 2,
	frame: true,
	config: {
		withtestgrid: false
	},
	initComponent: function () {
		var me = this, activetab = 0;
		Ext.apply(me, {

			items: [
				{
					xtype: 'tabpanel',
					itemId: 'tabadjustment',
					title: 'Penyesuaian Pembelian',
					iconCls: 'grid',
					activeTab: activetab,
					items: [
						{
							xtype: 'apppradjustmentvpradjustmentlists',
							iconCls: 'grid',
							itemId: 'listpradjustment',
							title: 'Daftar Penyesuaian Pembelian'
						}
					]
				}
			]

		});
		me.callParent(arguments);
	}
});




