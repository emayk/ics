var countSave=0,
required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';



/**
*
* View
*
**/
Ext.define('App.form.order.step2',{
    extend: 'Ext.container.Container',

	alias: 'widget.frmOrderStep2',
    
    requires: [
        'Ext.grid.*',
        'Ext.layout.container.HBox',
         'Ext.ux.DataTip'
    ],    
    xtype: 'dd-grid-to-grid',
    
    
    width: 650,
    height: 300,
    layout: {
        type: 'hbox',
        align: 'stretch',
        padding: 5
    },


/**
*
* Items
*
**/
/**
*
* Product Grid
*
**/

       items : [
        {
            itemId: 'productGrid',
            flex: 1,
            xtype: 'grid',
            multiSelect: true,
                viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: this.id + 'group1',
                    dropGroup: this.id + 'group2'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                        log('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
                    }
                }
            },

            dockedItems: [{
                 xtype: 'pagingtoolbar',
                 store: 'App.store.order.Products',   // same store GridPanel is using
                 dock: 'bottom',
                 displayInfo: true
            }],
            
            // store: new Ext.data.Store('App.store.Products'),
            // store :'App.store.order.Products',
                store :Ext.create('Ext.data.Store', {
                             fields: ['id','name'],
                             data : [
                                 {id: 1, name: 'Jalan Kepatihan'},
                                 {id: 2, name: 'Jalan Jakarta no 2'},
                                 {id: 3, name: 'Komp Istana Regency'},
                                 {id: 4, name: 'Monas'}
                             ]
                         }),
            columns: [
            {
                xtype: 'rownumberer',
                flex: .3,
            },
            {
                text: 'Product', 
                flex: 1, 
                sortable: true, 
                dataIndex: 'name',
                width: 100,
            }, {
                text: 'Col', 
                flex: .3,
                sortable: true, 
                dataIndex: 'Warehouse'
            }, {
                text: 'Qty',  
                flex: .3,
                sortable: true, 
                dataIndex: 'column2'
            }],
            stripeRows: true,
            title: 'Stock Product',
            tools: [{
                type: 'refresh',
                tooltip: 'Reset both grids',
                scope: this,
                handler: this.onResetClick
            }],
            margins: '0 5 0 0'
        }, 

/**
*
* Basket Grid
*
**/


        {
            itemId: 'basketGrid',
            flex: 1,
            xtype: 'grid',
            selType: 'rowmodel',
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 1
                })
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: this.id + 'group2',
                    dropGroup: this.id + 'group1'
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        // var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                        // log('Drag from left to right', 'Dropped ' + data.records[0].get('name') + dropOn);
                        var rec = data.records[0].data;
                        var qty = rec.qty;
                        var aQty;
                        // Ext.Msg.prompt('Name', 'Please enter your name:',function(btn,value){
                        //  return value;

                        // });

                        
                    }
                }
            },
            // store: Ext.create('App.store.order.orderItems'),
            store: 'App.store.order.orderItems',
            columns: [
            // {
            //  xtype: 'rownumberer',
            //  width: 30,
            // },
            {
                text: 'Product', 
                flex: 1, 
                sortable: true, 
                dataIndex: 'name',
            },
             {
                text: 'Qty', 
                flex: .2, 
                sortable: true, 
                dataIndex: 'column2',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }],
            stripeRows: true,
            title: 'Item Product Order'
        }],

    initComponent: function(){
        this.callParent(arguments);
    },
    
    onResetClick: function(){
        //refresh source grid
        this.down('#productGrid').getStore().loadData(myData);

        //purge destination grid
        this.down('#basketGrid').getStore().removeAll();
    }
});
 

