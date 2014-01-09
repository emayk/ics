// var ddGroup2 = 'dd_page2';
// var p2Group1 = 'p1Group2ProductList';
// var p2Group2 = 'p1Group2Selected';

Ext.define('App.view.Orders.wizard.page2',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.orderpage2',
	layout: { type : 'vbox' , align : 'stretch'},
	title : 'Page 2',
	requires: [

	],
items: [
	{ xtype: 'container', flex: 2,  layout: { type : 'hbox', align : 'stretch'},
		items:[
			{
				flex : 7, title : 'List Selected Products',
				xtype : 'grid',
				title : 'Product Terpilih',
				itemId: 'gridProductSelected',

				store : Ext.create('Ext.data.Store',{fields : ['id', 'name', 'qty'], }),
				// viewConfig: {
				// 	plugins: {
				// 	              ptype: 'gridviewdragdrop',itemId:'gridDDproductList',
				// 	              dragGroup: p2Group1,
				// 	              dropGroup: p2Group2,
				// 	              enableDrop: false,
				// 	              ddGroup: ddGroup2,
				// 	              dragText : '{0} Product{1} selected',
				// 	          }
				// },
				columns : [
					{ xtype: 'rownumberer' },
					{ header : '#', dataIndex: 'status' , width: 30,
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
					},

					// { header : 'Id', dataIndex: 'product_id',width : 30, },
					{ header : 'Product Name', dataIndex: 'name' , flex: 3},
					{ header : 'qty', dataIndex: 'qty' , flex: 1,
						editor: {
                xtype: 'numberfield',
                hiddenTrigger : true,
                allowBlank: false,
                minValue :1
            }
				},
		    ],
		    columnLines: true,
		    selType: 'rowmodel',
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
						    itemId: 'itemImgProductP2',
						    frame: true,
						    src: picture_na()
						}
				]
			},
		]
	},
		{xtype: 'container',height: 30,frame: true},
		{ xtype : 'container', flex : 2,
			layout: { type : 'hbox', align : 'stretch'},
			items: [
			{ flex: 2,
				xtype : 'grid',disabled : true,
				title : 'Supplier Available',
				itemId: 'gridSupplierSelected',

				store : 'App.store.Orders.wizard.supplier',
				columnLines: true,
				columns : [
					{ header : 'Id', dataIndex: 'id' , flex: 1},
					{ header : 'Supplier Name', dataIndex: 'name',flex: 3 }
		    ],
		    dockedItems: [
		    { xtype : 'pagingtoolbar', dock: 'bottom',store :'App.store.Orders.wizard.supplier',displayInfo: true }
		    ]
			},
			{ flex: 2,columnLines: true,
				xtype : 'grid',
				title : 'Product > Supplier',
				itemId: 'gridSupplierProductSelected',
				features: [{ftype:'grouping',
					groupHeaderTpl: 'Supplier : {name}',
					collapsible: false,
					hideGroupedHeader: true,
					enableGroupingMenu: false
				} ],

				store : Ext.create('Ext.data.Store',{
					fields : ['id', 'name', ],
				}),

				columns : [
						{xtype : 'rownumberer'},
						// { header : 'Product Name', dataIndex: 'name' , flex : 2 ,
						//  renderer: function(value, metaData, record, row, col, store, gridView){
      //                   return (record.get('sup_name') == null) ? '' : record.get('name') ;
      //           },
						// },

						{ header : 'Product Name', dataIndex: 'product_name' , flex : 2 },
						{
	            header: 'Action',
	            xtype:'actioncolumn',
	            flex: .7,
	            items: [
	            {
	                iconCls:'delete',
	                tooltip: 'Delete',
	                padding : '0 10 0 10',
	                handler: function(grid, rowIndex, colIndex, item, e) {this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, item, e); }
	                }
	                ]
	        },
		    ],
				// viewConfig: {
				//      plugins: {
				//         ptype: 'gridviewdragdrop',
				//         dragGroup: p2Group2,
				//         dropGroup: p2Group1,
				//         ddGroup: ddGroup2,
				// }
				// },
			}
			]
		},

	]
});