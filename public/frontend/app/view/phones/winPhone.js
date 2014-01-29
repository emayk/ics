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


/**
 * Penggunaan
 * Ext.create('App.view.phones.winPhone',{parentId : 12, parentType: 'supplier'} );
 */
Ext.define('App.view.phones.winPhone', {
	extend: 'Ext.window.Window',
	alias: 'widget.appphoneswinphone',
	padding: 10,
	layout: { type: 'fit', align: 'stretch'},
	config: {
		parentId: null,
		parentType: null
	},
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
						{ xtype: 'textfield', name: 'number', fieldLabel: translations.phonenumber, allowblank: false},
						{ xtype: 'textfield', name: 'info', fieldLabel: translations.field.info},
						{
							xtype: 'combo',
							fieldLabel: translations.type,
							name : 'type',
							store: 'App.store.phones.typephone',
							queryMode: 'local',
							displayField: 'name',
							valueField: 'id',
							editable: false,
							forceSelection: false,
							tpl: App.util.Form.combobox_tpl,
							displayTpl: App.util.Form.combobox_displayTpl,
							allowblank:false
						},
						{ xtype: 'hiddenfield', name: 'parent_id', value: me.getParentId() },
						{ xtype: 'hiddenfield', name: 'parenttype', value: me.getParentType() }
					],
					bbar: [
						{ text: 'Help', iconCls: 'help', action: 'help' },
						'->',
						{ text: 'Save', iconCls: 'add', action: 'add' },
						{ text: 'Close', iconCls: 'close', handler: function (btn) {
							btn.up('window').close();
						} }
					]
				}
			]
		});
		me.callParent(arguments);
	}

});
