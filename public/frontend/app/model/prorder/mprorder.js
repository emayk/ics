/**
 * Model prorder
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
Ext.define('App.model.prorder.mprorder', {
	extend: 'Ext.data.Model',
	fields: [ 'id',
		"approve_id",
		"cntprint",
		"cp_id",
		{ name: 'contact', mapping: 'contact.name' },
		"createby_id",
		"created_at",
		"credit",
		"curr_id",
		{ name: "currsymbol", mapping: 'currency.shortname'},
		{ name : "currency" , mapping: 'currency.name'},
		{ name : "delivery_at" , type: 'date'},
		"lastupdateby_id",
		"marktext",
		"paymenttype_id",
		{ name: "payment", mapping: 'payment.name'},
		{ name: "printed", convert: function (v) { return (v > 0); } },
		"rate",
		"status",
		"supplier_id",
		{ name: 'supplier', mapping: 'supplier.name' },
		"tax_id",
		{ name: 'tax', mapping: 'tax.name' },
		"totaldp",
		"totalitem",
		"trxnumber",
		"type_id",
		//1  = pembelian
		{ name: 'type', mapping: 'type.name' },
		"updated_at",
		"uuid",
		"warehouse_id",
		{ name: 'warehouse', mapping: 'warehouse.name'},
		{ name: 'ponumber', mapping: 'trxnumber'},
		'totalpayment'
	],
	proxy: {
		type: 'rest',
		url: getApiUrl() + '/transaction/purchase/order',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});
