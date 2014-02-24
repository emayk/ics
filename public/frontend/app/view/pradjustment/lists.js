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

/*Grid daftar penyesuaian pembelian*/
Ext.define('App.view.pradjustment.lists', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.apppradjustmentvpradjustmentlists',
	layout: { type: 'fit', align: 'stretch'},
	store: 'App.store.pradjustment.spradjustment',
	groupid: 5,

	frame: true,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			flex: 1,
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
				{xtype: 'rownumberer'},
				{text: 'Transaksi Number', dataIndex: 'trxnumber', flex: 2,
					renderer: function(v,m,r){
						var totalitem = r.get('totalitems');
						var total = (totalitem >0) ? totalitem : 0 ;
						var s = (total > 0 ) ? 's' : '';
						return v + ' ( ' + total + ' item'+s+' )';
					}
				},
				{text: 'Sudah di Proses', dataIndex: 'process', flex: 1, xtype: 'checkcolumn'},
				{
					xtype: 'actioncolumn',
					width: 50,
					items: [
						{
							iconCls: 'forward',
							tooltip: 'Proses',
							handler: function (grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								/*Jika Status == Sudah diproses (code 5) */
								if (rec.get('status')==5){
									App.util.box.error('Pengajuan ini sudah diajukan ke management tidak bisa untuk diproses');
									return false;
								}
								var tab = grid.up('tabpanel');
								var trxnumber = rec.get('trxnumber');
								var trxid = rec.get('id');
								var title = 'Proses Adjustment Pembelian [ '+trxnumber+' ]';
								var config = {
									iconCls: 'form',
									closable:true,
									adjid : trxid,
									title: title,
									adjtrx: trxnumber,
									status : rec.get('status'),
									store : Ext.create('App.store.pradjustment.item')
								}
								App.util.box.openNewtab(tab,title,'App.view.pradjustment.edit',config);
							}
						}
					]
				}
			],
			columnLines: true,
			/*==========  Plugins  ==========*/
			plugins: [
				Ext.create('Ext.grid.plugin.RowEditing', {
					clicksToEdit: !1,
					clicksToMoveEditor: 1
				})
			],
			store: me.getStore(),
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true,
					store: me.getStore()
				}
			]


		});
		me.callParent(arguments);
//		}
	}
});


