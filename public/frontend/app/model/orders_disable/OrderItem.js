/**
*
* Model Order Item
*
**/

Ext.define("App.model.orders.OrderItem", {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'price', 'quantity', 'order_id', 'product_id'
    ],

    belongsTo: ['App.model.orders.Order', {model: 'App.model.orders.Product', associationKey: 'product'}]
});