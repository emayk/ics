/**
*
* Controller
*
* Programmer By Emay Komarudin (2013)
*	ExtJs Controller
**/
Ext.define('App.controller.cImport', {
    extend: 'Ext.app.Controller',
    // models: [],
    // stores: [],
    views: [
    'App.view.import.vImport', /*Main Page Import*/
    'App.view.import.departement',
    ],
    refs: [
        {ref: 'card', selector: 'appviewimportvimport'},
        { ref : 'pageDept', selector : 'appviewimportvimport #departement'},
        { ref : 'formDept', selector : 'appviewimportvimport #departement form'},
        { ref : 'gridDept', selector : 'appviewimportvimport #departement grid#griddept'},
        // { ref : 'formDeptDlBtn', selector : 'cardimport #dept form #download'},
        // { ref : 'formDeptUlBtn', selector : 'cardimport #dept form #upload'},
    ],
    init: function(application) {
    	var me = this;
        me.control({
        	'appviewimportvimport #departement form button#upload' : { click : me.onUpload_import_Departement },
        	'appviewimportvimport #departement form button#download' : { click : me.onDownload_import_Departement },
//        	'appviewimportvimport #departement grid button#savetoserver' : { click : me.onsavetoserver_grid_Click },
        	'appviewimportvimport toolbar menu#typeImport menuitem' : {
        		click : me.onChangeTypeImport
        	}
        });

    },

    onChangeTypeImport: function(item, e, opt){
    	var me = this;
    	var p = item.up('appviewimportvimport').getLayout();
	    log(p);
	    log(item);
    	p.setActiveItem(item.itemId);
    },

    onDownload_import_Departement: function(btn){
    	/*Saat Download File Excel*/
    	var title = 'Confirm',
    	content = 'Setelah Anda Buka File ini dengan Excel <br/> '+
    	'Harap lakukan Save As dari Microsoft Excel <br/>'+
    	'Jika tidak, maka data akan hilang secara automatis <br/>'+
    	'Click Yes untuk meneruskan.';

	    Ext.MessageBox.confirm(title, content, function(btn,text) {
	    if (btn == 'yes'){
	    	window.open(base_url() + 'export/departement');

	    }
	    });
    },

    onUpload_import_Departement: function(btn){
    	var me = this;
    	/*Saat Upload File Excel*/
    	var f = btn.up('form').getForm(), val = f.getValues();
    	if (!f.isValid()) return msgError('Please chose file');

    	f.submit({
    		url : base_url() + 'import/departement',
    		success: function(r,o){
    			var res = o.result;
    			var success_insert = res.meta.success_insert;
    			var fail_insert = res.meta.fail_insert;
    			me.getGridDept().setTitle('Status : '+ res.count + ' data / ' +
    			                          success_insert +' Success / ' +
    			                          fail_insert + ' Fail'
    			                          );
    			me.getGridDept().getStore().loadData(res.data);
    			var store = me.getGridDept().getStore();
    		},
    		failure: function(r,o){
    			var res = o.result;
    			Ext.Msg.alert('Fail', res.results);
    		}
    	});
    }
});