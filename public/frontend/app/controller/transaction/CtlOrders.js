/**
*
* Controller Transaksi Order
*
**/
var	data_ponumber;
Ext.define('App.controller.transaction.CtlOrders',{
	extend: 'Ext.app.Controller',
	views:[
		'App.view.trx.order.ListOpen',
		'App.view.trx.order.ListClose',
		'App.view.trx.order.ListStockProducts',
		'App.view.trx.order.TabOrder',
		'App.view.master.office.ListHead',
		'App.view.trx.order.ListOrderItems',
		'App.form.order.AddOrder' //formAddOrder
	],

	models : [
		'order.OrderOpen',
		'product.Basket',
		'product.Master',
	],
	stores:[
		'product.MasterProducts',
		'order.StockProducts',
		'product.Baskets',
		'order.OrdersOpen',
		'order.OrdersClose',
		'order.OrderItems',
		'combo.cbContactPerson',
		'combo.cbCurrency',
		'combo.cbTypePaymentStore',
		'combo.cbSuppliers',
		'combo.cbWarehouseStore',

	],
	/*==========  Referensi  ==========*/

	refs: [
		// { ref: 'basket', selector: 'gridOrderBasket'},
		// { ref: 'product', selector: 'gridOrderproducts'},
		{ ref: 'ordersOpen', selector : 'gridOrderOpen'},
		{ ref: 'ordersClose', selector : 'gridOrderClose'},
		{ ref: 'orderItems', selector : 'gridOrderItems'},
		{ ref: 'orderproduct', selector : 'gridOrderStockProducts'},
		{ ref: 'formAdd', selector : 'formAddOrder'}
	],

	ponumber : null,
	init: function(){
		log('Controller Orders Loaded..................');
		this.control({

/*==========  List Order Open  ==========*/

			'gridOrderOpen' : {
				itemclick : function(grid,record){
                this.getOrderItems().setTitle('Order Item : [' + record.get('po_no') + ' ]');
                this.ponumber = record.get('id');
				this.getOrderItems().getStore().getProxy().setExtraParam('ponumber', record.get('id'));
				Ext.getCmp('pgOrderOpenItems').moveFirst();
				},
			},

/*==========  Grid Stock Products  ==========*/

			'gridOrderStockProducts' : {
				itemdblclick : this.addProductToOrderItems
			},

			 /**
			 *
			 * Grid Order Items
			 *
			 **/

			'gridOrderItems' : {
				edit : function(editor,object){
		 			log('Update Order Items');
		 			object.store.save();
		 			this.orderItemsRefresh;
		 		},
			},

			/**
			*
			* Grid Basket Product
			*
			**/
			'gridOrderBasket': {
		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.save();
		 			// this.doRefresh();
		 		},
			}
		});
		 // this.getProductMasterProductsStore().load();
		 // this.getProductBasketsStore().load();
	},

/*==========  Menambahkan Product ke Order Items  ==========*/
	addProductToOrderItems: function( grid, record, item, index, e, eOpts ){
		// cDir(record);
		var me = this;

		/**
		*
		* cek apakah sudah ada list item Order barang yang akan dimasukan
		*
		* @todo
		* - Mendapatkan Store ItemStore
		**/




		msg = 'Berapa banyak Qty Product <br/>'+
		'[ ' + record.get('id') +'/'+ record.get('name') + ' ]<br/>'+
		' Yang akan dimasukan pada Order '+
		' ? ';

		if (me.ponumber == 'undefined') {
		    msgError('Silahkan Pilih Terlebih Dahulu Invoice Yang akan ditambahkan Product');
			return;
		}


		Ext.Msg.prompt('Input', msg, function(btn, text){
		    if (btn == 'ok'){
		    	var qty = text,
		    	store = me.getOrderItems().getStore(),
		    	productname = record.get('name'),
		    	product_id = record.get('id'),
		    	ponumber = me.ponumber,
		    	stock_id = record.get('id');


		    	if (isNumber(qty)){
	        		// dapatkan store dari listOrderItem
	        		// Tambahkan Model kedalam store Listorderitem

	        		if (qty > 0){

		        		store.add({
		        			stockproduct_id: stock_id,
		        			product : {
		        				id : product_id,
		        				name : productname
		        			},
		        			ponumber : ponumber,
		        			qty: qty
		        		});
		        		store.sync();
		        		me.orderItemsRefresh();
	        		}else {

	        			msgError('Qty Harus Lebih besar dari 0 ');
	        			// atau lebih bagus lagi adalah
	        			// msgError('Qty Harus antara 1 - [Max Stock yang ada]')
	        		}


		    	}else{
		    		msgError('Silahkan Masukan Angka ');

		    	}
		    }
		});
	},

	// addToBasket: function( grid, record, item, index, e, eOpts ){
 //    // var model = new App.model.product.Basket({
 //    //     qty : 0,
 //    //     product_id : rec.get('id'),
 //    //     productname: rec.get('name'),
 //    //     // no order_id == diambil dari form sebelumnya
 //    //     order_id: 0,
 //    // });
	// // var model = new App.model.product.Basket({
	// // 	qty: 0,
	// // 	product_id : record.get('id'),
	// // 	productname : record.get('name'),
	// //     //     // no order_id == diambil dari form sebelumnya
	// // 	order_id : 0
	// // });
	// // cDir(model);
 //    // //var store  = Ext.getStore('product.Baskets');
 //    // var store = this.getProductBasketsStore();
 //    // store.add(model);
 //    // store.sync();
 //    //

	// this.getProductBasketsStore().insert(0, this.getProductBasketModel().create({
	// 	qty: 0,
	// 	product_id : record.get('id'),
	// 	productname : record.get('name'),
	// 	order_id : 0
	// }));

	// this.getProductBasketsStore().sync();
	// // this.getProductBasketsStore().load();
	// // var rowEditing = this.getBasket().getPlugin('PrOrderBasketProduct');
	// // rowEditing.startEdit(0, 0);

	// // PgBasketOrderProducts
	// // this.getBasket().
	// Ext.getCmp('PgBasketOrderProducts').doRefresh();
	// // cari index berapa setelah diinset ke grid ?
	// },

	orderItemsRefresh : function(){
		Ext.getCmp('pgOrderOpenItems').moveFirst();
	}

});
