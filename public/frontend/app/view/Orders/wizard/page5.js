Ext.define('App.view.Orders.wizard.page5',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.orderpage5',
	layout: { type : 'vbox' , align : 'stretch'},
	title : 'Page 5',
	requires: [

	],
items: [
	{ xtype: 'container', flex: 2,  layout: { type : 'hbox', align : 'stretch'},
		items:[
				{ flex: 7,columnLines: true,
						xtype : 'grid',
					 title : 'List Warehouse With Products',
						itemId: 'gridWarehouseProductSelected',
				    columnLines: true,
						features: [{ftype:'grouping',groupHeaderTpl: 'Warehouse : {name}',collapsible: false,
					hideGroupedHeader: true,
					enableGroupingMenu: false}],
						store : Ext.create('Ext.data.Store',{fields : ['id', 'name', ], }),
						columns : [
								{xtype : 'rownumberer'},
								{ header : '#', dataIndex: 'status' , width: 30,
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
								},
								{ header : 'Product Name', dataIndex: 'product_name', flex: 2 },
				    ]
					},
					{
						xtype: 'panel',
						flex: 3,
				    title: e('picture'),
				    bodyPadding: 2,
						layout: { type : 'fit', align : 'stretch'},
						items:[
								{
								    xtype: 'imgProduct',
								    bodyPadding: 10,
								    itemId: 'itemImgProductP3',
								    frame: true,
								    src: picture_na()
								}
						]
					},
				]
		},
		{xtype: 'container', height: 30},
		{ xtype : 'container', flex : 2,
			layout: { type : 'hbox', align : 'stretch'},
			items: [
			{ flex: 2,
				xtype : 'grid',disabled : true,
				title : 'Payment Available : ',
				itemId: 'gridPayment',

				store : 'App.store.Orders.wizard.paymenttype',
				columnLines: true,
				columns : [
					{ header : 'Id', dataIndex: 'id' , flex: 1},
					{ header : 'Name', dataIndex: 'name',flex: 3 },
		    ],
		    dockedItems: [
		    { xtype : 'pagingtoolbar', dock: 'bottom',store :'App.store.Orders.wizard.paymenttype', displayInfo: false }
		    ]
			},

			{ flex: 2,columnLines: true,
				xtype : 'grid',
				title : 'Product > Payment',
				itemId: 'gridPaymentProductSelected',
				features: [{ftype:'grouping',groupHeaderTpl: 'Payment : {name}',collapsible: false, hideGroupedHeader: true, enableGroupingMenu: false}],

				store : Ext.create('Ext.data.Store',{fields : ['id', 'name', ], }),
				columns : [
						{xtype : 'rownumberer'},
						{
	            header: '#',
	            xtype:'actioncolumn',
	            width : 30,
	            items: [
	            {
	                iconCls:'delete',
	                tooltip: 'Delete',
	                handler: function(grid, rowIndex, colIndex, item, e) {this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, item, e); }
	                }
	                ]
	        },
					{ header : 'Product Name', dataIndex: 'product_name',width: 300 },
					{ header : 'Warehouse', dataIndex: 'wh_name',width: 200 },
					{ header : 'Contact Person', dataIndex: 'cp_name' ,width: 300 },
					{ header : 'Supplier', dataIndex: 'sup_name' ,width: 300 },
		    ]
			}
			]
		},

	],
	initComponent: function  () {
		this.callParent(arguments);
	}
});