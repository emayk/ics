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

Ext.Ajax.request({
	url: getApiUrl() + '/transaction/prapprove/' + aprid,
	params: {
		setitemid: rec.get('id'),
		setitems: true,
		_method: 'PUT',
		approved: rec.get('approved'),
		qty: rec.get('qty'),
		price: rec.get('price'),
		supplierid: rec.get('supplierid'),
		contactid: rec.get('contactid'),
	},
	method: 'POST',
	success: function (res, o) {
		log('All Response', res);
		var respon = Ext.JSON.decode(res.responseText, true);
		if (respon) {
			log('Response Text JSON decoded ', respon);
		}
		store.load();
		grid.getView().refresh();
	}, failure: function (res, opt) {
		log(res);
	}
});