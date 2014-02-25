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

Ext.define('App.view.products.import', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.productimport',
	bodyPadding: 10,
	frame: true,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			layout: { type: 'vbox', align: 'stretch'},
			items: [

				{
					xtype: 'form',
					flex: .2,
					bodyPadding: 10,
					clientValidation: true,
					items: [
						{
							xtype: 'filefield',
							name: 'product',
							fieldLabel: 'File Excel',
							labelWidth: 100,
							msgTarget: 'side',
							allowBlank: false,
							anchor: '100%',
							buttonText: 'Pilih File Excel ...',
							accept: ['xls', 'xlsx', 'csv'],
							listeners: {
								afterrender: function (cmp) {
									cmp.fileInputEl.set({
										accept: 'xls' // or w/e type
									});
								}
							}
						}
					],
					buttons: [
						{
							text: 'Unggah',
							handler: function (btn) {
								var form = btn.up('form').getForm();
								var fname = btn.up('form').down('[name=product]');
								var rawValue = fname.getRawValue();
								var indexofPeriod = rawValue.lastIndexOf("."),
									uploadedExtension = rawValue.substr(indexofPeriod + 1, rawValue.length - indexofPeriod);
								var acceptExt = fname.accept;
								if (!Ext.Array.contains(acceptExt, uploadedExtension)) {
									fname.setActiveError('Silahkan Upload hanya berextention :  ' + acceptExt.join() + ' saja!');
									Ext.MessageBox.show({
										title: 'File Type Error',
										msg: 'Silahkan Upload file dengan extention :  ' + acceptExt.join() + ' saja!',
										buttons: Ext.Msg.OK,
										icon: Ext.Msg.ERROR
									});
									fname.setRawValue(null);
									return false;
								}


								if (form.isValid()) {
									form.submit({
										url: getApiUrl() + '/import/product',
										waitMsg: 'Unggah file...',
										params: {
											_token: gettoken(),
											uid : user_login_id()
										},
										success: function (fp, o) {
											var msg = (o.result.msg) ? o.result.msg : 'Anda berhasil mengunggah "' + o.result.file + '" ';
											Ext.MessageBox.alert('Berhasil', msg);
										},
										failure: function (fp, o) {
											App.util.box.error('Kesalahan','ada kesalahan silahkan coba lagi');
										}
									});
								}
							}
						}
					]
				},
				{
					flex: .75,
					title: 'Product Yang berhasil diimport',
					xtype: 'grid',
					margin: '10 0 0 0',
					autoScroll: true,
					itemId: 'gridimportlistproduct',
					store: 'App.store.product.Product',
					defaults: { flex: 1 },
					columns: [
						{ xtype: 'rownumberer' },
						{
							text: 'Total Stok',
							columns: [
								{ /*CL 7 */ text: 'Panjang', dataIndex: 'totallength' },
								{ /*CL 7 */ text: 'Roll', dataIndex: 'totalroll' }
							]
						},
						{ text: translations.field.design, dataIndex: 'nodesign', filter: true},
						{ text: translations.field.contruction, dataIndex: 'contruction', filter: true},
						{ text: translations.field.category.default, dataIndex: 'catname', filter: true},
						{ text: translations.field.type.default, dataIndex: 'typename', filter: true},
						{ text: translations.field.width, dataIndex: 'width',
							renderer: function (v, meta, rec) {
								return v + ' ' + rec.get('widthname');
							}
						},
						{ text: translations.field.weight, dataIndex: 'weight',
							renderer: function (v, meta, rec) {
								return v + ' ' + rec.get('weightname');
							}
						},
						{
							text: 'Status', flex: 1
						},
						{
							text: 'Keterangan', flex: 2
						}
					],
					dockedItems: [
						{ xtype: 'pagingtoolbar', store: 'App.store.product.Product', dock: 'bottom', displayInfo: true }
					]
				}
			]
		});
		me.callParent(arguments);
	}
});