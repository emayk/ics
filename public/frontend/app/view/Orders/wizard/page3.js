Ext.define('App.view.Orders.wizard.page3',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.orderpage3',
	layout: { type : 'vbox' , align : 'stretch'},
	title : 'Page 3',
	requires: [

	],
items: [
	{ xtype: 'container', flex: 2,  layout: { type : 'hbox', align : 'stretch'},
		items:[
				{ flex: 7,columnLines: true,
						xtype : 'grid',
					 title : 'List Supplier With Products',
						itemId: 'gridSupplierProductSelected',
				    columnLines: true,
						features: [{ftype:'grouping',groupHeaderTpl: 'Supplier : {name}',collapsible: false, hideGroupedHeader: true, enableGroupingMenu: false}],
						store : Ext.create('Ext.data.Store',{fields : ['id', 'name', ], }),
						columns : [
								{xtype : 'rownumberer',groupable: false,},
								{ header : '#', dataIndex: 'status' , width: 30,
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
								},
								{ header : 'Product Name', dataIndex: 'product_name', width: 300 },
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
				title : 'Contact Person Available : ',
				itemId: 'gridContacts',

				store : 'App.store.Orders.wizard.contact',
				columnLines: true,
				columns : [
					{ header : 'Id', dataIndex: 'id' , flex: 1},
					{ header : 'Name', dataIndex: 'name',flex: 3 },
					{ header : 'Phone', dataIndex: 'nohp',flex: 2 },
		    ],
		    dockedItems: [
		    { xtype : 'pagingtoolbar', dock: 'bottom',store :'App.store.Orders.wizard.contact', displayInfo: false }
		    ]
			},

			{ flex: 2,columnLines: true,
				xtype : 'grid',
				title : 'Product > Contact',
				itemId: 'gridContactProductSelected',
				features: [{ftype:'grouping',groupHeaderTpl: 'Contact : {name}',
				collapsible: false,
					hideGroupedHeader: true,
					enableGroupingMenu: false
			}],

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
					{ header : 'HandPhone', dataIndex: 'cp_nohp' },
		    ]
			}
			]
		},

	],
	initComponent: function  () {
		this.callParent(arguments);
	}
});