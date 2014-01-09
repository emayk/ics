
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('App.form.profile.ChangePassword',{
	alias : 'widget.formUserChangePassword',
    extend : 'Ext.form.Panel',
    requires: [ 'Ext.ux.DataTip' ],
    // title   : 'Add Order Product',

    initComponent : function() {
        log('[Order] Form Product Loaded');
        this.callParent(arguments);
    },

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

                xtype:'fieldset',
                title: 'Profile User [Change Password]',
                collapsible: false,
                defaultType: 'textfield',
                defaults: {anchor: '100%'},

                layout: 'anchor',
                items :[
                    {
                        xtype : 'textfield',
                        name: 'password_1',
                        allowBlank: false,
                        inputType: 'password',
                        fieldLabel : 'Current Password'
                    },
                    {
                        xtype : 'textfield',
                        name: 'password_2',
                        inputType: 'password',
                        allowBlank: false,
                        fieldLabel : 'New Password'
                    },                                       
                    {
                        xtype : 'textfield',
                        name: 'password_2conf',
                        inputType: 'password',
                        allowBlank: false,
                        fieldLabel : 'Retype New Password'
                    },                   
                ]
        } ],

	     dockedItems  : [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Update',
                action: 'save'
            },{
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancel',
            }]
        }],
});