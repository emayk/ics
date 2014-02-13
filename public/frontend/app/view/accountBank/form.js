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



Ext.define('App.view.accountBank.form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.appaccountBankform',
	itemId: 'formaccount',
	requires: [
		'App.form.combobox.cbBank',
		'App.form.combobox.cbCurrencies',
		'App.form.combobox.cbTypeTax'
	],
	bodyPadding: 10,
	layout: 'anchor',
	defaults: {
		anchor: '95%',
		labelWidth: 150
	},
	frame: true,
	initComponent: function(){
		var me = this;
		Ext.apply(me,{
			width: App.util.box.maxWidthWindow() - 100,
			items: [
				{ xtype: 'hiddenfield', name: 'owner_id'},
				{ xtype: 'hiddenfield', name: 'owner_type'},
				{
					xtype: 'textfield',
					fieldLabel: translations.accountbank.name,
					name: 'name',
//			disabled: true,
					allowblank: false
				},
				{
					xtype: 'textfield',
					fieldLabel: translations.accountbank.number,
//			disabled: true,
					name: 'number',
					allowblank: false
				},
				{
					xtype: 'fieldcontainer',
					flex: 1,
					fieldLabel: translations.accountbank.bankname,
					layout: { type: 'hbox', align: 'stretch'},
					items: [
						{
							/*Combo box Bank*/
							flex: 1,
							xtype: 'cbBank',
							fieldLabel: '',
//					disabled: true,
							allowblank: false,
							name: 'bank_id'
						},
						{
							margin: '0 0 0 5',
							xtype: 'button',
							iconCls: 'add',
							action: 'addbank'
						}
					]
				},
				{
					xtype: 'fieldcontainer',
					fieldLabel: translations.currency,
					layout: { type: 'hbox', align: 'stretch'},
					items: [
						{
							/*CurrencyAccount */
							flex: 1,
							xtype: 'cbcurrencies',
							fieldLabel:'',
//					disabled: true,
							allowblank: false,
							name: 'currency_id'
						},
						{
							margin: '0 0 0 5',
							xtype: 'button',
							iconCls: 'add',
							action: 'addcurrency'
						}
					]
				},
				{
					xtype: 'fieldcontainer',
					fieldLabel: translations.typetax,
					layout: { type: 'hbox', align: 'stretch'},
					items: [
						{
							/*Taxt Account  */
							flex: 1,
							xtype: 'cbtypetax',
							fieldLabel:'',
//					disabled: true,
							name: 'tax_id',
							allowblank: false
						},
						{
							margin: '0 0 0 5',
							xtype: 'button',
							iconCls: 'add',
							action: 'addtax'
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
							action: 'help',
							text: translations.help,
							iconCls: 'help'
						},
						'->',
						{
							itemId: 'save',
							action: 'save',
							iconCls: 'save',
							text: translations.save,
							tooltip: 'Save Record'
						},
						{
							action: 'close',
							iconCls: 'close',
							text: translations.close,
							tooltip: 'Save Record'
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});
