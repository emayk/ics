/**
 * Page Panel Informasi Product
 *
 * Edit / Show Detail Product
 */
Ext.define('App.view.products.panelinfo', {
    alias: 'widget.productinfo',
    requires: [
        'App.view.products.formbasicinfo',
        'App.view.products.formproductdetail',
        'App.form.combobox.cbUnitWeight',
        'App.form.combobox.cbUnitWidth',
        'App.view.products.productstocks',
        'App.view.products.history'
    ],
    prodId: null,
    prodName : null,
    stockStore: null,
    storeHistory:null,
    record: null,
    new: false,
    debug: false,
    title : 'Info',
//    storeHistory:'App.store.product.history',

    extend: 'Ext.tab.Panel',
    cls: 'item-ct',
    flex: 2,
    border: false,
    frame: true,
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            items: [
                {
                    xtype: 'formproductbasicinfo',
                    itemId: 'formbasicinfo',
                    record: me.record,
                    prodId : me.prodId,
                    prodName : me.prodName
                },
                {
                    xtype: 'formproductdetail',
                    itemId : 'formdetail',
                    title : 'Detail ' + me.prodName,
                    record: me.record,
                    prodId : me.prodId,
                    prodName : me.prodName
                },
                {
                    xtype: 'productgridstocks',
                    stockStore: me.stockStore,
                    record: me.record,
                    prodName : me.prodName,
                    prodId : me.prodId,
                    title: 'Stock ' + me.prodName
                },
                {
                    xtype: 'productshistory',
                    title: 'history',
                    storeHistory: me.storeHistory,
                    prodId : me.prodId,
                    html: 'History Product ' + me.prodName
                }

            ]
        });
        this.callParent(arguments);
    }
});
