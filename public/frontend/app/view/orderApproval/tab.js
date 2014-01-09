/**
*
* View orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
* Description View  orderApproval
*
*
**/

Ext.define('App.view.orderApproval.tab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabVorderApproval',
    requires: [
    'App.view.orderApproval.vorderApproval'
    ],
    items: [
        { xtype: 'vorderApproval' , title: 'Tab Approval'},
        // { xtype: 'container' , title: 'Tab Approval'},
        // { xtype: 'vorderApproval' , title: 'Tab Approval'},
    ],
});
