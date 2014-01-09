/**
*
* View tabtransaction
*
* Programmer By Emay Komarudin.
* 2013
*
* Description View  tabtransaction
*
*
**/

Ext.define('App.view.transaction.tabtransaction', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabtransaction',
    // layout : 'fit',
    // bodyPadding : 5,
    activeTab: 1,
    items: [{
    	xtype : 'vtransaction', title : 'Menu Approval [Admin]',flex : 1,
    },
    {xtype : 'tabtrxListTransaction', title : 'List Transaction ['+loginas()+']',flex: 1},
    {xtype : 'container', title : 'Detail Trx [TRX-0029x]'},
    {xtype : 'container', title : 'Menu Approval [User]'}
    ]

});