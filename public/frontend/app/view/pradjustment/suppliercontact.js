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

Ext.define('App.view.pradjustment.suppliercontact', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apppradjustmentvpradjustmentSupContact',
	title: 'Supplier dan Kontak',
	requires:[
		'App.form.combobox.cbSupplier'
	],
	layout: { type: 'hbox', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'container', flex:.5,
					layout: { type: 'vbox', align: 'stretch'},
				items:[
					{ xtype: 'displayfield', name: 'supname',fieldLabel:'Nama Pemasok',
						labelWidth:150
					},
					{
						xtype: 'cbSupplier',
						labelWidth:150,
						fieldLabel: 'Pilih Supplier'
					}
				]
				},
				{
					xtype: 'container', flex:.5,
					html: ' Berisi Kontak sesuai dengan pilihan Supplier '
				}
			]
		});
		me.callParent(arguments);
	}
});