var fromLocal = function () {
	return true;
//    return ((window.location.protocol + '//' + window.location.host + '/') === 'http://localhost:9090');
};


/**
 *
 * Application Core
 *
 **/

Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
//var requires, controllers;
if (fromLocal()) {
//    requires = [];
	controllers = [
	/**
	 * Core
	 */
		'cLogin',
		'TranslationManager',
		'cMenu',
		/*Pengguna*/
		'cusers',
		/*Dashboard*/
		'cdashboard',



		/*Dashboard*/
		'cdashboard',
		/*Proses Pemesanan Barang*/
		'cpurchase', // daftar pembelian
		'cprocespo', // Proses Pemesanan Barang
		'capprovepr', // persetujuan Pesan barang
		'ctypeproduct',
		'master.ctlProducts', //daftar Barang
		'ccheckgood', //Check Barang

	/**
	 * Master
	 *
	 */
		/*Setting Awal*/
		'cdefaultsetting',

		'master.Departement',
		'master.Legalitas',
		'master.Banks',
		'master.Color',
		'master.Countries',
		'master.Currency',
		'master.Gradekain',
		'master.Gudang',
		'master.TypeOrder',

		'cunittype',
		'master.ctlUnit',

		'ctypeproduct',
		'cfabrictype',

		'ctypeAccountBank',
		'master.ctlProducts',

		'cposition',
		'caccountBank',
		'cphones',
		'ctypesupbuy',
		'ccontacts',
		'coffices',
		/*Diperlukan oleh buyer dan supplier*/
		'ccontactperson',
		'cBuyers',
		'cSuppliers',
		'ctaxtype',
		'ccatprod',
		'creceiveProduct',

		/*Pembelian*/
		'cPO',

		'cstandintruction',
		/*Pembayaran*/
		'ctypepayment',
		'cpayment',
		/*Kontra Bon*/
		'ccontrabon',

		/*Retur Barang*/
		'creturgood',
		/*Check Barang*/
		'ccheckgood',
		/*Persetujuan Purchase Request*/
		'capprovepr',

		/*Debit Note*/
		'cdebitnote',

		/*Penjualan*/
		'csales',

		/*Intruksi Keluar Barang*/
		'cinsoutgood',

		/*Terima Dp*/
		'creceivedp',

		/*Terima Pembayaran*/
		'creceivepayment',
		/*Check Tolak*/
		'ccheckdenied',
		/*Credit Note*/
		'ccreditnote',
		/*Komisi Penjual*/
		'ccommisionsale'





		/*Sale Product*/
		/*'cOrders',
		 'csaleProduct',*/
//
//
	/**
	 * Versi Baru
	 * penamamaan Controller
	 */
//        Lewat----
//        'master.Headoffice',
//        'master.ctlUnit',
	/**
	 * Order
	 */
//        'wizard.Order',

//        'transaction.ctransaction', //*cl2-0*//*
		// 'cImport',
		// 'master.ctlProducts',
//        'master.ctlSupplier',
//    'wizard.Supplier',


//        'master.ctlProducts',
//        'ctlSettingProgram'

		/*Working ON Approval Order*/
	];

} else {
	requires = [];
	controllers = []
//    controllers = [
//        // 'cTrace',
//        /*==========  Menu  ==========*/
//        // 'ctlSetup',
//        'security.Users',
//        // 'ctlTest',
//        'cMenu',
//        'cLogin',
//        'corderApproval',
//        'TranslationManager',
//        'wizard.Supplier',
//        /*==========  Profiles Controller  ==========*/
//        'Profiles',
//        'master.Legalitas',
//        // 'master.Users',
//        'master.Banks',
//        'master.ContactPerson',
//        'master.Departement',
//        'master.Gradekain',
//        'master.Gudang',
//        'master.Color',
//        'master.Currency',
//        'master.TypeOrder',
//        'master.Countries',
//        'master.Provinces',
//        'master.Cities',
//        'master.Headoffice',
//        'master.ctlUnit',
//        'master.ctlProducts',
////        'master.ctlProducts_disable',
//        // 'transaction.CtlOrders'
//        'cOrders', //Done
//        // 'ctlFile',
//
//        'master.ctlSupplier',
//        'master.typePayment',
////
//        /*Working On Controller*/
//        'cImport',
//        'wizard.Order'
//
//    ];
}

Ext.application({
	requires: [
		// 'App.util.MD5',
		// 'App.view.vActionBtn',
		'App.util.Alert',
		'App.util.box',
		'App.view.Viewport',
		'Ext.container.Viewport',
		'App.util.Util',
		'App.util.dummy',
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
	},
	/*Collapse Menu dan Header*/
	collapseMode: function () {
		var vp = Ext.ComponentQuery.query('mainviewport')[0];
		if (vp) {
			/*Header*/
			Ext.ComponentQuery.query('mainviewport #header')[0].toggleCollapse();
			/*Menu*/
//			Ext.ComponentQuery.query('mainviewport #appmenu')[0].toggleCollapse();
		}

	}
});



