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


Ext.define('App.view.standintruction.winForm', {
	extend: 'Ext.window.Window',
	alias: 'widget.appstandintructionwinform',
	config: {
		ponumber: '13/07/APO/1233', // no PO
//		sinumber: '018', // Nomor Standing intruction
		nocorak: 'XT-34533',
		tglbuat: '21/4/2014',
		supname: 'PT Kahatex',
		contactname: '-',
		sisapesan: 3400,
		title: 'Information Standing Intruction',
	},
	layout: {
		type: 'fit',
		align: 'stretch'
	},
	initComponent: function () {
		var me = this;
		var today = new Date();
		Ext.apply(me, {
			width: App.util.box.maxWidthWindow() - 200,
			height: App.util.box.maxHeightwindow() - 200,
			title: me.getTitle(),
			items: [
				{
					xtype: 'form',
					bodyPadding: 10,
					frame: true,
					defaults: {
						labelWidth: 150,
						anchor: '95%'

					},
					items: [
						{
							xtype: 'fieldset',
							title: 'Kepada',
							items: [
								{
									xtype: 'displayfield', name: 'supname', fieldLabel: 'Nama Pemasok', value: me.getSupname()
								},
								{
									xtype: 'displayfield', name: 'contactname', fieldLabel: 'Nama Kontak', value: me.getContactname()
								}
							]
						},
						{
							xtype: 'displayfield', value: me.getNocorak(), fieldLabel: 'Nomor Corak'
						},
						{
							xtype: 'numberfield', name: 'qtyprocess', fieldLabel: 'Jumlah Untuk Proses', maxValue: me.getSisapesan(),
							hideTrigger: true, keyNavEnabled: true, mouseWheelEnabled: false,minValue:0
						},
						{
							xtype: 'datefield', name: 'deliverydate', fieldLabel: 'Tanggal Pengiriman', value: today, minValue: today
						},
						{
							xtype: 'numberfield', name: 'toleransipersen', fieldLabel: 'Tolerance Waste (%)',
							minValue: 0, maxValue: 20, step: 1,hideTrigger: true, keyNavEnabled: true, mouseWheelEnabled: false
						},
						{
							xtype: 'textareafield', name: 'specialnote', fieldLabel: 'Special Intruction',
							grow: true,autoScroll: true,maxLength : 1000
						}
					],
					dockedItems: [
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
									text: translations.add,
									action: 'add',
									iconCls: 'add'
								},
								{
									text: translations.close,
									action: 'close',
									iconCls: 'close'
								}
							]
						}
					]
				}
			]
		});
		me.callParent(arguments);
	}
});