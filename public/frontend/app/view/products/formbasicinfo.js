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


Ext.define('App.view.products.formbasicinfo', {
	extend: 'Ext.form.Panel',
	alias: 'widget.formproductbasicinfo',
	autoScroll: true,
	bodyPadding: 10,
	frame: true,
	flex: 2,
	title: 'Informasi Basic',
	itemId: 'detail',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	requires: [
		'App.form.combobox.cbTypeProduct',
		'App.form.combobox.cbCatproduct'
	],
	config: {
		new: false,
		prodId: null,
		prodName: null,
		record: null
	},
	defaults: {
		anchor: '95%',
		widhtLabel: 100
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'fieldset',
					itemId: 'fieldsetbasicinfo',
					autoScroll: true,
					title: 'Basic Info ' + ( ( me.getProdName() == null ) ? ' ' : me.getProdName() ),
					margins: '0 10 0 0',
					bodyPadding: 2,
					flex: .6,
					items: [
						{ xtype: 'hiddenfield', fieldLabel: 'id', name: 'id', anchor: '95%', readOnly: true, value: this.prodId },
						{ xtype: 'textfield', fieldLabel: 'Nama', name: 'name', anchor: '95%' },
						{ xtype: 'cbcatproduct', fieldLabel: 'Kategori', name: 'cat_id', anchor: '95%' },
						{ xtype: 'textfield', fieldLabel: 'Kode', name: 'codeinternal', anchor: '95%' },
						{ xtype: 'textfield', fieldLabel: 'Nomor Design', name: 'nodesign', anchor: '95%' },
						{ xtype: 'cbTypeProduct', fieldLabel: 'Tipe Produk', name: 'type_id', anchor: '95%' },
						{ xtype: 'fieldcontainer', fieldLabel: 'Berat', layout: 'hbox', anchor: '95%',
							items: [
								{ xtype: 'numberfield', fieldLabel: '', name: 'weight', flex: .3, margin: '0 5 0 0'},
								{ xtype: 'cbUnitWeight', fieldLabel: '', name: 'unitweight_id', flex: .7}
							]
						},

						{ xtype: 'fieldcontainer', fieldLabel: 'Lebar', layout: 'hbox', anchor: '95%',
							items: [
								{ xtype: 'numberfield', fieldLabel: '', name: 'width', flex: .3, margin: '0 5 0 0'},
								{ xtype: 'cbUnitWidth', fieldLabel: '', name: 'unitwidth_id', flex: .7 }
							]
						},
						{ xtype: "cbcolor", fieldLabel: "Color", name: "color_id", anchor: '95%'},
						{ xtype: "cbunits", fieldLabel: "Unit", name: "unit_id", anchor: '95%'},
						{ xtype: "cbgradekain", fieldLabel: "Grade", name: "grade_id", anchor: '95%'}
					]
				}
//				{
//					xtype: 'fieldset',
//					itemId : 'fieldsetdetail',
//					title : 'Detail Product ' + ( (me.getProdName() == null) ? ' ' : me.getProdName() ),
//					defaults:{
//						anchor : '95%'
//					},
//					items: [
////						{ xtype: "displayfield", fieldLabel: "Name", name: "prodname", value: this.getProdName()},
////						{ xtype: "hiddenfield", fieldLabel: "id", name: "id", hidden: true},
////						{ xtype: "hiddenfield", fieldLabel: "product_id", name: "product_id", value: this.getProdId()},
//
//						{ xtype: "cbcolor", fieldLabel: "Color", name: "color_id"},
//						{ xtype: "cbunits", fieldLabel: "Unit", name: "unit_id"},
//						{ xtype: "cbgradekain", fieldLabel: "Grade", name: "grade_id"},
////						{
////							xtype:'fieldcontainer',
////							fieldLabel:'Sales Price',
////							hiddenField: true,
////							layout: 'hbox', anchor: '95%',
////							items : [
////								{ xtype: "numberfield", fieldLabel: "", name: "salesprice", flex: .3 },
////								{ xtype : 'splitter' },
////								{ xtype: "cbcurrsp", fieldLabel: "", name: "currsp_id", flex: .6 }
////							]
////						},
//
////						{
////							xtype:'fieldcontainer',
////							fieldLabel:'Sales Price Min ',
////							layout: 'hbox', anchor: '95%',
////							items : [
////								{ xtype: "numberfield", fieldLabel: "", name: "salespricemin", flex: .3 },
////								{ xtype : 'splitter' },
////								{ xtype: "cbcurrspm", fieldLabel: "", name: "currspm_id", flex: .6 }
////							]
////						},
////						{ xtype: "textfield", fieldLabel: "parent_id", name: "parent_id", value: this.getProdId(),hidden:true },
////						{ xtype: "textfield", fieldLabel: "parent_type", name: "parent_type", value: 'product',hidden:true }
//					]
//				}
			]
		});
		this.callParent(arguments);
	},

	buttons: [
		{ text: 'Help', iconCls: 'help', itemId: 'help', action: 'help' }, '->',
		{ text: 'Save', iconCls: 'save', itemId: 'save', action: 'save' },
		{ text: 'Close', iconCls: 'close', itemId: 'close', action: 'close' }
	]
});