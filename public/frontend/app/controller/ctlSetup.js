/**
*
* Controller Setup
*
**/

/**
*
* Flow Todo :
* create file .js
*
*
**/
function setup_next_page(obj,page){
	var page = page || 'page-welcome', wizard = obj.up('#wizardsetup');
	wizard.getLayout().setActiveItem(page);
}
function setup_prev_page(obj,page){return next_page(obj,page); }

var page_setup_cnt = 0;
Ext.define('App.controller.ctlSetup',{
	extend: 'Ext.app.Controller',
	views:[
		'App.view.layout.crossfadecard',
		'App.view.setup.wizard',
		'App.view.setup.welcome',
		'App.view.setup.program',
		'App.view.setup.unit',
		'App.view.setup.gradekain',
		'App.view.setup.legalitas',
		'App.view.setup.departement',
		'App.view.setup.finish',
		'App.view.setup.jabatan',
		'App.view.setup.location',
		'App.view.setup.bank',
		'App.view.setup.jeniskain',
		'App.view.setup.catWarehouse',
		'App.view.setup.catProduct',
		'App.view.setup.currency',
	],
	stores:[],

	init: function(){
		 log('ctlSetup Init ....');
		 // this.control({
		 // 	'treefilepanel' : {
			// 	itemclick : function(treepanel,record,item,index,e,eOpts){}
		 // 	}
		 // });
	}
});

