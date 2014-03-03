/**
 * View prorder
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
Ext.define('App.view.prorder.vprorder', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appprordervprorder',
	iconCls: 'grid',

	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		var store = Ext.create('App.store.prorder.sprorder');
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					itemId: 'taborder',

					layout: { type: 'fit', align: 'stretch'},
					items: [
						{
							title: 'PO aktif',
							xtype: 'grid',
							flex: 1,
							itemId: 'gridlistpoaktif',
							iconCls: 'grid',
							store: store,
							columns: [
								{ xtype: 'rownumberer'},
								{
									xtype: 'actioncolumn',
									width: 50,
									text: 'Aksi',
									items:[
										{
											iconCls: 'forward',
											itemId: 'actionview',
											handler: function (grid, rowIndex, colIndex) {
												me.openOrder(grid,rowIndex,colIndex);
											}
										}
									]
								},
								{ text: 'Nomor', dataIndex: 'ponumber' },
								{
									text: 'Pemasok',
									columns: [
										{ text: 'Nama', dataIndex: 'supplier'},
										{ text: 'Kontak', dataIndex: 'contact'}
									]
								},
								{
									text: 'Rincian',
									columns: [
										{
											text: 'Print',
											columns: [
												{ text: 'Sdh di <br/>Print ? ', dataIndex: 'printed', xtype: 'checkcolumn'},
												{ text: 'Jumlah', dataIndex: 'cntprint',
													renderer: function (v, m, r) {
														var o = (v == 0) ? "Tidak Pernah " : v + ' kali';
														return o;
													}
												}
											]
										},
										{
											text: 'Pembayaran',
											columns: [
												{ text: 'Metoda', dataIndex: 'payment' },
												{ text: 'Mata Uang', dataIndex: 'currency' },
												{ text: 'Pajak', dataIndex: 'tax' },
												{ text: 'Jangka Waktu', dataIndex: 'credit' },
												{
													text: 'Total',
													columns: [
														{ text: 'Pembayaran', dataIndex: 'totalpayment', xtype: 'numbercolumn'},
														{ text: 'Down Payment',
															dataIndex: 'totaldp',
															renderer: function (v, m, r) {
																var symbol = r.get('currsymbol');
																var val = v;
																val = Ext.util.Format.number(v, '0,000.00');
																if (symbol) {
																	val = symbol + ' ' + val;
																}
																return  val;
															}
														}
													]
												}

											]
										},
										{
											text: 'Pengiriman',
											columns: [
												{ text: 'Tanggal', dataIndex: 'delivery_at', xtype: 'datecolumn', format: 'd F Y' },
												{ text: 'Ke Gudang', dataIndex: 'warehouse' }
											]
										}
									]
								}

							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar', dock: 'bottom',
									store: store
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
		var gridstore = me.down('#gridlistpoaktif').getStore();
		if (gridstore) gridstore.load();
	},
	openOrder: function(grid,rowIndex,colIndex){
		var rec = grid.getStore().getAt(rowIndex);
		var tab = grid.up('tabpanel');
		var trxnumber = rec.get('ponumber');
		var trxid = rec.get('id');
		var title = 'Informasi Order [ '+trxnumber+' ]';
		var config = {
			iconCls: 'form',
			closable:true,
			ponumber: trxnumber,
			poid: trxid,
			record: rec,
//			adjid : trxid,
			title: title,
//			adjtrx: trxnumber,
			status : rec.get('status'),
			store : Ext.create('App.store.prorder.sitem')
		}
		App.util.box.openNewtab(tab,title,'App.view.prorder.view',config);
	}

});
