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

Ext.define('App.view.pradjustment.tab', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.apppradjustmentvpradjustmenttab',
	layout: { type: 'fit', align: 'stretch'},
	groupid: 5,
	bodyPadding: 2,
	frame: true,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			autoScroll: true,
			items: [
				{ xtype: 'apppradjustmentvpradjustmentSupContact', flex: 1 },
				{ xtype: 'apppradjustmentvpradjustmentWarehouse', flex: 1 },
				{ xtype: 'apppradjustmentvpradjustmentOther', flex: 1 },
//						{ xtype: 'container', flex: 1, title: 'Supplier dan Contact' }
			],
			plugins: [
				{
					ptype: 'tabscrollermenu',
					maxText: 15,
					pageSize: 5
				}
			]
		});
		me.callParent(arguments);
	},
});