Ext.define('App.form.login.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'frmLogin',
    title: 'Login',
    frame:true,
    width: 320,
    bodyPadding: 10,

    defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },

    items: [
        {
            allowBlank: false,
            fieldLabel: 'User ID',
            name: 'user',
            emptyText: 'user id'
        },
        {
            allowBlank: false,
            fieldLabel: 'Password',
            name: 'pass',
            emptyText: 'password',
            inputType: 'password'
        },
        {
            xtype:'checkbox',
            fieldLabel: 'Remember me',
            name: 'remember'
        }
    ],

    buttons: [
        { text:'Register' },
        { text:'Login' }
    ]
});
