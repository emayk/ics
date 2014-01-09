
Ext.define('App.view.master.product.ListPrdDetails',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridPrdDetails',

    title : 'All Product',
    store: 'App.store.product.stProdDetails',

    columns: [
            {
                xtype: 'rownumberer'
            },

            {
                header: 'Color',
                dataIndex : 'warna_id',
                flex: 1,
                editor: { allowBlank: false },
				renderer: function(value, metaData, record, row, col, store, gridView){
					return record.get('warna');
				}
            },

            {
                header: 'Grade',
                dataIndex : 'gradekain_id',
                flex: 1,
                editor: { allowBlank: false },
				renderer: function(value, metaData, record, row, col, store, gridView){
					return record.get('gradekain');
				}
            },

             {
                header: 'Stock',
                dataIndex : 'countstock',
                flex: 1,
                editor: { allowBlank: false },
				renderer: function(value, metaData, record, row, col, store, gridView){
					// return record.get('gradekain');
					return (value == 0) ? 'Empty' : ((value ==1 ) ? value + ' item ' : value + ' items');
				}
            },


            // {
            //     header: 'Supplier',
            //     flex: 1,
            //     dataIndex : 'supplier_id',
            //     renderer: function(value, metaData, record, row, col, store, gridView){
            //             return record.get('supname');
            //     },
            //     editor: {
            //         xtype : 'combobox',
            //         allowBlank: false,
            //         displayField : 'name',
            //         valueField: 'id',
            //         value: 'supplier_id',
            //         store : 'combo.cbSuppliers'
            //         }

            // },

            {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .7,
            items: [
	            {
	                // icon: '/assets/fugue/icons/cross-shield.png',
                    iconCls:'delete',
	                tooltip: 'Delete',
	                padding : '0 10 0 10',
	                handler: function(grid, rowIndex, colIndex) {
	                            belumImplement('Product detail Delete');
	                    }
                }
				 ]
        } ] ,
    columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [

    {
        xtype: 'pagingtoolbar',
//        id: 'PgProductDetail',
        dock:'bottom',
        store: 'App.store.product.stProdDetails',
        displayInfo: true
    }]
//    ,
//
//    initComponent : function(){
//        this.callParent(arguments);
//        // Ext.getStore(this.store).load();
//    }
    // ,listeners : {render : function(){Ext.getStore(this.store).load(); } },
});