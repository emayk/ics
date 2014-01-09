/**
*
* Store orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
* Description Store orderApproval
*
*
**/

Ext.define('App.store.orderApproval.sorderApproval',{
	extend : 'Ext.data.Store',
	model : 'App.model.orderApproval.morderApproval',

/*	proxy: {
		type: 'rest',
		url: api_url +'/orderApproval',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},*/

})
