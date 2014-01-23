/**
 * Part Of ICS
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

Ext.define('App.controller.creceiveProduct',{
	extend: 'Ext.app.Controller',
	views: [
		'App.view.receiveProduct.vreceiveProduct',
		'App.form.combobox.cbSupplier'
	],
	models:[
		'App.model.receiveProduct.mreceiveProduct',
		'App.model.receiveProduct.mreceiveProductItem'
	],
	stores:[
		'App.store.receiveProduct.sreceiveProduct',
		'App.store.receiveProduct.sreceiveProductItem',
		'App.store.receiveProduct.sOrder',
		'App.store.combo.cbSuppliers'

	],
	init: function(){
		log('Controller creceiveProduct Loaded');
	}
});

