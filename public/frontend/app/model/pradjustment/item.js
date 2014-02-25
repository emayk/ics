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


Ext.define('App.model.pradjustment.item', {
	extend: 'Ext.data.Model',
	fields: [
		"adjprid",
		"cp_id",
		{
			name: "cpname",
			mapping: "contact.name"
//			convert: function (v, r) {
//				var cpid = r.data.cp_id;
//				return (cpid == 0) ? 'Belum diset' : r.data.contact.name;
//			}
		},
		{
			name : 'currname', mapping: 'currency.name'
		},
		"createby_id",
		"created_at",
		{ name: "credit", mapping:'supplier.kredit'},
		"curr_id",
		"id",
		"lastupdateby_id",
		"paymenttype_id",
		{
			name : 'paymenttypename', mapping: 'paymenttype.name'
		},
		"price",
		"pritem",
		"product_id",
		{
			name: 'prodcode', mapping: 'product.codeinternal'
		}, {
			name: 'prodname', mapping: 'product.name'
		},
		{
			name: 'catname', mapping: 'product.catname'
		},
		{
			name: 'typename', mapping: 'product.typename'
		},
		{
			name: 'produnit', mapping: 'product.widthname'
		},
		"qty",
		"qtypr",
		"rate",
		"tax_id",
		{ name : "taxname", mapping:'taxtype.name'},
		"status",
		"supplier_id",
//		"supname",
		{
			name: 'supname', mapping: 'supplier.name'
		},
		"tax_id",
		"trxnumber",
		"updated_at",
		"uuid",
		{
			name: "delivery_at", type: 'date'
		},
		"warehouse_id",
		{
			name: 'warehousename', mapping: 'warehouse.name'
		},
		/*Tambahan*/
		"subtotal",
		"dp"
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/transaction/purchase/adjustment/items',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}

});