// Menuaccordion.js
Ext.define('App.view.layout.Menuaccordion', {
	extend: 'Ext.panel.Panel',
    title: 'Navigation Program',
    alias: 'widget.MenusAccordion',
    requires : [
    'App.view.menu.Transaction',
    'App.view.menu.Master',
    'App.view.menu.Profiles',
    ],
    // width: 300,
    // height: 300,
    // defaults: {
    //     // applied to each contained panel
    //     bodyStyle: 'padding:15px'
    // },
    layout: {
        // layout-specific configs go here
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false,
        fill: true,
    },
    items: [
        {
        // tab Menu Transaction
        title: 'Transaction',
        xtype: 'menuTransactions',
        },
        {
            title: 'Master',
            xtype: 'menuMasters'
        },
        {
        title: 'Profile',
        xtype: 'menuProfiles'
        // User Management , change password , change profile dlsb
    }],
});