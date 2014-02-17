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
 * Item Barang 2 yang akan di proses,
 */
Ext.define('App.model.approvepr.mitem', {
	extend: 'Ext.data.Model',
	fields: ['id',
		{ name : 'name', mapping: 'products.name' } ,
		{ name : 'code', mapping: 'products.codeinternal' } ,
		'price',
		'qty',
		'subtotal',
		{ name : 'category', mapping: 'products.catname' } ,
		{ name : 'type', mapping: 'products.typename' } ,
		{ name : 'unit', mapping: 'products.widthname' }
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/transaction/prapprove',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

});