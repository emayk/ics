Ext.define('App.controller.ctlSettingProgram',{
    extend: 'Ext.app.Controller',
    requires:[
        'App.util.Util'
    ],
    views: [
        'App.form.combobox.cbCities',
        'App.view.settings.settings',
        'App.view.settings.company.panel',
        'App.view.settings.program.panel',
        'App.view.settings.settings'
    ],
    stores: [
        'App.store.combo.cbCities'
    ],
    models:[
        'App.model.settings.company',
        'App.model.settings.program'
    ],

    refs: [
        { ref  : 'pageProgram', selector : 'settingstab > settingprogrampanel'},
        { ref  : 'formProgram', selector : 'settingstab > settingprogrampanel #formsetting'},
        { ref  : 'pageCompany', selector : 'settingstab > settingcompany'},
        { ref  : 'formCompany', selector : 'settingstab > settingcompany #formsetting'},
    ],
    init: function(){
        var me = this;
        me.control({
            'settingstab > settingcompany #formsetting' : {
                render : function(){
                    log('Form Company render');
                    me.loadRecordCompany();
                }
            },
            'settingstab > settingprogrampanel #formsetting' : {
                render : function(){
                    log('Form Program render');
                    me.getAppStoreComboCbCitiesStore().load();
                    me.loadRecordProgram();
                }
            },
            'settingstab > settingprogrampanel #formsetting #save' : {
                click : function(btn){
                    var form = btn.up('form'),
                        record = form.getRecord(),
                        value = form.getValues();
                    me.saveRecord(record,value,'Program Setting Saved');
                    var footer = Ext.ComponentQuery.query('appfooter #license')[0];
                    footer.setText('License To : '+record.get('name'));
                }
            },
            'settingstab > settingcompany #formsetting #save' : {
                click : function(btn){
                    var form = btn.up('form'),
                        record = form.getRecord(),
                        value = form.getValues();
                    me.saveRecord(record,value,'Company Setting Saved');
                }
            }
        });

    },
    saveRecord: function(record,value,msg){
        if (record){
            record.set(value);
            record.save();
            Ext.Msg.show({
                title:'Updated',
                msg: msg,
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.OK
            });
        }
    },
    loadRecordCompany: function(){
        var m = Ext.ModelManager.getModel('App.model.settings.company');
        var me = this;
        m.load(1,{
            success: function(record){
                me.getFormCompany().getForm().loadRecord(record);
            },
            failure: function(){
                App.util.Util.showErrorMsg('Cannot Load');
            }
        })

    },
    loadRecordProgram: function(){
        var me = this;
        var m = Ext.ModelManager.getModel('App.model.settings.program');
        m.load(1,{
            success: function(record){
                log(record);
                me.getFormProgram().getForm().loadRecord(record);
            }
        })
    }
});
