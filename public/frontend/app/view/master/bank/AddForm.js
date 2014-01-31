/**
 * Form Bank
 */

Ext.define('App.view.master.bank.AddForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.masterbankwindowedit',
    requires: ['Ext.form.Panel', 'Ext.form.field.Text'],
    title: 'Bank Information ',
    layout: 'fit',
    autoShow: true,
    // height: 200,
    // width: 400,
    initComponent: function () {
        log('Bank Form Add Loaded');
        // log(token);
        this.items = [
            {
                xtype: 'form',
                itemId : 'formbank',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',

                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },
                items: [
                    {
                        xtype: 'displayfield',
                        name: 'id',
                        hidden: true,
                        fieldLabel: 'ID'
                    },
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: translations.name
                    },
	                {
                        xtype: 'textfield',
                        name: 'shortname',
                        fieldLabel: translations.abbr
                    },
                    {
                        xtype: 'textfield',
                        name: 'notelp',
                        allowBlank: false,
                        fieldLabel: translations.phonenumber
                    },
                    {
                        xtype: 'textareafield',
                        maxRows : 2,
                        name: 'address',
                        allowBlank: false,
                        fieldLabel: translations.address
                    }
                ]
            }
        ];

        // this.buttons = [
        //     {
        //         text : 'Save',
        //         action : 'save'
        //     },
        //     {
        //         text : 'Cancel',
        //         scope : this,
        //         handler : this.close
        //     }
        // ];

        // this.callParent(arguments);
        // 
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                id: 'buttons',
                ui: 'footer',
                items: ['->', {
                    iconCls: 'save',
                    text: 'Save',
                    action: 'save'
                }, {
                    iconCls: 'close',
                    text: 'Cancel',
                    scope: this,
                    handler: this.close
                }]
            }
        ];

        this.callParent(arguments);
    }
});
