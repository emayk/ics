/**
 *
 * Model Province
 *
 */
Ext.define('App.model.Province', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        'info',
        'parent_id',
        'parent_type',
        'uuid',
        { name: 'parent_name', mapping: 'parent.name' }
    ],
    validations: [
        {
            type: 'length',
            field: 'name',
            min: 2
        }
    ],
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/locations',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        },
        extraParams: {
            'type': 'province',
            'level' : 2
        }
    }
});
