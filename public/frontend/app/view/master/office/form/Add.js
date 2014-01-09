Ext.define('App.view.master.office.form.Add', {
    extend: 'Ext.window.Window',
    alias: 'widget.formHeadOffice',

    // config: {
    //     title: 'Form ::'
    // },

    // constructor: function(config) {
    //     this.initConfig(config);
    // },

    layout: 'fit',
    autoShow: true,
    initComponent: function() {
        this.items = [
                {
                    xtype: 'form',
                    items: [
                        {
                            xtype       : 'textareafield',
                            grow        : true,
                            name        : 'alamat',
                            fieldLabel  : 'Address'
                        },
                        {
                            xtype: 'textfield',
                            name : 'kodepos',
                            fieldLabel: 'Post Code'
                        },
                        {
                            xtype : 'cbCountries',
                            name : 'negara_id',
                            fieldLabel: 'Country',
                        },
                        {
                            xtype : 'cbProvinces',
                            name : 'provinsi_id',
                            fieldLabel: 'Province',
                        },
                        {
                            xtype : 'cbCities',
                            name : 'kota_id',
                            fieldLabel: 'City',
                        },
                       
                    ]
                }
            ];
         this.buttons = [
                {
                    text: 'Save',
                    action: 'save'
                },
                {
                    text: 'Cancel',
                    action: 'cancel'

                }
            ];
        this.callParent(arguments);
    }
});