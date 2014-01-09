/**
*
* Controller
*
* Programmer By Emay Komarudin (2013)
*	ExtJs Controller
*
* Wizard Create Order
*
* Pilih Product -> Add Items,
**/
Ext.define('App.controller.wizard.Order', {
    extend: 'Ext.app.Controller',
    models: [
    'App.model.product.Master',
    'App.model.Orders.wizard.mProductSelected',
    'App.model.Orders.wizard.mSupplierSelected',
    'App.model.Orders.wizard.supplier',
    'App.model.Orders.wizard.mContact',
    'App.model.Orders.wizard.mWarehouse',
    'App.model.Orders.wizard.mpaymenttype',
    'App.model.Orders.wizard.mOrderSave',
    ],
    stores: [
        'App.store.product.MasterProducts',
        'App.store.Orders.wizard.supplier',
        'App.store.Orders.wizard.contact',
        'App.store.Orders.wizard.warehouse',
        'App.store.Orders.wizard.paymenttype',
        'App.store.Orders.wizard.products',

        'App.store.Orders.wizard.sProductSelected',

    ],
    views: [
    'App.view.Orders.wizard.Orders',
    'App.view.Orders.wizard.wizardOrder',
    'App.view.Orders.wizard.page1',
    'App.view.Orders.wizard.page1gridProdSelected',
        'App.view.Orders.wizard.imageProduct',
        'App.view.Orders.wizard.vListProduct',
    'App.view.Orders.wizard.page2',
    'App.view.Orders.wizard.page3',
    'App.view.Orders.wizard.page4',
    'App.view.Orders.wizard.page5',
    'App.view.Orders.wizard.page6',
    ],
    refs: [
        {ref: 'winOrder', selector: 'winWizCreateOrder'},
        {ref : 'listProduct', selector: 'gridProduct'},
        {ref : 'imgProduct', selector : 'winWizCreateOrder orderpage1 image'},
        {ref : 'imgProduct2', selector : 'winWizCreateOrder orderpage2 image'},
        {ref : 'page1', selector : 'winWizCreateOrder orderpage1'},
        {ref : 'page2', selector : 'winWizCreateOrder orderpage2'},
        {ref : 'page3', selector : 'winWizCreateOrder orderpage3'},
        {ref : 'page4', selector : 'winWizCreateOrder orderpage4'},
        {ref : 'page5', selector : 'winWizCreateOrder orderpage5'},
        {ref : 'page6', selector : 'winWizCreateOrder orderpage6'},
        {ref : 'gridProductSelected', selector : 'winWizCreateOrder orderpage1 grid#gridProductSelected'},
        {ref : 'gridProductSelectedPage2', selector : 'winWizCreateOrder wizardOrder > orderpage2 grid#gridProductSelected'},
        {ref : 'gridProductSelectedPage3', selector : 'winWizCreateOrder wizardOrder > orderpage3 grid#gridProductSelected'},
        {ref : 'btnPage1', selector : 'winWizCreateOrder wizardOrder button#page1'},
        {ref : 'btnPage2', selector : 'winWizCreateOrder wizardOrder button#page2'},
        {ref : 'btnPage3', selector : 'winWizCreateOrder wizardOrder button#page3'},
        {ref : 'btnPage4', selector : 'winWizCreateOrder wizardOrder button#page4'},
        {ref : 'btnPage5', selector : 'winWizCreateOrder wizardOrder button#page5'},
        {ref : 'btnPage6', selector : 'winWizCreateOrder wizardOrder button#page6'},
        {ref : 'btnClose', selector : 'winWizCreateOrder wizardOrder button#close'},
        {ref : 'btnSent', selector: 'winWizCreateOrder wizardOrder > orderpage6 toolbar #sentToserver'},
        { ref : 'cardPage', selector : 'winWizCreateOrder wizardOrder'},

    ],

    init: function(application) {
        var me = this;
        this.control({
/*==========  Window  ==========*/

            'winWizCreateOrder' : {
                render : me.onRender_window,
                beforeshow: function(){
                    log('im Before Show Fire!!!');
                    me.onRender_window;
                }
            },
            'winWizCreateOrder wizardOrder button#close' : { click : me.onWizard_Button_close },
            /*Saat Grid Order */
/*==========  Page 1  ==========*/
             'winWizCreateOrder orderpage1': {
                 beforeactivate: function(){
                    this.previewOrderActive =false;
                 }
            },
            'winWizCreateOrder gridProduct' : {
                /*Pindah Selection*/
                selectionchange : me.on_selection_change_product,
                /*Saat Double Click*/
                // itemdblclick: me.onGrid_product_dbl_click,
            },
            /*Saat Grid Product terpilih melakukan penghapusan*/
            'winWizCreateOrder wizardOrder > orderpage1 grid#gridProductSelected actioncolumn' : {
                itemclick : me.deleteRecordProduct },

            'winWizCreateOrder orderpage1 grid#gridProductSelected > gridview' :{
                    beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
                        // Defer the handling
                        var me = this;
                        dropHandlers.wait = true;
                        log(data.records);
                        // var overModel = 'App.model.Orders.wizard.mProductSelected';
                        Ext.each(data.records,function(rec){
                            var cek = me.productSelectedStore.findRecord('product_id',rec.get('id'));
                            if (cek !== null) {
                                dropHandlers.cancelDrop();
                            }else{
                                dropHandlers.processDrop();
                            }
                        });
                    },
                    // drop( node, data, overModel, dropPosition, eOpts )
                    drop: function(node, data, dropRec, dropPosition) {
                        var me = this;
                        (me.getPage1().down('grid#gridProductSelected').getStore().getCount() > 0) ? me.enable_btn_page('page2') : me.disable_btn_page('page2');
                }
            },
/*==========  Page 2 Handler  ==========*/
            /*Saat Penambahan*/
            'winWizCreateOrder wizardOrder > orderpage2 grid#gridProductSelected': {
                selectionchange: me.on_selection_change_SelectedProductPage2,
                itemdblclick: me.on_gridProductSelected_DblClick
            },
            /*saat Penambahan Pada Grid Supplier*/
            'winWizCreateOrder wizardOrder > orderpage2 grid#gridSupplierSelected' : {
                itemdblclick : me.on_page2_gridSupplierProductSelected_DblClick
            },
            /*Tombol Hapus Product - Supplier */
            'winWizCreateOrder wizardOrder > orderpage2 grid#gridSupplierProductSelected actioncolumn' : {
                itemclick : me.on_page2_deleteProductSupplierActionColumn },
/*==========  Page 3 Handler  ==========*/
            /*Saat Penambahan Contact Person */
            'winWizCreateOrder wizardOrder > orderpage3 grid#gridSupplierProductSelected' : {
                selectionchange: me.on_selection_change_SelectedProductSupplierPage3,
                itemdblclick: me.on_Page3_process_add_Product_Contact,
                // itemdblclick: me.on_Double_Click_gridContactPage3,
            },

            'winWizCreateOrder wizardOrder > orderpage3 grid#gridContacts' : {
                itemdblclick: me.on_Page3_process_add_Product_Contact
                // itemdblclick: me.on_Double_Click_gridContactPage3
            },
            'winWizCreateOrder wizardOrder > orderpage3 grid#gridContactProductSelected actioncolumn' : {
                itemclick : me.on_page3_deleteProductSupplierActionColumn },

/*==========  Page 4 Handler  ==========*/
            'winWizCreateOrder wizardOrder > orderpage4 grid#gridContactProductSelected' : {
                selectionchange: me.on_selection_change_gridContactProductSelectedPage4,
                itemdblclick: me.on_Double_Click_gridWarehousePage4,
            },
            'winWizCreateOrder wizardOrder > orderpage4 grid#gridWarehouses' : {
                itemdblclick: me.on_Double_Click_gridWarehousePage4,
            },

            'winWizCreateOrder wizardOrder > orderpage4 grid#gridWarehouseProductSelected actioncolumn' : {
                itemclick : me.on_page4_deleteWarehouseProductActionColumn },

/*==========  Page 5 Handler  ==========*/
            'winWizCreateOrder wizardOrder > orderpage5' : {
                beforeactivate : function(){
                    me.getPage5().down('grid#gridPayment').setDisabled(false);
                    if (!me.page_payment_has_Actived){
                    me.getPage5().down('grid#gridPayment').getStore().load();
                    me.page_payment_has_Actived = true;
                    // var title = me.getCardPage().getLayout().getActiveItem().itemId;
                    // log(getActiveItem);
                    me.enable_btn_page('page5');
                    };
                }
            },
            'winWizCreateOrder wizardOrder > orderpage5 grid#gridWarehouseProductSelected' : {
                itemdblclick: me.on_Page5_grid_Add_Payment_Double_Click,
                // selectionchange: me.on_Page5_selection_change_gridWarehouseProductSelected,
            },
            'winWizCreateOrder wizardOrder > orderpage5 grid#gridPayment' : {
                itemdblclick: me.on_Page5_grid_Add_Payment_Double_Click,
            },

            'winWizCreateOrder wizardOrder > orderpage5 grid#gridPaymentProductSelected actioncolumn' : {
                itemclick : me.on_page5_deletePaymentProductActionColumn },

/*==========  Page 6 Handler  ==========*/
            'winWizCreateOrder orderpage6': {
                 beforeactivate: me.on_page6_beforeActivated
            },
            'winWizCreateOrder wizardOrder > orderpage6 toolbar #sentToserver': {
                 // beforeactivate: me.on_page6_beforeActivated
                 click : me.on_page6_sentToServer
            },

            // 'winWizCreateOrder orderpage1 grid#gridlistProduct > gridview' :{
            //         drop: function(node, data, dropRec, dropPosition) {
            //             var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
            //             log('Drop Record' , dropRec);
            //             log('Drag From Product Selected with data', 'Dropped ' + data.records[0].get('name') + dropOn);
            //         }
            // },



        });
        log( ' App Controller Wizard Order Initialize...');
    },

    page_payment_has_Actived: false,
    productSelectedStore : Ext.create('Ext.data.ArrayStore', {
        model : 'App.model.Orders.wizard.mProductSelected',
        autoSync : true,
    }),
    addProduct : function  (record) {
        var me = this;
        var newProduct = Ext.create('App.model.Orders.wizard.mProductSelected',{
                id : ++me.cnt_product,
                product_id : parseInt( record.get('id') ),
                name : record.get('name'),
                image : record.get('image'),
                status : 0,
                supplier_id: parseInt( record.get('supplier_id') ),
                qty : 1,
                path : 'P' + record.get('id')
            });
            this.productSelectedStore.add(newProduct);

            me.getPage1().down('grid#gridProductSelected').getView().refresh();
            me.getPage2().down('grid#gridProductSelected').getView().refresh();
    },
    previewOrderActive : false,
    SupplierSelectedStore : Ext.create('Ext.data.ArrayStore', {
        autoSync : true, groupField: 'sup_name',
        model : 'App.model.Orders.wizard.mSupplierSelected',
    }),
    cnt_supplier : 0,
    cnt_product : 0,
    cnt_contacts : 0,
    addSupplier : function  (recordSup,recProduct) {
        var me = this;
        var supplier = Ext.create('App.model.Orders.wizard.mSupplierSelected',
                 {
                    id : ++me.cnt_supplier,
                    sup_id : parseInt( recordSup.get('id') ),
                    sup_name : recordSup.get('name'),
                    product_id : parseInt( recProduct.get('product_id') ),
                    product_name : recProduct.get('name'),
                    product_img : recProduct.get('image'),
                    product_qty : recProduct.get('qty'),
                    path : recProduct.get('path') + '/S'+ recordSup.get('id'),
                    oid : recordSup.get('id')+'-',
                    status : 0,
                });

        me.SupplierSelectedStore.add(supplier);
        /*set status user jadi terpilih*/
        var supid = supplier.get('product_id');
        var product = me.productSelectedStore.findRecord('product_id', supid );
        product.set('status',1);
        // me.set_status_product_selected(supid,'status_supplier');
        var recUpdate = me.status_entity(supid);
        if (recUpdate!==null){ recUpdate.set('status_supplier',1);};
        (me.SupplierSelectedStore.getCount() > 0 ) ? me.enable_btn_page('page3') : me.disable_btn_page('page3');
        me.getPage2().down('grid#gridSupplierSelected').getView().refresh();
        me.getPage3().down('grid#gridSupplierProductSelected').getView().refresh();

    },
    status_entity : function(product_Id,status_key,status_value){
        var gridProduct = this.getPage1().down('grid#gridProductSelected'),
            store = gridProduct.getStore();
            rec = store.findRecord('product_id',product_Id);
            return rec;
    },
    set_status_product_selected : function(productId,status){
        var gridProduct = this.getPage1().down('grid#gridProductSelected'),
            store = gridProduct.getStore();
            rec = store.findRecord('product_id',productId);
            if (rec!==null){
                rec.set(status,1)
                gridProduct.getView().refresh();
            };
    },
    ContactSelectedStore : Ext.create('Ext.data.ArrayStore', {
        autoSync : true, groupField: 'cp_name',
        model : 'App.model.Orders.wizard.mContact',
    }),

    addContactToStore : function(contactPerson,supplierSelected){
         var me = this;
        var contact = Ext.create('App.model.Orders.wizard.mContact',
                 {
                    id : ++me.cnt_contacts,
                    cp_id : parseInt( contactPerson.get('id') ),
                    cp_name : contactPerson.get('name') ,
                    cp_nohp : contactPerson.get('nohp') ,
                    status : 0,
                    /*Supplier*/
                    sup_id : parseInt( supplierSelected.get('sup_id') ),
                    sup_name : supplierSelected.get('sup_name'),
                    /*Product*/
                    product_id : parseInt( supplierSelected.get('product_id') ),
                    product_name : supplierSelected.get('product_name'),
                    product_image : supplierSelected.get('product_img'),
                    product_qty : supplierSelected.get('product_qty'),
                    path : supplierSelected.get('path') + '/C'+ contactPerson.get('id'),
                    oid : supplierSelected.get('oid') +contactPerson.get('id') +'-',
                });

        me.ContactSelectedStore.add(contact);
         var supplier = me.SupplierSelectedStore.findRecord('product_id', contact.get('product_id') );
        supplier.set('status',1);
        me.set_status_product_selected(contact.get('product_id'),'status_contact');
        (me.ContactSelectedStore.getCount() > 0 ) ? me.enable_btn_page('page4') : me.disable_btn_page('page4');
        me.getPage3().down('grid#gridContactProductSelected').getView().refresh();
        me.getPage4().down('grid#gridContactProductSelected').getView().refresh();
        log('Add Contact Proses to Store');
        log('Contact Product Yang Dimasukan', contact);
    },

    cnt_warehouse : 0,
    WarehouseStore : Ext.create('Ext.data.ArrayStore', {
        autoSync : true, groupField: 'wh_name',
        model : 'App.model.Orders.wizard.mWarehouse',
    }),
    addWarehouse : function  (warehouse,psSelected) {
        var me = this;
        var newwarehouse = Ext.create('App.model.Orders.wizard.mWarehouse',{
            id : ++me.cnt_warehouse,
            wh_id:  parseInt(warehouse.get('id') ),
            wh_name : warehouse.get('name'),
            status : 0,
            wh_alamat : warehouse.get('alamat'),
            cp_id : psSelected.get('cp_id'),
            cp_name :psSelected.get('cp_name'),
            cp_nohp :psSelected.get('cp_nohp'),
            sup_id :psSelected.get('sup_id'),
            sup_name :psSelected.get('sup_name'),
            product_id :psSelected.get('product_id'),
            product_name :psSelected.get('product_name'),
            product_image :psSelected.get('product_image'),
            product_qty :psSelected.get('product_qty'),
            path : psSelected.get('path') + '/W'+ warehouse.get('id'),
            oid : psSelected.get('oid') + warehouse.get('id') +'-'
        });
        me.WarehouseStore.add(newwarehouse);
        log('Warehouse Object yang ditambahkan',newwarehouse);
        var contact = me.ContactSelectedStore.findRecord('product_id', newwarehouse.get('product_id') );
        me.set_status_product_selected(newwarehouse.get('product_id'),'status_wh');
        (me.WarehouseStore.getCount() > 0 ) ? me.enable_btn_page('page5') : me.disable_btn_page('page5');
        contact.set('status',1);
        me.getPage4().down('grid#gridWarehouseProductSelected').getView().refresh();
        me.getPage5().down('grid#gridWarehouseProductSelected').getView().refresh();
    },
    cnt_payment : 0,
     metodePaymentStore : Ext.create('Ext.data.ArrayStore', {
        autoSync : true, groupField: 'pay_name',
        model : 'App.model.Orders.wizard.mpaymenttype',
    }),
    Add_method_payment_toStore : function  (payment,psSelected) {
        var me = this;
        var warehouse = Ext.create('App.model.Orders.wizard.mpaymenttype',{
            id : ++me.cnt_payment,
            pay_id : parseInt(payment.get('id') ),
            pay_name : payment.get('name'),
            wh_id:  psSelected.get('wh_id'),
            status:  0,
            wh_name : psSelected.get('wh_name'),
            wh_alamat : psSelected.get('wh_alamat'),
            cp_id : psSelected.get('cp_id'),
            cp_name :psSelected.get('cp_name'),
            cp_nohp :psSelected.get('cp_nohp'),
            sup_id :psSelected.get('sup_id'),
            sup_name :psSelected.get('sup_name'),
            product_id :psSelected.get('product_id'),
            product_name :psSelected.get('product_name'),
            product_image :psSelected.get('product_image'),
            product_qty :psSelected.get('product_qty'),
            path :psSelected.get('path')+ '/P' + payment.get('id'),
            oid : psSelected.get('oid') + payment.get('id') ,
        });
        me.metodePaymentStore.add(warehouse);
        var wh = me.WarehouseStore.findRecord('product_id', warehouse.get('product_id') );
        wh.set('status',1);
        me.set_status_product_selected( warehouse.get('product_id'),'status_payment');
        (me.metodePaymentStore.getCount() > 0 ) ? me.enable_btn_page('page6') : me.disable_btn_page('page6');
        me.getPage5().down('grid#gridWarehouseProductSelected').getView().refresh();
        me.getPage5().down('grid#gridPaymentProductSelected').getView().refresh();

    },
    cnt_orders : 0,
    OrdersStore : Ext.create('Ext.data.ArrayStore', {
        autoSync : true, groupField: 'order_no',
        model : 'App.model.Orders.wizard.mOrderPreview',
    }),

/*==========  Page 6  ==========*/
    proces_order_preview: function(metodePaymentStore){
        var me = this;
        Ext.each(metodePaymentStore,function(records){
            Ext.each(records.data.items,function(record){
                /*cek data di store jika tidak ada store record ke orderStore*/
                /*order_no = format-date - noID*/
                /*cek quantity product*/
                var product = me.productSelectedStore.findRecord('product_id',record.get('product_id'));
                var qty = (parseInt(product.get('qty')) ==  parseInt(record.get('product_qty')) ) ? parseInt(record.get('product_qty')) : parseInt(product.get('qty') );
                var path = record.get('path');
                var order = Ext.create('App.model.Orders.wizard.mOrderPreview',{
                    id : ++me.cnt_orders,
                    order_no : 'PO-'+record.get('oid'),
                    pay_id : record.get('pay_id'),
                    pay_name : record.get('pay_name'),
                    wh_id:  record.get('wh_id'),
                    wh_name : record.get('wh_name'),
                    wh_alamat : record.get('wh_alamat'),
                    cp_id : record.get('cp_id'),
                    cp_name :record.get('cp_name'),
                    cp_nohp :record.get('cp_nohp'),
                    sup_id :record.get('sup_id'),
                    sup_name :record.get('sup_name'),
                    product_id :record.get('product_id'),
                    product_name :record.get('product_name'),
                    product_image :record.get('product_image'),
                    product_qty : qty,
                    // product_qty :record.get('product_qty'),
                    path :record.get('path'),
                });
                me.OrdersStore.add(order);
            });
        });
    },
    on_page6_sentToServer: function(btn){
        var me = this,store = me.OrdersStore;
        var data = [];
        Ext.each(store.data.items,function(item,key){
                var a = {
                    cp_id: item.get('cp_id') ,
                    order_no: item.get('order_no'),
                    path: item.get('path') ,
                    pay_id: item.get('pay_id') ,
                    product_id: item.get('product_id') ,
                    product_qty: item.get('product_qty') ,
                    sup_id: item.get('sup_id') ,
                    wh_id: item.get('wh_id') ,
                    };
                data.push(a);
        });

        var order = Ext.create('App.model.Orders.wizard.mOrderSave',{ data: data });
        order.save({
             success: function(conn, response, options, eOpts) {
                var res = response.response.responseText;
                var result = App.util.Util.decodeJSON(res);
                if (result.success) {
                    App.util.Alert.msg('Success!', result.msg);
                    btn.up('window').close();
                } else {
                    App.util.Util.showErrorMsg(res);
                }
            },
            failure: function(conn, response, options, eOpts) {
                App.util.Util.showErrorMsg(conn.responseText);
            }

        } );

    },
/**
*
* Begin Logic
*
**/
    enable_btn_page : function(titlePage){
        Ext.ComponentQuery.query('winWizCreateOrder wizardOrder button#'+titlePage)[0].setDisabled( false );
    },
    disable_btn_page : function(titlePage){
        Ext.ComponentQuery.query('winWizCreateOrder wizardOrder button#'+titlePage)[0].setDisabled( true );
    },
    onWizard_Button_close: function(btn){
        log(btn.text);
        if (this.previewOrderActive){
            log('my previewOrderActive', this.previewOrderActive);
        }else{
            btn.up('winWizCreateOrder').close();
        }

    },
    /*==========  Page 6  ==========*/
    on_page6_beforeActivated: function(){
        var me = this;
        me.cnt_orders=0;
        me.OrdersStore.removeAll();
        me.proces_order_preview(me.metodePaymentStore);
        me.previewOrderActive =  true;
        var haveorders = me.OrdersStore.getCount() > 0;
        me.getBtnSent().setDisabled(!haveorders);

    },
    /*==========  Page 5  ==========*/
    on_Page5_selection_change_gridWarehouseProductSelected: function( grid, selections){
        var me = this, selected = (selections.length > 0), record = selections[0];
        var gridPayment = me.getPage5().down('grid#gridPayment');
        var store = gridPayment.getStore();
        gridPayment.setDisabled(!selected);
        store.load();
    },

    on_Page5_grid_Add_Payment_Double_Click: function(grid,record,item,index,e,eOpts){
        var me = this, gridPayment = me.getPage5().down('grid#gridPayment'),
            is_select_payment = gridPayment.getSelectionModel().getSelection().length > 0;
        if(!is_select_payment) return false;
        var gridWarehouseSelected = me.getPage5().down('grid#gridWarehouseProductSelected'),
            is_wh_selected = gridWarehouseSelected.getSelectionModel().getSelection().length > 0;
        if (!is_wh_selected) return false;

        var record_wh = gridWarehouseSelected.getSelectionModel().getSelection()[0];
        var record_payment = gridPayment.getSelectionModel().getSelection()[0];


        var productId = record_wh.get('product_id');
        var cek = me.metodePaymentStore.findRecord('product_id',productId);
        if (cek!== null){
                return false;
        }else{
            me.Add_method_payment_toStore(record_payment,record_wh);
            me.getPage5().down('grid#gridPaymentProductSelected').getView().refresh();
        }
    },

    /*==========  Page 4  ==========*/
    on_selection_change_gridContactProductSelectedPage4: function( grid, selections){
        var me = this, selected = (selections.length > 0), recordContactSelected = selections[0];
        var gridWarehouses = me.getPage4().down('grid#gridWarehouses');
        var storeWarehouse = gridWarehouses.getStore();
        gridWarehouses.setDisabled(!selected);
        // if (!selected) return false;
        log(recordContactSelected);
        storeWarehouse.load();
    },
    on_Double_Click_gridWarehousePage4 : function(grid, record, item, index, e, eOpts)
    {
        var me = this,
            gridWarehouses = me.getPage4().down('grid#gridWarehouses'),
            recordWarehouse = gridWarehouses.getSelectionModel().getSelection()[0],
            is_wh_selected = gridWarehouses.getSelectionModel().getSelection().length > 0;
        if (!is_wh_selected) return false;
        var gridContactSelected = me.getPage4().down('grid#gridContactProductSelected'),
            is_contact_selected = gridContactSelected.getSelectionModel().getSelection().length > 0;
        if (!is_contact_selected) return false;
        var contact_selected = gridContactSelected.getSelectionModel().getSelection()[0];

        /*cek product pada store warehouseStore*/
        var productId = parseInt( contact_selected.get('product_id') );
        var cek = me.WarehouseStore.findRecord('product_id',productId);
        if (cek!== null){
                return false;
        }else{
            me.addWarehouse(recordWarehouse,contact_selected);
            me.getPage4().down('grid#gridWarehouseProductSelected').getView().refresh();
        }
    },

    on_Page3_process_add_Product_Contact : function(){
        var me = this;
        var gridContacts = me.getPage3().down('grid#gridContacts');
        var grid_prod_supplier = me.getPage3().down('grid#gridSupplierProductSelected');
        var is_prod_supplier_selected = grid_prod_supplier.getSelectionModel().getSelection().length > 0;
        if (gridContacts.getStore().isLoading() ) return false;
        if (!is_prod_supplier_selected) return false;

        var rec_prod_supplier = grid_prod_supplier.getSelectionModel().getSelection()[0];
        var is_selected_Contact = gridContacts.getSelectionModel().getSelection().length > 0;
        if (!is_selected_Contact) return false;
        var record_contact = gridContacts.getSelectionModel().getSelection()[0];

        var productId = parseInt( rec_prod_supplier.get('product_id') );
        var ada = me.ContactSelectedStore.findRecord('product_id',productId);

        if (ada !== null){
            msgError('Product '+ rec_prod_supplier.get('product_name')
                     +' Sudah ditambahkan <br/>' +
                     ' dengan Contact Person <br/>'+
                     ada.get('cp_name') + ',<br/> '+
                     'Silahkan Hapus Product Pada [ Product > Contact ] Jika diperlukan ');
            return false;
        }else{
            /*cek apakah store sedang loading , jika ya false.*/
            /*tidak : lanjut, dan tambahkan ke store*/
            me.addContactToStore(record_contact, rec_prod_supplier);
            me.getPage3().down('grid#gridContactProductSelected').getView().refresh();
            log('Record Contact Yang akan ditambahkan',record_contact);
            log('Record Product Supplier Yang akan ditambahkan',rec_prod_supplier);
        }
    },

    on_selection_change_SelectedProductSupplierPage3: function( grid, selections){
        var me = this, rec = selections[0], selected = selections.length >0,
            gridContacts = me.getPage3().down('grid#gridContacts');
            gridContacts.setDisabled(!selected);
        if (!selected) return false;
        // me.getImgProduct2().setSrc(rec.get('image'));
        gridContacts.setTitle('Contact Person Available from Supplier [ '+ rec.get('sup_name') + ' ]');
        var storeContacts = gridContacts.getStore();
        /*@todo : backend Php harus diganti menjadi pivot table*/
        /*banyak 1 product dengan banyak supplier*/
        storeContacts.getProxy().setExtraParam('parent_id',rec.get('sup_id'));
        storeContacts.load();
    },

    deleteRecordProduct: function(column, action, grid, rowIndex, colIndex, item, e) {
        if (action == 'delete'){
           var rec = grid.getStore().getAt(rowIndex),me = this;
           var product_id =  parseInt( rec.get('product_id') );
           rec_ada = me.productSelectedStore.findRecord('product_id', product_id );
           if (rec_ada!== null){
               me.productSelectedStore.remove(rec_ada);
               // me.productSelectedStore.sync();
           }
           (me.getPage1().down('grid#gridProductSelected').getStore().getCount() > 0) ? me.enable_btn_page('page2') : me.disable_btn_page('page2');
        };
    },

    on_page4_deleteWarehouseProductActionColumn: function(column, action, grid, rowIndex, colIndex, item, e) {
        var rec = grid.getStore().getAt(rowIndex),me = this;
        if (action == 'delete'){
            var rec_product_id = parseInt( rec.get('product_id') );
            me.on_proses_update_status(me.ContactSelectedStore,me.WarehouseStore,rec_product_id);
            (me.WarehouseStore.getCount() > 0 ) ? me.enable_btn_page('page5') : me.disable_btn_page('page5');
            return false;
        };
    },

    on_page5_deletePaymentProductActionColumn: function(column, action, grid, rowIndex, colIndex, item, e) {
        var rec = grid.getStore().getAt(rowIndex),me = this;
        if (action == 'delete'){
            var rec_product_id = parseInt( rec.get('product_id') );
            me.on_proses_update_status(me.WarehouseStore,me.metodePaymentStore,rec_product_id);
            (me.metodePaymentStore.getCount() > 0 ) ? me.enable_btn_page('page6') : me.disable_btn_page('page6');
            return false;
        };
    },

    /**
    *
    * Proses Update Status Record
    * @param {dataStore} storeUpdate Store Yang akan diupdate
    * @param {dataStore} storeRemove Store Yang akan remove Record
    * @param {mixin} product_id Product_id yang akan dihapus/diupdate
    *
    **/

    on_proses_update_status : function(storeUpdate,storeRemove,product_id){
            rec_ada = storeRemove.findRecord('product_id', product_id );
            var recordUpdate = storeUpdate.findRecord('product_id',rec_ada.get('product_id'));
            recordUpdate.set('status',0);
            storeRemove.remove(rec_ada);
            storeRemove.sync();
    },

on_page3_deleteProductSupplierActionColumn: function(column, action, grid, rowIndex, colIndex, item, e) {
        var rec = grid.getStore().getAt(rowIndex),me = this;
        /*cek aksi*/
        if (action == 'delete'){
            var rec_product_id = parseInt( rec.get('product_id') );
            rec_ada = me.ContactSelectedStore.findRecord('product_id', rec_product_id );
            log(rec_ada);
            var supplier = me.SupplierSelectedStore.findRecord('product_id',rec_ada.get('product_id'));
            supplier.set('status',0);
            me.ContactSelectedStore.remove(rec_ada);
            me.ContactSelectedStore.sync();
            (me.ContactSelectedStore.getCount() > 0 ) ? me.enable_btn_page('page4') : me.disable_btn_page('page4');
            return false;
        };
    },
    on_page2_deleteProductSupplierActionColumn: function(column, action, grid, rowIndex, colIndex, item, e) {
        var rec = grid.getStore().getAt(rowIndex),me = this;
        /*cek aksi*/
        if (action == 'delete'){
            var rec_product_id = parseInt( rec.get('product_id') );
            rec_ada = me.SupplierSelectedStore.findRecord('product_id', rec_product_id );
            log(rec_ada);
            prod = me.productSelectedStore.findRecord('product_id',rec_ada.get('product_id'));
            prod.set('status',0);
            me.SupplierSelectedStore.remove(rec_ada);
            me.SupplierSelectedStore.sync();
            me.unset_product_supplier(rec_product_id);
            // var recUpdate = me.status_entity(rec_product_id);
            // if (recUpdate!==null){
            //     recUpdate.set('status_supplier',0);
            //     recUpdate.set('sup_name',null);
            //     recUpdate.set('sup_id',null);
            // };
            (me.SupplierSelectedStore.getCount() > 0 ) ? me.enable_btn_page('page3') : me.disable_btn_page('page3');
            return false;
        };
    },

    on_gridProductSelected_DblClick: function( grid, record, item, index, e, eOpts ){
        var me = this;
        var is_selected_Product = me.getGridProductSelectedPage2().getSelectionModel().getSelection().length > 0;
        log('Terpilih Product', is_selected_Product);
        /*cek apakah grid product page 2 sedang dipilih*/
        if (!is_selected_Product) return false;
        var gridSupplier = me.getPage2().down('grid#gridSupplierSelected');
        var is_selectedSupplier = gridSupplier.getSelectionModel().getSelection().length > 0;

        log('Terpilih Supplier', is_selectedSupplier);

        /*cek apakah supplier sedang dipilih*/
        if (!is_selectedSupplier) {
            msgError('Silahkan Pilih Supplier/Pemasok Terlebih dahulu');
            return false;
        }

        var recProduct = me.getGridProductSelectedPage2().getSelectionModel().getSelection()[0];
        var recSupplier = gridSupplier.getSelectionModel().getSelection()[0];
        var productId = recProduct.get('product_id') ;
        log(productId);

        var ada = me.SupplierSelectedStore.findRecord('product_id',productId);

        if (ada !== null){
            msgError('Product '+ recProduct.get('name')
                     +' Sudah ditambahkan <br/>' +
                     ' dengan Supplier '+
                     ada.get('sup_name') + ',<br/> '+
                     'Silahkan Hapus Product Pada [ Product > Supplier ] Jika diperlukan ');
            return false;
        }else{
            /*cek apakah store sedang loading , jika ya false.*/
            if (gridSupplier.getStore().isLoading() ) return false;
            /*tidak : lanjut, dan tambahkan ke store*/
            me.addSupplier(recSupplier,recProduct);
            me.set_product_supplier(productId,recSupplier.get('id'),recSupplier.get('name'));




        }
    },
    store_product : function(){
        return this.getPage1().down('grid#gridProductSelected').getStore();
    },
    set_product_supplier : function(product_id,supid,sup_name){
        var store = this.store_product();
        var supplier = store.findRecord('product_id',product_id);
        if (supplier!==null){
            supplier.set('sup_id',supid);
            supplier.set('sup_name',sup_name);
            supplier.set('status_supplier',1);
        }
        return false;
    },
    unset_product_supplier : function(product_id){
        var store = this.store_product();
        var supplier = store.findRecord('product_id',product_id);
        if (supplier!==null){
            supplier.set('sup_id',null);
            supplier.set('sup_name',null);
            supplier.set('status_supplier',0);
        }
        return false;
    },


    // on_gridSupplierProductSelected_DblClick: function( grid, record, item, index, e, eOpts ){
    on_page2_gridSupplierProductSelected_DblClick: function( grid, record, item, index, e, eOpts ){
        this.on_gridProductSelected_DblClick(grid, record, item, index, e, eOpts);
        /*get record selected Product dan ID product*/
        /*get record selected Supplier dan id supplier*/
        /*add pada model*/
        // var me = this, recSupplier = record;
        // /*log('Record Supplier', record);*/
        // var recProduct = me.getGridProductSelectedPage2().getSelectionModel().getSelection()[0];
        // /*cek apakah id supplier dan id product sudah ada di store supplierSelected*/
        // var ada = me.SupplierSelectedStore.findRecord('product_id', parseInt( recProduct.get('product_id') ) ) ;

        // if (ada){
        //     msgError('Product '+ recProduct.get('name')
        //              +' Sudah ditambahkan <br/>' +
        //              ' dengan Supplier '+
        //              ada.get('sup_name') + ',<br/> '+
        //              'Silahkan Hapus Product Pada [ Product > Supplier ] Jika diperlukan ');
        //     return false;
        // }
        // me.addSupplier(recSupplier,recProduct);
    },

    on_selection_change_SelectedProductPage2: function( grid, selections){
        var me = this, rec = selections[0], selected = selections.length >0,
            gridSupplier = me.getPage2().down('grid#gridSupplierSelected');
        gridSupplier.setDisabled(!selected);
        if (!selected) return false;
        me.getImgProduct2().setSrc(rec.get('image'));
        gridSupplier.setTitle('Supplier Available for [ '+ rec.get('name') + ' ]');
        var storeSupplier = gridSupplier.getStore();
            /*@todo : backend Php harus diganti menjadi pivot table*/
            /*banyak 1 product dengan banyak supplier*/
           storeSupplier.getProxy().setExtraParam('id',rec.get('supplier_id'));
           storeSupplier.load();
    },


    onGrid_product_dbl_click: function( grid, record, item, index, e, eOpts ){
        var me = this;

        /*cek sudah ada belum di store*/
        var ada = me.productSelectedStore.findRecord('name',record.get('name') );
        if (ada){
            msgError('Product '+record.get('name') +' Sudah ditambahkan ,<br/> <br/> '+
                     'Silahkan Edit Qty Product  Jika diperlukan ');
            return false;
        }else{
            me.addProduct(record);
        }
    },


    onRender_window : function(win){
        win.height = hWinMax(); win.width = wWinMax();
        var me = this;//, storeGridSelected = me.getGridProductSelected().getStore();
        var store = me.productSelectedStore;
        me.productSelectedStore.removeAll();
        me.SupplierSelectedStore.removeAll();
        me.ContactSelectedStore.removeAll();
        me.WarehouseStore.removeAll();
        me.metodePaymentStore.removeAll();
        me.OrdersStore.removeAll();
/*(Page 1) Reconfigure Product Selected*/
         win.down('wizardOrder > orderpage1 grid#gridProductSelected').reconfigure(me.productSelectedStore);
         win.down('wizardOrder > orderpage2 grid#gridProductSelected').reconfigure(me.productSelectedStore);
        // me.productSelectedStore.loadPage(1);

/*(Page 2) Reconfigure Supplier Product Selected*/
         win.down('wizardOrder > orderpage2 grid#gridSupplierProductSelected').reconfigure(me.SupplierSelectedStore);


/*(Page 3) Reconfigure Supplier Product Selected*/
        win.down('wizardOrder > orderpage3 grid#gridSupplierProductSelected').reconfigure(me.SupplierSelectedStore);
        win.down('wizardOrder > orderpage3 grid#gridContactProductSelected').reconfigure(me.ContactSelectedStore);
        win.down('wizardOrder > orderpage4 grid#gridContactProductSelected').reconfigure(me.ContactSelectedStore);
        win.down('wizardOrder > orderpage4 grid#gridWarehouseProductSelected').reconfigure(me.WarehouseStore);
        win.down('wizardOrder > orderpage5 grid#gridWarehouseProductSelected').reconfigure(me.WarehouseStore);
        win.down('wizardOrder > orderpage5 grid#gridPaymentProductSelected').reconfigure(me.metodePaymentStore);
        win.down('wizardOrder > orderpage6 grid#gridOrderPreview').reconfigure(me.OrdersStore);

        //  win.down('wizardOrder > orderpage2 grid#gridSupplierProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage3 grid#gridSupplierProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage3 grid#gridContactProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage4 grid#gridContactProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage4 grid#gridWarehouseProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage5 grid#gridWarehouseProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage5 grid#gridPaymentProductSelected').reconfigure(store);
        // win.down('wizardOrder > orderpage6 grid#gridOrderPreview').reconfigure(store);

        me.disable_btn_page('page2');
        me.disable_btn_page('page3');
        me.disable_btn_page('page4');
        me.disable_btn_page('page5');
        me.disable_btn_page('page6');
        page_payment_has_Actived = false;


    },

    on_selection_change_product: function(grid,sels){
        var me = this;
        var rec = sels[0];
            log(rec);
        // if (rec !== null){
        // var picture = rec.get('img');
        // this.getImgProduct().setSrc(picture);
        // }
    }

});