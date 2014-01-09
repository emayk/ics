Ext.define('App.view.test.create',
{
	extend : 'Ext.panel.Panel',
	title: 'Test Component',
	alias : 'widget.generatecomponent',
	items : [
	{ xtype : 'form', height : 100, layout: {type : 'fit', align: 'stretch'},
		items: [
			{ xtype: 'button', text: 'Create', handler: function(){
				var url = base_url() + '/app/home/app/data/form/order.json';
				create_component(url);
			}}
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
// /test/order/create.js