Ext.define('App.controller.master.Legalitas',{
	extend: 'Ext.app.Controller',
	views:[
	'master.legalitas.List'
	],
	models:['Legality'],
	stores:['Legalitas'],
/*==========  Referensi  ==========*/
		
	refs: [
	{
		ref: 'grid',
		selector : 'legalitasGridList'
	}
	],
/*==========  Inisialisasi  ==========*/
				
	init: function(){
		 log('Legalitas Controller Init');
		 this.control({
		 	'legalitasGridList' :{
		 		edit: this.processEdit,
		 		selectionchange: this.processSelectionChange,
		 		canceledit: function(){ var store = this.getLegalitasStore(); cancelEdit(store,this);},
		 	},
		 	'legalitasGridList > toolbar > button[action=add]' : {
		 		click: this.Addrow
		 	},
		 	
		 	'legalitasGridList > toolbar > button[action=remove]' : {
		 		click: this.Removerow
		 	},

		 });
 
	},
	processEdit : function(editor,object){
		log('Save Process');
		object.store.save();
		this.RefreshRow();
	},
	processSelectionChange : function(current,selections){
		log('selection change');
		var grid = Ext.getCmp('legalitasGridListId');
		grid.down('button[action=remove]').setDisabled(selections.length == 0);
	},
	Addrow : function(button){
		log('Add');
		var grid = Ext.getCmp('legalitasGridListId');
		this.getLegalitasStore().insert(0, this.getLegalityModel().create());
		var rowEditing = grid.getPlugin('cellEditorLegalitas');
		rowEditing.startEdit(0, 0);
	},
	Removerow: function(button){
		 			log('Remove');
		 			var grid = Ext.getCmp('legalitasGridListId'),
		 			selection = grid.getSelectionModel(), 
		 			me = this;
		 			Ext.each(selection.selected.items,function(dept){
		 				me.getLegalitasStore().remove(dept);
		 			});
		 			this.RefreshRow();
		 			me.getLegalitasStore().sync();
	},
	RefreshRow : function(){
		Ext.getCmp('pagingLegalitas').doRefresh();
	},
 

});







// // Controller Master Legalitas
// Ext.define('App.controller.master.Legalitas',{
// 	extend: 'Ext.app.Controller',
// 	views:[
// 		'master.legalitas.List',
// 		'master.legalitas.Edit',
// 		'master.legalitas.AddMenu',
// 		'master.legalitas.EditMenu',
// 		// 'form.comboUsers'
// 		// 'App.view.master.legalitas.AddButton'
// 	],
// 	stores:[
// 		'Legalitas',
// 		'Users'
// 	],
// 	models: [
// 		'Legality',
// 	],
// 	/*==========  Referensikan   ==========*/
//     refs: [{
//             ref: 'legalitasPanel',
//             selector: 'panel'
//         },
//         {
//             ref: 'legalitasGrid',
//             selector: 'legalitasList'
//         },
//         // {
//         //                 //reference to the country window
//         //                 ref : 'myCountryWindow',
//         //                 selector : 'legalitasEdit'
//         // }
//     ],
//     template : function(){
//     	return 
//     },
//     /*==========  Update Template  ==========*/
//     updateTemplate: function(sm, selectedRecord){
//     	if (selectedRecord.length) {
//             var detailPanel = Ext.getCmp('infoPanel'),
//             	panelHidden = detailPanel.hidden;
//             var tmpl = [
//             '<table border=1>',
//             	'<tr><td>Name</td><td>Information</td></tr>',
//             	'<tr><td>{name}</td><td>{info}</td></tr>',
//             '</table>'
//             ];
//             // if (panelHidden) detailPanel.setVisible(true);
//             detailPanel.expand();
//             if (!panelHidden){
// 	            var template = Ext.create('Ext.Template', tmpl);
// 	            detailPanel.update(template.apply(selectedRecord[0].data));
// 	            // show window tampilkan template.
//             };

//         }
//     },
//     registerEvents : function(){
// 		 this.application.addEvents('legalitasLoaded');
//     },
//     handleRegister: function(){
//     	 this.application.on('legalitasLoaded', function (store) {
//             this.fnLog('app on legalitasLoaded');
//         });
//     },
//     fnLog: function(msg){
//         this.application.log(msg);
//     },
// 	init: function(){
// 		 log('Menu Legalitas');
// 		 this.registerEvents();
// 		 this.handleRegister();

// 		 this.template();
// 		 this.control({
// 			 	'legalitasList':{
// 			 		itemdblclick: this.onItemDoubleClick,
// 			 		itemcontextmenu : this.onRightClick,
// 			 		selectionchange: this.updateTemplate
// 			 	},
// 			 	'legalitasEdit button[action=save]': {
// 		 		/*==========  Form Edit   ==========*/
// 			 		click: this.updateLegalitas
// 			 	},
// 		        'editMenuLegalitas menuitem[text=Edit]' : {
// 		            click : this.editLegalitas
// 		        },
// 		        /*==========  delete a Legalitas  ==========*/
		        
// 		        'editMenuLegalitas menuitem[text=Delete]' : {
// 		            click : this.deleteLegalitas
// 		        },
// 		        /*==========  Add New Legalitas  ==========*/
		        
// 	            'legalitasList button[action=add]' : {
// 	                click : this.newLegalitas
// 	            },
// 	            'legalitasList button[action=delete]' : {
// 	                click : this.removeLegalitas
// 	            }

// 		 }); //end control
	
// 		this.getLegalitasStore().sync();
//         this.getLegalitasStore().load();
// 	},
// 	/*==========  Edit Legalitas  ==========*/
	
// 	editLegalitas:function(){
// 		log('Edit Legalitas');
// 		var record = this.application.currentRecord;
// 		this.formEdit(record);
// 		log(record.get('id') + 'Clicked');

    
// 	},
// 	/*==========  Delete Legalitas  ==========*/
	
// 	deleteLegalitas : function(){
// 		log('Delete Legalitas');
// 		var record = this.application.currentRecord,
//     	// record = grid.getSelectionModel().getSelection(), 
//         store = this.getLegalitasStore();
// 	    store.remove(record);
//         this.refreshListAndPage();
// 	},
// 	removeLegalitas: function(button){
 
        
// 	},
// 	/*==========  Tambah Legalitas  ==========*/
	
// 	// newLegalitas: function(button) {
// 	newLegalitas: function(grid, record) {
// 		// log('New Legalitas Belum di implementasikan');
//         var edit;

//         if (!edit){
//         	edit = Ext.create('App.view.master.legalitas.Edit',{title: 'New'}).show();
//         }



// 	},
// 	/*==========  Saat Klik Kanan  ==========*/
	
// 	onRightClick: function(view, record, item, index, e) {
//         //stop the default action
//         e.stopEvent();
//         // save the current selected record
//         this.application.currentRecord = record;
// 		var editMenu = Ext.widget('editMenuLegalitas');
//             editMenu.showAt(e.getXY());
//         return false;

// 	},
// 	/*==========  Saat Item List di Klik 2 Kali  ==========*/
// 	/*==========  Edit Legalitas  ==========*/
//     onItemDoubleClick: function(me,record,item){
//     	// Edit Record
// 		// log(record.get('id') + 'Clicked');
				
//     	this.formEdit(record);
//     	// this.updateLegalitas();
// 	},
// 	/*==========  Proses Update Legalitas  ==========*/
// 	formEdit: function(record){
// 			var id = record.get('id'),
// 			name = record.get('name'),
// 			view = Ext.widget('legalitasEdit',{
// 			title: 'Edit Legalitas ' + id + ' - ' +name
// 		});
// 		// log('formEdit');


// 		view.down('form').loadRecord(record);
// 	},
// 	updateLegalitas: function(button){
// 			log('want to updateLegalitas');

// 		    var win    = button.up('window'),
//             form   = win.down('form'),
//             record = form.getRecord(),
//             values = form.getValues();
        
//         var novo = false;


// 		if (values.id > 0){
// 			record.set(values);
// 		} else{
// 			record = Ext.create('App.model.Legality');
// 			record.set(values);
// 			this.getLegalitasStore().add(record);
//             novo = true;
// 		}
        
// 		win.close();
        
//         if (novo){ //faz reload para atualziar
//             // this.getLegalitasStore().load();
//             // this.getLegalitasStore().load();
//         }
// 		this.getLegalitasStore().sync();
// 		Ext.getCmp('pagingLegalitas').doRefresh();
// 	},
// 	refreshListAndPage: function(){
// 	    this.getLegalitasStore().sync();
//         this.getLegalitasStore().load();
// 	},

	
	  
 


// });
