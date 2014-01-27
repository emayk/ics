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




Ext.define('App.view.offices.winAddLocation', {
	extend: 'Ext.window.Window',
	alias: 'widget.appofficeswinaddlocation',

	config: {
		parentId: null,
		levelId: null,
		title: null
	},
	height: 150,
	width: 300,
	frame: true,
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{ xtype: 'form',
					itemId: 'formLocation',
					flex: 1,
					bodyPadding: 10,
					defaults: {
						anchor: '95%'
					},
					items: [
						{ xtype: 'hiddenfield', name: 'level', value: me.getLevelId() },
						{ xtype: 'hiddenfield', name: 'parent_id', value: me.getParentId() },
						{
							xtype: 'textfield',
							name: 'name',
							fieldLabel: 'Nama'
						},
						{
							xtype: 'textfield',
							name: 'info',
							fieldLabel: 'Deskripsi'
						}
					],
					dockedItems: [
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{ text: 'Help', iconCls: 'help', action: 'help' },
								'->',
								{ text: 'Save', iconCls: 'add', action: 'save' },
								{ text: 'Close', iconCls: 'close', action: 'close',
									handler: function (btn) {
										btn.up('window').close();
									}
								}
							]
						}
					]

				}
			]
		});
		me.callParent(arguments);
	}
});