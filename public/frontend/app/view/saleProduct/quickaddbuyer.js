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

Ext.define('App.view.saleProduct.quickaddbuyer', {
	extend: 'Ext.window.Window',
	alias: 'widget.appsaleProductvsaleProductAddbuyer',
	padding: 10,
	height: 250,
	width: 400,
	modal: true,
	layout: {type: 'fit', align: 'stretch'},
	title: 'Quick Add Buyer',
	initComponent: function () {

		Ext.apply(this, {
			items: [
				{
					xtype: 'form',
					flex: 1,
					itemId: 'formbuyer',
					frame: true,
					defaults: {
						anchor: '100%',
						xtype: 'textfield'
					},
					bodyPadding: 5,
					items: [
						{
							xtype: 'hiddenfield',
							name: 'quickadd',
							value: true
						},
						{
							name: 'name',
							fieldLabel: 'Name',
							allowblank: false
						},
						{
							name: 'phone',
							fieldLabel: 'Phone', allowblank: true
						},
						{
							xtype: 'textareafield',
							name: 'address',
							grow: true,
							fieldLabel: 'Address',
							allowblank: true
						}
					],
					buttons: [
						{ text: 'Help', iconCls: 'help', itemId: 'help',
							handler: function (btn) {
								belumImplement()
							}
						},
						'->',
						{ text: 'Add', iconCls: 'add', formBind: true, itemId: 'add', disabled: true },
						{ text: 'Cancel', iconCls: 'close', itemId: 'cancel',
							handler: function (btn) {
								btn.up('window').close();
							}}
					]
				}
			]
		});
		this.callParent(arguments);
	}
});