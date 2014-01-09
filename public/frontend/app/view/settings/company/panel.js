Ext.define('App.view.settings.company.panel',{
    extend : 'Ext.panel.Panel',
    alias: 'widget.settingcompany',
    title : 'Setting Company Panel',
    layout : 'fit',
    items:[
        {
            xtype: 'form',
            autoScroll : true,
            title : 'Form Setting Company ',
            itemId : 'formsetting',
            frame : true,
            padding : 10,
            defaults: {
                anchor : '95%'
            },
            items :[
                {
                    xtype : 'textfield',
                    fieldLabel: 'Name',
                    formBind:true,
                    name : 'name'
                },{
                    xtype : 'textareafield',
                    fieldLabel: 'Address',
                    name : 'address',
                    maxLength: 250,
                    formBind:true
                },{
                    xtype : 'cbCities',
                    fieldLabel: 'City',
                    name : 'city_id',
                    formBind:true
                },{
                    xtype : 'textfield',
                    fieldLabel: 'Phone',
                    name : 'phone',
                    formBind:true
                },{
                    xtype : 'textfield',
                    fieldLabel: 'Fax',
                    name : 'fax',
                    formBind:true
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