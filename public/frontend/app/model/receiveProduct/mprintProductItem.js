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

Ext.define('App.model.receiveProduct.mprintProductItem', {
	extend: 'Ext.data.Model',
	fields: [
		"id",
		"receiveid",
		{ name : "sjno", mapping: "suratjalan.nomor"},
		{ name : "sjdate", mapping: "suratjalan.tgl", type: 'date', format:'Y-m-d' },
		{ name : "drivername", mapping: "suratjalan.drivername" },
		{ name : "platnomor", mapping: "suratjalan.platnomor" },
		"receivedate",

		{ name : "productname", mapping: "item.productname"},
		/*Total Sisa*/
		{ name : "qtyelapse", mapping: 'item.qtyelapse'},
		/*Qty yang diterima*/
		{ name : "qtyreceived", mapping: 'qty'},
		/*Roll yang diterima*/
		{ name : "rollreceived", mapping: 'qtyroll'},
		/*Total Roll Yang diterima*/
		{ name : "totalrollreceived", mapping: 'qtyrollreceived'},
//		{ name : "totalrollreceived", mapping: 'item.totalrollreceived'},
		/*Total Qty Yang diterima*/
//		{ name : "totalqtyreceived", mapping: 'item.totalreceiveditem'},
		{ name : "totalqtyreceived", mapping: 'qtyreceived'},
		/*Total Pesan*/
		{ name : 'qtyorder',type: "int",mapping:'item.qtyorder' },
		{ name: 'canprint', type: "boolean" }
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