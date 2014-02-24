/**
 * View purchase
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
Ext.define('App.view.purchase.vpurchase', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.apppurchasevpurchase',
	config: {
		store: Ext.create('App.store.purchase.spurchase'),
		autoloadgrid: true
	},
	layout: 'fit',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					itemId: 'tabpr',
					items: [
						{
							xtype: 'container',
							layout: { type: 'vbox', align: 'stretch'},
							title: 'Daftar',
							iconCls: 'grid',
							items: [
								{
									xtype: 'grid',
									flex: .5,
									itemId: 'lists',
									flex: 1,
									store: me.getStore(),
									columns: [
										{
											xtype: 'rownumberer'
										},
										{
											text: 'Number',
											dataIndex: 'trxnumber',
											flex: 2
										},
										{
											header: 'Aksi',
											xtype: 'actioncolumn',
											width: 40,
											items: [
												{
													iconCls: 'forward',
													tooltip: 'Tampilkan Detail',
													handler: function (grid, rowIndex, colIndex) {
														var rec = grid.getStore().getAt(rowIndex);
														var panel = grid.up('apppurchasevpurchase');
														var detail = panel.down('#detail');
														var title = 'Barang Yang dipesan [' + rec.get('trxnumber') + ']'
														detail.setTitle(title);
													}
												}
											]}
									],
									dockedItems: [
										{
											xtype: 'toolbar',
											dock: 'top',
											items: [
												{
													text: 'Buat Pengajuan Barang',
													iconCls: 'add',
													action: 'createpr'
												}
											]
										},
										{
											xtype: 'pagingtoolbar',
											dock: 'bottom',
											store: me.getStore(),
											displayInfo: true
										}
									]
								},
								{
									xtype: 'container',
									margin: '10 0 0 0',
									flex: .5,
									items: [
										{
											autoScroll: true,
											itemId: 'detail',
											xtype: 'panel',
											title: 'Barang Yang dipesan [' + Date.now() + ']'
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
		if (me.getAutoloadgrid()) {
			me.down('#lists').getStore().load();
		}
	}

});
