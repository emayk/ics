/**
*
* Model Product Order
*
**/
Ext.define("App.model.orders.Product", {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'name'
    ],

    hasMany: 'App.model.orders.OrderItem'
});
