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


Ext.define('App.view.offices.viewOffice', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appofficesviewoffices',
	layout: { type: 'vbox', align: 'stretch'},
	title: 'New Office',
	bodyPadding: 5,
	requires:[
		'App.form.combobox.cbCountries',
		'App.form.combobox.cbProvinces',
		'App.form.combobox.cbCities',
		'App.view.offices.winAddLocation',
//		'App.view.contacts.vcontacts'
		'App.view.contacts.vLists'
	],
	frame: true,
	config: {
		formtitle : null
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'form',
					autoScroll: true,
					itemId: 'formoffice',
					flex: .5,
					bodyPadding: 4,
					margin: '0 0 10 0',
					defaults: {
						anchor: '95%'
					},
					title: this.getFormtitle(),
					items: [
						{xtype: 'hiddenfield', name: 'newrecord'},
						{ xtype: 'textareafield', name: 'address', fieldLabel: 'Alamat', grow: true, margin: '5 0 5 0',allowblank:false },
						{
							xtype: 'fieldcontainer',
							itemId: 'country',
							layout: { type: 'hbox', align: 'stretch'},
							items:[
								{ xtype: 'cbCountries', name: 'country_id', fieldLabel: 'Negara',flex :1  },
								{ xtype: 'button', itemId:'addcountry', iconCls:'add',margin: '0 0 0 5'}
							]
						},
						{
							xtype: 'fieldcontainer',
							itemId: 'province',
							layout: { type: 'hbox', align: 'stretch'},
							items:[
								{ xtype: 'cbProvinces', name: 'province_id', fieldLabel: 'Provinsi',flex :1  },
								{ xtype: 'button', itemId:'addprovince', iconCls:'add',margin: '0 0 0 5'}
							]
						},
						{
							xtype: 'fieldcontainer',
							itemId: 'city',
							layout: { type: 'hbox', align: 'stretch'},
							items:[
								{ xtype: 'cbCities', name: 'city_id', fieldLabel: 'Kota',flex :1  },
								{ xtype: 'button', itemId:'addcity', iconCls:'add',margin: '0 0 0 5'}
							]
						},

						{ xtype: 'textfield', name: 'postcode', fieldLabel: 'Kode Pos' },
						{ xtype: 'checkbox', name: 'mainoffice', fieldLabel: 'Kantor Pusat' }
					],
					dockedItems: [
						{ xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{ text: 'Bantuan', iconCls: 'help', action: 'help', itemId: 'help' },
								'->',
								{ text: 'Save', iconCls: 'save', action: 'save', itemId: 'save',formBind:true},
								'-',
								{ text: 'Cancel', iconCls: 'close', action: 'cancel', itemId: 'cancel' }
							]
						}
					]
				},
				{ xtype: 'splitter'},
				{
					xtype: 'container',
					flex: .5,
					layout: 'card',
					itemId: 'pagePhone',
					items: [

						{ xtype: 'tabpanel',
							itemId: 'phonetabs',
							layout: { type: 'fit', align: 'stretch'},
							items: [
							/**
							 * Phone Office Page
							 */
								{xtype : 'appofficesgridphone',itemId:'gridPhones'},
							/**
							 * halaman Contact pada office
							 */
								{
									xtype : 'appcontactsvcontactslist',itemId: 'gridcontacts',title : 'Contacts', flex: 1
								}
							]
						},
						{ xtype: 'container', html: 'Harap Input Form Diatas terlebih dahulu', itemId: 'welcome' }
					]
				}
			]
		});
		me.callParent(arguments);
		me.down('#formoffice #save').setDisabled(true);
	}
});





