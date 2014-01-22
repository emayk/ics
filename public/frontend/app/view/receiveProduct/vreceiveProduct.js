/**
 * View receiveProduct
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

/**
 * Menampilkan Tab Penerimaan Barang
 * dari supplier
 *
 * Flow :
 * penerimaan barang ini akan mempengaruhi ke banyaknya stock
 * terima = stock++
 *
 *
 */
Ext.define('App.view.receiveProduct.vreceiveProduct', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appreceiveProductvreceiveProduct',
	padding: 10,
	frame: true,
	layout: { type: 'vbox', align: 'stretch'},
	store: 'App.store.receiveProduct.sreceiveProduct',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'form',
					bodyPadding: 10,
					defaults: {
						anchor: '95%'
					},
					itemId: 'formreceive',
					items: [
						/*Surat Jalan*/
						{
							xtype: 'fieldcontainer',
							fieldLabel: 'Document Permit',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{ xtype: 'textfield', fieldLabel: '', name: 'nosj', flex: 0.8, readOnly: true },
								{ xtype: 'button', text: 'set', flex: 0.2, margin: '0 0 0 10' }
							]
						},

						{
							xtype: 'datefield',
							fieldLabel: 'Date',
							name: 'datereceive',
							minValue: new Date()
						},
						{ xtype: 'textfield', fieldLabel: 'Document Permit', name: 'nosj'},
						{ xtype: 'textfield', fieldLabel: 'Document Permit', name: 'nosj'},
						{ xtype: 'textfield', fieldLabel: 'Document Permit', name: 'nosj'}
					]
				},
				{
					xtype: 'splitter'
				},
				{
					xtype: 'container',
					itemId: 'panelbody',
					layout: { type: 'vbox', align: 'stretch'},
					items: [
						{
							xtype: 'container',
							flex: 1,
							items: [
								{
									/**
									 * Grid Receive List Product
									 */
									xtype: 'grid',
									flex: 1,
									store: me.store,
									columns: [
										{
											xtype: 'rownumberer'
										}
									],
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											store: me.store,
											dock: 'bottom',
											displayInfo: true
										}
									]
								}
							]
						},
						{
							xtype: 'container',
							flex: 0.2,
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'container',
									flex: 0.5,
									html: 'Aturan Penerimaan barang'
								},
								{
									xtype: 'container',
									flex: 0.5,
									layout: 'anchor',
									defaults: {
										anchor: '95%'
									},
									items: [
										{ xtype: 'textfield', name: 'totalitem', readOnly: true, fieldLabel: 'Total Item'},
										{ xtype: 'textfield', name: 'totalqty', readOnly: true, fieldLabel: 'Total Qty'}
									]
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}

});
