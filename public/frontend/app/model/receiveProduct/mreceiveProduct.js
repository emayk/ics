/**
 * Model receiveProduct
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

Ext.define('App.model.receiveProduct.mreceiveProduct', {
    extend: 'Ext.data.Model',
    fields: [
	    "id",
//	    "totalitem",
	    "sjno",
	    { name: "sjtgl", type: "date",convert:function(v){
		    var val= (v == "0000-00-00 00:00:00") ? new Date() : v;
		    return val;
	    }},
	    "drivername",
	    {name: "vehiclenumber", mapping: "platkendaraan"},
	    { name: "receivenumber", mapping: "trxnumber"},
	    {name: "receivedate",type: 'date',convert:function(v){
		    var val= (v == "0000-00-00") ? new Date() : v;
		    return val;
	    }},
	    /*PO*/
	    { name: "poid", mapping: "order_id"},
	    "ponumber",
	    "created_at",
	    "totalorderitem",
	    "updated_at",
	    /*Tanggal Buat PO*/
	    { name : "podate", mapping: "podate.date",type: 'date'},
	    "contact",
	    "supplier",
	    /*Nomor Terima Barang*/
	    { name : "nobpb", mapping: "trxnumber"},
	    "warehouse"
    ],
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/transaction/receive/good',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});
