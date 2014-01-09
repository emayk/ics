Ext.define('App.controller.master.Cities',{
	extend: 'Ext.app.Controller',
	views:['master.location.ListCities'],
	models:['City'],
	stores:['Cities','Provinces'],
	refs: [
	{
		ref: 'grid',
		selector : 'listcitiesGP'
	}
	],

	init: function(){
		 log('Cities Controller Init');

		 this.control({
		 	'listcitiesGP' : {
		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.save();
		 			this.doRefresh();
		 		},
		 		selectionchange: function(current,selections){
		 			log('selection change');
		 			var grid = Ext.getCmp('listcitiesGPId');
		 			grid.down('button[action=remove]').setDisabled(selections.length == 0);
		 		},
		 		canceledit: this.onCancelEditing
		 	},
		 	'listcitiesGP > toolbar > button[action=add]' : {
		 		click: function(button){
		 			log('Add');
		 			var grid = Ext.getCmp('listcitiesGPId');
		 			this.getCitiesStore().insert(0, this.getCityModel().create());
		 			var rowEditing = grid.getPlugin('cellEditorCities');
		 			rowEditing.startEdit(0, 0);
		 		}
		 	},
		 	'listcitiesGP > toolbar > button[action=remove]' : {
		 		click: function(button){
		 			log('Remove');
		 			var grid = Ext.getCmp('listcitiesGPId');
		 			var selection = grid.getSelectionModel(), me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				me.getCitiesStore().remove(dept);
		 			});
		 			me.getCitiesStore().sync();
		 			this.doRefresh();
		 		}
		 	}
		 });

		 // this.getCitiesStore().load();
		 // this.getProvincesStore().load();
	},
	doRefresh : function(){
		Ext.getCmp('pagingCities').doRefresh();
	},
	onCancelEditing: function(editor, e, eOpts)
    {
        this.getCitiesStore().each(function(record)
        {
            if (record.phantom) 
            {
                this.getCitiesStore().remove(record);
                return false;
            }
        }, this);

    },

});
