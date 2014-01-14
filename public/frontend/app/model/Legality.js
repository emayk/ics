/**
 * Model Legalitas
 */

Ext.define('App.model.Legality', {
    extend: 'Ext.data.Model',
    fields: ['id',
        'name',
        'info',
        'uuid',
        'updated_at',
        'created_at'],

    validations: [
        {
            type: 'length',
            field: 'info',
            min: 1
        },
        {
            type: 'length',
            field: 'name',
            min: 1
        }
    ],
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/legality',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});

