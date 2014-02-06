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
Ext.define('App.model.PO.items', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'qty',
		'price',
		'subtotal',
		{ name: 'discount', type: 'integer'}
	],
	changetotalPrice: function () {
		this.set('subtotal', this.total());
	},
	total: function () {
		var me = this;
		var price = me.get('price');
		var qty = me.get('qty');
		var total = parseFloat(price) * parseInt(qty);
		return total;
	},
	changeDiscountAndTotal: function (disc) {
		var me = this;
		var price = me.get('price');
		var qty = me.get('qty');
		var discount;
		var total = me.total();
//		if (!isNumber(disc)) {
//			discount = 0;
//		} else {
//			discount = (total - parseFloat(disc) / 100 );
//		}
//		log(discount);
		if (disc > total){
			disc = 0;
		}

		me.set('discount', disc);
		var selisihtotal = me.total() - disc;
		me.set('subtotal',selisihtotal);

		log('Change Discount fire!! on Model');

	}
});


