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

/**
 *
 * Application Core
 *
 **/

Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

if (fromLocal()) {


	controllers = [
	/**
	 * Core
	 */
		'cLogin',
		'TranslationManager',
		'cMenu',
		'cDomain',
	/**
	 * Import
	 */
//		'cImport',

//		/*Pengguna*/
//		'cusers',

//
//		/*Dashboard*/
		'cdashboard',
//		/*Proses Pemesanan Barang*/
		'cpurchase', // daftar pembelian
		'cprocespo', // Proses Pemesanan Barang
		'cpradjustment', // proses pr adjustment oleh pembelian
		'capprovepr', // persetujuan Pesan barang oleh management
		'cprorder', // daftar PO,
		'creceiveProduct', // Terima Barang
//
//	/**
//	 * Produk
//	 */
		'ccatprod',
		'ctypeproduct',
		'master.ctlProducts', //daftar Barang, seting hpp


//		'ccheckgood', //Check Barang
		/*/end Proses Pemesanan Barang*/
//
//		'cposition',
//		'caccountBank',
//		'cphones',
//		'ctypesupbuy',
////		'ccontacts',
//		'coffices',
//		/*Diperlukan oleh buyer dan supplier*/
//		'ccontactperson',
//		'cBuyers',
//		'cSuppliers',
//
//		'master.Countries',
//		'master.Currency',
//		'ctaxtype',
//
//		'master.Gudang',
//		/*Pembelian*/
//		'cPO',
//		/*Diperlukan oleh buyer dan supplier*/
////		'ccontactperson',
////		'cBuyers',
//		'cSuppliers',
//
//		/*Standing Intruction*/
//		/*Masih devel*/
//		'cstandintruction',
//		/*simulasi*/
//		'cdefaultsetting',
//		/*Simulasi Terima Barang */
//		'creceiveProduct',
//
//		/*Pembayaran*/
//		'ctypepayment',
//		'cpayment',
//		/*Kontra Bon*/
//		'ccontrabon',
//		/*Retur Barang*/
//		'creturgood',
//
		/*Check Barang*/
//		'ccheckgood',
		/*Persetujuan Purchase Request*/
//		'capprovepr',


//		/*Debit Note*/
//		'cdebitnote',
//
//		/*Penjualan*/
//		'csales',
//
//		/*Intruksi Keluar Barang*/
//		'cinsoutgood',
//
//		/*Terima Dp*/
//		'creceivedp',
//
//		/*Terima Pembayaran*/
//		'creceivepayment',
//		/*Check Tolak*/
//		'ccheckdenied',
//		/*Credit Note*/
//		'ccreditnote',
//		/*Komisi Penjual*/
//		'ccommisionsale'
//


	/**
	 * Master
	 *
	 */

//		'master.Legalitas',
//		'cfabrictype',

//
////		'master.Departement',
//		'ctypeAccountBank',
//		'master.Banks',
////		'master.Color',
//		/*Diperlukan oleh Currency*/
////		'master.Gradekain',
////		'master.TypeOrder',
////
////		'cunittype',
////		'master.ctlUnit',
////
////
//		'master.ctlProducts',


////
////		'cBuyers',

////		'creceiveProduct',
//


	];

} else {
	requires = [];
	controllers = []
}

Ext.application({
	requires: [
		// 'App.util.MD5',
		// 'App.view.vActionBtn',
		'App.util.Alert',
		'App.util.Vtypes',
		'App.util.box',
		'App.view.Viewport',
		'Ext.container.Viewport',
		'App.util.Util',
		'App.util.dummy',
		'App.util.Notification',
		'App.util.Form'
		// 'App.view.help.vHelp'

	],
	name: 'App',
	appFolder: appjs + '/frontend/app',
	controllers: controllers,
	autoCreateViewport: false,
	/*Display Splash Screen*/
	display_splash: false,
	splashscreen: null,
	init: function () {
		Ext.tip.QuickTipManager.init();
		if (this.display_splash) {
			this.app_init();
		}
	},
	app_init: function () {
		this.splashscreen = Ext.getBody().mask('Loading application ' + App.config.APP_NAME, 'splashscreen');
		this.splashscreen.addCls('splashscreen');
		Ext.DomHelper.insertFirst(
			Ext.query('.x-mask-msg')[0], {cls: 'x-splash-icon'}
		);
	},

	/**
	 * Saat Launch Application
	 */
	app_launch: function () {
		var me = this;
		if (this.display_splash) {
			var task = new Ext.util.DelayedTask(function () {
				me.splashscreen.fadeOut({duration: 1000, remove: true });
				me.splashscreen.next().fadeOut({duration: 1000, remove: true, listeners: {afteranimate: function (el, startTime, eOpts) {

					if (!is_login()) {
						Ext.widget('login');
						log('im here 1' + new Date());
					} else {
						Ext.create('App.view.Viewport');
						App.util.SessionMonitor.start();
						me.collapseMode();
					}
				} } });
				log('application Launch Loaded');

			});
			task.delay((!isDebug()) ? 5000 : 500);
		} else {
			if (!is_login()) {
				Ext.widget('login');
			} else {
				Ext.create('App.view.Viewport');
				App.util.SessionMonitor.start();
			}
		}

		if (isDebug()) {
			me.collapseMode();
		}
	},
	/**
	 * Launch Application
	 */
	launch: function () {
		this.app_launch();
		this.RegisterVtypes();
	},
	RegisterVtypes: function () {
		Ext.create('App.util.Vtypes').init();
	},
	/*Collapse Menu dan Header*/
	collapseMode: function () {
		var vp = Ext.ComponentQuery.query('mainviewport')[0];
		if (vp) {
			/*Header*/
			Ext.ComponentQuery.query('mainviewport #header')[0].toggleCollapse();
			/*Menu*/
			Ext.ComponentQuery.query('mainviewport #appmenu')[0].toggleCollapse();
		}

	}
});



