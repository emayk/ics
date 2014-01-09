/**
*
* Store changelog
*
* Programmer By Emay Komarudin.
* 2013
*
* Description Store changelog
*
*
**/

Ext.define('App.store.changelog.schangelog',{
	extend : 'Ext.data.Store',
	model : 'App.model.changelog.mchangelog',

/*	proxy: {
		type: 'rest',
		url: api_url +'/changelog',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},*/

})
