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
		storegridpr: Ext.create('App.store.approvepr.sapprovepr'),
		storegridprapproved: Ext.create('App.store.approvepr.sapprovepraggree'),
		storegridprdenied: Ext.create('App.store.approvepr.sapproveprdenied')
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
									itemId: 'listpr',
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
									itemId: 'listprapprove',
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
									itemId: 'listprdenied',
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
						}
					]
				}
			]
		});
		me.callParent(arguments);
//		me.down('#listpr').getStore().load();
		me.loadAllGridStore();
	},
	loadAllGridStore: function () {
		this.down('#listpr').getStore().load();
		this.down('#listprapprove').getStore().load();
		this.down('#listprdenied').getStore().load();
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
			number = rec.get('prnumber'),
			id = rec.get('id');

		Ext.Ajax.request({
			url: getApiUrl() + '/transaction/prapprove',
			params: {
				prid: id,
				prnumber: number,
				cmd: 'getitems'
			},
			method: 'POST',
			success: function (response, opts) {
				log(response);
				var res = Ext.JSON.decode(response.responseText, true);
				if (!res.success){
					var reason = res.reason;
					var reasonmsg = (reason) ? reason : ' terjadi Kesalahan';
					App.util.box.error(reasonmsg + ' , Silahkan reload halaman terlebih dahulu');
					return false;
				}
				var r = res.results;
				var aprnumber = r.trxnumber;
				if (!aprnumber){
					App.util.box.error('Maaf Nomor Transaksi tidak diketemukan , Silahkan coba lagi');
					return false;
				}
				var aprid = r.id;
				var tgl = r.created_at;
				var status = r.status;
				title = 'Proses Approve Purchase Request' + ( (aprnumber) ? ' [ ' + aprnumber + ']' : ' ');
				var config = {
					aprnumber: aprnumber,
					tgl: tgl,
					aprid : aprid,
					title: title,
					status: status,
					closable: true,
					iconCls: 'add'
//					storegrid: Ext.create('App.store.approvepr.items')
				};
				App.util.box.openNewtab(tab, title, 'App.view.approvepr.process', config);
			},
			failure: function (response, opts) {
//				btn.enable();
//				App.util.box.error('Maaf,<br/>' +
//					'Pengajuan Pembelian Barang gagal dilakukan '
//				);
				return false;
			}
		});



	}
});
