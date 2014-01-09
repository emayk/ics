Ext.define('App.store.Departements',{
	extend: 'Ext.data.Store',
	model : 'App.model.Departement',
	idStore: 'deptStore',
	        // autoLoad: true,
    autoSync: true,
     
// 
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/dept',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
			},
		listeners: {
	               'exception': function(proxy, response, operation, eOpts){
	               	if (response.status !== 200) {
		               log(response.status + ' ' + response.statusText);
		           } else {
		               var responseText = Ext.decode(response.responseText);
		               log(responseText.error);
		           }
	               }
			}		
	}
     //
});