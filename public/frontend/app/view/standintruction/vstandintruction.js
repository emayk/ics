/**
 * View standintruction
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
Ext.define('App.view.standintruction.vstandintruction', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appstandintructionvstandintruction',
	frame: true,
	config: {
		title: 'Standing Intruction',
		store: Ext.create('Ext.data.Store', {
			fields: ['id', 'supname', 'tglbuat', 'ponumber', 'totalpesan', 'sisapesan', 'sibuka', 'corak','contact'],
			/* sibuka == list semua si yang sudah dibuka */
			data: [
				{ id: 1, supname: 'PT Kahatex', tglbuat: '2013-06-26', ponumber: '13/07/APO1233', totalpesan: 10000, sisapesan: 3400, corak: 'XT-34533', status: 1, sibuka: 'SI-003,SI-009,SI-014',contact: 'Timothy'},
				{ id: 2, supname: 'PT Kahatex', tglbuat: '2013-06-26', ponumber: '13/07/APO1234', totalpesan: 10000, sisapesan: 3400, corak: 'RS-34533', status: 1, sibuka: 'SI-004',contact: 'Dhea'},
				{ id: 3, supname: 'PT Kahatex', tglbuat: '2013-06-26', ponumber: '13/07/APO1235', totalpesan: 10000, sisapesan: 3400, corak: 'RR-34533', status: 1, sibuka: 'SI-005',contact: 'Edward'},
				{ id: 4, supname: 'PT Kahatex', tglbuat: '2013-06-26', ponumber: '13/07/APO1236', totalpesan: 10000, sisapesan: 3400, corak: 'XA-34533', status: 2, sibuka: 'SI-006',contact: 'Fuad'},
			]
		})
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					plain: true,
					layout: { type: 'fit', align: 'stretch'},
					defaults: {
						frame: true,
						height: App.util.box.maxHeightwindow() - 30
					},

					items: [
						{
							flex: 1,
							/*Tidak boleh dipilih lebih dari 1 */
							selModel: App.util.box.createSelectionModel(),
							itemId: 'active',
							xtype: 'grid',
							defaults: {
								flex: 1
							},
							store: me.getStore(),
							title: 'Daftar Standing Intruction Aktif',
							columns: [
								{
									xtype: 'rownumberer'
								},
								{
									text: 'Pemasok',
									dataIndex: 'supname'
								},
								{
									text: 'Kontak',
									dataIndex: 'contact'
								},
								{
									text: 'Tanggal Buat',
									dataIndex: 'tglbuat'
								},
								{
									text: 'Nomor PO',
									dataIndex: 'ponumber'
								},
								{
									text: 'Total Pesan',
									dataIndex: 'totalpesan'
								},
								{
									text: 'Sisa',
									dataIndex: 'sisapesan'
								},
								{
									text: 'Corak',
									dataIndex: 'corak'
								},
								{
									text: 'List Si',
									dataIndex: 'sibuka',
									flex:2
								},
								{
									header: 'Action',
									xtype: 'actioncolumn',
									width: 40,
									items: [
										{
											iconCls: 'add',
											tooltip: 'Buka Standing Intruction',
											handler: function (grid, rowIndex, colIndex) {
												var rec = grid.getStore().getAt(rowIndex);
												log(rec);
												var win;
												if (!win){
													win = Ext.create('App.view.standintruction.winForm',{
														ponumber: rec.get('ponumber'), // no PO
//														sinumber: rec.get('ponumber'), // Nomor Standing intruction
														nocorak: rec.get('corak'),
														tglbuat: rec.get('tglbuat'),
														supname: rec.get('supname'),
														contactname: rec.get('contact'),
														sisapesan: rec.get('sisapesan'),
														modal: true
													});
													win.show();
												}
											}
										}
									]
								}
							],
							dockedItems: [
								{
									dock: 'bottom',
									xtype: 'pagingtoolbar',
									displayInfo: true
								},
								{
									dock: 'top',
									xtype: 'toolbar',
									items: [
										{
											text: translations.add,
											action: 'add',
											iconCls: 'add'
										},
//										{
//											text: translations.remove,
//											action: 'remove',
//											iconCls: 'delete'
//										},
										'->',
										{
											text: translations.help,
											action: 'help',
											iconCls: 'help'
										}
									]
								}
							]
						},
						{
							flex: 1,
							itemId: 'close',
							xtype: 'grid',
							title: 'Daftar Standing Intruction Tutup',
							store: me.getStore(),
							/*Tidak boleh dipilih lebih dari 1 */
							selModel: App.util.box.createSelectionModel(),
							columns: [
								{
									xtype: 'rownumberer'
								},
								{
									text: 'Pemasok',
									dataIndex: 'supname'
								},
								{
									text: 'Kontak',
									dataIndex: 'contact'
								},
								{
									text: 'Tanggal Buat',
									dataIndex: 'tglbuat'
								},
								{
									text: 'Nomor PO',
									dataIndex: 'ponumber'
								},
								{
									text: 'Total Pesan',
									dataIndex: 'totalpesan'
								},
								{
									text: 'Sisa',
									dataIndex: 'sisapesan'
								},
								{
									text: 'Corak',
									dataIndex: 'corak'
								},
								{
									text: 'List Si',
									dataIndex: 'sibuka'
								}
							],
							dockedItems: [
								{
									dock: 'bottom',
									xtype: 'pagingtoolbar',
									displayInfo: true
								},
								{
									dock: 'top',
									xtype: 'toolbar',
									items: [
										{
											text: translations.add,
											action: 'add',
											iconCls: 'add'
										},
//										{
//											text: translations.remove,
//											action: 'remove',
//											iconCls: 'delete'
//										},
										'->',
										{
											text: translations.help,
											action: 'help',
											iconCls: 'help'
										}
									]
								}
							]
						},

					]
				}
			]
		});
		me.callParent(arguments);
	}

});
