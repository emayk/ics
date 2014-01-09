// sample data
//


Ext.define('App.model.Orders.mAbstract',{
    extend : 'Ext.data.Model',
    requires : 'Ext.data.proxy.Memory',
    proxy : {
        type : 'memory'
    },
    constructor : function (data, id, raw, convertedData, parseAssociation) {
        this.callParent([data, id, raw, convertedData]);
        if (parseAssociation) {
            this.proxy.reader.readAssociated(this, data);
        }
    }
});


// var data = {
//     "id"      : 1,
//     "userid"  : 2,
//     "ownerid" : 1,
//     "User"    : {
//         "id"        : 2,
//         "firstName" : "Person",
//         "lastName"  : "A",
//         "email"     : "personA@mitchellsimoens.com"
//     },
//     "Owner"   : {
//         "id"        : 1,
//         "firstName" : "Mitchell",
//         "lastName"  : "Simoens",
//         "email"     : "mitchellSimoens@mitchellsimoens.com"
//     }
// };

// var address_entry = Ext.create('App.model.Orders.mAddress', data, null, null, null, true),
//     user          = address_entry.getUser(),
//     owner         = address_entry.getOwner();
// console.log(address_entry);
// console.log(user);
// console.log(owner);

