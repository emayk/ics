Ext.define('App.view.Orders.wizard.page1gridProdSelected',{


				// xtype : 'grid',
				extend : 'Ext.grid.Panel',
				title : 'Product Terpilih',
				itemId: 'gridProductSelected',
				alias : 'widget.gridProductSelected',
				store : Ext.create('Ext.data.Store',{
					fields : ['id', 'name', 'qty'],
				}),

				columns : [
					{ header : 'Id', dataIndex: 'id' },
					{ header : 'Product Name', dataIndex: 'name' },
					{ header : 'qty', dataIndex: 'qty' },
				],
				// dockedItems: [{itemId: 'pgProductSelected', xtype: 'pagingtoolbar', dock: 'bottom',displayInfo: true }],

				initComponent:function  () {
					this.callParent(arguments);
				}
});