Ext.define('App.controller.master.Banks',{
	name: 'App.controller.master.Banks',
	extend: 'Ext.app.Controller',
	views:[
		'master.bank.List', //bankListGrid
		'master.bank.AddForm', //bankEdit
		'master.bank.addWindow', //bankAddWindow
	],
	models:['Bank'],
	stores:['Banks'],
	refs: [
		{ ref: 'bankGrid', selector: 'bankListGrid'},
		{ ref: 'bankForm', selector: 'bankEdit'},
		{ ref: 'addWindow', selector: 'bankAddWindow'}
	],
	init: function(){
		log('Controller Banks Loaded');
		this.control({
			'bankListGrid': { itemdblclick: this.EditBank },
			'bankEdit button[action=save]': { click: this.saveBank },
			'bankListGrid button[action=add]': { click: this.AddBank }
		});
	},
	onRender: function(){
		log(this.name + 'Loaded');
	},
    AddBank: function(grid, record) {
        var edit = Ext.create('App.view.master.bank.AddForm').show();
        	this.application.currentRecord = 0;
    },
    /*==========  Saat Di Double Klik Pada Grid  ==========*/
	EditBank: function(grid,record){
		log('Windows Loaded to Edit Bank');
			view = Ext.widget('bankEdit');
			view.down('form').loadRecord(record);
	},
	
	
	updateBank : function(record){
		console.log(record.get('id'));
		var id = record.get('id'),
			name = record.get('name'),
			view = Ext.widget('bankEdit',{
			title: 'Bank Information ' + id
		});
			view.down('form').loadRecord(record);
	},
	/*==========  Saat Pada Tombol Save Pada Form Add/Edit Di Klik  ==========*/
	saveBank: function(button){
		log('Proses Save Bank');
		console.log(button);
        /*==========  Buat Form Untuk Form Edit  ==========*/
    	var win 		= button.up('window'),
    		form 		= win.down('form'),
    		record 		= form.getRecord(),
    		values		= form.getValues();
        /*==========  update record  ==========*/
        var refresh = false;
		if (!record)
		{
			record = Ext.create('App.model.Bank');
			record.set(values);
			this.getBanksStore().add(record);
			refresh = true;
		}else{
    		record.set(values);
		}
    	/*==========  window di tutup  ==========*/
    	win.close();
    	/*==========  synchronize the store after editing the record  ==========*/
    	this.getBanksStore().sync();

    	if (refresh){
    		this.getBanksStore().load();
    	}
    	Ext.getCmp('pagingBank').doRefresh();
	},

	 
    
});