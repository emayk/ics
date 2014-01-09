Ext.define('App.view.products.ListPrd',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.productList',
    requires:[
        'App.view.products.tabdetail'
    ],
    layout: 'border',
    bodyPadding : 10,
    items : [
        {
            xtype : 'container',
            title : 'center',
            flex:.5,
            region : 'center',
            layout: {
                type : 'vbox',
                align : 'stretch'
            },
            items: [
                {
                    xtype : 'panel',
                    flex: .5,
                    bodyPadding : 2,
                    frame : true,
                    layout : {
                        type : 'fit',
                        align : 'stretch'
                    },
                    items:[
                        {
                            xtype : 'grid',
                            autoScroll : true,
                            itemId : 'gridProducts',
                            store : 'App.store.product.Product',
                            defaults:{
                              flex :1
                            },
                            columns : [
                                {
                                    header : translations.field.id,
                                    dataIndex : 'id'
                                },{
                                    header : translations.field.name.default,
                                    dataIndex : 'name',
                                    flex:2
                                },{
                                    header : translations.field.design,
                                    dataIndex : 'nodesign'
                                },{
                                    header : translations.field.contruction,
                                    dataIndex : 'contruction'
                                },{
                                    header : translations.field.category.default,
                                    dataIndex : 'cat_id',
                                    renderer: function(v,meta,rec){
                                        return rec.getCat().get('name');
                                    },
                                    flex :3
                                },{
                                    header : translations.field.type.default,
                                    dataIndex : 'type_id',
                                    renderer: function(v,meta,rec){
                                        return rec.getType().get('name');
                                    },
                                    flex : 2
                                },{
                                    header : translations.field.width,
                                    dataIndex : 'width',
                                    renderer: function(v,meta,rec){
                                        return v + ' ' + rec.getUnitwi().get('name');
                                    }
                                    ,flex : 2
                                },{
                                    header : translations.field.weight,
                                    dataIndex : 'weight',
                                    renderer: function(v,meta,rec){
                                        return v + ' ' + rec.getUnitwe().get('name');
                                    }
                                },{
                                    header : translations.field.uuid,
                                    dataIndex : 'uuid'
                                    ,flex : 2
                                }
                            ],
                            dockedItems:[
                                {
                                    xtype : 'pagingtoolbar',
                                    store : 'App.store.product.Product',
                                    dock: 'bottom',
                                    displayInfo: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});