
Ext.define('App.model.settings.company',{
    extend : 'Ext.data.Model',
    fields : [
        'id',
        'name',
        'address',
        'city_id',
        'phone',
        'fax',
        'uuid',
        'createby_id',
        'lastupdateby_id'
    ],
    proxy : {
        type : 'rest',
        url : getApiUrl() + '/settingcompany',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});
