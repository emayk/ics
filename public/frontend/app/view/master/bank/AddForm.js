Ext.define('App.view.master.bank.AddForm',{
    extend: 'Ext.window.Window',
    alias: 'widget.bankEdit',
    requires: ['Ext.form.Panel','Ext.form.field.Text'],
    title   : 'Bank Information ',
    layout  : 'fit',
    autoShow : true,
    // height: 200,
    // width: 400,
    initComponent : function() {
        log('Bank Form Add Loaded');
        // log(token);
        this.items = [
            {
                xtype : 'form',
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
                items : [
                    {
                        xtype : 'displayfield',
                        name : 'id',
                        hidden: true,
                        fieldLabel : 'ID'
                    },
                    // {
                    //     xtype : 'displayfield',
                    //     name : '_token',
                    //     hidden: true,
                    //     value: token
                    //     // _token: App.config.APP_TOKEN
                    // },
                    {
                        xtype : 'textfield',
                        name: 'name',
                        fieldLabel : 'Name '
                    },                  
                    {
                        xtype : 'textfield',
                        name: 'notelp',
                        allowBlank: false,
                        fieldLabel : 'Phone '
                    },
                    {
                        xtype : 'textfield',
                        name: 'address',
                        allowBlank: false,
                        fieldLabel : 'Alamat '
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
         this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Save',
                action: 'save'
            },{
                iconCls: 'icon-reset',
                text: 'Cancel',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
