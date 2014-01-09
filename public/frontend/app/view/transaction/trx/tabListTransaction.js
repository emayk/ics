/**
*
* View Tab List Detail Transaction
*
* Programmer By Emay Komarudin.
* 2013
*
* Description View  tabtransaction
*
*
**/

Ext.define('App.view.transaction.trx.tabListTransaction', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabtrxListTransaction',
    bodyPadding : 5,
    activeTab: 1,
    items: [
    {xtype : 'vpanelTrxList', title : 'CL-2.0-g1-Transaction ['+loginas()+']'},
    {xtype : 'vpanelTrxOrderList', title : 'Detail Trx [TRX-0029x]'},
    {xtype : 'container', title : 'Menu Approval [User]'}
    ]

});