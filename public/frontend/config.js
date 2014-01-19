var Ext = Ext || {};
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
    APP_UID: 1,
    LOGIN_NAME: login_as,
    islogin: false,
    logoImg: "",
    url_logout: appjs + '/logout.php'
};
/*==========  Setup Config  ==========*/
Ext.Loader.setConfig(
    {
        enabled: true,
        disableCaching: true,
        paths: {
            "Ext": extjsbase + "/src",
            "Ext.ux": extjsbase + "/ux"
        }
    }
);

Ext.require([
    'Ext.tip.QuickTipManager',
//    'Ext.window.Window',
//    'Ext.tab.Panel',
    'Ext.ux.TabScrollerMenu'
]);

//Ext.Loader.setPath('Ext.ux', '../ux/');
//Ext.Loader.setPath('Ext.ux', extjsbase+'/ux/');
