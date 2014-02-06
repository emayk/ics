/**
 * Part Of ICS
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

Ext.define('App.controller.caccountBank', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.accountBank.vaccountBank',
		'App.view.accountBank.WinForm',
		'App.view.accountBank.form',
		'App.view.accountBank.Lists'
	],
	models: [
		'App.model.accountBank.maccountBank'
	],
	stores: [
		'App.store.accountBank.saccountBank',
		'App.store.combo.cbCurrency'
	],
	refs: [
		{
			ref: 'panel',
			selector: 'appaccountBankvaccountBank'
		},
		{
			ref: 'grid',
			selector: 'appaccountBankvaccountBankList'
		},
		{
			ref: 'formAccount',
			selector: 'appaccountBankform'
		}
	],
	init: function () {
		var me = this;
		me.control({
			/*Panel*/
//			"appaccountBankvaccountBank": {
//
//			},
			/*Grid*/
//            'appaccountBankvaccountBank #gridlist': {
//                itemclick: me.showInfo
//            },
			/*Form*/
//			'appaccountBankvaccountBank #formaccount': {
//
//			},
//			'appaccountBankvaccountBank #formaccount': {
//
//			},
//			'appaccountBankvaccountBank #formaccount #add': {
//				click: me.saveRecord
//			},
//			'appaccountBankvaccountBank #formaccount #remove': {
//				click: me.removeRecord
//			},

			/**
			 * Grid
			 */
			'appaccountBankvaccountBankList': {
//		        itemclick: me.showInfo
				itemdblclick: me.loadrecordOnWindow
			},
			'appaccountBankvaccountBankList > toolbar [action=add]': {
				click: me.addRecordBankFromGrid
			},
			'appaccountBankvaccountBankList > toolbar [action=remove]': {
				click: me.removedBankFromGrid
			},
			'appaccountBankvaccountBankList > toolbar [action=import]': {
				click: me.importRecord
			},
			'appaccountBankvaccountBankList > toolbar [action=export]': {
				click: me.exportRecord
			},
			'appaccountBankvaccountBankList > toolbar [action=help]': {
				click: me.helpRecordGrid
			},
			/**
			 * Form
			 */
//			'appaccountBankform': {
//
//			},
			'appaccountBankform [action=addbank]': {
				click: me.addRecordBank
			},
			'appaccountBankform [action=addcurrency]': {
				click: me.addRecordCurrency
			},
			'appaccountBankform [action=addtax]': {
				click: me.addRecordTax
			},
			'appaccountBankWinForm [action=addtax]': {
				click: me.addRecordTax
			},
			'appaccountBankform > toolbar [action=save]': {
				click : me.saveRecord
			},
			'appaccountBankform > toolbar [action=close]': {
				click : me.closewindow
			},
			'appaccountBankform > toolbar [action=help]': {
				click : me.helpwindow
			}
		});
	},
	importRecord: function(btn){
		belumImplement()
	},
	exportRecord: function(btn){
		belumImplement()
	},
	helpRecordGrid: function(btn){
		belumImplement()
	},

	loadrecordOnWindow: function(grid,record){
	var win;
		if (!win){
			win = Ext.create('App.view.accountBank.WinForm',{
				title: 'Tambah Record Rekening Bank',
				modal : true
			});
			win.down('form').getForm().loadRecord(record);
			win.show();
		}
	},
	closewindow: function(btn){
		btn.up('window').close();
	},

	helpwindow: function(btn){
		belumImplement();
	},

	removedBankFromGrid: function(btn){
		var grid = btn.up('grid');
		this.removerecordFromStore(grid);
	},
	addRecordBankFromGrid: function (btn) {
		var me = this,
			grid = btn.up('grid'),
			store = grid.getStore(),
			params = store.getProxy().extraParams,
			id = params.parent_id,
			type = params.parenttype,
			win;
		if (!id || !type){
			me.msgError('Error, tidak diketahui (parent not found)');
			log(id,type);
			return false;
		}

		if (!win) {
			win = Ext.create('App.view.accountBank.WinForm',{
				title: 'Tambah Record Rekening Bank',
				modal : true
			});
			var record = Ext.create('App.model.accountBank.maccountBank',{
				owner_type: type,
				owner_id : id
			});

			win.down('form').getForm().loadRecord(record);
			win.show();
		}
	},
	msgError: function (text) {
		App.util.box.error(text);
		return false;
	},
	msgSuccess: function (text) {
		App.util.box.info(text);
	},
	addRecordTax: function (btn) {
		belumImplement();
	},

	addRecordCurrency: function (btn) {
		belumImplement();
	},

	addRecordBank: function (btn) {
		belumImplement();
	},

	showInfo: function (grid, record) {
		var me = this;
		me.getFormAccount().getForm().loadRecord(record);
	},
	removeRecord: function (btn) {
		var me = this, grid = me.getGrid();
		me.removerecordFromStore(grid);
	},
	removerecordFromStore:function(grid){
		var store = grid.getStore(),
			selection = grid.getSelectionModel();

		Ext.each(selection.selected.items, function (record) {
			store.remove(record);
		});
		store.sync();
	},
	saveRecord: function (btn) {
		var me = this,
			grid = me.getGrid(),
			win = btn.up('window'),
			form = btn.up('form').getForm(),
			record = form.getRecord(),
			values = form.getValues();
		log(grid);
		if(!record){
			record = Ext.create('App.model.accountBank.maccountBank',values);
		}else{
			record.set(values);
		}

		record.save({
			success: function(rec,opts){
				App.util.box.info(rec.get('name') + ' berhasil disimpan');
				grid.getStore().load();
				win.close();
			},failure:function(btn){
				App.util.box.error('Gagal Tersimpan,Silahkan Coba lagi');
			}
		});


	}
//	type: 'Buyers'
});

