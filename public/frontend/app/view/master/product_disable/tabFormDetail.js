Ext.define('App.view.master.product.tabFormDetail',{
    extend : 'Ext.panel.Panel',
    alias: 'widget.tabform',
    padding : 10,
    layout : { type : 'fit' ,align: 'stretch'},
    items  : [
        {
            xtype : 'container',
            flex: .5,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },

            items: [
                { xtype: 'tabpanel', flex: .5, items:[
                            { xtype: 'container', title: 'Bantuan', xtype: 'frm-new-product-help', html: 'Content Help Disini'},
                            { xtype: 'container', title: 'Detail Product', xtype: 'frm-product-detail'},
                            { xtype: 'container', title:'Stock', layout: { type: 'hbox', align: 'stretch' },
                                items:[
                                    { xtype: 'container',flex: .5,title: 'Stock'},
                                    { xtype: 'container', flex: .5,title : 'Detail Stock'},
                                ]
                            },
                            { xtype: 'container',title : 'Supplier'}
                ]}
            ]
        },
    ],

    initComponent: function () {
        this.callParent(arguments);
    }
});