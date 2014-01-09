Ext.define('App.controller.master.Countries',{
	extend: 'Ext.app.Controller',
	views:['master.location.ListCountries'],
	models:['Country'],
	stores:['Countries'],
	refs: [
	{
		ref: 'grid',
		selector : 'listcountriesGP'
	}
	],

	init: function(){
		 log('Countries Controller Init');

		 this.control({
		 	'listcountriesGP' : {
		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.save();
		 			this.doRefresh();
		 		},
		 		selectionchange: function(current,selections){
		 			log('selection change');
		 			var grid = Ext.getCmp('listcountriesGPId');
		 			grid.down('button[action=remove]').setDisabled(selections.length == 0);
		 		},
		 		canceledit: this.onCancelEditing
		 	},
		 	'listcountriesGP > toolbar > button[action=add]' : {
		 		click: function(button){
		 			log('Add');
		 			var grid = Ext.getCmp('listcountriesGPId');
		 			this.getCountriesStore().insert(0, this.getCountryModel().create());
		 			var rowEditing = grid.getPlugin('cellEditorCountries');
		 			rowEditing.startEdit(0, 0);
		 		}
		 	},
		 	'listcountriesGP > toolbar > button[action=remove]' : {
		 		click: function(button){
		 			log('Remove');
		 			var grid = Ext.getCmp('listcountriesGPId');
		 			var selection = grid.getSelectionModel(), me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				me.getCountriesStore().remove(dept);
		 			});
		 			me.getCountriesStore().sync();
		 			this.doRefresh();
		 		}
		 	}
		 });

		 // this.getCountriesStore().load();
	},
	doRefresh : function(){
		Ext.getCmp('pagingCountries').doRefresh();
	},
	onCancelEditing: function(editor, e, eOpts)
    {
        this.getCountriesStore().each(function(record)
        {
            if (record.phantom) 
            {
                this.getCountriesStore().remove(record);
                return false;
            }
        }, this);

    },

});
