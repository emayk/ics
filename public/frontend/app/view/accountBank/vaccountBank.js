/**
 * View accountBank
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

/**
 * Uml
 * @startuml
 * Ext.panel.Panel <|- App.view.accountBank.vaccountBank : Extends
 * App.view.accountBank.vaccountBank: initComponent();
 * @end
 */
Ext.define('App.view.accountBank.vaccountBank', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appaccountBankvaccountBank',
	title: 'Account Bank',
	requires: [
		'App.view.accountBank.Lists',
		'App.view.accountBank.form'
	],
	bodyPadding: 2,
	autoScroll: true,
	layout: { type: 'hbox', align: 'stretch'},
	storeAccount: null,
	setStore: function (store) {
		this.storeAccount = store;
	},
	initComponent: function () {
		Ext.apply(this, {
			items: [
				{
					xtype: 'appaccountBankvaccountBankList',
					flex: .6,
					emptyText: 'Empty Account Bank',
					storeAccount: this.storeAccount
				},
				{
					xtype: 'appaccountBankform',
					flex: .4,
					itemId: 'formAccountBank'
				}
			]
		});
		this.callParent(arguments);
	}
});
