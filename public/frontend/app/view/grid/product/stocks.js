Ext.define('App.view.grid.product.stocks',{
   extend : 'Ext.grid.Panel',
    alias : 'widget.gridProductStocks',
    store : 'App.store.product.pstocks',
    columnLines : true,
    columnWidth: '95%',
    emptyText: 'Empty Stocks',
    defaults:{
        flex: 1
    },
    columns:[
        { header: 'id', dataIndex : 'id'},
        { header: 'total', dataIndex : 'total'},
        {
            header: translations.field.warehouse,
            dataIndex : 'catwh_id',
            renderer: function(v,m,rec){
                return rec.getCatwh().get('name');
            }
        },
        {
            header: translations.field.length,
            dataIndex : 'lengthfabric'
        },
        {
            header: 'onday',
            dataIndex : 'onday'
        },
        { header: 'product_id', dataIndex : 'product_id'
        },
        { header: 'wh_id', dataIndex : 'wh_id',
            renderer: function(v,m,rec){
                return rec.getWh().get('name');
            }
        },
        { header: 'unit_id', dataIndex : 'unit_id'
        },
        { header: 'uuid', dataIndex : 'uuid'
        },
        { header: 'lastupdateby_id', dataIndex : 'lastupdateby_id'
        },
        { header: 'createby_id', dataIndex : 'createby_id'},
        { header: 'updated_at', dataIndex : 'updated_at'},
        { header: 'created_at', dataIndex : 'created_at'}
    ],
    dockedItems:[
        {
            xtype : 'pagingtoolbar',
            displayInfo:true,
            dock: 'bottom',
            store: 'App.store.product.pstocks',
            itemId: 'pgStockId'
        }
    ]
});