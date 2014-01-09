Ext.define('App.view.security.Profile', {
    extend: 'Ext.window.Window',
    alias: 'widget.profile',

    // height: 260,
    // width: 550,

    requires: [
        'App.util.Util',
        'App.view.security.formProfile'
    ],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'User',
    items: [{ xtype: 'formprofile'} ],

});