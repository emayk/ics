/**
 * View approvepr
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
Ext.define('App.view.approvepr.vapprovepr', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appapproveprvapprovepr',
	requires: [
		'App.view.approvepr.process'
	],
	layout: { type: 'fit', align: 'stretch'},
	config: {
		storegridpr: Ext.create('Ext.data.Store', {
			fields: ['id', 'prnumber', { name: 'tgl', type: 'date'},
				/*1 = belum diproses , 2 = sudah diproses dan disetujui , 3 = sudah diproses dan ditolak*/
				'status'
			],
			data: [
				{ id: 1, prnumber: 'PR1-11feb2014-timothy', tgl: '02/11/2014', status: 1 },
				{ id: 2, prnumber: 'PR2-11feb2014-timothy', tgl: '02/11/2014', status: 1 },
				{ id: 3, prnumber: 'PR3-11feb2014-timothy', tgl: '02/11/2014', status: 1 }
			]
		}),
		storegridprapproved: Ext.create('Ext.data.Store', {
			fields: ['id', 'prnumber', { name: 'tgl', type: 'date'},
				/*1 = belum diproses , 2 = sudah diproses dan disetujui , 3 = sudah diproses dan ditolak*/
				'status'
			],
			data: [
				{ id: 3, prnumber: 'PR4-11feb2014-timothy', tgl: '02/10/2014', status: 2 },
				{ id: 4, prnumber: 'PR5-11feb2014-timothy', tgl: '02/10/2014', status: 2 },
				{ id: 5, prnumber: 'PR6-11feb2014-timothy', tgl: '02/10/2014', status: 2 }
			]
		}),
		storegridprdenied: Ext.create('Ext.data.Store', {
			fields: ['id', 'prnumber', { name: 'tgl', type: 'date'},
				/*1 = belum diproses , 2 = sudah diproses dan disetujui , 3 = sudah diproses dan ditolak*/
				'status'
			],
			data: [
				{ id: 6, prnumber: 'PR7-11feb2014-timothy', tgl: '02/10/2014', status: 3 },
				{ id: 7, prnumber: 'PR8-11feb2014-timothy', tgl: '02/10/2014', status: 3 },
				{ id: 8, prnumber: 'PR9-11feb2014-timothy', tgl: '02/10/2014', status: 3 }
			]
		})
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					activeTab: 3,
					items: [
						{
							/*Daftar Pengajuan Pembelian Yang belum diproses */
							xtype: 'container',
							bodyPadding: 2, frame: true,
							layout: { type: 'fit', align: 'stretch'},
							flex: 1,
							iconCls: 'grid',
							title: 'Daftar PR',
							items: [
								{
									xtype: 'grid',
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nomor Purchase Request',
											dataIndex: 'prnumber',
											flex: 2
										},
										{
											text: 'Tanggal',
											dataIndex: 'tgl',
											flex: 1,
											renderer: function (v) {
												return Ext.Date.format(v, 'd F Y');
											}
										},
										{
											header: 'Proses',
											xtype: 'actioncolumn',
											width: 40,
											items: [
												{
													iconCls: 'forward',
													tooltip: 'Proses Pengajuan Pembelian',
													handler: me.openNewTabForProcess
												}
											]
										}
									],
									store: me.getStoregridpr(),
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: me.getStoregridpr()
										}
									]
								}
							]
						},
						{
							/*Daftar Pengajuan Pembelian Yang sudah diproses dan disetujui*/
							xtype: 'container',
							bodyPadding: 2, frame: true,
							flex: 1,
							layout: { type: 'fit', align: 'stretch'},
							iconCls: 'grid',
							title: 'Daftar PR Setuju',
							items: [
								{
									xtype: 'grid',
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nomor Purchase Request',
											dataIndex: 'prnumber',
											flex: 2
										},
										{
											text: 'Tanggal',
											dataIndex: 'tgl',
											flex: 1,
											renderer: function (v) {
												return Ext.Date.format(v, 'd F Y');
											}
										}
									],
									store: me.getStoregridprapproved(),
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: me.getStoregridprapproved()
										}
									]
								}
							]

						},
						{
							xtype: 'container',
							layout: { type: 'fit', align: 'stretch'},
							flex: 1,
							bodyPadding: 2, frame: true,
							iconCls: 'grid',
							title: 'Daftar PR Tolak',
							items: [
								{
									xtype: 'grid',
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nomor Purchase Request',
											dataIndex: 'prnumber',
											flex: 2
										},
										{
											text: 'Tanggal',
											dataIndex: 'tgl',
											flex: 1,
											renderer: function (v) {
												return Ext.Date.format(v, 'd F Y');
											}
										}
									],
									store: me.getStoregridprdenied(),
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: me.getStoregridprdenied()
										}
									]
								}
							]
						},
//						{
//							xtype: 'appapproveprvprocess',
//							title: 'Simulate'
//						}
					]
				}
			]
		});
		me.callParent(arguments);
	},
	/**
	 * Menampilkan record pada Tab baru.
	 * @param grid
	 * @param rowIndex
	 * @param colIndex
	 */
	openNewTabForProcess: function (grid, rowIndex, colIndex) {
		var rec = grid.getStore().getAt(rowIndex),
			tab = grid.up('tabpanel'),
			title = 'Proses PR [ ' + rec.get('prnumber') + ']',
			config = {
				prnumber: rec.get('prnumber'),
				tgl: rec.get('tgl'),
				title: title,
				status: rec.get('status'),
				storegrid: Ext.create('Ext.data.Store', {
					fields: [ 'id', 'code', 'name', 'category', 'jenis', { name: 'length', type: 'int' }, 'unitname', 'price'],
					data: [
						{ id: 1, code: 'ab1', name: 'kain1', category: 'Kategory', jenis: '12e', length: 200, unitname: 'yard', price: 0},
						{ id: 2, code: 'ab2', name: 'kain2', category: 'Kategory1', jenis: '12e', length: 150, unitname: 'yard', price: 0},
						{ id: 3, code: 'ab3', name: 'kain3', category: 'Kategory1', jenis: 'r4', length: 300, unitname: 'yard', price: 0}
					],
					proxy: {
						type: 'memory'
					}
				})
			};
		App.util.box.openNewtab(tab, title, 'App.view.approvepr.process', config);
	}
});
