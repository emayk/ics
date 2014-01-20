Ext.define('App.view.products.ListPrd', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productList',
    layout: 'border',
    bodyPadding: 10,
    items: [
        {
            xtype: 'container',
            title: 'center',
            flex: .5,
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: .5,
                    bodyPadding: 2,
                    frame: true,
                    layout: {
                        type: 'fit',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            autoScroll: true,
                            itemId: 'gridProducts',
                            store: 'App.store.product.Product',
                            plugins: [
                                {
                                    ptype: 'filterbar',
                                    renderHidden: false,
                                    showShowHideButton: true,
                                    showClearAllButton: true
                                }
                            ],
                            columns: {
                                plugins: [
                                    {
                                        ptype: 'gridautoresizer'
                                    }
                                ],
                                items: [
//
                                    {
                                        text: '#',
                                        dataIndex: 'id',
                                        filter: {
                                            type: 'int',
                                            minValue: 1
                                        }
                                    },
                                    {
                                        text: 'stocks',
                                        dataIndex: 'totalstocks',
                                        filter: true,
                                        renderer: function (v,a,rec) {
                                            var v = (v==null) ? v = 0 : v;
                                            return v + ' items';
                                        },
                                        filter: {
                                            type: 'int',
                                            minValue: 1
                                        }, flex: .5
                                    },
                                    {
                                        text: translations.field.design,
                                        dataIndex: 'nodesign',
                                        filter: true, flex: .5

                                    },
                                    {
                                        text: translations.field.contruction,
                                        dataIndex: 'contruction',
                                        filter: true, flex: .5

                                    },
                                    {
                                        text: translations.field.category.default,
                                        dataIndex: 'catname',
                                        filter: true, flex: .5
                                    },
                                    {
                                        text: translations.field.type.default,
                                        dataIndex: 'typename',
                                        filter: true, flex: .5
                                    },
                                    {
                                        text: translations.field.width,
                                        dataIndex: 'width',
                                        renderer: function (v, meta, rec) {
                                            return v + ' ' + rec.get('widthname');
                                        },
                                        filter: {
                                            type: 'int',
                                            minValue: 1
                                        }, flex: .5
                                    },
                                    {
                                        text: translations.field.weight,
                                        dataIndex: 'weight',
                                        renderer: function (v, meta, rec) {
                                            return v + ' ' + rec.get('weightname');
                                        },
                                        flex: .5,
                                        filter: {
                                            type: 'int',
                                            minValue: 1
                                        }
                                    }
                                    ,
                                    {
                                        text: translations.field.uuid,
                                        dataIndex: 'uuid', flex: .5
                                    }
                                ]
                            },
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    store: 'App.store.product.Product',
                                    dock: 'bottom',
                                    displayInfo: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    tbar : [
        {
            text: 'Add',
            itemId : 'add',
            iconCls: 'add'
        },
        {
            text: 'Remove',
            itemId : 'remove',
            iconCls: 'delete'
        },
        '->',
        {
            text: 'Import',
            itemId : 'import',
            iconCls: 'excel',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.text + ' Not Implement Yet')
            }
        },
        {
            text: 'Export',
            itemId : 'export',
            iconCls: 'excel',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.text + ' Not Implement Yet')
            }
        },
        '-',
        {
            xtype: 'textfield',
            itemId: 'search-text',
            emptyText : 'Search Product'
        },
        {
            xtype: 'button',
            itemId: 'search-btn',
            textbtn: 'Search Button',
            iconCls: 'find',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.textbtn + ' Not Implement Yet')
            }

        },
        '-',
        {
            text: 'Help',
            itemId : 'help',
            iconCls: 'help',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.text + ' Not Implement Yet')
            }
        }
    ]
});