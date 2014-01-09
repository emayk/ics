Ext.define('App.util.dummy', {

    statics : {

        data_order:  [
         {id: '1',    nodoc: 'Spencer'}, {id: '2', nodoc: 'Maintz'}, {id: '3', nodoc: 'Conran'}, {id: '4', nodoc: 'Avins'},
         {id: '4',    nodoc: 'Spencer'}, {id: '5', nodoc: 'Maintz'}, {id: '6', nodoc: 'Conran'}, {id: '7', nodoc: 'Avins'},
         {id: '9',    nodoc: 'Spencer'}, {id: '10', nodoc: 'Maintz'}, {id: '11', nodoc: 'Conran'}, {id: '12', nodoc: 'Avins'},
         {id: '13',    nodoc: 'Spencer'}, {id: '14', nodoc: 'Maintz'}, {id: '15', nodoc: 'Conran'}, {id: '16', nodoc: 'Avins'},
         {id: '17',    nodoc: 'Spencer'}, {id: '18', nodoc: 'Maintz'}, {id: '19', nodoc: 'Conran'}, {id: '20', nodoc: 'Avins'},
         {id: '21',    nodoc: 'Spencer'}, {id: '22', nodoc: 'Maintz'}, {id: '23', nodoc: 'Conran'}, {id: '23', nodoc: 'Avins'},
         {id: '25',    nodoc: 'Spencer'}, {id: '26', nodoc: 'Maintz'}, {id: '27', nodoc: 'Conran'}, {id: '28', nodoc: 'Avins'},
         {id: '29',    nodoc: 'Spencer'}, {id: '30', nodoc: 'Maintz'}, {id: '31', nodoc: 'Conran'}, {id: '32', nodoc: 'Avins'},
     ],
     	data_tipe_order : [

     	],

        /*==========  Data Dummy Supplier  ==========*/
        dataSupplier: [
            { id: 1, name: 'Supplier 1'}, { id: 2, name: 'Supplier 2'},
            { id: 3, name: 'Supplier 3'}, { id: 4, name: 'Supplier 4'},
            { id: 5, name: 'Supplier 5'},
        ],

        dataTypeOrder: [{ id: 1, name: 'Type Order 1'}, { id: 2, name: 'Type Order 2'}, ],

        dataPpn: [{ id: 1, name: 'Non PPn'}, { id: 2, name: 'PPN'} ],

        dataWarehouse: [{ id: 1, name: 'Gudang 1'}, { id: 2, name: 'Gudang 2'}, { id: 1, name: 'Gudang 3'}, { id: 4, name: 'Gudang 4'}],
        dataPaymentType: [{ id: 1, name: 'Cash'}, { id: 2, name: 'COD'}, { id: 3, name: 'at 30 days'}, { id: 4, name: 'Transfer'}],

        dataContacts: [{
            id: 1, name: 'Tidak Ada'}, { id: 2, name: 'Dede'}, { id: 3, name: 'Dodo'}, { id: 4, name: 'Dudu'}
            ],

        dataOrderItems: [
        { id: 1, product_id : 1, product_name : 'Product 1' ,qty: 10, order_id: 1 },
        { id: 2, product_id : 2,  product_name : 'Product 2', qty: 10, order_id: 1 },
        { id: 3, product_id : 3, product_name : 'Product 3',qty: 10, order_id: 1 },
        { id: 4, product_id : 4, product_name : 'Product 4',qty: 10, order_id: 1 },
        ],

        data_transaction_with_item : function  () {
                var myData =[];
                var jml_trx = 5;
                for (var i = 1; i <= jml_trx; i++) {
                    var jml_order = 3;
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
        }
    }
});