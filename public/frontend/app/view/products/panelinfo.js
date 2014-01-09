Ext.define('App.view.products.panelinfo',{
    alias : 'widget.productinfo',
    requires:[
        'App.view.grid.product.stocks'
    ],
    prodId : null,
    record : null,
    storeName : null,
    stockStore: null,
    debug : false,
    extend: 'Ext.panel.Panel',
    cls: 'item-ct',
    flex: 2,
    border: false,
    layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false
    },
    frame :  true,
//    constructor   : function() {
//        Ext.apply(this, {
////            store : StoreApp.store.Customer, // The store needs to have "singleton: true"
//            store   : Ext.create('StoreApp.store.Customer'),
//            columns : [
//                {
//                    header    : 'ID',
//                    dataIndex : 'id'
//                },
//                {
//                    header    : 'Firstname',
//                    dataIndex : 'firstname'
//                },
//                {
//                    header    : 'Lastname',
//                    dataIndex : 'lastname'
//                }
//            ]
//        });
//        this.store.load();
//        this.callParent(arguments);
//    },
    initComponent : function()
    {
        Ext.apply(this,{
            items : [
                {
                    xtype : 'form',
                    autoScroll: true,
                    bodyPadding: 10,
                    frame :  true,
                    title : 'Information of ',
                    itemId : 'detail',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults:{
                        anchor : '95%',
                        widhtLabel : 100
                    },
                    items:[
                        {
                            xtype: 'container',
                            items:[
                                { xtype: 'textfield' , fieldLabel: 'id', name : 'id' },
                                { xtype: 'textfield' , fieldLabel: 'name', name : 'name'  },
                                { xtype: 'textfield' , fieldLabel: 'cat_id', name : 'cat_id' },
                                { xtype: 'textfield' , fieldLabel: 'contruction', name : 'contruction' },
                                { xtype: 'textfield' , fieldLabel: 'nodesign', name : 'nodesign'  },
                                { xtype: 'textfield' , fieldLabel: 'type_id', name : 'type_id' },
                                { xtype: 'textfield' , fieldLabel: 'unitweight_id', name : 'unitweight_id' }
                            ]
                        },{
                            xtype: 'container',
                            margins: '0 0 0 10',
                            items:[
                                { xtype: 'textfield' , fieldLabel: 'unitwidth_id', name : 'unitwidth_id' },
                                { xtype: 'textfield' , fieldLabel: 'updated_at', name : 'updated_at' },
                                { xtype: 'textfield' , fieldLabel: 'weight', name : 'weight' },
                                { xtype: 'textfield' , fieldLabel: 'width', name : 'width' },
                                { xtype: 'textfield' , fieldLabel: 'uuid', name : 'uuid' },
                                { xtype: 'textfield' , fieldLabel: 'created_at', name : 'created_at' },
                                { xtype: 'textfield' , fieldLabel: 'createby_id', name : 'createby_id' },
                                { xtype: 'textfield' , fieldLabel: 'codeinternal', name : 'codeinternal' },
                                { xtype: 'textfield' , fieldLabel: 'lastupdateby_id', name : 'lastupdateby_id' }
                            ]
                        }
                    ]

                },
                {
                    xtype : 'panel',
                    title : 'Stock',
                    itemId : 'panelStock',
                    frame : true,
                    layout: {
                        type : 'hbox',
                        align : 'stretch'
                    },
                    items : [
                        {
                            xtype : 'gridProductStocks',
                            flex :.5,
                            store : this.stockStore,
                            title : 'Stocks',
                            margins : '0 5 0 0',
                            itemId : 'gridStocks',
                            dockedItems:[
                                {
                                    xtype : 'pagingtoolbar',
                                    store : this.stockStore,
                                    itemId : 'pgstockStore1',
                                    dock: 'bottom'
                                }
                            ]
                        },{
                            xtype : 'gridProductStocks',
                            flex :.5,
                            title: 'History',
                            margins : '0 0 0 5',
                            itemId : 'gridStocks2'
                        }

                    ]
                }

            ]
        });
        this.callParent(arguments);
    }
});
