/**
*
* View Orders
*
* Programmer By Emay Komarudin.
* 2013
*
* Main Panel
*
**/

Ext.define('App.view.Orders.vOrderTabs', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.vOrderTabs',
    activeTab: 0,
    items: [
        {xtype: 'vOrderListAll',title: 'All',iconCls: 'order_all', itemId: 'all'},
        {xtype: 'vOrderListOpen',title: 'Open',iconCls: 'order_open', itemId: 'open'},
        {xtype: 'vOrderListClose',title: 'Close',iconCls: 'order_close' , itemId: 'close'},
        // { xtype: 'TabvorderApproval' , title :'Approval', html: 'Approval Order Here', closable: true}

    ],

});
