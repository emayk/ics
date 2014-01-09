Ext.define('App.model.test.Supplier', {
    extend:'Ext.data.Model',
    fields:[
        'id',
        'name',
        'codepos',
        'name',
        'codepos',
        'npwp',
        'fax',
        'email',
        'plafon',
        'kredit',
        'deleted_at',
        'alamat',
        'phone',
        'status_id',
        'tipe_id',
        'legalitas_id',
        'typeprod_id',
        'negara_id',
        'province_id',
        'city_id',
        'uuid',
        'createby_id',
        'lastupdateby_id',
        'codeinternal',
        'created_at',
        'updated_at',
    ],
     belongsTo:[
        {
            name:'legalitas',
            instanceName:'legalitas',
            model:'App.model.test.Legalitas',
            getterName:'getLegalitas',
            setterName:'setLegalitas',
            associationKey:'legalitas'
        },
        {
            name:'country',
            instanceName:'country',
            model:'App.model.test.Country',
            getterName:'getCountry',
            setterName:'setCountry',
            associationKey:'country'
        },
        {
            name:'province',
            instanceName:'province',
            model:'App.model.test.Country',
            getterName:'getProvince',
            setterName:'setProvince',
            associationKey:'province'
        },
        {
            name:'city',
            instanceName:'city',
            model:'App.model.test.Country',
            getterName:'getCity',
            setterName:'setCity',
            associationKey:'city'
        },

        {
            name:'status',
            instanceName:'status',
            model:'App.model.test.Status',
            getterName:'getStatus',
            setterName:'setStatus',
            associationKey:'status'
        },

        {
            name:'typeProduct',
            instanceName:'typeProduct',
            model:'App.model.test.typeSupplyProduct',
            getterName:'getTypeProduct',
            setterName:'setTypeProduct',
            associationKey:'type_product'
        },

        {
            name:'type',
            instanceName:'typeSupplier',
            model:'App.model.test.TypeSupplier',
            getterName:'getTypeSupplier',
            setterName:'setTypeSupplier',
            associationKey:'type'
        },

    ],
    // hasMany:[
    //     {
    //         name:'comments',
    //         model:'App.model.test.Comment',
    //         associationKey:'comments'
    //     }
    // ],
    proxy:{
        type:'rest',
        url:'/api/supplier',
        reader:{
            type:'json',
            root:'data'
        }
    }
});
