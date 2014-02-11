/**
 * View payment
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
Ext.define('App.view.payment.vpayment', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apppaymentvpayment',
	requires: [
		'App.view.typepayment.vtypepayment',
		'App.view.payment.preparepayment'
	],
	layout: { type: 'fit', align: 'stretch'},
	frame: true,
	bodyPadding: 5,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					plain: true,
					activeTab: 2,
					items: [
						{
							xtype: 'apptypepaymentvtypepayment',
							title: 'Tipe'
						},
						{
							xtype: 'container',
							title: 'Uang Muka',
							html: 'Content Pembayaran Uang Muka/DP'
						},
						{
							/*CL 4 dev 13*/
							xtype: 'apppaymentvpreparepayment',
							title: 'Persiapan',
							itemId: 'preparepayment'
						},

						{
							xtype: 'container',
							title: 'Daftar Pembayaran',
							html: 'Content daftar Pembayaran'
						},
						{
							xtype: 'container',
							title: 'Cek Cancelled',
							html: 'Content Cek Cancelled'
						}

					]
				}
			]
		});
		me.callParent(arguments);
	}

});
