Ext.define('App.view.master.product.ListStock',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridListStock',
    // title : 'All Product',
    store: 'App.store.product.Stocks',
    columns: [
            {
                xtype: 'rownumberer'
            },

                {header: 'Name', dataIndex : 'id', flex: 1},
                {header: 'tipelokasi_id', dataIndex : 'tipelokasi_id', flex: 1},
                {header: 'Roll Number', dataIndex : 'rollnumber', flex: 1},
                {header: 'Panjang', dataIndex : 'panjangkain', flex: 1},

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
        id: 'PgProductStock',
        dock:'bottom',
        store: 'App.store.product.Stocks',
        displayInfo: true
    }]
//    ,
//    initComponent : function(){
//        this.callParent(arguments);
//        // Ext.getStore(this.store).load();
//        // this.addEvents('editImageProduct');
//    }
    // ,listeners : {render : function(){Ext.getStore(this.store).load(); } },
});