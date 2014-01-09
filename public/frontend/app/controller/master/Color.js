/**
 *
 * Controller Color
 *
 * Programmer By Emay Komarudin.
 * 2013
 *
 **/

Ext.define('App.controller.master.Color',{
	extend: 'Ext.app.Controller',
	views:['master.color.List'],
	models:['App.model.Color'],
	stores:['App.store.Colors'],
	refs: [
	{
		ref: 'grid',
		selector : 'colorGridList'
	}
	],

	init: function(){
		 log('Color Controller Init');

		 this.control({

		 	'colorGridList' : {
		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.sync();
		 			this.doRefresh();
		 		},

                render: function(){
                    this.getGrid().getStore().load();
                },

		 		selectionchange: function(current,selections){
		 			log('selection change');
                    this.getGrid().down('button[action=remove]').setDisabled(selections.length == 0);
		 		}
		 	},

		 	'colorGridList > toolbar > button[action=add]' : {
		 		click: function(button){
		 			log('Add Color');
                    var grid = this.getGrid();
                    var rowEditing = grid.getPlugin('cellEditorColor');

		 			grid.getStore().insert(0, this.getAppModelColorModel().create());
		 			rowEditing.startEdit(0, 0);
		 		}
		 	},

		 	'colorGridList > toolbar > button[action=remove]' : {
		 		click: function(button){
		 			log('Remove Color');

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
        this.getGrid().getView().refresh();
	}

});
