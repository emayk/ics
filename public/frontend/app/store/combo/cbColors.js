/**
*
* Store Combox Box Color
*
**/

Ext.define('App.store.combo.cbColors',{
	extend: 'Ext.data.Store', fields: [ 'id','name', 'info' ],
    proxy: { type: 'rest',  
    		url: getApiUrl() +'/colors',
    		reader: { type: 'json',  root: 'results',  totalProperty: 'total' },
			extraParams: { 'cb' : true }
		}
});
