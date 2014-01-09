
Ext.define('App.model.Orders.mAddress', {
    extend : 'App.model.Orders.mAbstract',
    fields : [
        'id',
        'userid',
        'ownerid'
    ],
    associations : [
        {
            type           : 'hasOne',
            model          : 'App.model.Orders.mUser',
            getterName     : 'getUser',
            associatedName : 'User',
            associationKey : 'User'
        },
        {
            type           : 'belongsTo',
            model          : 'App.model.Orders.mUser',
            getterName     : 'getOwner',
            associatedName : 'Owner',
            associationKey : 'Owner'
        }
    ]
});