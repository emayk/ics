/**
 * Store receiveProduct
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

Ext.define('App.store.receiveProduct.sreceiveProduct',{
	extend : 'Ext.data.Store',
	model : 'App.model.receiveProduct.mreceiveProduct',
	data: [
		['3m Co', 71.72, 0.02, 0.03, '9/1 12:00am'],
		['Alcoa Inc', 29.01, 0.42, 1.47, '9/1 12:00am'],
		['Boeing Co.', 75.43, 0.53, 0.71, '9/1 12:00am'],
		['Hewlett-Packard Co.', 36.53, -0.03, -0.08, '9/1 12:00am'],
		['Wal-Mart Stores, Inc.', 45.45, 0.73, 1.63, '9/1 12:00am']
	],
	fields: ['name','stats','stst2','time']
/*	proxy: {
		type: 'rest',
		url: getApiUrl() +'/receiveProduct',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},*/

})
