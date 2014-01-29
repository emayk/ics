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
Ext.define('App.form.combobox.location', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.cblocation',
	frame: true,
	defaults: {
		anchor: '95%'
	},
	initComponent: function () {
		var me = this;
		var cbCountry = Ext.create('App.store.combo.cbCountries');
		var cbProvince = Ext.create('App.store.combo.cbProvinces');
		var cbCity = Ext.create('App.store.combo.cbCities');
		Ext.apply(me, {
			items: [
				{
					store: cbCountry,
					name: 'country_id',
					xtype: 'combo',
					fieldLabel: translations.country,
//					emptyText: 'Pilih Negara',
					editable: false,
					allowBlank: false,
					forceSelection: true,
					valueField: 'id',
					displayField: 'name',
					triggerAction: 'all',
					queryMode: 'remote',
					pageSize: 10,
					listeners: {
						'select': function (field, nval, oval) {
							cbProvince.load({
								params: {'id': nval.data.value }
							});
						}
					}
				},
				{
					store: cbProvince,
					name: 'country_id',
					xtype: 'combo',
					fieldLabel: translations.province,
					emptyText: 'Pilih Provinsi',
					editable: false,
					allowBlank: false,
					forceSelection: true,
					valueField: 'id',
					displayField: 'name',
					triggerAction: 'all',
					queryMode: 'remote',
					pageSize: 10,
					listeners: {
						'select': function (field, nval, oval) {
							cbCity.load({
								params: {'id': nval.data.value }
							});
						}
					}
				},
				{
					store: cbCity,
					name: 'city_id',
					xtype: 'combo',
					fieldLabel: translations.city,
					emptyText: 'Pilih Kota',
					editable: false,
					allowBlank: false,
					forceSelection: true,
					valueField: 'id',
					displayField: 'name',
					triggerAction: 'all',
					queryMode: 'remote'
				}
			]
		});
		me.callParent(arguments);
	}


});
