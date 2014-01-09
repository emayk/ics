Ext.define('App.view.master.product.ListStockItems',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridListStockItems',
    // title : 'All Product',
    store: 'App.store.product.sStockItems',
    columns: [
            {xtype: 'rownumberer'},
            {header: 'ID', dataIndex : 'id'},
            {header: 'Referense Doc', dataIndex : 'refdoc'},
            {header: 'Roll Number', dataIndex : 'noroll'},
            {header: 'Qty In', dataIndex : 'qty_in'},
            {header: 'Qty Out', dataIndex : 'qty_out'},
            {header: 'Qty Balance', dataIndex : 'qty_balance'},
            {header: 'UUID', dataIndex : 'uuid'}
          ] ,
    columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [
    // {
    //     xtype: 'toolbar',
    //     items: [{
    //             action: 'addstock',
    //             text: 'Add Stock'
    //     },
    //     {
    //         action: 'removestock',
    //         text: 'Remove Stock',
    //         disabled : true
    //     },
    //     ]
    // },
    {
        xtype: 'pagingtoolbar',
        id: 'PgProductStockItems',
        dock:'bottom',
        store: 'App.store.product.sStockItems',
        // store: this.store,
        displayInfo: true
    }]
//    ,
//    initComponent : function(){
//        this.callParent(arguments);
//        // Ext.getStore(this.store).load();
//        // this.addEvents('editImageProduct');
//    }
});