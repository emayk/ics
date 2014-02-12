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

/*Form Purchase Request*/
Ext.define('App.view.checkgood.formpr', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.appcheckgoodvformpr',
	iconCls: 'grid',
	title: 'Pengajuan Pemesanan',
	config: {
		codepr: undefined
	},
	layout: { type: 'fit', align: 'stretch'},
	closable: true,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					/*Grid Produk Yang terpilih*/
					xtype: 'grid',
					title: 'Daftar Purchase Request (Pengajuan Pembelian Barang) ',
					itemId: 'gridproduct',
					plugins: [
						Ext.create('Ext.grid.plugin.RowEditing', {
							clicksToEdit: !1,
//											pluginId: 'cellEditorPosition',
							clicksToMoveEditor: 1
						})
					],
					selModel: App.util.box.createSelectionModel(),
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name', 'code', 'category', 'jenis', 'length', 'unit'],
						data: [
							{ id: 1, code: 'Kode1', name: 'Produk A', category: 'Cat 1', jenis: 'Jenis Produk', length: 0, unit: 'm'},
							{ id: 2, code: 'Kode2', name: 'Produk B', category: 'Cat 2', jenis: 'Jenis Produk', length: 100, unit: 'm1'},
							{ id: 3, code: 'Kode3', name: 'Produk C', category: 'Cat 3', jenis: 'Jenis Produk', length: 0, unit: 'm2'}
						]
					}),
					columns: [
						{
							xtype: 'rownumberer'
						},
						{
							text: 'Nama Produk',
							dataIndex: 'name'
						},
						{
							text: 'Code',
							dataIndex: 'code'
						},
						{
							text: 'Kategori',
							dataIndex: 'category'
						},
						{
							text: 'Jenis',
							dataIndex: 'jenis'
						},
						{
							text: 'Panjang',
							dataIndex: 'length',
							editor: {
								xtype: 'numberfield',
								minValue: 0,
								hiddenTrigger: true
							}
						},
						{
							text: 'Satuan',
							dataIndex: 'unit',
							editor: {
								xtype: 'combobox',
								store: Ext.create('Ext.data.Store', {
									fields: ['id', 'name', 'value'],
									data: [
										{ id: 1, name: 'Meter', value: 'm'},
										{ id: 2, name: 'Meter1', value: 'm1'},
										{ id: 3, name: 'Meter2', value: 'm2'},
										{ id: 4, name: 'Meter3', value: 'm3'}
									]
								}),
								queryMode: 'local',
								displayField: 'name',
								valueField: 'value',
								editable: false,
								forceSelection: true
							}
						}
					],
					dockedItems: [

						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								{ text: translations.remove, iconCls: 'delte',
									handler: me.removeProductFromGrid
								}
							]
						},
						{
							xtype: 'toolbar',
							dock: 'bottom',
							items: [
								{
									text: translations.help,
									action: 'help',
									iconCls: 'help'
								},
								'->',
								{
									text: 'Proses',
									action: 'proses',
									iconCls: 'add',
									handler: me.processPesanan
								},
								{
									/*Hapus Semua Record dan Keluar*/
									text: 'Batal',
									action: 'resetandclose',
									iconCls: 'close'
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
	},
	removeProductFromGrid : function(btn){
		var grid = btn.up('grid'),
			selections = grid.getSelectionModel().getSelection();

		if (selections[0] === undefined) {
			App.util.box.error('Pilih Produk terlebih dahulu yang akan dihapus');
			return false;
		}
		/*@todo : Iterasi terhadap produk yang dipilih */
	},
	processPesanan: function(btn){
		/*Product2 yang terpilih akan disimpan kedalam daftar Purchase Request*/

		var grid = btn.up('grid');
		var store = grid.getStore();
		var names = [];
		var iszerolength = false;
		var zerostuff = [];
		Ext.each(store.data.items, function (rec, v) {
			if (parseInt( rec.get('length') ) == 0)
			{
				iszerolength = true;
				zerostuff.push(rec.get('name'));
			}
			names.push(
				{ name: rec.get('name'), length: rec.get('length'),unit : rec.get('unit') }
			);
		});

		if (iszerolength){
			App.util.box.error('Produk [ '+ zerostuff +' ] diisi panjang 0 , silahkan perbaiki atau hapus produk tersebut');
			return false;
		}

		log(names);
		/*Lakukan Pengecekan pada panjang harus lebih dari 0 */
		/*Tampilkan Konfirmasi akan disimpan kedalam daftar PR*/
	}
});