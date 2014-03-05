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



Ext.define('App.view.receiveProduct.gridPrintHistoryItem', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.appreceiveProductvreceiveProductprinthistory',
	store: 'App.store.receiveProduct.sprintProductItem',
	/*Diperlukan*/
	receiveid: undefined,
	receivenumber: undefined,
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			xtype: 'grid',
			title: 'Print Bukti Terima Barang',
			iconCls: 'print',
			features: [
				{ftype: 'grouping',
					collapsible: false,
					showSummaryRow: false,
					groupHeaderTpl: '{columnName}: {name} ({rows.length} buah)',
					hideGroupedHeader: true
				}
			],
			columns: [
				{xtype: 'rownumberer', text: 'No'},
				{ text: 'Product', dataIndex: 'productname'},
				{ text: 'Surat Jalan', dataIndex: 'sjno'},
				{ text: 'Qty Barang',
					columns: [
						{
							text: 'Total',
							columns: [
								{ text: 'Order', dataIndex: 'qtyorder',xtype: 'numbercolumn'},
								{ text: 'Yard', dataIndex: 'totalqtyreceived' ,xtype: 'numbercolumn'},
								{ text: 'Roll', dataIndex: 'totalrollreceived' ,xtype: 'numbercolumn'}
							]
						},
						{
							text: 'Belum Terima',
							columns: [
								{ text: 'Yard',
									dataIndex: 'qtyelapse'
								,xtype: 'numbercolumn'}
							]
						},
						{
							text: 'Sudah Terima',
							columns: [
								{ text: 'Yard', dataIndex: 'qtyreceived',xtype: 'numbercolumn'},
								{ text: 'Roll', dataIndex: 'rollreceived' ,xtype: 'numbercolumn'}
							]
						}
					]},
			/**
			 * Proses Print
			 * */
				{
					header: 'Print',
					xtype: 'actioncolumn',
					width: 40,
					items: [
						{
							iconCls: 'print',
							tooltip: 'Print Item',
							handler: function (gridview, rowIndex, colIndex, item, e, record, row) {
								var grid = gridview.up('grid');
								grid.fireEvent('printItemHistory', grid, record)
							},
							isDisabled: function (view, rowIndex, colIndex, item, record) {
								return (!record.get('canprint'));
							}
						}
					]
				}
			],
			dockedItems: [
				{xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true,
					store: me.getStore()
				}
			]
		});
		me.callParent(arguments);
		me.setupGrid();
	},
	setupGrid: function () {
		var me = this, receiveid = me.receiveid,
			receivenumber = me.receivenumber,
			store = me.getStore();

		if (receiveid) {
			if (receivenumber) {
				if (store) {
					var proxy = store.getProxy();
					if (proxy) {
						proxy.setExtraParam('cmd', 'listprintreceiveitemtoday');
						proxy.setExtraParam('receiveid', receiveid);
						proxy.setExtraParam('receivenumber', receivenumber);
						store.load();
					}
				}
			} else {
				Ext.Error.raise('Number not found');
			}
		} else {
			Ext.Error.raise('Id not found');
		}

	}
})
;