Ext.define('App.view.products.tab', {
    extend: 'Ext.tab.Panel',
    requires: [
        'App.view.products.ListPrd'
    ],
    alias: 'widget.productstab',
    activeTab: 1,
    items: [
        {
            xtype: 'productList',
            iconCls: 'home',
            title: 'Products'
        }
    ],
    plugins: [
        {
            ptype: 'tabscrollermenu',
            maxText: 15,
            pageSize: 5
        }
    ]
});