/**
 * Model pradjustment
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

Ext.define('App.model.pradjustment.mpradjustment', {
	extend: 'Ext.data.Model',
	fields: [
		"createby_id",
		"created_at",
		"id",
		"lastupdateby_id",
		"prid",
		"status",
		"totalitems",
		{ name: "process",
			convert: function (v, rec) {
				return (rec.data.status != 1);
			}
		},
		"trxnumber",
		"updated_at",
		"uuid"
	],
//	fields: [
//		'id',
//		{ name : 'name', mapping: 'products.name' } ,
//		{ name : 'code', mapping: 'products.codeinternal' } ,
//		'price',
//		'qty',
//		'qtypr',
//		'subtotal',
//		'approved' ,
//		{ name : 'category', mapping: 'products.catname' } ,
//		{ name : 'type', mapping: 'products.typename' } ,
//		{ name : 'unit', mapping: 'products.widthname' },
//		'supplierid','contactid',
//		{
//			name: 'supname', mapping: 'supplier.name'
//		},{
//			name: 'salesname', mapping: 'contact.name'
//		},
//	],
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/transaction/pradjustment',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

})
;
