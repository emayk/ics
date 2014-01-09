Ext.define('App.controller.master.Provinces',{
	extend: 'Ext.app.Controller',
	views:['master.location.ListProvinces'],
	models:['Province'],
	stores:['Provinces','Countries'],
	refs: [
	{
		ref: 'grid',
		selector : 'listprovincesGP'
	}
	],

	init: function(){
		 log('Cities Controller Init');

		 this.control({
		 	'listprovincesGP' : {
		 		edit : function(editor,object){
		 			log('Save Process');
		 			object.store.save();
		 			this.doRefresh();
		 		},
		 		selectionchange: function(current,selections){
		 			log('selection change');
		 			var grid = Ext.getCmp('listprovincesGPId');
		 			grid.down('button[action=remove]').setDisabled(selections.length == 0);
		 		},
		 		canceledit: this.onCancelEditing
		 	},
		 	'listprovincesGP > toolbar > button[action=add]' : {
		 		click: function(button){
		 			log('Add');
		 			var grid = Ext.getCmp('listprovincesGPId');
		 			this.getProvincesStore().insert(0, this.getProvinceModel().create());
		 			var rowEditing = grid.getPlugin('cellEditorProvinces');
		 			rowEditing.startEdit(0, 0);
		 		}
		 	},
		 	'listprovincesGP > toolbar > button[action=remove]' : {
		 		click: function(button){
		 			log('Remove');
		 			var grid = Ext.getCmp('listprovincesGPId');
		 			var selection = grid.getSelectionModel(), me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				me.getProvincesStore().remove(dept);
		 			});
		 			me.getProvincesStore().sync();
		 			this.doRefresh();
		 		}
		 	}
		 });

		 this.getProvincesStore().load();
		 this.getCountriesStore().load();
	},
	doRefresh : function(){
		Ext.getCmp('pagingProvinces').doRefresh();
	},
	onCancelEditing: function(editor, e, eOpts)
    {
        this.getProvincesStore().each(function(record)
        {
            if (record.phantom) 
            {
                this.getProvincesStore().remove(record);
                return false;
            }
        }, this);

    }

});
