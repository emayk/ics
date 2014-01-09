Ext.define('App.model.settings.program',{
    extend : 'Ext.data.Model',
    fields : [
        'id',
        'name',
        'address',
        'city_id',
        'telp',
        'fax',
        'npwp',
        'uuid',
        'createby_id',
        'lastupdateby_id'
    ],
    proxy : {
        type : 'rest',
        url : getApiUrl() + '/settingprogram',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});
