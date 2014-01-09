// Untuk Baca dan Tulis State Component
// Ext.state.Manager.setProvider(
//    Ext.create('MyApp.util.JsonPStorageProvider', {
//      userId: [a user's login id],
//      url: [url to web service where state information will be stored/retrieved]
//    })
// );


Ext.define('App.util.JsonPStorageProvider', {
    /* Begin Definitions */
 
    extend : 'Ext.state.Provider',
    alias : 'state.jsonpstorage',
 
    config: {
       userId : null,
       url: "http://www.senchatraining.com/ftextjs4/webservices/stateprovider.cfc ",
       timeout: 30000
    },
 
    constructor : function(config) {
        this.initConfig(config);
        var me = this;
 
        me.restoreState();
        me.callParent(arguments);
    },
    set : function(name, value) {
        var me = this;
 
        if( typeof value == "undefined" || value === null) {
            me.clear(name);
            return;
        }
        me.persist(name, value);
        me.callParent(arguments);
    },
    // private
    restoreState : function() {
        var me = this;
        Ext.data.JsonP.request({
            url : this.getUrl(),
            params : {
                userId : this.getUserId(),
                method : 'get'
            },
            disableCaching : true,
            success : function(results) {
                for(var i in results) {
                    this.state[i] = this.decodeValue(results[i]);
                }
            },
            failure : function() {
                console.log('failed', arguments);
            },
            scope : this
        });
    },
    // private
    clear : function(name) {
        this.clearKey(name);
        this.callParent(arguments);
    },
    // private
    persist : function(name, value) {
        var me = this;
        Ext.data.JsonP.request({
            url : this.getUrl(),
            params : {
                userId : this.getUserId(),
                method : 'save',
                name : name,
                value : me.encodeValue(value)
            },
            disableCaching : true,
            success : function() {
                // console.log('success');
            },
            failure : function() {
                console.log('failed', arguments);
            }
        });
    },
    // private
    clearKey : function(name) {
        Ext.data.JsonP.request({
            url : this.getUrl(),
            params : {
                userId : this.getUserId(),
                method : 'clear',
                name : name
            },
            disableCaching : true,
            success : function() {
                console.log('success');
            },
            failure : function() {
                console.log('failed', arguments);
            }
        });
    }
});
