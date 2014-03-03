/**
 * View dashboard
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
Ext.define('App.view.dashboard.vdashboard', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appdashboardvdashboard',
	layout: { type: 'vbox', align: 'stretch'},
	bodyPadding: 5,
	frame: true,
	autoScroll: true,
	defaults: {
		margin: '0 0 5 0'
	},
	items: [
		/*Baris 1*/
		{
			flex: .5,
			xtype: 'container',
			layout: { type: 'hbox', align: 'stretch'},
			items: [
				/*Kolom 1*/
				{
					xtype: 'panel', flex: .3,
					title: 'Master',
					bodyPadding: 10,
					items: [
						{
							xtype: 'container',
							margin: '0 0 5 0',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'button', flex: .3,
									text: 'Product',
									action: 'masterproduct'
								},
								{
									xtype: 'button', flex: .3,
									margin: '0 5 0 5',
									text: 'Setting Saldo Product',
									action: 'setupsaldoproduct'
								}
							]
						}
					]
				},
				/*Kolom 2*/
				{
					margin: '0 5 0 5',
					xtype: 'panel', flex: .3,
					title: 'Tools',
					itemId: 'dashtools',
					layout: {type: 'vbox', align: 'stretch'},
					default: {
						margin: '5 5 5 5'
					},
					items: [
						{
							xtype: 'panel', html: 'Empty'
						}

//						{ xtype: 'buttongroup',
//							default: {
//								margin: '5 5 5 5'
//							},
//							items: [
//								{
//									xtype: 'button', text: 'Generate'
//								},
//								{
//									xtype: 'button', text: 'Generate'
//								},
//								{
//									xtype: 'button', text: 'Generate'
//								}
//							]
//						},
//						{
//							xtype: 'button', text: 'Generate'
//						}
					]
				},
				/*Kolom 3*/
				{
					xtype: 'panel', flex: .25,
					title: 'Management',
					itemId: 'management',
					bodyPadding: 10,
					items: [
						{
							xtype: 'button', text: 'Daftar Persetujuan Pengajuan Barang',
							iconCls: 'grid',
							itemId: 'approvalprbtn',
							handler: function (btn) {
								var tab = btn.up('tabpanel');
								if (!tab) {
									tab = btn.up('devmainpanel');
									if (!tab) {
										tab = btn.up('mainpanel');
									} else {
										Ext.Error.raise('Komponent Tab tidak diketemukan');
									}
								}
								log(tab);
								var panel = 'App.view.approvepr.vapprovepr';
								var title = btn.text;

								App.util.box.openNewtab(tab, title, panel, {
									iconCls: 'grid', closable: true, title: title
								});


							}
						}
//						,{
//							xtype: 'button', text: 'Produk'
//						},
//						{
//							xtype: 'button', text: 'Produk'
//						}
					]
				}
			]
		},
		/*Baris 2*/
		{

			flex: .5,
			xtype: 'container',
			layout: { type: 'hbox', align: 'stretch'},
			items: [
				/*Kolom 1*/
				{
					xtype: 'panel', flex: .3,
					title: 'Aksi Pengguna',
					layout: { type: 'vbox', align: 'stretch'},
					bodyPadding: 10,
					defaults: {
						margin: '5 5 5 5'
					},
					items: [
						{
							xtype: 'fieldset',
							title: 'Semua Pengguna',
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'button', flex: .3,
									text: 'Daftar Pengajuan',
									iconCls: 'grid',
									action: 'listepr'
								},
								{
									xtype: 'button', text: 'Buat PR',
									action: 'createpr', iconCls: 'add'
								},
								{
									xtype: 'button', text: 'Daftar PO',
									iconCls: 'grid', action: 'openlistpo'
								}
							]
						},
						{
							xtype: 'fieldset',
							title: 'Bagian Gudang',
							margin: '5 5 5 5',
							bodyPadding: 5,
							items: [
								{ xtype: 'buttongroup',
									items: [
										{ iconCls: 'grid',
											text: 'Terima Barang', handler: function (btn) {
											/**
											 * Tampilkan Panel Terima Barang
											 */
											var panel = 'App.view.receiveProduct.tabbarang';
											var title = "Terima Barang";
											var tab = btn.up('tabpanel');
											App.util.box.openNewtab(tab, title, panel, {
												closable: true,
												iconCls: 'grid'
											});
										}}

									]
								}
							]

						}
					]

				},
				/*Kolom 2*/
				{
					/*Pembelian*/
					margin: '0 5 0 5',
					xtype: 'panel', flex: .3,
					title: 'Pembelian',
					bodyPadding: 10,
					items: [

						{
							xtype: 'container',
//					        margin: '0 0 5 0',
							defaults: {
								margin: '5 5 5 5'
							},
							layout: { type: 'hbox', align: 'stretch'},
							items: [
								{
									xtype: 'button', flex: .3,
									text: 'Penyesuaian <br/>Pengajuan',
									action: 'listadjustmentpr'
								},
//								{
//									xtype: 'button', flex: .3,
//									text: 'Proses Pengajuan 3',
//									action: 'processadjpr3'
//								}
							]
						},
//						{
//							xtype: 'container',
//							margin: '0 0 5 0',
//							layout: { type: 'hbox', align: 'stretch'},
//							items: [
//								{
//									xtype: 'button', flex: .3,
//									text: 'Proses Pengajuan 1',
//									action: 'processadjpr1'
//								},
//								{
//									xtype: 'button', flex: .3,
//									margin: '0 5 0 5',
//									text: 'Proses Pengajuan 2',
//									action: 'processadjpr2'
//								},
//								{
//									xtype: 'button', flex: .3,
//									text: 'Proses Pengajuan 3',
//									action: 'processadjpr3'
//								}
//							]
//						}
					]
				},
				/*Kolom 3*/
				{
					xtype: 'panel', flex: .25,
					title: 'Aktifitas System',
					layout: { type: 'fit', align: 'stretch'},
//					bodyPadding: 10,
					items: [
						{
							xtype: 'grid',
							itemId: 'gridlog',
							store: 'App.store.dashboard.slog',
							columns: [
								{
									xtype: 'rownumberer', text: '#'
								},
								{ dataIndex: 'created_at', text: 'Time',
									renderer: Ext.util.Format.dateRenderer('d F Y')
								},
								{ text: 'Informasi', dataIndex: 'msg', flex: 1}
							],
							dockedItems: [
								{
									xtype: 'pagingtoolbar',
									store: 'App.store.dashboard.slog',
									dock: 'bottom'
								}
							]
						}
					]
				}
			]
		}
	]
})
;
