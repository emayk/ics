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
        url: api_url +'/supplier_type',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'cbreq' : true
        },
    }
});

