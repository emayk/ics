Ext.define('App.controller.cTrace',{
    extend: 'Ext.app.Controller',
    views :[
    'App.view.test.mine',
    'App.view.test.create',
    // 'App.view.test.create2',

    ],
    models:[],
    store:[],
    init: function(){
        log('Trace Test Init');
        this.control({

        });
    }
});