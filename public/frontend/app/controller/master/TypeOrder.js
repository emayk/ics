Ext.define('App.controller.master.TypeOrder',{
	extend: 'Ext.app.Controller',
	views:[
	'master.typeorder.List'
	],
	models:['TypeOrder'],
	stores:['TypeOrders'],
/*==========  Referensi  ==========*/
		
	refs: [
	{
		ref: 'grid',
		selector : 'typeorderGridList'
	}
	],
/*==========  Inisialisasi  ==========*/
				
	init: function(){
		 log('Type Order Controller Init');
		 this.control({
		 	'typeorderGridList' :{
		 		edit: this.processEdit,
		 		selectionchange: this.processSelectionChange
		 	},
		 	'typeorderGridList > toolbar > button[action=add]' : {
		 		click: this.Addrow
		 	},
		 	
		 	'typeorderGridList > toolbar > button[action=remove]' : {
		 		click: this.Removerow
		 	},

		 });
		 this.getTypeOrdersStore().load();
	},
	processEdit : function(editor,object){
		log('Save Process');
		object.store.save();
		this.RefreshRow();
	},
	processSelectionChange : function(current,selections){
		log('selection change');
		var grid = Ext.getCmp('typeorderGridListId');
		grid.down('button[action=remove]').setDisabled(selections.length == 0);
	},
	Addrow : function(button){
		log('Add');
		var grid = Ext.getCmp('typeorderGridListId');
		this.getTypeOrdersStore().insert(0, this.getTypeOrderModel().create());
		var rowEditing = grid.getPlugin('cellEditorOrderType');
		rowEditing.startEdit(0, 0);
	},
	Removerow: function(button){
		 			log('Remove');
		 			var grid = Ext.getCmp('typeorderGridListId'),
		 			selection = grid.getSelectionModel(), 
		 			me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				me.getTypeOrdersStore().remove(dept);
		 			});
		 			this.RefreshRow();
		 			me.getTypeOrdersStore().sync();
	},
	RefreshRow : function(){
		Ext.getCmp('pagingTypeOrder').doRefresh();
	}

});