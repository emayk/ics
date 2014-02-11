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

Ext.define('App.view.payment.preparepayment', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.apppaymentvpreparepayment',
	activeTab: 1,
	requires: [
		'App.view.payment.formprepare'
	],
	config: {
		storepreparepayment: Ext.create('Ext.data.Store', {
			fields: ['id', 'ponumber', 'supname'],
			data: [
				{ id: 1, ponumber: 'PO-1234', supname: 'PT ABC' },
				{ id: 2, ponumber: 'PO-1235', supname: 'PT ABC 1' },
				{ id: 3, ponumber: 'PO-1236', supname: 'PT ABC 2' },
				{ id: 4, ponumber: 'PO-1237', supname: 'PT ABC 3' },
				{ id: 5, ponumber: 'PO-1238', supname: 'PT ABC 4' },
				{ id: 6, ponumber: 'PO-1239', supname: 'PT ABC 5' },
				{ id: 7, ponumber: 'PO-1240', supname: 'PT ABC 6' },
				{ id: 8, ponumber: 'PO-1241', supname: 'PT ABC 7' }
			],
			proxy: {
				type: 'memory'
			}
		})
	},
	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'container',
					itemId: 'panellistpreparepayment',
					title: 'Daftar',
					layout: { type: 'vbox', align: 'stretch'},
					items: [
						{
							xtype: 'form',
							flex: .3,
							margin: '0 0 10 0',
							bodyPadding: 10,
							items: [
								{ xtype: 'textfield', labelAlign: 'top', name: 'nopo', fieldLabel: 'Nomor PO' },
								{
									xtype: 'fieldcontainer',
									items: [
										{
											xtype: 'textfield',
											labelAlign: 'top',
											name: 'supname',
											fieldLabel: 'Nama Supplier'
										},
										{
											xtype: 'button',
											text: 'Proses',
											action: 'proses'
										}
									]
								}

							]
						},
						{
							/*grid daftar PO*/
							xtype: 'grid',
							flex: .7,
							itemId: 'gridPoPayment',
							store: me.getStorepreparepayment(),
							columns: [
								{
									xtype: 'rownumberer',
									text: '#'
								},
								{
									text: 'Nomor PO',
									dataIndex: 'ponumber',
									flex: 2
								},
								{
									text: 'Supplier',
									dataIndex: 'supname',
									flex: 2
								},
								{
									header: 'Proses',
									xtype: 'actioncolumn',
									width: 40,
									items: [
										{
											iconCls: 'show',
											tooltip: 'Proses',
											handler: function (grid, rowIndex, colIndex) {
												var rec = grid.getStore().getAt(rowIndex),
													tab = grid.up('apppaymentvpreparepayment'),
													title = 'Informasi PO [' + rec.get('ponumber') + ']',
													newtab = tab.items.findBy(function (t) {
														return t.title === title
													});

												if (!newtab) {
													var viewPo = Ext.create('App.view.payment.formprepare', {
														title: title, poid: rec.get('id'), supname: rec.get('supname'),
														ponumber: rec.get('ponumber') });
													newtab = tab.add(viewPo);
												}
												tab.setActiveTab(newtab);
											}
										}
									]
								}
							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar',
									dock: 'bottom',
									store: me.getStorepreparepayment(),
									displayInfo: true
								}
							]
						}
					]
				},
				{
					/*Form Proses*/
					/**
					 * Menampilkan Item2 Order yang terpilih
					 */
					xtype: 'apppaymentvformpreparepayment'
				}
			]
		});
		me.callParent(arguments);
	}

});