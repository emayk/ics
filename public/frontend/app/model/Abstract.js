Ext.define('App.model.Abstract', {
    extend : 'Ext.data.Model',
    requires : 'Ext.data.proxy.Rest',
    proxy : {
        type : 'rest'
    },
    constructor : function (data, id, raw, convertedData, parseAssociation) {
        this.callParent([data, id, raw, convertedData]);
        log(parseAssociation);
        if (parseAssociation) {
            this.proxy.reader.readAssociated(this, data);
        }
    }
});