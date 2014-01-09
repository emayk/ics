Ext.define('App.model.Orders.mUser', {
    extend : 'App.model.Orders.mAbstract',
    fields : [
        'id',
        'firstName',
        'lastName'
    ],
    associations : [
        {
            type           : 'hasMany',
            model          : 'App.model.Orders.mAddress',
            getterName     : 'getAddresses',
            associationKey : 'AddressBook'
        },
        {
            type           : 'belongsTo',
            model          : 'App.model.Orders.mAddress',
            getterName     : 'getAddress',
            associationKey : 'Address'
        }
    ]
});
