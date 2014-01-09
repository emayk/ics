/**
 *
 * Controller Color
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 **/

Ext.define('App.controller.master.Currency',{
	extend: 'Ext.app.Controller',
	views:[
	'App.view.master.currency.List'
	],
	models:[
        'App.model.Currency',
        'App.model.Country'
    ],
	stores:[
        'App.store.Currencies',
        'App.store.curCountries',
        'App.store.Countries',
        'App.store.Cbcountries'
    ],
/*==========  Referensi  ==========*/
		
	refs: [
	{
		ref: 'grid',
		selector : 'currencyGridList'
	}
	],
/*==========  Inisialisasi  ==========*/
				
	init: function(){
        var me = this;

		 me.control({

		 	'currencyGridList' :{
		 		edit: me.processEdit,
		 		selectionchange: me.processSelectionChange,
                render: function(){
                    me.getGrid().getStore().load();
                }
		 	},

		 	'currencyGridList > toolbar > button[action=add]' : {
		 		click: me.Addrow
		 	},
		 	
		 	'currencyGridList > toolbar > button[action=remove]' : {
		 		click: me.Removerow
		 	}

		 });
	},

	processEdit : function(editor,object){
		log('Save Process');
		object.store.sync();
		this.RefreshRow();
	},

	processSelectionChange : function(current,selections){
		this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
	},

	Addrow : function(button){
		log('Add');
        var me = this, grid = me.getGrid();
        var rowEditing = grid.getPlugin('cellEditorCurrency');

		grid.getStore().insert(0,  me.getAppModelCurrencyModel().create() );
		rowEditing.startEdit(0, 0);
	},

	Removerow: function(button){
		 			log('Remove'+ button.text);

		 			var me =  this,
                        selection = me.getGrid().getSelectionModel(),
                        store = me.getGrid().getStore();

		 			Ext.each(selection.selected.items,function(dept){
                        me.getGrid().getStore().remove(dept);
		 			});
		 			store.sync();
                    this.RefreshRow;
	},
	RefreshRow : function(){
        this.getGrid().getStore().reload();
        this.getGrid().getView().refresh();
	}

});
