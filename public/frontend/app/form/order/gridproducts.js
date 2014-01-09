/**
*
* Grid Products
*
**/
Ext.define('App.form.order.gridproducts',{
    // extend : 'Ext.panel.Panel',
    extend : 'Ext.grid.Panel',
	alias: 'widget.gridOrderproducts',
    title: 'Products',
    requires: [ 'Ext.ux.DataTip', ],
    columns: [
        { xtype: 'rownumberer'},
        // { text: 'Id',  dataIndex: 'id' },
        { text: 'Name',  dataIndex: 'name',flex: 1 },
         {
            xtype:'actioncolumn',
            text: 'Add',
            width:50,
            items: [{
                icon: '/assets/fugue/icons/document--arrow.png',
                tooltip: 'Add Product to Basket',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    log("Add To Basket >> " + rec.get('name'));

                    var model = new App.model.product.Basket({
                        qty : 0,
                        product_id : rec.get('id'),
                        productname: rec.get('name'),
                        // no order_id == diambil dari form sebelumnya
                        order_id: 0,
                    });

                    var store  = Ext.getStore('product.Baskets');
                    store.add(model);
                    store.sync();
                    Ext.getCmp('PgBasketOrderProducts').doRefresh();
                    
                }
            },
 
            ]
        }

    ],
    padding : 10,

     dockedItems: [
    {
        xtype: 'pagingtoolbar',
        id: 'PgProduct',
        dock:'bottom',
        store: 'product.MasterProducts',
        displayInfo: true
    },
 
    ],
    
    store : 'product.MasterProducts',

    initComponent: function(){
        this.callParent(arguments);

    },
    
    
});
 

