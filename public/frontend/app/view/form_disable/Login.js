Ext.define('App.view.form.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'widget.formLogin',
    bodyPadding: 10,
    border: false,
    defaultType: 'textfield',
    items: [{
        fieldLabel: 'Username',
        name: 'username',
        allowBlank: false
    }, {
        fieldLabel: 'Password',
        name: 'password',
        inputType: 'password',
        allowBlank: false
    }],
    buttons: [{
        text: 'Login',
        formBind: true,
        disabled: true,
        handler: function(){
          // proses Ajax ke server , callback true or false
            // alert('Login Button Pressed');
        }
    }],


});


// di initComponent function
  // var me = this;

  //       me.items = [
  //           {html: '<a id="test" href="#">Click Me</a>'}
  //       ];

  //       me.on('afterrender', function () {
  //           var aEl = Ext.get('test');
  //            if (aEl) { aEl.on('click', me.aClick); }

  //       }, me, {single: true});

  //       me.callParent(arguments);
  //   },

  //   aClick: function () {
  //       alert('click');
  //   }  