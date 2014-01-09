/**
*
* Store Combox Grade Kain
*
**/

Ext.define('App.store.combo.cbGradeKain',{
	extend: 'Ext.data.Store', fields: [ 'id','name', 'info' ],
    proxy: { type: 'rest',  
    		url: api_url +'/fabricgrade',
    		reader: { type: 'json',  root: 'results',  totalProperty: 'total' },
			extraParams: { 'cb' : true }
		}
});
