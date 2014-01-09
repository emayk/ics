/**
*
* View Orders
*
* Programmer By Emay Komarudin.
* 2013
*
* Main Panel
*
**/

Ext.define('App.view.Orders.vTreeGrid', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.orderTreeGrid2',
	rootVisible: false,
    multiSelect: true,
    // singleExpand: true,
    store: 'App.store.Orders.sTreeGrid',
		columns: [{
		                xtype: 'treecolumn', //this is so we know which column will show the tree
		                text: 'Order No',
		                flex: 2,
		                sortable: true,
		                dataIndex: 'nodoc'
		            },
		            // {
		            //     xtype: 'templatecolumn',
		            //     text: 'Type',
		            //     flex: 1,
		            //     sortable: true,
		            //     dataIndex: 'type_id',
		            //     align: 'center',
		            // },
		            {
		                text: 'From Supplier',
		                flex: 1,
		                dataIndex: 'supplier_id',
		                sortable: true
		            }
		            ],
});