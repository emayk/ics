/*==========  Model's  ==========*/
/*==========  Entry User's  ==========*/

Ext.define("App.model.orders.User", {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'name',
        // 'order.total',
        {name: 'orderTotal', mapping: 'orders[0].total'}
     // {name: 'total', type: 'string', mapping:'App.model.Order.total'},
    ],

    hasMany: {model: 'App.model.orders.Order', name: 'orders'},

    proxy: {
        type: 'rest',
        url: '/app/home/app/data/purchase.json',
        reader: {
            type: 'json',
            root: 'users'
        }
    }
});





/*==========  Data  ==========*/

// {
//     "users": [
//         {
//             "id": 123,
//             "name": "Ed",
//             "orders": [
//                 {
//                     "id": 50,
//                     "total": 100,
//                     "order_items": [
//                         {
//                             "id"      : 20,
//                             "price"   : 40,
//                             "quantity": 2,
//                             "product" : {
//                                 "id": 1000,
//                                 "name": "MacBook Pro"
//                             }
//                         },
//                         {
//                             "id"      : 21,
//                             "price"   : 20,
//                             "quantity": 3,
//                             "product" : {
//                                 "id": 1001,
//                                 "name": "iPhone"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }
