Ext.define('App.view.products.win',{
   extend : 'Ext.window.Window',
   alias : 'widget.winproductinfo',
    layout: {
        type : 'vbox',
        align : 'stretch'
    },
    modal: true,
    items:[
        {
            xtype: 'panel',
            title: 'Panel 1',
            flex:.3
        },{
            xtype: 'panel',
            flex:.3,
            title: 'Panel 2'
        },{
            xtype: 'container',
            flex:.3,
            html: 'Panel 3'
        },
    ],
    buttons : [
        {
            text: 'Help',
            iconCls:'help',
            itemId:'help'
        },'->'
        ,{
            text: 'Revisi',
            iconCls:'revise',
            itemId:'revise'
        },{
            text: 'Close',
            iconCls:'close',
            itemId:'close'
        }
    ]
});