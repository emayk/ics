Ext.define('App.view.products.tabdetail',{
    extend: 'Ext.tab.Panel',
    alias : 'widget.tabproductdetail',
    requires: [
        'App.view.products.paneldetail',
        'App.view.products.stocks'
    ],
    items: [
        {
            xtype : 'panel',
            title : 'Detail',
            autoScroll: true,
            items:[
                {
                    xtype : 'panelDetail',
                    itemId : 'panelDetail'
                }
            ]
        },{
            xtype : 'productsstocks',
            title : 'Stocks'
        }
    ]

});