
Ext.define('App.view.master.product.ListNewStockItems',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridNewStockProductItems',
    store: 'App.store.product.sNewStockItems',
    layout: 'fit',
    columns: [
                {xtype: 'rownumberer'},
                {header: 'Reference Document', dataIndex : 'refdoc', flex: 5},
                {header: 'Roll Number', dataIndex : 'noroll', flex: 3},
                {header: 'Qty In', dataIndex : 'qty_in', flex: 2},
                {header: 'Qty Out', dataIndex : 'qty_out', flex: 2},
                {header: 'Qty Balance', dataIndex : 'qty_balance', flex: 2},
          ] ,
    emptyText : 'Stock item tidak diketemukan',
    columnLines: false,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [
    {
        xtype: 'pagingtoolbar',
        id: 'PgNewProductStock',
        dock:'bottom',
        store: 'App.store.product.sNewStockItems',
        displayInfo: true
    }],
    initComponent : function(){this.callParent(arguments); }
});