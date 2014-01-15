Ext.define('App.model.Gradekain', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        {
            name: 'info',
            type: 'string'

        },
        'uuid'
    ],
    validations: [
        {
            type: 'length',
            field: 'name',
            min: 5
        }
    ],

    proxy: {
        type: 'rest',
        url: getApiUrl() + '/fabricgrade',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }


});
