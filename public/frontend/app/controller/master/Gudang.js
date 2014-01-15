Ext.define('App.controller.master.Gudang',{
	extend: 'Ext.app.Controller',
	views:[
        'App.view.master.gudang.List',
        'App.form.combobox.cbWarehouseCat',
        'App.form.combobox.cbCities'
    ],
	models:[
        'App.model.Gudang'
    ],
	stores:[
        'App.store.Gudangs',
        'App.store.warehouse.cbcategory',
        'App.store.combo.cbCities'
    ],
	refs: [
	{
		ref: 'grid',
		selector : 'gudangGridList'
	}
	],

	init: function(){
		 log(' Gudang Controller Init');

		 this.control({
             /**
              * Daftar Gudang
              */
		 	'gudangGridList' : {

		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.sync();
		 			this.getGrid().getStore().load();
		 		},

		 		selectionchange: function(current,selections){
		 			var grid = this.getGrid();
		 			grid.down('button[action=remove]').setDisabled(selections.length == 0);
		 		},
                render: function(){
                    this.getGrid().getStore().load();
                    this.getAppStoreWarehouseCbcategoryStore().load();
                }
		 	},
             /**
              * Tambah Gudang
              */
		 	'gudangGridList > toolbar > button[action=add]' : {
		 		click: function(button){
		 			log('Add Warehouse');
		 			this.getGrid().getStore().insert(0, Ext.create('App.model.Gudang'));
		 			var rowEditing = this.getGrid().getPlugin('cellEditorGudang');
		 			rowEditing.startEdit(0, 0);
		 		}
		 	},
             /**
              * Remove Gudang
              */
		 	'gudangGridList > toolbar > button[action=remove]' : {
		 		click: function(button){
		 			log('Remove Gudang');
		 			var grid = this.getGrid();
		 			var selection = grid.getSelectionModel(), me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				me.getGrid().getStore().remove(dept);
		 			});
                    me.getGrid().getStore().sync();
		 			this.doRefresh();
		 		}
		 	}
		 });

	},
	doRefresh : function(){
        this.getGrid().getStore().load();
	}

});
