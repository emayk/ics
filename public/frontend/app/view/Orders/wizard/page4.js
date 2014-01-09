Ext.define('App.view.Orders.wizard.page4',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.orderpage4',
	title : 'Page 4',
	layout: { type : 'vbox' , align : 'stretch'},
	requires: [

	],
items: [
	{ xtype: 'container', flex: 2,  layout: { type : 'hbox', align : 'stretch'},
		items:[
				{ flex: 7,columnLines: true,
						xtype : 'grid',
					 title : 'List Supplier With Products  ',
						itemId: 'gridContactProductSelected',
				    columnLines: true,
						features: [{ftype:'grouping',groupHeaderTpl: 'Supplier : {name}',
						collapsible: false,
						hideGroupedHeader: true,
						enableGroupingMenu: false
					}],
						store : Ext.create('Ext.data.Store',{fields : ['id', 'name', ], }),
						columns : [
								{xtype : 'rownumberer'},
								{ header : '#', dataIndex: 'status' , width: 30,
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
							},
								{ header : 'Product Name', dataIndex: 'product_name', flex: 3 },
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
				title : 'Warehouse Available : ',
				itemId: 'gridWarehouses',

				store : 'App.store.Orders.wizard.warehouse',
				columnLines: true,
				columns : [
					{ header : 'Id', dataIndex: 'id' , flex: 1},
					{ header : 'Name', dataIndex: 'name',flex: 3 },
					{ header : 'Address', dataIndex: 'alamat',flex: 4 },
		    ],
		    dockedItems: [
		    { xtype : 'pagingtoolbar', dock: 'bottom',store :'App.store.Orders.wizard.warehouse', displayInfo: false }
		    ]
			},

			{ flex: 2,columnLines: true,
				xtype : 'grid',
				title : 'Product > Warehouse',
				itemId: 'gridWarehouseProductSelected',
				features: [{ftype:'grouping',groupHeaderTpl: 'Warehouse : {name}',collapsible: false,
					hideGroupedHeader: true, enableGroupingMenu: false}],

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
	                // padding : '0 10 0 10',
	                handler: function(grid, rowIndex, colIndex, item, e) {this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, item, e); }
	                }
	                ]
	        },
					{ header : 'Product Name', dataIndex: 'product_name',flex: 2 },
					// { header : 'Address', dataIndex: 'wh_alamat' },
					{ header : 'Contact', dataIndex: 'cp_name' },
		    ]
			}
			]
		},

	],
	initComponent: function  () {
		this.callParent(arguments);
	}
});