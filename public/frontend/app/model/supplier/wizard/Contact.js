Ext.define('App.model.supplier.wizard.Contact',{
extend: 'Ext.data.Model',
requires: [
		'App.model.supplier.wizard.Supplier',
		'App.model.Departement',
		'App.model.Jabatan',
		'App.model.mUser',

 ],
fields : ['id', 'name', 'info', 'jabatan_id', 'departement_id', 'nohp', 'email', 'fax', 'parent_id', 'parent_type', 'uuid', 'createby_id', 'lastupdateby_id', 'created_at', 'updated_at'],
 proxy: {type: 'rest', url: getApiUrl() +'/supplier_contact_person', reader: {type: 'json', root: 'results', totalProperty: 'total'},
 // extraParams : {dimiliki_type : 'Supplier' }
	},
   belongsTo:[
        {
            name:'departement',
            instanceName:'departement',
            model:'App.model.Departement',
            getterName:'getDept',
            setterName:'setDept',
            associationKey:'departement'
        },{
            name:'position',
            instanceName:'position',
            model:'App.model.Jabatan',
            getterName:'getPosition',
            setterName:'setPosition',
            associationKey:'position'
        },{
            name:'supplier',
            instanceName:'supplier',
            model:'App.model.supplier.wizard.Supplier',
            getterName:'getSupplier',
            setterName:'setSupplier',
            associationKey:'supplier'
        },{
            name:'creator',
            instanceName:'Creator',
            model:'App.model.mUser',
            getterName:'getCreator',
            setterName:'setCreator',
            associationKey:'creator'
        },{
            name:'Updater',
            instanceName:'Updater',
            model:'App.model.mUser',
            getterName:'getUpdater',
            setterName:'setUpdater',
            associationKey:'updater'
        }

    ],
});