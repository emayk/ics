/**
*
* View
*
**/
Ext.define('App.form.order.step2',{
    extend : 'Ext.panel.Panel',
    extend : 'Ext.grid.Panel',
	alias: 'widget.frmOrderStep2',
    
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
                tooltip: 'Add ',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Edit " + rec.get('name'));
                }
            },
            // {
            //     icon: 'extjs/examples/restful/images/delete.png',
            //     tooltip: 'Delete',
            //     handler: function(grid, rowIndex, colIndex) {
            //         var rec = grid.getStore().getAt(rowIndex);
            //         alert("Terminate " + rec.get('name'));
            //     }
            // }
            ]
        }

    ],
    padding : 10,
    store : 'product.MasterProducts',

    initComponent: function(){
        this.callParent(arguments);

    },
    
});
 

