/**
*
* Form Tambah Product
*
*
**/

Ext.define('App.view.master.product.winAddProduct',{
    alias : 'widget.winaddproduct', extend: 'Ext.window.Window',
    title   : 'Product', layout  : { type : 'fit', align: 'stretch' },
    autoShow : true, anchor : '-100',
    initComponent : function() { log('Form Add Product Loaded');  this.callParent(arguments); },
    items : [{ xtype: 'frmAddProduct'} ]
});
