/*==========  View Port  ==========*/
Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'App.view.layout.Header',
        'App.view.layout.Footer',
        'App.view.layout.Logo',
        'App.view.MainPanel'
        // 'App.view.Tabs',
        // 'App.util.apps',
        // 'App.view.master.legalitas.List',
        // 'App.view.layout.Menuaccordion',
    ],
    alias: 'widget.mainviewport',
    layout: 'border',
    items: [
{
    xtype: 'mainpanel',
    region: 'center'
},

{
    xtype: 'mainmenu',
    itemId : 'appmenu',
    width: 185,
    collapsible: true,
    region: 'west',
    style: 'background-color: #8FB488;'
},


    {/*==========  Atas  ==========*/
    region: 'north', collapsible: true,
    title : getAppName(),
    itemId : 'header',
    style: 'background-color: #8FB488;',
    border: false, items:[
        { xtype: 'container', layout: { type: 'hbox', align: 'stretch'},items:[
                {xtype: 'Logo', flex: .5},
                {xtype: 'container', flex: .5, html: '' }
        ]},
        {xtype:'appheader'}
    ] },

    {
        /*==========  Bawah  ==========*/
        region: 'south', border: false, items: [{xtype : 'appfooter'}, ]
    },

    // {
    //     /*==========  Kanan  ==========*/
    //     region: 'east',
    //     id : 'infoPanel',
    //     title: 'Information',
    //     html: 'No Available Information',
    //     collapsible: true,
    //     split: false,
    //     stateId : 'stateinfo',
    //     stateful : true,
    //     // width: 150
    //     flex : .2,
    // },

    // {
    //     /*==========  Kiri / Menu  ==========*/
    //     region: 'west',
    //     id: 'menupanel',
    //     collapsible: true,
    //     split: true,
    //     flex : .2,
    //     xtype : 'MenusAccordion'
    // },


    // {
    //     region: 'center',
    //     /*==========  Tab - tabs aplikasi  ==========*/
    //     activeTab: 0,
    //     flex : 1,
    //     xtype: 'tabsApp',
    //     stateId : 'statecontent',
    //     stateful : true,
    // }
    ]
});
