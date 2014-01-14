/**
 * Model City
 */
Ext.define('App.model.City', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        'parent_id',
        'parent_type',
        'info',
        'uuid',
        { name: 'parent_name', mapping: 'parent.name' }
    ],
    validations: [
        {
            type: 'length',
            field: 'name',
            min: 2
        }

    ]


});
