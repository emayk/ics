Ext.define('App.controller.master.Headoffice',{
	name: 'App.controller.master.Headoffice',
	extend: 'Ext.app.Controller',
	views:[ 
	'master.office.ListHead',
	'master.office.form.Add',
	'App.form.combobox.cbCountries',
	'App.form.combobox.cbProvinces',
	'App.form.combobox.cbCities'
	],
	models:['Headoffice'],
	stores:['Headoffices',
	'cbProvinces',
	'Cbcountries',
	'ProvinceByCid',
	'CitiesByPid'

	],

	 refs: [
	{ ref: 'grid', selector : 'listheadGP' },
	 {
                    ref: 'cbCountriesBox', 
                    selector: 'cbCountries'
                    },
                    {
                    ref: 'cbProvincesBox', 
                    selector: 'cbProvinces'
                    },
                    {
                    ref: 'cbCitiesBox', 
                    selector: 'cbCities'
                    }
            ],  

	init: function(){
		log('Controller Headoffice Loaded');
		this.control({
			'viewport' : { render: this.onRender },
			'listheadGP' :{
				itemdblclick:  this.formHead		
						
			},
			'listheadGP > toolbar > button[action=add]' : {
				// click : function(){console.log('Add Action Perform'); },
				click :  this.formAdd
			},
			/*==========  Event Form Edit  ==========*/
			'formHeadOffice button[action=save]' : { click : this.processSave },

			'formHeadOffice button[action=cancel]' : {
				click : function(button){
					var win 		= button.up('window');
					win.close();
				}
			},

			 /*==========  Form Combo Country  ==========*/
			'cbProvinces' : {select : this.onProvinceSelect },
			/*==========  Form Combo Province  ==========*/
			'cbCountries' : { select : this.onCountriesSelect },
			'cbCities' : { select:  this.onCitiesSelect }

		});

        
        
		
		
	},
	formAdd : function(grid,record){
		Ext.getStore('Cbcountries').load();
		Ext.widget('formHeadOffice').show();
	},
	formHead : function(grid, record) {
        var view = Ext.widget('formHeadOffice');
        Ext.getStore('Cbcountries').load();
        this.getCbProvincesBox().getStore().load({params: {'parent_id': record.get('negara_id') } });
        this.getCbCitiesBox().getStore().load({ params: {'parent_id': record.get('provinsi_id') } });
 		view.down('form').loadRecord(record);
    },

	onRender: function(){
		log(this.name + 'Loaded');
	},

	onCountriesSelect : function(obj){
        console.log('Countries is selected');
        this.getCbProvincesBox().getStore().load({params: {'parent_id': obj.getValue()} });
 		this.clearValueCombo(this.getCbProvincesBox());
        this.clearDisable(this.getCbCitiesBox());
	},
	onProvinceSelect: function(obj){
		log('cbProvinces Selected Trigger');
        this.getCbCitiesBox().getStore().load({params: {'parent_id': obj.getValue()} });
 		this.clearEnable(this.getCbCitiesBox());

	},
	onCitiesSelect : function(obj){
		log('onCitiesSelect Selected Trigger');
		log( this.getCbProvincesBox().getValue() );
 	},
	clearValueCombo: function(combo){
		combo.enable();
        combo.clearValue();
        combo.clearInvalid();		
	},
	clearDisable : function(combo){
        combo.clearValue();
        combo.clearInvalid();
        combo.disable();
	},
	clearEnable : function(combo){
        combo.enable();
        combo.clearValue();
        combo.clearInvalid();
	},
	processSave : function(button){
	/*==========  Buat Form Untuk Form Edit  ==========*/
		var win 		= button.up('window'),
			form 		= win.down('form'),
			record 		= form.getRecord(),
			values		= form.getValues();
	    /*==========  update record  ==========*/

	    var refresh = false;
		if (!record)
		{
			record = Ext.create('App.model.Headoffice');
			record.set(values);
			this.getHeadofficesStore().add(record);

			refresh = true;
		}else{
			record.set(values);
		}
		/*==========  synchronize the store after editing the record  ==========*/
		win.close();
		this.getHeadofficesStore().sync();
		if (refresh){
			this.getHeadofficesStore().load();
		}
		Ext.getCmp('pagingHeadoffice').doRefresh();
	}
});