var fromLocal = function(){
//     function base_url(){ return window.location.protocol + '//' +  window.location.host + '/'; }
//     // return (base_url() == 'http://localhost/');
     return true;
};

Ext.BLANK_IMAGE_URL = appjs + '/frontend/images/s.gif';
/*==========  Setup Namespace  ==========*/
Ext.namespace('App').config = {
    /*==========  Nama Program  ==========*/
   APP_NAME: 'Aplikasi Perkantoran',
   /*==========  URL API  ==========*/
   APP_URL_API: api_url,
   APP_PAGING_PERPAGE: 15,
   APP_DEBUG: true,
   APP_TOKEN: token,
   APP_SessionExpire: 1,
   LicenseTo: license_to,
   /*==========  User ID   ==========*/
   APP_UID : 1,
   LOGIN_NAME : login_as,
   islogin : false,
   url_logout: appjs + '/logout.php'
};
/*==========  Setup Config  ==========*/
Ext.Loader.setConfig(
    {  enabled : true , disableCaching :  true, paths: { Ext: extjsbase+'/src' } }
);
/**
*
* Application Core
*
**/

Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
var requires,controllers;
if (fromLocal()){
    requires = [];
    controllers = [
    //core
    'cLogin',
    'TranslationManager',
    'cMenu',
    // end core


    'cOrders',
    'wizard.Order',

    'transaction.ctransaction',/*cl2-0*/
    // 'cImport',
    // 'master.ctlProducts',
    'master.ctlSupplier',
//    'wizard.Supplier',

//        Done
        'master.Departement',
        'master.Legalitas',
        'master.Banks',
        'master.Color',
        'master.Currency',
        'master.Gradekain',
        'master.Gudang',

        'master.ctlProducts',
        'ctlSettingProgram'
    /*Working ON Approval Order*/
    ];

}else{
    requires = [];
    controllers = [
        // 'cTrace',
        /*==========  Menu  ==========*/
        // 'ctlSetup',
        'security.Users',
        // 'ctlTest',
        'cMenu',
        'cLogin',
         'corderApproval',
       'TranslationManager',
       'wizard.Supplier',
        /*==========  Profiles Controller  ==========*/
        'Profiles',
        'master.Legalitas',
        // 'master.Users',
        'master.Banks',
        'master.ContactPerson',
        'master.Departement',
        'master.Gradekain',
        'master.Gudang',
        'master.Color',
        'master.Currency',
        'master.TypeOrder',
        'master.Countries',
        'master.Provinces',
        'master.Cities',
        'master.Headoffice',
        'master.ctlUnit',
        'master.ctlProducts',
//        'master.ctlProducts_disable',
        // 'transaction.CtlOrders'
       'cOrders', //Done
        // 'ctlFile',

       'master.ctlSupplier',
       'master.typePayment',
//
       /*Working On Controller*/
       'cImport',
       'wizard.Order'

    ];
}
Ext.application({
    requires: [
    // 'App.util.MD5',
    // 'App.view.vActionBtn',
    'App.util.Alert',
    'App.view.Viewport',
    'Ext.container.Viewport',
    'App.util.Util',
    'App.util.dummy',
    'App.util.Form'
    // 'App.view.help.vHelp'

    ],
    name: 'App',
    appFolder: appjs + '/frontend/app',
//    file:///Volumes/Data/projects/emay/public/packages/emayk/ics/frontend/app/
    controllers: controllers,
    autoCreateViewport: false,
    display_splash : false,

    init: function(){
        Ext.tip.QuickTipManager.init();
        if (this.display_splash){ this.app_init();}
    },

    app_init : function(){
        splashscreen = Ext.getBody().mask('Loading application '+ App.config.APP_NAME, 'splashscreen');
        splashscreen.addCls('splashscreen');
        Ext.DomHelper.insertFirst(
            Ext.query('.x-mask-msg')[0], {cls: 'x-splash-icon'}
        );
    },

    app_launch : function(){
        if (this.display_splash)
        {
            var task = new Ext.util.DelayedTask(function() {
                splashscreen.fadeOut({duration: 1000, remove:true });
                splashscreen.next().fadeOut({duration: 1000, remove:true, listeners: {afteranimate: function(el, startTime, eOpts ){
                    if (!is_login()) {
                        Ext.widget('login');
                    }else {
                        Ext.create('App.view.Viewport');
                        App.util.SessionMonitor.start();
                    }
                } } });
                log('application Launch Loaded');
            });
            task.delay( (!isDebug()) ? 5000 : 500 );
        }else{
            if (!is_login()) {
                Ext.widget('login');
            }else {
                Ext.create('App.view.Viewport');
                App.util.SessionMonitor.start();
            }
        }


    },
    launch: function() {
        this.app_launch();
        if (isDebug())
        {
            this.collapseMode();
        }
    }

//    launch2: function() {
//        log('Application Loaded ');
//
//
////        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
//        if (isDebug())
//        {
//            // var
//            // infoPanel =
//            if (this.autoCreateViewport)
//                {
//                    // Ext.getCmp('infoPanel').hide();
//                    // infoPanel.hide();
//                    // Ext.getCmp('menupanel').hide();
//                    // Ext.getCmp('menupanel').collapse();
//                    // Ext.getCmp('menupanel').toggleCollapse();
//                }
//            this.collapseMode();
//
//        }
//
//        // Ext.getCmp('menupanel').toggleCollapse();
//
//        // newpid
//        //clear
//        // Ext.util.Cookies.clear('newpid');
//
//        // Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider') );
//
//        // Ext.History.init();
//        // this.SetupRestStateProvider();
//        //
//        //
//        //
//        //
//    }
////    ,

//    SetupRestStateProvider : function(){
//        if (Ext.supports.LocalStorage) {
//            Ext.state.Manager.setProvider(
//                Ext.create('Ext.state.LocalStorageProvider')
//            );
//        } else {
//            Ext.state.Manager.setProvider(
//                Ext.create('Ext.state.CookieProvider')
//        );
//        }
//    }
    ,collapseMode : function(){
        var vp = Ext.ComponentQuery.query('mainviewport')[0];
        if (vp){
            /*Header*/
            Ext.ComponentQuery.query('mainviewport #header')[0].toggleCollapse();
            /*Menu*/
            Ext.ComponentQuery.query('mainviewport #appmenu')[0].toggleCollapse();
        }

    }
});



