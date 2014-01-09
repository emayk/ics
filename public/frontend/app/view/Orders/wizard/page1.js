var ddGroup = 'dd_page1';
var p1Group1 = 'p1Group1ProductList';
var p1Group2 = 'p1Group1ProductSelected';
Ext.define('App.view.Orders.wizard.page1',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.orderpage1',
	title : 'Page 1',
	layout: { type : 'vbox' , align : 'stretch'},
	requires: [
		'App.view.Orders.wizard.imageProduct',
		'App.view.Orders.wizard.vListProduct'
	],
	group1 : p1Group1,
	group2 : p1Group2,
items: [
	{ xtype: 'container', flex: 2,  layout: { type : 'hbox', align : 'stretch'},
		items:[
			{xtype : 'gridProduct', flex : 7, title : 'List Products',itemId:'gridlistProduct',
			 viewConfig: {
        allowCopy: true,
				plugins: {
				              ptype: 'gridviewdragdrop',itemId:'gridDDproductList',
				              dragGroup: p1Group1,
				              appendOnly: true,
				              dropGroup: p1Group2,
				              enableDrop: false,
				              ddGroup: ddGroup,
				              dragText : '{0} Product{1} selected',
				          }
			 }
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
						    itemId: 'itemImgProduct',
						    frame: true,
						    src: picture_na()
						}
				]
			},
		]
	},
		{xtype: 'container', height: 30,frame: true,layout: { type: 'hbox', align: 'stretch'},
		items: [
		{
			xtype: 'container',flex : 3,frame: true,
		html : '<b>Note : </b> Silahkan Drag Product yang dipilih (dari List Product diatas) dan Drop(lepaskan) di List Product (Bawah), Edit Qty dengan cara klik 2x pada kolom Qty, Untuk Bantuan Lebih Lanjut Klik Tombol Help Dibawah'
		},{flex: 1,
			xtype: 'toolbar', items: [
				{text: 'Prev', itemId: 'prev', iconCls: 'prev' },'->',
				{text: 'Next', itemId: 'next', iconCls: 'next' }
			]
		}
		]
		},
		{ xtype : 'container', flex : 2,
			// html : 'List Product yang Sudah dipilih',
			layout: { type : 'fit', align : 'stretch'},
			items: [
			{
				xtype : 'grid',
				title : 'Product Terpilih',
				itemId: 'gridProductSelected',
				// store : Ext.create('Ext.data.Store',{fields : ['id', 'name', 'qty'], }),
				store : 'App.store.Orders.wizard.sProductSelected',

				columns : [
					{xtype : 'rownumberer'},
					{ header : '#', dataIndex: 'status' , width: 30,tooltip : 'Status Product',
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
					},
					{ header : 'S', dataIndex: 'status_supplier' , width: 30,tooltip : 'Status Supplier',
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
					},
					{ header : 'C', dataIndex: 'status_contact' , width: 30,tooltip : 'Status Contact/Sales',
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
					},
					{ header : 'W', dataIndex: 'status_wh' , width: 30,tooltip : 'Status Warehouse',
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
					},
					{ header : 'P', dataIndex: 'status_payment' , width: 30,tooltip : 'Status Payment',
						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
					},
					{ header : 'Product Name', dataIndex: 'name', flex: 2 ,tooltip : 'Name Product',},
					{ header : 'qty', dataIndex: 'qty' , flex: 1,tooltip : 'Quantity Product [Double Click For Edit]',
						editor: {
                xtype: 'numberfield',
                hiddenTrigger : true,
                allowBlank: false,
                minValue :1
            }
				},
				{header: 'Action', xtype:'actioncolumn', flex: .7, items: [{iconCls:'delete', tooltip: 'Delete', padding : '0 10 0 10', handler: function(grid, rowIndex, colIndex, item, e) {this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, item, e); } } ] },
		// { dataIndex : 'sup_id', header: 'sup_id', width: 30},
		// { dataIndex : 'sup_name', header: 'sup_name', width: 30},

		// { dataIndex : 'cp_id', header: 'cp_id', width: 30},
		// { dataIndex : 'cp_name', header: 'cp_name', width: 30},

		// { dataIndex : 'wh_id', header: 'wh_id', width: 30},
		// { dataIndex : 'wh_name', header: 'wh_name', width: 30},

		// { dataIndex : 'pay_id', header: 'pay_id', width: 30},
		// { dataIndex : 'pay_name', header: 'pay_name', width: 30},

		// { dataIndex : 'path', header: 'path', width: 30},
		// { dataIndex : 'order', header: 'order', width: 30},

		    ],
		    selType: 'rowmodel',
		    plugins: [ { ptype : 'rowediting',clicksToEdit: -1}],
				viewConfig: {
				       plugins: {
				          ptype: 'gridviewdragdrop',
				          // dragGroup: p1Group2,
				          enableDrop: true,
				          enableDrag : false,
				          dropGroup: p1Group1,
				          ddGroup: ddGroup,
				  }
				},

			}
			]
		},

	],
});




// Ext.define('App.view.Orders.wizard.page1',{
// 	extend : 'Ext.panel.Panel',
// 	alias : 'widget.orderpage1',
// 	layout: { type : 'vbox' , align : 'stretch'},
// 	requires: [
// 		'App.view.Orders.wizard.imageProduct',
// 		'App.view.Orders.wizard.vListProduct'
// 	],
// items: [
// 	{ xtype: 'container', flex: 2,  layout: { type : 'hbox', align : 'stretch'},
// 		items:[
// 			{ xtype : 'gridProduct', flex : 7, title : 'List Products'},
// 			{
// 				xtype: 'panel',
// 				flex: 3,
// 		    title: e('picture'),
// 		    bodyPadding: 2,
// 				layout: { type : 'fit', align : 'stretch'},
// 				items:[
// 						{
// 						    xtype: 'imgProduct',
// 						    bodyPadding: 10,
// 						    itemId: 'itemImgProduct',
// 						    frame: true,
// 						    src: picture_na()
// 						}
// 				]
// 			},
// 		]
// 	},
// 		{xtype: 'container', height: 10},
// 		{ xtype : 'container', flex : 2,
// 			// html : 'List Product yang Sudah dipilih',
// 			layout: { type : 'fit', align : 'stretch'},
// 			items: [
// 			{
// 				xtype : 'grid',
// 				title : 'Product Terpilih',
// 				itemId: 'gridProductSelected',

// 				store : Ext.create('Ext.data.Store',{fields : ['id', 'name', 'qty'], }),

// 				columns : [
// 					{xtype : 'rownumberer'},
// 					{ header : '#', dataIndex: 'status' , width: 30,
// 						renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == 0 ) { metadata.css = 'status_open'; } else {metadata.css = 'status_close'; } return ''; }
// 					},
// 					{ header : 'Product Name', dataIndex: 'name', flex: 2 },
// 					{ header : 'qty', dataIndex: 'qty' , flex: 1,
// 						editor: {
//                 xtype: 'numberfield',
//                 hiddenTrigger : true,
//                 allowBlank: false,
//                 minValue :1
//             }
// 				},
// 				{
// 	            header: 'Action',
// 	            xtype:'actioncolumn',
// 	            flex: .7,
// 	            items: [
// 			            {
// 		                iconCls:'delete',
// 		                tooltip: 'Delete',
// 		                padding : '0 10 0 10',
// 		                handler: function(grid, rowIndex, colIndex, item, e) {this.fireEvent('itemclick', this, 'delete', grid, rowIndex, colIndex, item, e); }
// 		                }
// 	                ]
// 	        }
// 		    ],
// 		    selType: 'rowmodel',
// 		    plugins: [
// 		        Ext.create('Ext.grid.plugin.RowEditing', {
// 		            clicksToEdit: -1
// 		        })
// 		    ],
// 			}
// 			]
// 		},

// 	]
// });