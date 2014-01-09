Ext.define('App.view.test.create2',
{
	extend : 'Ext.panel.Panel',
	title: 'Test Component',
	alias : 'widget.createOrder',
	items : [
	{ xtype : 'form', layout : { type : 'ancor' },
		items: [
			{ xtype : 'textfield', name : "productName", fieldLabel : "Search ", ancor : '90%' },
			{ xtype: 'button', text: 'Search', iconCls: 'go' }
		]}
		,{
			xtype : 'container', flex: 3, items: [
				{ xtype: 'grid',
				store : Ext.create('Ext.data.Store',{
					fields : ['id', 'name', 'qty'],
					data: [
						{ id : 1, name: 'Product A', qty: 10, supplier: 'Supplier Z x'},
						{ id : 2, name: 'Product B', qty: 10, supplier: 'Supplier Z y'},
						{ id : 3, name: 'Product C', qty: 10, supplier: 'Supplier Z y'},
						{ id : 4, name: 'Product D', qty: 10, supplier: 'Supplier Z y'},
					]
				}),
				columns :[
				{ header : 'id', dataIndex : 'id' },
				{ header : 'Name', dataIndex : 'name' },
				{ header : 'Supplier', dataIndex : 'supplier' },
				]
				}
			]
		}
	]
});