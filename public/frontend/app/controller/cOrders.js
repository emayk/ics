/**
*
* Controller Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
* Silahkan Masukan Pada App.js
*
**/

Ext.define('App.controller.cOrders',{
	extend: 'Ext.app.Controller',
	views: [
	'App.view.help.vHelp',
	'App.view.Orders.vOrders',
	'App.view.Orders.vOrderTabs',
	'App.view.Orders.vOrderListAll',
	'App.view.Orders.vOrderListClose',
	'App.view.Orders.vOrderListOpen',
	'App.view.Orders.vOrderItemsList',
	'App.view.Orders.vOrderWinInfo',
//	'App.view.Orders.vOrderWin',
	'App.view.Orders.vOrderProcess',
	'App.view.Orders.vOrderFormAdd',
	'App.view.Orders.vOrderItemAddForm',
	'App.view.Orders.vOrderNewItemsList',
	'App.view.Orders.vOrderItemInfoGrid',
	'App.view.Orders.vStockProducts',
	'App.view.Orders.vTreeGrid',

	// combox box
	'App.form.combobox.cbSupplier',
	'App.form.combobox.cbContactPerson',
	'App.form.combobox.cbTypePayment',
	'App.form.combobox.cbWarehouse',
	'App.form.combobox.cbCurrencies',
	'App.form.combobox.cbTypeOrder',
	'App.form.combobox.cbTypeTax'

	],
	models:[
	'App.model.help.mHelp',
	'App.model.Orders.mOrders',
	'App.model.Orders.mCurrency',
	'App.model.Orders.mWarehouse',
	'App.model.Orders.mItems',
	'App.model.Orders.mStockProduct',
	'App.model.Orders.mTreeGrid'
 	],
	stores:[
	'App.store.help.sHelp',
	'App.store.Orders.sOrders',
	'App.store.Orders.sOrdersAll',
	'App.store.Orders.sOrdersOpen',
	'App.store.Orders.sOrdersClose',
	'App.store.Orders.sCurrency',
	'App.store.Orders.sOrderItems',
	'App.store.Orders.sOrderItemsInfo',
	'App.store.Orders.sStockProducts',
	'App.store.Orders.sNewOrderItems',
	'App.store.Orders.sTreeGrid',
	// Combo Store
	'App.store.combo.cbSuppliers',
	'App.store.combo.cbContactPerson',
	'App.store.combo.cbTypePaymentStore',
	'App.store.combo.cbWarehouseStore',
	'App.store.combo.cbCurrency',
	'App.store.combo.cbTypeOrder',
	'App.store.combo.cbTypeTax'


	],
	refs: [
	{ ref: 'gridOpen', selector : 'vOrderListOpen'},
	{ ref: 'gridClose', selector : 'vOrderListClose'},
	{ ref: 'gridAll', selector : 'vOrderListAll'},
	{ ref: 'formaddbtnCancel', selector : 'vOrderFormAdd buttons[action=cancel]'},
	{ ref: 'formAddBtnSave', selector : 'vOrderFormAdd buttons[action=save]'},

	{ ref: 'ordersPanel', selector: 'vOrders' },
	{ ref: 'addBtn', selector : 'vOrders > toolbar > button#add'},
	{ ref: 'editBtn', selector : 'vOrders > toolbar > button#edit'},
	{ ref: 'deleteBtn', selector : 'vOrders > toolbar > button#delete'},
	// win info
	{ ref: 'gridorderitemInfo', selector : 'vOrderItemInfoGrid'},
	{ ref: 'infoProductImage', selector : 'vOrderWinInfo image'},
	// win add atau edit
	{ ref: 'winDetail', selector : 'vOrderWin'},
	// { ref: 'formAdd', selector : 'vOrderFormAdd'},
	{ ref: 'formAddOrder', selector : 'vOrderWin > form#formOrder'},
	{ ref: 'fieldProductName', selector : 'vOrderWin form#formOrderItem textfield[name=product_name]'},
	{ ref: 'fieldProductId', selector : 'vOrderWin form#formOrderItem hiddenfield[name=product_id]'},
	{ ref: 'fieldOrderId', selector : 'vOrderWin form#formOrderItem hiddenfield[name=order_id]'},
	{ ref: 'fieldStockId', selector : 'vOrderWin form#formOrderItem hiddenfield[name=stock_id]'},
	{ ref: 'fieldQtyOrderItem', selector : 'vOrderItemAddForm textfield[name=qty]'},
	// { ref: 'btnAddItem', selector : 'vOrderItemAddForm > toolbar button#add'},
	{ ref: 'btnAddItem', selector : 'vOrderWin form#formOrderItem button#add'},

	{ ref: 'gridStockProduct', selector : 'vStockProducts'},
	{ ref: 'gridNewOrder', selector : 'vOrderNewItemsList'},
	{ ref: 'panelNewOrder', selector : 'vOrderWin panel#panelFormOrderItem'},
	{ ref: 'formAddOrderItem', selector : 'vOrderItemAddForm'},
	{ ref: 'btnHelpOrder', selector: 'vOrderWinInfo > toolbar > button#help'},
	{ ref: 'btnHelpOrderItem', selector: 'vOrderWin > toolbar > button#help'},
	{ ref: 'cbContacts', selector: 'vOrderFormAdd cbContactperson'},
	{ ref: 'tabs', selector: 'vOrderTabs'}

	],
	init: function(){
		var me = this;
		log('Controller ctlOrders Loaded');
		me.control({

			'vOrderFormAdd' : {
				// render : function(){log('vOrderFormAdd Render....'); }
			},

			'vOrderFormAdd button#save' : { click: me.onClickButtonSaveOrder },
			'vOrderListAll' : {
					render: me.onComponentGridRender,
					itemdblclick: me.onGridDoubleClick,
					selectionchange: me.onGridListChange
				},
			'vOrders button#add' : { click: me.onButtonAdd },
			'vOrders button#multiadd' : { click: me.onButtonMultiAdd },
			'vOrders button#edit' : { click: me.onButtonEdit },
			'vOrders button#delete' : { click: me.onButtonDelete },
			'vOrderListOpen' : {
                render: me.onComponentGridRender,
			    selectionchange: me.onGridListChange,
                itemdblclick: me.onGridDoubleClick
				 },
			'vOrderListClose' : {
                render: me.onComponentGridRender,
                itemdblclick: me.onGridDoubleClick
            },
			'vOrderItemInfoGrid' : { render: me.onComponentGridRender,selectionchange: me.onGridInfoChange },
			'vStockProducts' : { selectionchange: me.onselection_grid_stock_products },
			// Button Help Order add/edit
			'vOrderWinInfo > toolbar > button#help' : { click : me.onBtnhelpOrderInfoClick },
			'vOrderWin > toolbar > button#help' : { click : me.onBtnhelpOrderAddEditClick },
			//Button Add Order Items
			'vOrderFormAdd cbSupplier' : { change : me.onComboSupplier_change },
			'vOrderWin form#formOrderItem button#add' : { click: me.onBtnAdd_OrderItem },
			// 'vOrders > toolbar > button#delete' : { click: me.onBtnDelete_Order},
			'vOrderListAll actioncolumn' : { itemclick : me.handleActionColumn },
			'vOrderWin #close' : { click: me.onCloseWindowOrder }

		});

	},

 handleActionColumn: function(column, action, grid, rowIndex, colIndex, item, e) {
 			var rec = grid.getStore().getAt(rowIndex);
        if (action == 'edit'){
            msgError('Edit Order Next Todo [ ' + rec.get('id') + ' ]');
        } else {
        		var title = translations['dialog_conf_del_title'],content = translations['dialog_conf_del_content'];

                Ext.MessageBox.confirm(title, content, function(btn,text) {
                if (btn == 'yes'){
                        grid.getStore().remove(rec); grid.getStore().sync(); grid.getStore().load();
                }
                });
        }
    },
	onBtnDelete_Order: function(btn){
		// get selection data grid dari tabpanel yang aktif.
		//[0].activeTab.getStore();
		// get get model dari store
		// delete record
		// sync store
		// reload store
	},
	onComboSupplier_change : function( cb, newValue, oldValue, eOpts ){
		var me = this;
		if (newValue !== oldValue)
		{
			log('Ubah Store Combo Contact ');
			var storeContactsSupplier = me.getCbContacts().getStore();
			storeContactsSupplier.clearFilter();
			storeContactsSupplier.getProxy().setExtraParam('parent_type','Suppliers');
			storeContactsSupplier.getProxy().setExtraParam('parent_id',newValue);
			storeContactsSupplier.load();
		}
	},
	onBtnAdd_OrderItem : function(btn){
		var me = this, form = btn.up('form'),
		valid = form.getForm().isValid();
		if (!valid){msgError('Please Corrected'); return;
		}else{
			log('Form Valid')
			var value = form.getValues();
			cDir(value);

			// sent to server
			form.submit({
						url: getApiUrl() + '/transorderdetails',
						waitMsg : 'Please Wait...Sending to Server.',
						params : { cmd: 'saveform', _token : gettoken() },
						method : 'POST',
 						success: function(conn, response, options, eOpts) {
								var result = response.result ;
								if (!result){
									result = {};
									result.success = false;
									result.msg = conn.responseText;
							}

							if (result.success) {
								me.getGridNewOrder().getStore().load();
							} else {
								Ext.Msg.show({
								title:'Fail Submit Please try again!',
								msg: result.msg,
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							}); }
								/*End success function*/
						    form.reset();
							},
           		failure: function(conn, response, options, eOpts) {
           			var respon = conn.responseText;
								msg = respon;
						     Ext.Msg.show({
						           title:'Error!',
						           msg: isDebug() ? msg : 'Have Error !',
						           icon: Ext.Msg.ERROR,
						           buttons: Ext.Msg.OK });
						   }
				});
			// refresh grid orderitems

		}
	},
	/**
	*
	* Saat Pemilihan Stock Products
	*
	**/
	onBtnhelpOrderInfoClick : function(btn){
			this.onHelpWindow('help_info_order');
	},
	onBtnhelpOrderAddEditClick : function(btn){
			// saat buton help order item diclick
			this.onHelpWindow('help_Order_AddEdit');
	},
	onHelpWindow : function(code){
			if (!Ext.getStore('shelp')) {Ext.create('App.store.help.sHelp'); }
			var codeDoc = code || 'index' , win = Ext.widget('vhelpWin'),
			storeHelp = Ext.data.StoreManager.lookup('shelp');

			win.setTitle('Help for Information');
			storeHelp.clearFilter();
			storeHelp.getProxy().setExtraParam('id',codeDoc);
			storeHelp.load();
			win.show();
	},
	onselection_grid_stock_products : function(grid,sels){
		var me = this,record = sels[0];
		// set enable button form
		me.getBtnAddItem().setDisabled(sels.length == 0);
		// me.getFieldQtyOrderItem().setValue(0);
		me.getFieldQtyOrderItem().setReadOnly(!sels.length == 0);

		if (record){
			me.getFieldProductName().setValue( record.get('product_name') );
			me.getFieldProductId().setValue( record.get('product_id') );
			me.getFieldStockId().setValue( record.get('id') );
			me.getFieldQtyOrderItem().setReadOnly(false);
		}else{
			me.getFieldProductId().setValue( '' );
			me.getFieldProductName().setValue( '' );
		}
	},
	onButtonEdit : function(btn){
		// proses Edit
	},
	onButtonDelete : function(btn){

	},
	onGridListChange: function  (grid,sels) {
		var selected = ( sels.length > 0);
	},
	onButtonAdd : function(btn){
		Ext.create('App.view.Orders.vOrderProcess').show();
//		Ext.create('App.view.Orders.vOrderWin').show();
	},
	onButtonMultiAdd:  function(btn){
			var win;
			if (!win){
				var win = Ext.widget('winWizCreateOrder');
				win.show();
			}


			// var win ;
			// if (!win){
				// var Ext.widget('')
			// }
	},
	onComponentGridRender : function(grid){
		Ext.getStore(grid.store).load();
	},

	onGridInfoChange : function(grid,selections){
			this.getInfoProductImage().setSrc(getBaseUrl() + selections[0].get('product_img'));
	},

	onGridDoubleClick: function( grid, record, item, index, e, eOpts ){
		var win,me = this;
		if (!win){
			 var win = Ext.widget('vOrderWinInfo'),stockId = record.get('id'),
        	gridOrderItem = this.getGridorderitemInfo(),
        	storeOrderItem = gridOrderItem.getStore(),orderId = record.get('id');
				win.setTitle('Information [ ' + orderId + ' ] ');
				Ext.ComponentQuery.query('vOrderWinInfo button#edit')[0].setDisabled((record.get('status') !== '1'));
				win.down('form').loadRecord(record);
				me.setProxyParams(storeOrderItem,'orderid',orderId);
        win.show();
		}
	},

	/**
	*
	* Save Order
	*
	**/

	onClickButtonSaveOrder : function(btn){
		var me = this;
		var form = btn.up('form'), val = form.getValues();
		var order = Ext.create('App.model.Orders.mOrders',val);
		/*@todo : ganti translate*/
		if (!form.isValid()) { msgError('Silahkan Lengkapi Form terlebih dahulu '); return false;}
		order.save({
			success: function(o){
				log(o);
				log('Saving Done');
				var idNewOrder = o.get('id');
				me.getFieldOrderId().setValue( idNewOrder );
				var buttons = Ext.ComponentQuery.query('vOrderFormAdd button'),
						comboboxs = Ext.ComponentQuery.query('vOrderFormAdd combobox'),
						datefield = Ext.ComponentQuery.query('vOrderFormAdd datefield'),
						numberfield = Ext.ComponentQuery.query('vOrderFormAdd numberfield');
				for (var i = buttons.length - 1; i >= 0; i--) {buttons[i].hide(); };
				for (var i = comboboxs.length - 1; i >= 0; i--) {comboboxs[i].setReadOnly(true); };
				for (var i = datefield.length - 1; i >= 0; i--) {datefield[i].setReadOnly(true); };
				for (var i = numberfield.length - 1; i >= 0; i--) {numberfield[i].setReadOnly(true); };
				me.getGridStockProduct().getStore().load();
				me.setProxyParams(me.getGridNewOrder().getStore(), 'order_id', idNewOrder);
				Ext.ComponentQuery.query('vOrderWin #panelFormOrderItem')[0].getLayout().setActiveItem('pageitem');
			},
			failure: function(o){
				log(o);
				log('Saving Error');
			}
		});
		return false;
	},
 	setProxyParams: function(store,key,value){
 		store.clearFilter(); store.getProxy().setExtraParam(key,value); store.load();
 	},
 	onCloseWindowOrder: function(btn){
	    /*@todo : Jika store item kosong , maka confirm akan didelete no order tersebut */
 		/*Reload All Grid*/
 		Ext.ComponentQuery.query('vOrders > vOrderTabs #all')[0].getStore().reload();
 		Ext.ComponentQuery.query('vOrders > vOrderTabs #close')[0].getStore().reload();
 		Ext.ComponentQuery.query('vOrders > vOrderTabs #open')[0].getStore().reload();
 		/*Execute Window CLosed*/
 		btn.up('window').close();
 	}

});


