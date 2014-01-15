/**
 *
 * Model Gudang
 *
 */
Ext.define('App.model.Gudang', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'name',
        'address',
        'city_id',
        'cat_id',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        { name: 'created_at', type: 'datetime'},
        { name: 'updated_at', type: 'datetime'},
        { name: 'category', mapping: 'category.name' },
        { name: 'city', mapping: 'city.name' }
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
        url: getApiUrl() + '/warehouse',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }

});
