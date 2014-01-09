

/**
*
* Store Orders
*
* Programmer By Emay Komarudin.
* 2013
*
*
**/

Ext.define('App.store.help.sHelp',{
	extend : 'Ext.data.Store',
	model : 'App.model.help.mHelp',
	id: 'shelp',
	proxy: {
		type: 'ajax',
		url : getBaseUrl() + 'help',
		reader: {
			type: 'json',
			root: 'results',
			successProperty: 'success',
			totalProperty: 'total'
		}
	},
});