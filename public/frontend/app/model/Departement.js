Ext.define('App.model.Departement',{
	extend: 'Ext.data.Model',
	// idgen: 'uuid',
	fields:[
	'id',
	'name',
		{
			name : 'info',
			type: 'string'

		},'uuid'
	],
	 validations: [{
        type: 'length',
        field: 'name',
        min: 5
    	}]
        // ,
        // extraParams: {
        //     method: 'getUserTypes',
        //     token: TOKEN
        // },

});