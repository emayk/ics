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

Ext.define('App.view.typesupbuy.wintype', {
	extend: 'Ext.window.Window',
	alias: 'widget.apptypesupbuywintype',
	padding: 10,
	frame: true,
	title: 'Add Type ',
	layout: { type: 'fit', align: 'stretch'},
	height: 150,
	width: 350,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'form',
					bodyPadding: 5,
					defaults: {
						anchor: '95%'
					},
					items: [
						{
							xtype: 'textfield',
							name: 'name',
							fieldLabel: 'Nama',
							allowBlank:false
						},
						{
							xtype: 'textfield',
							name: 'info',
							fieldLabel: 'Keterangan '
						}
					]
				}
			],

			bbar: [
				{ text: 'Bantuan', iconCls: 'help', action: 'help' },
				'->',
				{ text: 'Save', iconCls: 'add', action: 'save' },
				{ text: 'Cancel', iconCls: 'close',
					handler: function (btn) {
						btn.up('window').close();
					}
				}
			]
		});
		me.callParent(arguments);

	}
});