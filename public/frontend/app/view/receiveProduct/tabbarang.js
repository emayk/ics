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

/** Terdiri dari Daftar
 * Terima Barang
 * Cetak Bukti
 **/

Ext.define('App.view.receiveProduct.tabbarang', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.appreceiveProductvtabbarang',
	requires: [
		'App.view.receiveProduct.vreceiveProduct'
	],
	padding: 10,
	frame: true,
	title: 'Terima Barang',
	layout: { type: 'fit', align: 'stretch'},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					/*Daftar Barang Yang Akan diterima*/
					xtype: 'container',
					title: 'Daftar',
					items: [
						{
							xtype: 'grid',
							height: App.util.box.maxHeightwindow() - 35,
							store: Ext.create('Ext.data.ArrayStore', {}),
							columns: [
								{
									xtype: 'rownumberer'
								}
							],
							dockedItems: [
								{
									xtype: 'toolbar',
									dock: 'top',
									items: [
										{
											text: 'Refresh',
											iconCls: 'refresh',
											action: 'refresh',
											tooltip: 'Refresh Data Terima barang'
										}
									]
								},
								{
									xtype: 'pagingtoolbar',
									dock: 'bottom',
									displayInfo: true
								}
							]
						}
					]
				},
				{
					/*Cetak Bukti Terima Barang */
					title: 'Cetak Bukti',
					iconCls: 'home',
					xtype: 'container',
					items: [
						{
							xtype: 'panel',
							bodyPadding: 10,
							html: 'Cetak Bukti Terima Barang'
						}
					]
				},
				{
					/*Daftar Terima Barang*/
					title: 'Form Terima Barang',
					iconCls: 'home',
					closable: true,
					xtype: 'appreceiveProductvreceiveProduct'
				}
			]
		});
		me.callParent(arguments);
	}
});