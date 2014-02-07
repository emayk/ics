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

Ext.define('App.view.contactperson.winForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.appcontactpersonwinform',
	config: {
		parentId: null,
		parentName: null,
		parenttype: null,
		isnewrecord: false
		/*Simulasi*/
//		parentId: 2,
//		parentName: 'test aja',
//		parenttype: 'supplier'
	},
	requires: [
		'App.form.combobox.cbDept',
		'App.form.combobox.cbPositions'
	],
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			width: App.util.box.maxWidthWindow() - 100,
			height: App.util.box.maxHeightwindow() - 100,
			layout: { type: 'fit', align: 'stretch'},
			items: [
				{
					xtype: 'form',
					itemId: 'formcontact',
					defaults: {
						anchor: '95%'
					},
					frame: true,
					padding: 10,
					items: [
						{ xtype: 'hiddenfield', value: me.getParentId(), name: 'parent_id' },
						{ xtype: 'hiddenfield', value: me.getParenttype(), name: 'parenttype' },
						{
							xtype: 'textfield',
							fieldLabel: translations.name,
							name: 'name'
						},
						{
							/*@todo: combo departement*/
							xtype: 'cbdept',
							fieldLabel: translations.deptname,
							name: 'dept_id'
						},
						{
							/*@todo: combo position*/
							xtype: 'cbpositions',
							fieldLabel: translations.posname,
							name: 'pos_id'
						},
						{
							xtype: 'fieldcontainer',
							layout: {
								type: 'hbox',
								align: 'stretch'
							},
							labelAlign: 'top',
							fieldLabel: '',
							items: [
								{
									xtype: 'textfield',
									name: 'phone',
									margin: '0 5 0 0',
									flex: .5,
									fieldLabel: translations.phonenumber
								},
								{
									xtype: 'textfield',
									margin: '0 0 0 5',
									flex: .5,
									name: 'fax',
									fieldLabel: translations.fax
								}
							]
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{
							text: translations.help,
							iconCls: 'help',
							action: 'help'
						},
						'->',
						{
							text: (me.getIsnewrecord()) ? translations.add : translations.save,
							iconCls: (me.getIsnewrecord()) ? 'add' : 'save',
							action: 'addorsave'
						},
						{
							text: translations.close,
							iconCls: 'close',
							action: 'close'
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});