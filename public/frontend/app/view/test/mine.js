Ext.define('App.view.test.mine',{
    extend : 'Ext.panel.Panel',
    alias : 'widget.testmine',
    constructor: function(config) {
    // initComponent: function(config) {

    var me = this;
    Ext.Ajax.request({
        url      : '/api/gen-invoice-grid.php',
        async    : false,
        callback : function(opts, success, response) {
            var json = Ext.decode(response.responseText, true);
            Ext.applyIf(config, json); //or Ext.apply(config, json);
        }
    });
    var json =    Ext.Ajax.request({
        url      : '/api/gen-invoice-grid.php',
        async    : false,
        callback : function(opts, success, response) {
            var json = Ext.decode(response.responseText, true);
            // log('JSON ',json);
            // log('success',success); log('Response:',response);
            // or var json = Ext.decode(response.responseText, true);

            // Ext.applyIf(config, json); //or Ext.apply(config, json);
            return json;
        }
    });

    log('JSON Value is : ',json);
    // Ext.Ajax.request({
    //     url      : '/api/gen-invoice-grid.php',
    //     async    : false,
    //     // params   : {
    //     //     componentId : 'something'
    //     // },
    //     callback : function(opts, success, response) {
    //         var json = response.responseJSON;
    //         log(json);
    //         // or var json = Ext.decode(response.responseText, true);

    //         Ext.applyIf(config, json); //or Ext.apply(config, json);
    //     }
    // });

    me.callParent(arguments);
},
});