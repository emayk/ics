/**
 * View returgood
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
Ext.define('App.view.returgood.vreturgood', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appreturgoodvreturgood',
	requires: [
		'App.view.returgood.panelreturn'
	],
	config: {
		loaded: false,
		storecontrabon: Ext.create('Ext.data.Store', {
			fields: ['id', 'ponumber', 'tglpo', 'nobpb', 'tglbpb'],
			data: [
				{ id: 1, ponumber: 'PO-1234', nobpb: 'BPB-1234', tglpo: '12/12/2014', tglbpb: '22/12/2014'},
				{ id: 2, ponumber: 'PO-1235', nobpb: 'BPB-1235', tglpo: '12/12/2014', tglbpb: '12/12/2014'},
				{ id: 3, ponumber: 'PO-1236', nobpb: 'BPB-1236', tglpo: '12/12/2014', tglbpb: '23/12/2014'},
				{ id: 4, ponumber: 'PO-1237', nobpb: 'BPB-1237', tglpo: '12/12/2014', tglbpb: '24/12/2014'},
				{ id: 5, ponumber: 'PO-1238', nobpb: 'BPB-1238', tglpo: '12/12/2014', tglbpb: '25/12/2014'}
			]
		})
	},
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					bodyPadding: 10,
					activeTab: 0,
					layout: { type: 'fit', align: 'stretch'},
					items: [
						{
							xtype: 'container',
							layout: { type: 'vbox', align: 'stretch'},
							title: 'Daftar Return Barang ',
							items: [
								{
									margin: '5 0 5 0',
									title: 'Form Pencarian Retur Barang',
									bodyPadding: 5,
									xtype: 'form',
									itemId: 'search',
									layout: 'anchor',
									items: [
										{
											xtype: 'fieldcontainer',
											anchor: '95%',
											frame: false,
											layout: { type: 'hbox', align: 'stretch'},
											items: [
												{
													xtype: 'combobox',
													store: Ext.create('Ext.data.Store', {
														fields: ['id', 'name', 'value'],
														data: [
															{ id: 1, name: 'Nama Pemasok', value: 'supname' },
															{ id: 2, name: 'No PO', value: 'ponumber' },
															{ id: 3, name: 'Nomor Corak', value: 'nocorak' }
														]
													}),
													fieldLabel: 'Cari Berdasarkan',
													name: 'searchby',
													queryMode: 'local',
													displayField: 'name',
													valueField: 'value',
													value: 'supname',
													forceSelection: true,
													editable: false
												},
												{
													xtype: 'textfield',
													emptyText: 'Ketik disini',
													name: 'valsearch'
												},
												{
													xtype: 'button',
													iconCls: 'find',
													action: 'searchpo',
													handler: function (btn) {
														var form = btn.up('form').getForm(),
															val = form.getValues();
														log(val);
														/*@todo : setup extra param proxy store grid*/
													}
												}
											]
										}
									]
								},
								/*Grid Contra Bon PO*/
								{
									flex: .9,
									xtype: 'grid',
									title: 'Daftar Purchase Order (Pembelian)',
									store: me.getStorecontrabon(),
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nomor PO',
											dataIndex: 'ponumber',
											flex: 2
										},
										{
											text: 'Tanggal PO',
											dataIndex: 'tglpo',
											flex: 1
										},
										{
											text: 'Nomor BPB',
											dataIndex: 'nobpb',
											flex: 2
										},
										{
											text: 'Tanggal BPB',
											dataIndex: 'tglbpb',
											flex: 1
										},
										{
											header: 'Proses',
											xtype: 'actioncolumn',
											width: 40,
											items: [
												{
													iconCls: 'delete',
													tooltip: 'Delete',
													handler: function (grid, rowIndex, colIndex) {
														var rec = grid.getStore().getAt(rowIndex);
														log(rec);
//														Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function (btn, text) {
//															if (btn == 'yes') {
//																var rec = grid.getStore().getAt(rowIndex);
//																grid.getStore().remove(rec);
//																grid.getStore().sync();
//																grid.getStore().load();
//															}
//														});
													}
												}
											]
										}
									],
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											store: me.getStorecontrabon()
										}
									]
								}
							]
						},
						{
							xtype: 'appreturgoodvpanelreturgood',
							title: 'Informasi PO [Simulasi]'
						}

					]
				}
			]
		});
		me.callParent(arguments);
	}

});
