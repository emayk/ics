/**
*
* Controller
*
**/

Ext.define('App.controller.ctlTest',{
	extend: 'Ext.app.Controller',
	views:[],
	models:[
			// 'App.model.test.Author',
			// 'App.model.test.Comment',
			// 'App.model.test.BlogPost',
			'App.model.test.mAbstract',
			'App.model.test.Supplier',
			'App.model.test.Legalitas',
			'App.model.test.Country',
			'App.model.test.Province',
			'App.model.test.Status',
			'App.model.test.typeSupplyProduct',
			'App.model.test.TypeSupplier',

			'App.model.supplier.wizard.Supplier',
			'App.model.supplier.wizard.AccountBank',

	],
	stores:[],
	init: function(){
		 log('Init Test Controller');
		 var me = this;
		 //
		 me.testSupplier();
		 //
	},
	testSupplier : function(){
		log('Im Testing Now');
		var c = new App.model.supplier.wizard.Supplier({id:1});
		c.bankAccounts().load();
		cDir(c.bankAccounts());
	},
	testS : function(){
App.model.test.Supplier.load(1, {
	    success:function(record, operation){
					cDir(record);
	        log(record.get('name'));
	        log(record.get('email'));

	        log(record.getLegalitas().get('name'));

	        log(record.getCountry().get('name'));
	        log(record.getProvince().get('name'));
	        log(record.getCity().get('name'));

	        log(record.getStatus().get('name'));
	        // log(record.getStatus().get('id'));
	        // log(record.getStatus().get('uuid'));
	        log(record.getStatus().get('created_at'));

	        log(record.getTypeProduct().get('name'));
	        log(record.getTypeProduct().get('created_at'));
	        log(record.getTypeProduct().get('uuid'));

	        log(record.getTypeSupplier().get('name'));
	        log(record.getCountry());

	    }
		});
	},
});
