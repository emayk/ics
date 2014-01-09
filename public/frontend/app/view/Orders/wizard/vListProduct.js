Ext.define('App.view.Orders.wizard.vListProduct',{
	extend : 'Ext.grid.Panel',
	alias : 'widget.gridProduct',
	requires : [
	/*'App.store.product.MasterProducts',*/
  'App.store.Orders.wizard.products'
	],
	/*store : 'App.store.product.MasterProducts',*/
  store : 'App.store.Orders.wizard.products',
  columns: [
        {
            xtype: 'rownumberer'
        },
        { header: 'ID', dataIndex: 'id', width: 50 },
        {header: 'Name', dataIndex : 'name', flex: 6, },
        // {header: 'Design', dataIndex : 'nodesign', flex: .7, },
        // {header: 'Dimension', flex: .5, dataIndex : 'kontruksi', },
        // {header: 'Category', flex: 1, dataIndex : 'kategori_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('catname'); }, },
        // {header: 'Type', flex: 1, dataIndex : 'tipe_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('typename'); }, },
        // {header: 'Weight', flex: 2, dataIndex : 'berat', renderer: function(value, metaData, record, row, col, store, gridView){return value + ' ' + record.get('beratName'); } },
        // {header: 'Width', flex: 2, dataIndex : 'lebar', renderer: function(value, metaData, record, row, col, store, gridView){return value + ' ' + record.get('lebarName'); } },
        // {header: 'Supplier', flex: 4, dataIndex : 'supplier_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('supname'); } },
		 ] ,
    columnLines: true,
  dockedItems: [
  { xtype : 'pagingtoolbar', itemId: 'pagingProduct', /*store : 'App.store.product.MasterProducts',*/ store : 'App.store.Orders.wizard.products',
  dock: 'bottom', displayInfo: true }
  ],

    selModel: 'rowmodel',
  multiSelect: true,
  // viewConfig: {
    // plugins: {
    //     ptype: 'gridviewdragdrop',
    //     id: 'pdragdrop_dListProduct',itemId: 'aha',
    //     dragText: 'to Insert please drag to Product Selected'
    // },
  // },

	listeners:{
      render: function(){
      	this.getStore().load();
      },

  },
  initComponent: function(){
    this.callParent(arguments);
  }
});