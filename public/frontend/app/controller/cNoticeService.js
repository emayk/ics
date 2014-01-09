/**
*
* Controller NoticeService
*
* Programmer By Emay Komarudin.
* 2013
*
*
* Description Controller NoticeService
*
*
**/

Ext.define('App.controller.cNoticeService',{
	extend: 'Ext.app.Controller',
	views: ['App.view.NoticeService.vNoticeService'],
	models:['App.model.NoticeService.mNoticeService'],
	stores:['App.store.NoticeService.sNoticeService'],
	init: function(){
		log('Controller cNoticeService Loaded');
	}
});

