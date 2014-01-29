/*==========  View Port  ==========*/
Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'App.view.layout.Header',
        'App.view.layout.Footer',
        'App.view.layout.Logo',
        'App.view.MainPanel'
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


    {
    /*==========  Atas  ==========*/
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
        region: 'south', border: false, items: [{xtype : 'appfooter'} ]
    }
    ]
});
