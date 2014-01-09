Ext.define('App.view.trx.order.ListStockProducts',{
	extend : 'Ext.grid.Panel',
	alias: 'widget.gridOrderStockProducts',
	store: 'order.Products',
 	emptyText : 'Tidak ada Order',
	columns: [
			{
				xtype: 'rownumberer',
				width : 30,
			},
			{
				header : 'Name',
				dataIndex : 'name',
				flex: 1,
			},
			{
				header : 'Qty Stock',
				dataIndex : 'stock',
			}
 

			// {
			// 	header : 'Supplier',
			// 	dataIndex : 'supplier_id',
   //              renderer: function(value, metaData, record, row, col, store, gridView){
   //                  return record.get('supplier');
   //              },
			// },

		 
			] ,
	columnLines: true,
	selModel: 'rowmodel',
	/*==========  DockedItems  ==========*/	
	dockedItems: [
	{
        xtype: 'pagingtoolbar',
        id: 'pgOrderStockProducts',
        dock:'bottom',
        store: 'order.Products',
        displayInfo: true
	}],
	initComponent : function(){
		this.callParent(arguments);
		Ext.getStore(this.store).load();
	}
});

 

