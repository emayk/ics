/**
 *
 * Model Departement With Proxy Built In
 *
 */
Ext.define('App.model.Departement', {
    extend: 'Ext.data.Model',
    fields: [ 'id', 'name',
        { name: 'info', type: 'string' }, 'uuid'
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
        url: getApiUrl() + '/dept',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }

});