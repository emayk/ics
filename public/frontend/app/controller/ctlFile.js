/**
*
* Controller Menu
*
**/

Ext.define('App.controller.ctlFile',{
	extend: 'Ext.app.Controller',
	views:[
			// 'App.view.file.TreeFile',
			'App.view.file.TreeFilePanel',
	],
	stores:[
		// 'menu.Masters',
		// 'menu.Transactions',
		// 'menu.Profiles',
	],

	// itemclick( this, record, item, index, e, eOpts )
	init: function(){
		 log('File Init');

		 this.control({
		 	'treefilepanel' : {
				itemclick : function(treepanel,record,item,index,e,eOpts){
					cDir(record);
					log(record.get('id'));
		 			// alert('dsadsa' );
		 		}
		 	}
		 });
	}
});

