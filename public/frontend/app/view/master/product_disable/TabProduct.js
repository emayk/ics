Ext.define('App.view.master.product.TabProduct',{
    extend : 'Ext.tab.Panel',
    title: 'Product',
    alias: 'widget.tabProducts',
    layout : 'fit',
    items  : [
        {
            xtype : 'container',
            flex: .5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [

                {
                    xtype : 'container',
                    flex :.7,
                    layout: { type: 'hbox', align : 'stretch'},
                    defaults : { padding : 3 },
                    items : [
                        { title: 'List Product', flex: .5,xtype : 'gridProducts', },
                {
                    padding : 3 ,
                    flex:.3,
                    layout : 'fit',
                    items: [
                    { xtype : 'container', id: 'infoProduct', html : 'Info Product'},
                    ]
                }

                    ]
                },

                { xtype: 'tabpanel', flex: .5, items:[
                            { xtype: 'gridPrdDetails', title: 'Detail Product', html: 'Content Detail Product'},
                            { xtype: 'container', title:'Stock', layout: { type: 'hbox', align: 'stretch' },
                                items:[
                                    { xtype: 'gridListStock',flex: .5,title: 'Stock'},
                                    { xtype: 'gridListStockItems', flex: .5,title : 'Detail Stock'},
                                ]
                            },
                            { xtype: 'gridProdSuppliers',title : 'Supplier'}
                ]}
            ]
        }
    ]

//    ,initComponent: function () {
//        this.callParent(arguments);
//    }
});