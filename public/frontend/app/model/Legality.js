Ext.define('App.model.Legality', {
    extend: 'Ext.data.Model',
    fields: ['id',
    'name', 
    'info',
    'uuid',
    'updated_at',
    'created_at'],

    validations: [{
        type: 'length',
        field: 'info',
        min: 1
    }, {
        type: 'length',
        field: 'name',
        min: 1
    }],
    init: function(){
    	// console.log('Model Legality define');
    },
});

