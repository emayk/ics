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

var a = [
	"adjprid",
	"contact",
	"cp_id",
	"createby_id",
	"created_at",
	"credit",
	"curr_id",
	"delivery_at",
	"id",
	"lastupdateby_id",
	"paymenttype_id",
	"price",
	"pritem",
	"producttype_id",
	"product_id",
	"qty",
	"qtypr",
	"rate",
	"status",
	"subtotal",
	"supname",
	"supp",
	"supplier",
	"supplier_id",
	"tax_id",
	"trxnumber",
	"updated_at",
	"uuid",
	"warehouse_id",
];

Ext.define('App.view.pradjustment.propertygrid', {
	extend: 'Ext.grid.property.Grid',
	alias: 'widget.apppradjustmentvpradjustmentPropertyGrid',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			source: {},
//				supname: '',
//				cp_id: ''
//			},
			sourceConfig: {
				suppname: {
					editor: Ext.create('Ext.form.ComboBox', {
							fieldLabel: '',
							allowBlank: false,
							pageSize: 20,
							displayField: 'name',
							valueField: 'name',
							queryMode: 'remote',
							triggerAction: 'all',
							forceSelection: true,
							store: 'App.store.combo.cbSuppliers',
							anchor: '-10',
							emptyText: 'Pilih Pemasok',
							editable: false
						}
					),
					displayName: 'Nama Supplier'
				},
				cp_id: {
					editor: { xtype: 'displayfield' },
					displayName: 'Nama Kontak'
				}
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						'->',
						{
							text: 'Simpan', action: 'save', iconCls: 'save'
						}

					]
				}
			]

		});
		me.callParent(arguments);
	}
});