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
Ext.define('App.view.users.form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.appusersvform',
	requires: [
		'App.view.users.treemenu'
	],
	config: {
		hiddentree: true,
		closable: true
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me,
			{
				bodyPadding: 10,
				defaults: {
					anchor: '95%'
				},
				title: 'Informasi [user]',
				itemId: 'formuser',
				items: [
					{ xtype: 'textfield', fieldLabel: 'Nama Lengkap', name: 'fullname' },
					{ xtype: 'textfield', fieldLabel: 'Username', name: 'username'},
					{ xtype: 'textfield', fieldLabel: 'Alamat Email', name: 'email', vtype: 'email', margin: '0 0 10 0'},
					{
						xtype: 'fieldcontainer',
						layout: { type: 'hbox', align: 'stretch'},
						fieldLabel: 'Kata Sandi',

						items: [
							{
								flex: .5,
								margin: '0 5 0 0',
								xtype: 'textfield', fieldLabel: '', name: 'password',
//								labelWidth: 200,
//								anchor: '95%',
								inputType: 'password'
							},
							{
								flex: .5,
								margin: '0 0 0 5',
								xtype: 'textfield', fieldLabel: 'Konfirm Kata sandi', name: 'confpassword',
//								anchor: '95%',
								inputType: 'password',
								labelWidth: 200
							}
						]
					},

					{
						xtype: 'container',
						frame: true,
						items: [
							{
								xtype: 'tabpanel',
								plain: true,
								bodyPadding: 10,
								items: [
									{
										xtype: 'container',
										title: 'Menu',
										layout: { type: 'hbox', align: 'stretch'},
										items: [
											/*Hak Akses dan wewenang */
											{
												xtype: 'container',
												flex: .5,
												xtype: 'appviewuserstreemenu'
												/*Jika Bukan new Record Tampilkan */
//												hidden: me.getHiddentree()
											},
											{
												xtype: 'container',
												frame: true,
												flex: .5
											}
										]
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
								text: translations.save,
								action: 'addorupdate',
								iconCls: 'save'
							},
							{
								text: translations.close,
								action: 'close',
								iconCls: 'close'
							}
						]
					}
				]
			}
		);
		me.callParent(arguments);
	}
});
