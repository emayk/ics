/**
 * View PO
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


Ext.define('App.view.PO.vPO', {
	extend: 'Ext.panel.Panel',
	frame: true,
	bodyPadding: 5,
	alias: 'widget.appPOvPO',
	requires: [
		'App.view.PO.tabNewOrderKain'
	],
	/*Nomor PO diambil dari request ke server terlebih dahulu */
	poNumber: 1,
	initComponent: function () {
		var me = this;
		/*Sample Data*/
		var sampleData = [
			{ id: 1, orderno: 'PONumber-1' }
		];

		var storegridPoKain = Ext.create('Ext.data.Store', {
			fields: [ 'id', 'orderno'],
			data: sampleData
		});
		var storegridPoMakloon = Ext.create('Ext.data.Store', {
			fields: [ 'id', 'orderno'],
			data: sampleData
		});

		Ext.apply(me, {
			items: [
				{
					xtype: 'tabpanel',
					plain: true,
					activeTab: 2,
					items: [
						/*Kain*/
						{
							title: 'Kain', iconCls: 'home',
							height: 400,
							flex: 1,
							xtype: 'container', layout: {type: 'fit', align: 'stretch'},
							flex: 1,
							items: [
								{
									xtype: 'grid',
									columns: [
										{xtype: 'rownumberer', text: '#'},
										{text: 'Nomor PO', dataIndex: 'orderno' }
									],
									store: storegridPoKain,
									dockedItems: [
										{xtype: 'toolbar', dock: 'top',
											items: [
												{ text: 'Tambah', action: 'add', iconCls: 'add'},
												{ text: 'Hapus', action: 'add', iconCls: 'delete'}
											]
										},
										{
											dock: 'bottom',
											xtype: 'pagingtoolbar', store: storegridPoKain
										}
									]
								}
							]
						},

						/*Makloon*/
						{
							title: 'Makloon', iconCls: 'home',
							height: 400,
							flex: 1,
							xtype: 'container', flex: 1, layout: {type: 'fit', align: 'stretch'},
							items: [
								{   xtype: 'grid',
									columns: [
										{xtype: 'rownumberer', text: '#'},
										{text: 'Nomor PO', dataIndex: 'orderno' }
									],
									store: storegridPoMakloon,
									dockedItems: [
										{xtype: 'toolbar', dock: 'top',
											items: [
												{ text: 'Tambah', action: 'add', iconCls: 'add'},
												{ text: 'Hapus', action: 'add', iconCls: 'delete'}
											]
										},
										{xtype: 'pagingtoolbar', dock: 'bottom', store: storegridPoMakloon }
									]
								}
							]
						},
						/*Buat PO Kain*/
						{
							title: 'Buat PO Kain',
							xtype: 'panelNewOrderKain',
							frame: true,
							closable: true
						},
						{
							html: 'Content PO Makloon (form,etc)',
							xtype: 'container',
							closable: true,
							title: 'Buat PO Makloon'
						}
					]
				}

			]
		});
		me.callParent(arguments);
	}

});
