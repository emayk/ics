Ext.define('App.view.settings.program.panel',{
    extend : 'Ext.panel.Panel',
    alias: 'widget.settingprogrampanel',
    title : 'Setting Program',
    layout : 'fit',
    items:[
        {
            xtype: 'form',
            autoScroll : true,
            itemId : 'formsetting',
            title : 'Form Setting Program ',
            frame : true,
            padding : 10,
            defaults: {
                anchor : '95%',
                allowBlank: false
            },
            items :[
                {
                    xtype : 'textfield',
                    fieldLabel: 'Name',
                    name : 'name'
                },{
                    xtype : 'textareafield',
                    fieldLabel: 'Address',
                    maxLength: 250,
                    name : 'address'
                },{
                    xtype : 'cbCities',
                    fieldLabel: 'City',
                    name : 'city_id'
                },{
                    xtype : 'textfield',
                    fieldLabel: 'Phone',
                    name : 'telp'
                },{
                    xtype : 'textfield',
                    fieldLabel: 'Fax',
                    name : 'fax'
                },{
                    xtype : 'textfield',
                    fieldLabel: 'Npwp',
                    name : 'npwp'
                }
            ],
            buttons:[
                { text : 'Help', itemId: 'help', iconCls:'help'},'->',
                { text : 'Save', itemId: 'save', iconCls:'save', formBind:true, disabled: true},
                { text : 'Cancel', itemId: 'cancel', iconCls:'close'}
            ]
        }
    ]
});