Ext.define('App.model.unit.units',{
    extend: 'Ext.data.Model',
    fields:[
        'id',
        'name',
        {
            name : 'info',
            type: 'string'

        },
        'uuid'
    ]
});

