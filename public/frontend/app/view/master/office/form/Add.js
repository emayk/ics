Ext.define('App.view.master.office.form.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.winFormHeadOffice',
    requires: [
        'App.form.combobox.cbCountries'
    ],
    layout: 'fit',
    autoShow: true,
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                defaults: {
                    anchor: '95%',
                    widthLabel: 100
                },

                items: [
                    {
                        xtype: 'textareafield',
                        grow: true,
                        name: 'address',
                        fieldLabel: 'Address'
                    },
                    {
                        xtype: 'textfield',
                        name: 'postcode',
                        fieldLabel: 'Post Code'
                    },
                    {
                        xtype: 'cbCountries',
                        itemId: 'comboxcountry',
                        name: 'country_id',
                        fieldLabel: 'Country'
                    },
                    {
                        xtype: 'cbProvinces',
                        itemId: 'comboxprovince',
                        name: 'province_id',
                        fieldLabel: 'Province'
                    },
                    {
                        xtype: 'cbCities',
                        name: 'city_id',
                        itemId: 'comboxcity',
                        fieldLabel: 'City'
                    },
                    {
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store',{
                            fields: ['id','name'],
                            data: [
                                { id : 1, name : 'Buyer' },
                                { id : 2, name : 'Supplier' }
                            ]
                        }),
//                        queryMode: 'local',
                        displayField: 'name',
                        value : 1,
                        valueField: 'id',
                        forceSelection: true,
                        allowBlank : false,
                        name: 'type',
                        fieldLabel: 'Type'
                    },
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: 'Main Office',
                        inputValue: true,
                        name: 'mainoffice'
                    }
                ]
            }
        ]
        ;
        this.buttons = [
            {
                text: 'Help',
                itemId: 'help',
                iconCls: 'help',
                action: 'help'
            },
            '->',
            {
                text: 'Save',
                action: 'save',
                itemId: 'save',
                iconCls: 'save',
                formBind:true
            },
            {
                text: 'Cancel',
                iconCls: 'close',
                action: 'cancel',
                itemId: 'cancel'

            }
        ];
        this.callParent(arguments);
    }
})
;