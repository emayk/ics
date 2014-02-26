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
Ext.define('App.model.product.hpp', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
//		{name : 'id', mapping: 'product.id'},
		{name : 'name', mapping: 'product.name'},
		{name : 'nodesign', mapping: 'product.nodesign'},
		{name : 'contruction', mapping: 'product.contruction'},
		{name : 'cat_id', mapping: 'product.cat_id'},
		{name : 'type_id', mapping: 'product.type_id'},
		{name : 'weight', mapping: 'product.weight'},
		{name : 'unitweight_id', mapping: 'product.unitweight_id'},
		{name : 'width', mapping: 'product.width'},
		{name : 'unitwidth_id', mapping: 'product.unitwidth_id'},
		{name : 'codeinternal', mapping: 'product.codeinternal'},
		{name : 'createby_id', mapping: 'product.createby_id'},
		{name : 'lastupdateby_id', mapping: 'product.lastupdateby_id'},
		{name : 'created_at', mapping: 'product.created_at'},
		{name : 'updated_at', mapping: 'product.updated_at'},
		{name : 'catname', mapping: 'product.catname'},
		{name : 'typename', mapping: 'product.typename'},
		{name : 'totalstocks', mapping: 'product.totalstocks'},
		{name : 'widthname', mapping: 'product.widthname'},
		{name : 'weightname', mapping: 'product.weightname'},
		/*CL 8*/
		{ name: 'totallength', defaultValue: 0},
		{name : 'totallength', mapping: 'product.totallength', defaultValue: 0},
		{name : 'totalroll', mapping: 'product.totalroll',defaultValue: 0},
		{name: 'totalroll', defaultValue: 0},
		{
			name: 'pricevalue',mapping: 'value'
		},{
			name: 'pricemin',mapping: 'min'
		}
	],
//	fields: [
//		'id',
//		'name',
//		'nodesign',
//		'contruction',
//		'cat_id',
//		'type_id',
//		'weight',
//		'unitweight_id',
//		'width',
//		'unitwidth_id',
//		'codeinternal',
//		'createby_id',
//		'lastupdateby_id',
////		'countstock',
//		'created_at',
//		'updated_at',
//		'catname',
//		'typename',
//		'totalstocks',
//		'widthname',
//		'weightname',
//		/*CL 8*/
//		{ name: 'totallength', defaultValue: 0},
//		{name: 'totalroll', defaultValue: 0},
//		{
//			name: 'pricevalue',mapping: 'price.value'
//		},{
//			name: 'pricemin',mapping: 'price.min'
//		}
//	],
	proxy: {
		url: getApiUrl() + '/products',
		type: 'rest',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
		extraParams: {
			'withhpp': true,
			_token: gettoken()
		}

	}
});