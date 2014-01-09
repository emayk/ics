/**
*
* Store NoticeService
*
* Programmer By Emay Komarudin.
* 2013
*
* Description Store NoticeService
*
*
**/

Ext.define('App.store.NoticeService.sNoticeService',{
	extend : 'Ext.data.Store',
	model : 'App.model.NoticeService.mNoticeService',

/*	proxy: {
		type: 'rest',
		url: api_url +'/NoticeService',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		},
	},*/

})
