Ext.define('App.view.products.stocks',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.productsstocks',
    layout: 'fit',
    items:[
        {
            xtype : 'grid',
            itemId : 'gridproductstocks',
            store :  'App.store.product.pstocks',
            columns:[
                {
                    header : translations.field.id,
                    dataIndex : 'id'
                },{
                    header : translations.field.category + ' Warehouse',
                    dataIndex : 'catwh_id'
                },{
                    header : translations.field.warehouse,
                    dataIndex : 'wh_id'
                },{
                    header : translations.field.length,
                    dataIndex : 'lengthfabric'
                },{
                    header : 'Time Input',
                    dataIndex : 'onday'
                },{
                    header : 'product',
                    dataIndex : 'product_id'
                },{
                    header : 'Unit',
                    dataIndex : 'unit_id'
                },{
                    header : 'Uuid',
                    dataIndex : 'uuid'
                },{
                    header : 'Last Update At',
                    dataIndex : 'updated_at'
                },{
                    header : 'Create By',
                    dataIndex : 'createby_id'
                },{
                    header : 'create At',
                    dataIndex : 'created_at'
                },{
                    header : 'last Update By',
                    dataIndex : 'lastupdateby_id'
                }
            ],
            dockedItems:[
                {
                    xtype : 'pagingtoolbar',
                    dock : 'bottom',
                    store :  'App.store.product.pstocks'
                }
            ]
        }
    ]
});
