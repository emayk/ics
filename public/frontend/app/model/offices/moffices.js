/**
 * Model offices
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
Ext.define('App.model.offices.moffices', {
	extend: 'Ext.data.Model',
	fields: [
		"id",
		"address",
		"country_id",
		"province_id",
		"city_id",
		"postcode",
		"type",
		"parent_id",
		"parent_type",
		{name : "parenttype", convert: undefined },
		"codeinternal",
		"mainoffice",
		"uuid",
		"createby_id",
		"lastupdateby_id",
		"created_at",
		"updated_at",
		"createby",
		"updateby",
		"countryname",
		"provincename",
		"cityname",
		"newrecord"
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/offices',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});
