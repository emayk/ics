Ext.define('App.view.Orders.wizard.page6',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.orderpage6',
	title : 'Page 6',
	layout: { type : 'fit' , align : 'stretch'},
items: [
	{ xtype : 'container', layout: { type : 'vbox', align: 'stretch'},
	items: [
	{ xtype: 'toolbar',items: [{ text : 'Sent To Server' , iconCls: 'save',disabled: true, itemId :'sentToserver'}] },
 			{ flex: 2,columnLines: true,
				xtype : 'grid',
				title : 'Product Order Preview',
				itemId: 'gridOrderPreview',
				features: [{ftype:'grouping',groupHeaderTpl: 'Order : {name}',collapsible: false,
					hideGroupedHeader: true,
					enableGroupingMenu: false}],

				store : Ext.create('Ext.data.Store',{fields : ['id', 'name', ], }),
				columns : [
						{xtype : 'rownumberer'},
						{ text : 'Id', dataIndex: 'id', width: 30},
						// { text : 'Order ID ', dataIndex: 'order_no', width: 100},
						// { text : 'path', dataIndex: 'path', width: 300},
						// { text : 'sup_id', dataIndex: 'sup_id', width: 100},
						// { text : 'wh_id', dataIndex: 'wh_id', width: 100},
						// { text : 'cp_id', dataIndex: 'cp_id', width: 100},
						// { text : 'Payment', dataIndex: 'pay_id', width: 100},
						// { text : 'product_id', dataIndex: 'product_id', width: 100},

						{ text : 'Name', dataIndex: 'product_name', width: 300},
						{ text : 'Qty', dataIndex: 'product_qty', width: 30},
						{ text : 'Supplier', dataIndex: 'sup_name', width: 300},
						{ text : 'Contact', dataIndex: 'cp_name', width: 300},
						// { text : 'product_image', dataIndex: 'product_image', width: 300},

						{ text : 'Shipping To', dataIndex: 'wh_name', width: 300},
						{ text : 'Payment Type', dataIndex: 'pay_name', width: 300},
						// { text : 'wh_alamat', dataIndex: 'wh_alamat', width: 300},
						// { text : 'cp_nohp', dataIndex: 'cp_nohp', width: 300},
		    ]
			}

			]}
		]
});