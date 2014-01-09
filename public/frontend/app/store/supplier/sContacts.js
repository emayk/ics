/**
*
* Store Master Supplier
*
**/

Ext.define('App.store.supplier.sContacts',{
    extend : 'Ext.data.Store',

    model : 'App.model.supplier.mContact',
    pageSize: 30,
     proxy: {
        type: 'rest',
        url: api_url +'/supplier_contact_person',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },

    },

})