/**
 * Head Office Model
 */
Ext.define('App.model.Headoffice', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'address',
        'country_id',
        'province_id',
        'city_id',
        { name : 'postcode', type : 'int' },
        'type',
        'parent_id',
        'parent_type',
        'codeinternal',
        'mainoffice',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'created_at',
        'updated_at'
    ],
    proxy: {
        type: 'rest',
        url: getApiUrl() + '/offices',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }

});
