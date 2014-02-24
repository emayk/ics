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
//	fields: ['id',
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
//
	fields: [
		/*Product*/
		{ name: 'name', mapping: 'adjitem.product.name'},
		{ name: 'code', mapping: 'adjitem.product.codeinternal'},
		{ name: 'category', mapping: 'adjitem.product.catname'},
		{ name: 'type', mapping: 'adjitem.product.typename'},
		{ name: 'unit', mapping: 'adjitem.product.widthname'},
		/*Supplier*/
		{ name: 'contact', mapping: 'adjitem.contact.name'},
		{ name: 'supplier', mapping: 'adjitem.supplier.name'},
		/*Billing*/
		{ name: 'currency', mapping: 'adjitem.currency.name'},
		{ name: 'rate', mapping: 'adjitem.rate'},
		{ name: 'paymenttype', mapping: 'adjitem.paymenttype.name'},
		{ name: 'taxtype', mapping: 'adjitem.taxtype.name'},
		/*Shipping*/
		{ name: 'warehouse', mapping: 'adjitem.warehouse.name'},
		{ name: 'delivery_at', mapping: 'adjitem.delivery_at', type: 'date'},
		/*Price*/
		{ name: 'qtyadj', mapping: 'adjitem.qty'},
		{ name: 'qtypr', mapping: 'adjitem.qtypr'},
		{ name: 'price', mapping: 'adjitem.price'},
		{ name: 'subtotal', mapping: 'adjitem.subtotal'},
		{
			name: 'approved'
		}
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/transaction/prapprove',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

});