/*==========  Entry order's  ==========*/

Ext.define("App.model.orders.Order", {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'total'
    ],

    hasMany  : {model: 'App.model.orders.OrderItem', name: 'orderItems', associationKey: 'order_items'},
    belongsTo: 'App.model.orders.User'
});
