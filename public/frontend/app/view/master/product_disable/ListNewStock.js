
Ext.define('App.view.master.product.ListNewStock',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridnewstockproduct',
    store: 'App.store.product.sNewStock',
    columns: [
                {xtype: 'rownumberer'},
                {header: 'Name', dataIndex : 'id', flex: 1},
                {header: 'Type Location', dataIndex : 'location', flex: 1},
                // {header: 'Type Location', dataIndex : 'tipelokasi_id', flex: 1},
                {header: 'Roll Number', dataIndex : 'rollnumber', flex: 1},
                {header: 'Length', dataIndex : 'panjangkain', flex: 1},

          ] ,
    emptyText : 'Product ini tidak Memiliki Stock ',
    columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [
    // {
    //     xtype: 'toolbar',
    //     dock: 'bottom',
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
//        id: 'PgProductStock',
        dock:'bottom',
        store: 'App.store.product.sNewStock',
        displayInfo: true
    }],
    initComponent : function(){this.callParent(arguments); }
});