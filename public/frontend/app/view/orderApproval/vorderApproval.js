/**
*
* View orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
* Description View  orderApproval
*
*
**/
var statuses = new Array("progress","done");
var ddGroup_transaction = 'ddTransaction';
var drop_transaction = 'dropTransaction';
var drag_transaction = 'dragTransaction';
function  myData() {
	var myData =[];
	var jml_trx = 5;
	for (var i = 1; i <= jml_trx; i++) {
		var jml_order = randomInt(20);
		var trx_no = "TRX-ORDER-16122013-1-8bfc152e-6639-11e3-96da-87c02a90580"+randomInt(10)+randomInt(10)+randomInt(10);
		for (var j = 1; j <= jml_order; j++) {
			var orderno ='Orders-'+randomInt(10)+randomInt(10)+randomInt(10)+randomInt(10);
			var id =  myData.length + 1;
			var items = [];
			var jml_item = randomInt(10);
			for (var item = 0; item <= jml_item ; item++) {
					var item_id = items.length;
					var a_item = {
						id : item_id,
						product_name: 'product '+ item_id + '-'+orderno,
						product_id: item_id,
						product_qty: randomInt(20),
						order_no : orderno
					};
				items.push(a_item);
			};
			var total_items = items.length;
			var m = { id : id, trx_no : trx_no,
					count_order: jml_order ,
					count_items: total_items,
					// status : statuses[randomInt(2)-1],
					status : "progress",
					order_no: orderno,
					items: items
			 };
			myData.push(m);
		};
	};
	return myData;
};

Ext.define('App.view.orderApproval.vorderApproval', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vorderApproval',
    layout : 'border',
    bodyPadding : 5,

    items: [
        {xtype: 'container',
	        region : 'center' , flex: 8,layout: { type: 'vbox', align: 'stretch' },
        items:[
/*==========  Grid Transaction  ==========*/
        	{ xtype: 'grid',  flex: 2,title : 'List Transaksi Order',itemId: 'gridTrx',padding: 2,
	        		store : Ext.create('Ext.data.Store',{
	        				groupField: 'trx_no',
	        				model: 'App.model.orderApproval.morderApproval',
	        				data :[],
	        		}),
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: '#', dataIndex : 'status', width: 30,
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == "done") {metadata.css = 'status_close'; } else {metadata.css = 'status_open'; }  return ''; },tooltip: 'Status Order' },
	        			{ header: 'Order Number', dataIndex : 'order_no', flex: 1},
	        			// { header: 'name', dataIndex : 'trx_no', flex: 2},
	        			// { header: 'orders', dataIndex : 'count_order', flex: 1, renderer: function(v){ var i = (v > 1) ? ' orders' : 'order'; return v + ' '+i; } },
	        			{ header: 'items', dataIndex : 'count_items', flex: 1, renderer: function(v){ var i = (v > 1) ? ' items' : 'item'; return v + ' '+i; }},
	        		],
						features: [
							{
								ftype:'grouping',itemId: 'Transactiongrouping',startCollapsed: true,
								groupHeaderTpl: 'Transaction : {name} ({rows.length} Order{[values.rows.length > 1 ? "s" : ""]})',
								collapsible: true,
								hideGroupedHeader: true,
								enableGroupingMenu: false
							}
							],
							tbar: [{text :'Collapse All', handler: function (btn) {var agPanel = btn.up('grid'), view = agPanel.view, gFeature = view.features[0]; gFeature.collapseAll();} },
										{text :'Expand All', handler: function (btn) {var agPanel = btn.up('grid'), view = agPanel.view, gFeature = view.features[0]; gFeature.expandAll( ); } }],

							viewConfig : {
				        allowCopy: true,
								plugins: {
								              ptype: 'gridviewdragdrop',itemId:'dd_transaction',
								              dragGroup: drag_transaction,
								              dropGroup: drop_transaction,
								              appendOnly: true,
								              ddGroup: ddGroup_transaction,
								              dragText : '{0} Order{1} selected',
								          }
							 },
							selModel: 'rowmodel',
							multiSelect: true,
	        	},

        	{ xtype: 'container' , flex: 2, layout: { type: 'hbox', align : 'stretch'}, defaults: { padding: 2}, bodyPadding :10, items: [
/*==========  Grid Agree  ==========*/

	        	/*Agree Order Grid*/
	        	{ xtype: 'grid',  flex: 2,title : 'List Agree Order',itemId: 'agree',
	        		store : Ext.create('Ext.data.Store',{
	        				fields: ['id','trx_no','count_order','count_items','status','order_no'],
	        				data: [],
	        		}),
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: '#', dataIndex : 'status', width: 30,tooltip: 'Status Order',
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == "done") {metadata.css = 'status_close'; } else {metadata.css = 'status_open'; } metadata.attr = 'ext:qtip="' + (value) + '"'; return ''; } },
	        			{ header: 'Order Number', dataIndex : 'order_no', flex: 1},
	        			// { header: 'name', dataIndex : 'trx_no', flex: 2},
	        			// { header: 'orders', dataIndex : 'count_order', width: 100, renderer: function(v){ var i = (v > 1) ? ' orders' : 'order'; return v + ' '+i; } },
	        			{ header: 'items', dataIndex : 'count_items', width: 100, renderer: function(v){ var i = (v > 1) ? ' items' : 'item'; return v + ' '+i; }},
	        		],
							viewConfig : {
				        allowCopy: true,
								plugins: {
								              ptype: 'gridviewdragdrop',itemId:'drop_transaction_accept',
								              dragGroup: drop_transaction,
								              dropGroup: drag_transaction,
								              appendOnly: true,
								              enableDrop: true,
								              ddGroup: ddGroup_transaction,
								              // dragText : '{0} Order {1} selected',
								          }
							 },
 							selModel: 'rowmodel',
							multiSelect: true,
	        	},
/*==========  Revisi Grid  ==========*/
	        	{ xtype: 'grid',  flex: 2,title : 'List Revise Order',itemId: 'revisi',
	        		store : Ext.create('Ext.data.Store',{
	        				fields: ['id','trx_no','count_order','count_items','status','order_no'],
	        				data: [],
	        		}),
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: '#', dataIndex : 'status', width: 30,tooltip: 'Status Order',
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == "done") {metadata.css = 'status_close'; } else {metadata.css = 'status_open'; } metadata.attr = 'ext:qtip="' + (value) + '"'; return ''; } },
	        			{ header: 'Order Number', dataIndex : 'order_no', flex: 1},
	        			// { header: 'name', dataIndex : 'trx_no', flex: 2},
	        			// { header: 'orders', dataIndex : 'count_order', width: 100, renderer: function(v){ var i = (v > 1) ? ' orders' : 'order'; return v + ' '+i; } },
	        			{ header: 'items', dataIndex : 'count_items', width: 100, renderer: function(v){ var i = (v > 1) ? ' items' : 'item'; return v + ' '+i; }},
	        		],
							viewConfig : {
				        allowCopy: true,
								plugins: {
								              ptype: 'gridviewdragdrop',itemId:'drop_transaction_rev',
								              dragGroup: drop_transaction,
								              dropGroup: drag_transaction,
								              appendOnly: true,
								              enableDrop: true,
								              ddGroup: ddGroup_transaction,
								              // dragText : '{0} Order {1} selected',
								          }
							 },
 							selModel: 'rowmodel',
							multiSelect: true,
	        	},
/*==========  Grid Decline  ==========*/
	        	/*Grip Decline*/
	        	{ xtype: 'grid',  flex: 2,title : 'List Decline Order',itemId: 'decline',
	        		store : Ext.create('Ext.data.Store',{
	        				fields: ['id','trx_no','count_order','count_items','status','order_no'],
	        				data: []
	        		}),
	        		columns:[
	        			{ xtype: 'rownumberer'},
	        			{ header: '#', dataIndex : 'status', width: 30,tooltip: 'Status Order',
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {if (value == "done") {metadata.css = 'status_close'; } else {metadata.css = 'status_open'; } metadata.attr = 'ext:qtip="' + (value) + '"'; return ''; } },
	        			{ header: 'Order Number', dataIndex : 'order_no', flex: 1},
	        			// { header: 'name', dataIndex : 'trx_no', flex: 2},
	        			// { header: 'Total Order', dataIndex : 'count_order', width: 100, renderer: function(v){ var i = (v > 1) ? ' orders' : 'order'; return v + ' '+i; } },
	        			{ header: 'Total Items', dataIndex : 'count_items', width: 100, renderer: function(v){ var i = (v > 1) ? ' items' : 'item'; return v + ' '+i; }},
	        		],
  		      	viewConfig : {
				        allowCopy: true,
								plugins: {
								              ptype: 'gridviewdragdrop',itemId:'drop_transaction_decline',
								              dragGroup: drop_transaction,
								              dropGroup: drag_transaction,
								              appendOnly: true,
								              enableDrop: true,
								              ddGroup: ddGroup_transaction,
								              // dragText : '{0} Order {1} selected',
								          }
							 },
 							selModel: 'rowmodel',
							multiSelect: true,
	        	},
        	]},
        ]},
	      {title : 'Information Order', xtype: 'vInfoOrder' , region: 'east',collapsible : true, flex: 2,}

    ],
    bbar: [
    	{text : 'help', action: 'help', itemId: 'help',iconCls: 'help'},
    	'->',
    	{text : 'cancel', action: 'cancel', itemId: 'cancel',iconCls: 'cancel'},'-',
    	{text : 'save', action: 'save', itemId: 'save',iconCls: 'save'},
    ],
    initComponent: function(){
    	var me = this;
    	this.callParent(arguments);
    	this.down('grid#gridTrx').getStore().loadData(myData());
    	// this.collapseall();
    },
    collapseall : function(){
    	var view = this.down('grid#gridTrx').view;
    	var f = view.features[0];
    	f.collapseAll( );
    }
});
