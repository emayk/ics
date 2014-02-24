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

/**
 * Fungsi :
 * untuk menentukan Harga dan Supplier
 * pengguna : Bagian Pembelian
 */
Ext.define('App.view.approvepr.process', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appapproveprvprocess',
	config: {
		closable: false,
		iconCls: 'add',
		aprnumber: undefined,
		tgl: '02/11/2014',
		status: 1,
		aprid: undefined,
		storegrid: Ext.create('App.store.approvepr.items')
	},

	bodyPadding: 2,
	frame: true,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			layout: { type: 'fit', align: 'stretch'},
			items: [
				{
					title: 'Daftar Barang [ ' + me.getAprnumber() + ' ]',
					xtype: 'grid',
					itemId: 'listsproduct',
					defaults: {
						flex: 1
					},
					flex: 1,
					columns: [
						{xtype: 'rownumberer', text: '#'},
						{
							xtype: 'checkcolumn',
							text: 'Disetujui ?',
							dataIndex: 'approved',
							editor: {
								xtype: 'checkbox'
							},
							listeners: {
								checkchange: function (column, recordIndex, checked) {
									var store = column.up('grid').getStore();
									var record = store.getAt(recordIndex);
									var name = record.get('name');
									var id = record.get('id');
									store.sync({
										success: function (r, opts) {
											App.util.box.createNoticeInfo('Product ' + name + ' berhasil diupdate', 'Informasi');
										},
										failure: function (r, op) {
											App.util.box.error('Ada kesalahan pada saat simpan pada server');
										}
									})
								}
							}
						},
					/**
					 * Product
					 * */
						{text: 'Produk',
							defaults: {
								flex: 1
							},
							columns: [
								{text: 'Kode', dataIndex: 'code'},
								{text: 'Nama', dataIndex: 'name'},
								{text: 'Kategory', dataIndex: 'category'},
								{text: 'Jenis', dataIndex: 'type'}
							]},
					/**
					 * Pemasok
					 * */
						{text: 'Pemasok',
							columns: [
								{text: 'Nama', dataIndex: 'supplier'},
								{text: 'Kontak', dataIndex: 'contact'}
							]},
					/**
					 * Pengiriman
					 */
						{text: 'Pengiriman',
							columns: [
								{text: 'Gudang', dataIndex: 'warehouse'},
								{text: 'Tanggal', dataIndex: 'delivery_at', xtype: 'datecolumn', format: ' d F Y'}
							]
						},

						{
							text: 'Jenis',
							columns: [
								{text: 'Pembayaran', dataIndex: 'paymenttype'},
								{text: 'Pajak', dataIndex: 'taxtype'}
							]
						},

					/**
					 * Qty
					 */
						{text: 'Kuantitas',
							columns: [
								{text: 'Request', dataIndex: 'qtypr',
									renderer: function (v, m, r) {
										var formattedval = Ext.util.Format.number(v, '0,00');
										return formattedval + ' ' + r.get('unit');
									}
								},
								{text: 'Pengajuan', dataIndex: 'qtyadj',
									renderer: function (v, m, r) {
										var formattedval = Ext.util.Format.number(v, '0,00');
										return formattedval + ' ' + r.get('unit');
									}
								}
							]},

					/**
					 * Price
					 */
						{
							text: 'Harga',
							dataIndex: 'price',
							renderer: function (v, m, r) {
								return r.get('currency') + ' ' + v;
							}
						},

						{
							text: 'Total',
							dataIndex: 'subtotal',
							renderer: function (v, m, r) {
								var price = r.get('price'), length = r.get('qtyadj');
								var subtotal = parseFloat(price) * parseFloat(length);
								var curr = r.get('currency');
								var formated = Ext.util.Format.number(subtotal, '0,00');
								return curr + ' ' + formated;
							}
						},

					],
					columnLines: true,
					store: me.getStoregrid(),
					dockedItems: [
						{
							xtype: 'pagingtoolbar',
							dock: 'bottom',
							displayInfo: true,
							store: me.getStoregrid()
						}
					]
				}
			],
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items: [
						{ text: translations.help, iconCls: 'help', action: 'help'},
						'->',
						{ text: 'Selesai',
							iconCls: 'save', handler: function (btn) {
							var panel = btn.up('appapproveprvprocess');
//							var grid = panel.down('grid#listsproduct');
							var tab = panel.up('tabpanel');
//							var store = grid.getStore();
//							var storeProcessed =

							Ext.MessageBox.confirm('Konfirmasi', 'Apakah anda akan selesaikan semua proses,<br/>' +
								'semua product yang disetujui akan menjadi Po dan yang ditolak akan kembali ke<br/>' +
								'daftar pengajuan produk<br/>' +
								'terima kasih', function (btn) {
								if (btn == 'yes') {
									Ext.Ajax.request({
										url: getApiUrl() + '/transaction/purchase/approve',
										method: 'POST',
										params: {
											aprid: panel.getAprid(),
											aprnumber: panel.getAprnumber(),
											setstatus: true,
											_token: gettoken()
										},
										success: function (r, opts) {
											var res = Ext.JSON.decode(r.responseText);
											var msg;
											var error = false;
											if (res.success) {
												/*@todo : dapatkan no PO */
												msg = ' berhasil';
												if (res.ponumber) {
													msg += ' dengan PO number ' + res.ponumber;
												}
												/*reload store proses dan yang sudah diproses*/
												var mp = panel.up('appapproveprvapprovepr');
												mp.down('grid#listpr').getStore().reload();
												mp.down('grid#listprapprove').getStore().reload();
											} else {
												msg = ' gagal';
												error = true;

											}
											var finalmsg ='Pengajuan ini ' + msg + ' diupdate<br/><br/>' +
												'1. Proses ini akan berubah status menjadi Purchase Order<br/> ' +
												'dan akan disimpan di Daftar PR yang sudah diproses<br/>' +
												'2. Akan tetap di Daftar PR dalam proses jika salah satu tidak diproses<br/>' +
												'<br/>Terima Kasih';

											if (error) {
												App.util.box.error(finalmsg);
											}else{
												App.util.box.info(finalmsg);
												tab.remove(panel);
											}
										},
										failure: function () {
											App.util.box.error('Ada Kesalahan, proses ditunda, silahkan coba lagi');
											return false;
										}
									})

//									store.reload();
								}
							});

						} }
//						{ text: 'Selesai', iconCls: 'add', action: 'prapproved' },
//						{ text: 'Tolak', iconCls: 'cancel', action: 'prdenied' },
//						{ text: 'Batal', iconCls: 'close', action: 'close' }
					]
				}
			]
		});
		me.callParent(arguments);
		if (me.getAprid()) {
			var grid = me.down('grid#listsproduct'),
				store = grid.getStore();
			store.getProxy().setExtraParam('aprid', me.getAprid());
			store.getProxy().setExtraParam('aprnumber', me.getAprnumber());
			store.getProxy().setExtraParam('onlynew', true);
			store.getProxy().setExtraParam('setitem', true);
			grid.reconfigure(store);
			store.load();
		}
	}
});