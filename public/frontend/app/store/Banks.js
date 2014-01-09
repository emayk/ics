Ext.define('App.store.Banks',{
	extend: 'Ext.data.Store',
	model: 'App.model.Bank',
	// autoLoad: true,
	pageSize: 25,
	autoLoad: {start: 0, limit: 15},

    // autoSync: true,
	// proxy: {
	// 	type: 'rest',
	// 	url: '/api/bank',
	// 	reader: {
	// 		type: 'json',
	// 		root: 'results',
	// 		totalProperty: 'total'
	// 	},
	// 	 // writer: {
 //   //          type: 'json',
 //   //          writeAllFields: true,
 //   //          encode: true,
 //   //          root: 'results'
 //   //      }
	// 	// extraParams :
	// 	// {
	// 	// 	_token: App.config.APP_TOKEN
	// 	// }
	// }
});