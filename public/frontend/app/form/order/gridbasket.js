/**
*
* Grid Basket Products
*
**/
Ext.define('App.form.order.gridbasket',{
    // extend : 'Ext.panel.Panel',
    extend : 'Ext.grid.Panel',
	alias: 'widget.gridOrderBasket',
    title: 'Basket Products',
    requires: [ 'Ext.ux.DataTip', ],
    columns: [
        { xtype: 'rownumberer'},
        { header: 'Name',  dataIndex: 'productname',flex: 1 },
        { 
            header: 'Qty',  
            dataIndex: 'qty',
            flex: .5,
            editor: {
                    xtype : 'textfield',
                    allowBlank : false
                },
            renderer: function(value, metaData, record, row, col, store, gridView){
                // return value + ' Item' ;
                // out = (value == 0 ) ? 'Please Click Me' : value + ' Items';
                out = (value == 0 ) ? 'Please Click Me' : (value == 1) ? value + ' Item ' : value +' Items';
                return out;
            }
         },

          {   
            header: 'Action',
            xtype:'actioncolumn', 
            // width:50,
            flex: .5,

            items: [{
                icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Delete From Order',
                padding : '0 10 0 10',
                handler: function(grid, rowIndex, colIndex) {
                            // Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            // if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('PgBasketOrderProducts').doRefresh();

                            // }            
                            }
                            // );
                    }
                // } 
                ]
        },
        

    ],
    padding : 10,
    store : 'product.Baskets',
      selModel: 'rowmodel',
    //  /*==========  Plugins  ==========*/
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
            // clicksToEdit: !1,
            clicksToEdit: 1,
            pluginId: 'PrOrderBasketProduct',
            clicksToMoveEditor: 1
        })
     ],
    initComponent: function(){
        this.callParent(arguments);

    },
    dockedItems: [
    {
        xtype: 'pagingtoolbar',
        id: 'PgBasketOrderProducts',
        dock:'bottom',
        store: 'product.Baskets',
        displayInfo: true
    }]
    
});
 

