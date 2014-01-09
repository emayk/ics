// Controller Menu
Ext.define('App.controller.master.Gradekain',{
	extend: 'Ext.app.Controller',
	views:['App.view.master.gradekain.List'],
	models:['App.model.Gradekain'],
	stores:['App.store.Gradekains'],
	refs: [
	{
		ref: 'grid',
		selector : 'gradekainGridList'
	}
	],

	init: function(){
         var me = this;
		 me.control({
		 	'gradekainGridList' : {
		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.sync();
		 			this.getGrid().getStore().load();
		 		},
                render: function(){
                  this.getGrid().getStore().load();
                },
		 		selectionchange: function(current,selections){
		 			this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
		 		}
		 	},

		 	'gradekainGridList > toolbar > button[action=add]' : {
		 		click: function(button){
		 			log('Add Gradekain');
                    var me = this,
                    model = Ext.create('App.model.Gradekain'),
                    grid = me.getGrid(),
		 			rowEditing = grid.getPlugin('cellEditorGradeKain');

                    me.getGrid().getStore().insert(0, model );
		 			rowEditing.startEdit(0, 0);
		 		}
		 	},
		 	'gradekainGridList > toolbar > button[action=remove]' : {
		 		click: function(button){
		 			log('Remove Gradekain');
		 			var grid = this.getGrid();
		 			var selection = grid.getSelectionModel(), me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				grid.getStore().remove(dept);
		 			});

		 			grid.getStore().sync();
		 			this.doRefresh();
		 		}
		 	}
		 });
	},
	doRefresh : function(){
		this.getGrid().getStore().load();
	}

});
