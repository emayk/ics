// // Controller Menu
// Ext.define('App.controller.master.Departement',{
// 	extend: 'Ext.app.Controller',
// 	views:['master.departement.List'],
// 	models:['Departement'],
// 	stores:['Departements'],
// 	refs: [
// 	{
// 		ref: 'grid',
// 		selector : 'departementGridList'
// 	}
// 	],

// 	init: function(){
// 		 log(' Departement Controller Init');

// 		 this.control({
// 		 	// controll
// 		 	'departementGridList' : {
// 		 		edit : function(editor,object){
// 		 			log('Save Process');
// 		 			// object.store.save();
// 		 			// Ext.getCmp('pagingDept').doRefresh();
// 		 		},
// 		 		selectionchange: function(current,selections){
// 		 			log('selection change');
// 		 			// // grid = Ext.widget('departementGridList');
// 		 			// // var sel = (selections.length == 0);
// 		 			// // log(sel);
// 		 			// var grid = Ext.getCmp('deptGridList');
// 		 			// // cDir(grid);
// 		 			// grid.down('button[action=remove]').setDisabled(selections.length == 0);
// 		 		}
// 		 	},
// 		 	'departementGridList > toolbar > button[action=add]' : {
// 		 		click: function(button){
// 		 			log('Add Departement');
// 		 			// var grid = Ext.getCmp('deptGridList');
// 		 			// // this.getDepartementsStore().add(Ext.create('App.model.Departement') );
// 		 			// // this.getDepartementsStore().add(this.getDepartementModel().create()) ;
// 		 			// // 
// 		 			// this.getDepartementsStore().insert(0, this.getDepartementModel().create());
// 		 			// var rowEditing = grid.getPlugin('cellEditorDept');
// 		 			// rowEditing.startEdit(0, 0);
// 		 		}
// 		 	},
// 		 	'departementGridList > toolbar > button[action=remove]' : {
// 		 		click: function(button){
// 		 			log('Remove Departement');
// 		 			// var comp = Ext.getCmp('deptGridList');
// 		 			// var selection = comp.getSelectionModel(), me = this;
// 		 			// Ext.each(selection.selected.items,function(dept){
// 		 			// 	me.getDepartementsStore().remove(dept);
// 		 			// });
// 		 			// me.getDepartementsStore().sync();
// 		 			// this.doRefresh();
// 		 		}
// 		 	}
// 		 });

// 	},
// 	doRefresh : function(){
// 		// Ext.getCmp('pagingDept').doRefresh();
// 	}

// });
