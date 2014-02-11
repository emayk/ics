/**
 * View contrabon
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
Ext.define('App.view.contrabon.vcontrabon', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appcontrabonvcontrabon',
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		var storecontrabon = Ext.create('Ext.data.Store', {
			fields: ['id', 'ponumber', 'supname'],
			data: [
				{ id: 1, ponumber: 'PO-1234', supname: 'PT ABC' },
				{ id: 2, ponumber: 'PO-1235', supname: 'PT ABC 1' },
				{ id: 3, ponumber: 'PO-1236', supname: 'PT ABC 2' },
				{ id: 4, ponumber: 'PO-1237', supname: 'PT ABC 3' }
			]
		});
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					bodyPadding: 10,
					layout: { type: 'fit', align: 'stretch'},
					items: [
						{
							xtype: 'container',
							layout: { type: 'vbox', align: 'stretch'},
							title: 'Daftar PO Tukar Kontra Bon',
							items: [
								{
									/*Form Pencarian PO*/
									xtype: 'form',
									flex: .2,
									bodyPadding: 10,
									margin: '0 0 10 0',
									itemId: 'formsearchpo',
									layout: 'anchor',
									items: [
										{ xtype: 'textfield', name: 'ponumber', fieldLabel: 'Nomor PO' },
										{
											xtype: 'fieldcontainer', fieldLabel: '',
											items: [
												{ xtype: 'textfield', name: 'supname', fieldLabel: 'Nama Supplier' },
												{xtype: 'button', action: 'search', text: 'Cari ',iconCls: 'find'}

											]
										}
									]
								},
								/*Daftar PO yang dicari sesuai dengan kriteria yang dimasukan pada form */
								{
									flex: .8,
									xtype: 'grid',
									store: storecontrabon,
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
											text: 'Nama Supplier',
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
//												var rec = grid.getStore().getAt(rowIndex),
//													tab = grid.up('tabpanel'),
//													title = 'Informasi PO [' + rec.get('ponumber') + ']',
//													newtab = tab.items.findBy(function (t) {
//														return t.title === title
//													});
//
//												if (!newtab) {
//													var viewPo = Ext.create('App.view.payment.formprepare', {
//														title: title, poid: rec.get('id'), supname: rec.get('supname'),
//														ponumber: rec.get('ponumber') });
//													newtab = tab.add(viewPo);
//												}
//												tab.setActiveTab(newtab);
													}
												}
											]
										}

									],
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: storecontrabon
										}
									]
								}
							]
						}
					]

				}
			]
		});
		me.callParent(arguments);
	},

});
