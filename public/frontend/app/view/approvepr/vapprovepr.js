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
//	config: {
//	},
	storegridpr: Ext.create('App.store.approvepr.sapprovepr'),
	storegridprapproved: Ext.create('App.store.approvepr.sapprovepraggree'),
	storegridprdenied: Ext.create('App.store.approvepr.sapproveprdenied'),
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
							title: 'Daftar PR dalam Proses',
							items: [
								{
									xtype: 'grid',
									itemId: 'listpr',
									viewConfig: {
										getRowClass: function (record) {
											if (record) {
												var approve = 'cgreen';
												var denied = 'cred';
												var unprocess = 'corange';
												var pending = 'cpending';
												var processed = 'row-processed';
												var color;
												var status = parseInt(record.get('status'));
												switch (status) {
													case 2:
														color = approve;
														break;
													case 3:
														color = denied;
														break;
													case 4:
														color = pending;
														break;
													/*Sudah diproses*/
													case 5:
														color = processed;
														break;
													default:
														color = unprocess
												}
												return color;
											}
										}
									},
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nomor Document',
											columns:[
												{ text: 'Approve Request',width: 200, dataIndex: 'aprnumber',tooltip:'Nomor Approval'  },
												{ text: 'Adjustment Request',width: 200, dataIndex: 'adjnumber',tooltip:'Nomor Adjustment'  },
												{ text: 'Purchase Request',width: 200, dataIndex: 'prnumber',tooltip:'Nomor Purchase'  }
											]
										},

										{
										text: 'Items',
											columns:[
												{ text: 'Total', dataIndex: 'totalitems',width: 50,tooltip:'Total Item Pengajuan' },
												{ text: 'UP', dataIndex: 'totalunprocess',width: 50,tooltip:'Total Item Pengajuan yang belum diproses'  },
												{ text: 'P', dataIndex: 'totalprocessed' ,width: 50,tooltip:'Total Pengajuan yang sudah diproses' },
												{ text: 'D', dataIndex: 'totaldenied',width: 50 ,tooltip:'Total Item Pengajuan yang ditolak' },
												{ text: 'A', dataIndex: 'totalagree' ,width: 50,tooltip:'Total Item Pengajuan yang disetujui' },
												{ text: 'P', dataIndex: 'totalpending',width: 50,tooltip:'Total Item Pengajuan yang ditunda'  }

											]
										},
										{
											text: 'Tanggal',
											dataIndex: 'tgl',
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
									store: me.storegridpr,
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: me.storegridpr
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
							title: 'Daftar PR Sudah diproses',
							items: [
								{
									itemId: 'listprapprove',
									xtype: 'grid',
									viewConfig: {
										getRowClass: function (record) {
											if (record) {
												return 'cgreen';
											}
										}
									},
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Nomor Document',
											columns:[
												{ text: 'Approve Request',width: 200, dataIndex: 'aprnumber',tooltip:'Nomor Approval'  },
												{ text: 'Adjustment Request',width: 200, dataIndex: 'adjnumber',tooltip:'Nomor Adjustment'  },
												{ text: 'Purchase Request',width: 200, dataIndex: 'prnumber',tooltip:'Nomor Purchase'  },
												{ text: 'Purchase Order',width: 200, dataIndex: 'ponumber',tooltip:'Nomor Purchase Order',
													renderer : function(v,m,r){
														return (!v) ? 'dalam proses' : v;
													}
												}
											]
										},

										{
											text: 'Items',
											columns:[
												{ text: 'Total', dataIndex: 'totalitems',width: 50,tooltip:'Total Item Pengajuan' },
												{ text: 'UP', dataIndex: 'totalunprocess',width: 50,tooltip:'Total Item Pengajuan yang belum diproses'  },
												{ text: 'P', dataIndex: 'totalprocessed' ,width: 50,tooltip:'Total Pengajuan yang sudah diproses' },
												{ text: 'D', dataIndex: 'totaldenied',width: 50 ,tooltip:'Total Item Pengajuan yang ditolak' },
												{ text: 'A', dataIndex: 'totalagree' ,width: 50,tooltip:'Total Item Pengajuan yang disetujui' },
												{ text: 'P', dataIndex: 'totalpending',width: 50,tooltip:'Total Item Pengajuan yang ditunda'  }

											]
										},
										{
											text: 'Tanggal',
											dataIndex: 'tgl',
											renderer: function (v) {
												return Ext.Date.format(v, 'd F Y');
											}
										}
//										{
//											header: 'Proses',
//											xtype: 'actioncolumn',
//											width: 40,
//											items: [
//												{
//													iconCls: 'forward',
//													tooltip: 'Proses Pengajuan Pembelian',
//													handler: me.openNewTabForProcess
//												}
//											]
//										}
									],
									store: me.storegridprapproved,
									dockedItems: [
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											displayInfo: true,
											store: me.storegridprapproved
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
//		me.loadAllGridStore();
	},
	loadAllGridStore: function () {
//		this.down('#listpr').getStore().load();
//		this.down('#listprapprove').getStore().load();
//		this.down('#listprdenied').getStore().load();
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
			number = rec.get('aprnumber'),
			id = rec.get('id');

		/**
		 * Request
		 */
		Ext.Ajax.request({
			url: getApiUrl() + '/transaction/prapprove',
			params: {
				aprid: id,
				aprnumber: number,
				cmd: 'getitems',
				_token : gettoken()
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
				var aprnumber = res.trxnumber;
				if (!aprnumber){
					App.util.box.error('Maaf Nomor Transaksi tidak diketemukan , Silahkan coba lagi');
					return false;
				}

				var aprid = res.id;
				var tgl = res.created_at;
				var status = res.status;
				title = 'Proses Approve Purchase Request' + ( (aprnumber) ? ' [ ' + aprnumber + ']' : ' ');
				var config = {
					aprnumber: aprnumber,
					tgl: tgl,
					aprid : aprid,
					title: title,
					status: status,
					closable: true,
					iconCls: 'add',
					storegrid: Ext.create('App.store.approvepr.items')
				};
				App.util.box.openNewtab(tab, title, 'App.view.approvepr.process', config);
			},
			failure: function (response, opts) {
//				btn.enable();
				App.util.box.error('Maaf,<br/>' +
					'Ada Kesalahan Silahkan Coba Lagi '
				);
				return false;
			}
		});



	}
});
