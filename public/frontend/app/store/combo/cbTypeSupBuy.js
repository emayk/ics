/**
*
* Type Supplier or Buyer
*
**/

Ext.define('App.store.combo.cbTypeSupBuy',{
	extend: 'Ext.data.Store',
	fields: [ 'id','name' ],
	  proxy: {
        type: 'ajax',
        url: getApiUrl() +'/typesuppliersbuyers',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'cbreq' : true
        }
    }
});

