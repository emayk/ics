Ext.define('App.view.settings.settings',{
    extend : 'Ext.tab.Panel',
    requires:[
        'App.view.settings.program.panel',
        'App.view.settings.company.panel'
    ],
    alias : 'widget.settingstab',
    title : 'Settings',
    items:[
        {
            xtype : 'settingprogrampanel',
            title : 'Program'
        },{
            xtype : 'settingcompany',
            title : 'Company'
        }

    ]
});