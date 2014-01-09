Ext.define('App.store.Orders.sAbstract',{
    models: 'App.model.Orders.mAbstract',
    proxy : {
        type : 'rest'
    },
    constructor : function (data, id, raw, convertedData, parseAssociation) {
        this.callParent([data, id, raw, convertedData]);
        if (parseAssociation) {
            this.proxy.reader.readAssociated(this, data);
        }
    }
});