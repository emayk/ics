/**
 * View users
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
Ext.define('App.view.users.vusers', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appusersvusers',
	requires:[
		'App.view.users.form',
		'App.view.users.lists'
	],
	bodyPadding: 10,
	frame: true,
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					activeTab: 1,
					itemId: 'tabusers',
					plain: true,
					items: [
						/*Daftar User*/
						{ xtype: 'appusersvgridusers' },
						/*Form penambahan / Edit user */
						{
							xtype: 'appusersvform',
							hiddentree:true
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}

});
