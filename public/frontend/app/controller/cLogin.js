Ext.define('App.controller.cLogin',{
	extend: 'Ext.app.Controller',
	requires:[
	'App.util.Util',
	'App.util.SessionMonitor'
	],
	views: [
	'App.view.authentication.CapsLockTooltip',
	'App.view.login.vLogin'
	],
	stores: [],
	models:[],

	refs: [
		{ ref: 'capslockTooltip', selector : 'capslocktooltip'}
	],
	init: function(){
		var me = this;
		me.control({
			'login form button#submit' : {click : me.onSubmitButtonClick },
			'login form button#cancel' : {click : me.onCancelButtonClick },
			'login form textfield': {	specialkey: this. onTextfieldSpecialKey },
			'login form textfield[name=password]': {keypress: this.onTextfieldKeyPress },
			'appheader button#logout': {click: this.onButtonClickLogout }
		 });
	},
		onTextfieldKeyPress: function(field, e, options) {
	    var charCode = e.getCharCode();

	    if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
	        (!e.shiftKey && charCode >= 65 && charCode <= 90)){
	        if(this.getCapslockTooltip() === undefined){
	            Ext.widget('capslocktooltip');
	        }

	        this.getCapslockTooltip().show();

	    } else {

	        if(this.getCapslockTooltip() !== undefined){
	            this.getCapslockTooltip().hide();
	        }
	    }
	},

	onTextfieldSpecialKey: function(field, e, options) {
    if (e.getKey() == e.ENTER){
        var submitBtn = field.up('form').down('button#submit');
        submitBtn.fireEvent('click', submitBtn, e, options);
    }
	},

	onCancelButtonClick : function( btn, e, eOpts ){
		btn.up('form').getForm().reset();
		btn.up('login').down('textfield[name=user]').setValue(''),
	   btn.up('login').down('textfield[name=password]').setValue('');
		log('Cancel and Reset');
	},
	onButtonClickLogout: function(button,e, options) {
		// button.up('mainviewport').destroy();

    Ext.Ajax.request({
        url: getBaseUrl()+'/logout.php',
        success: function(conn, response, options, eOpts){

            var result = App.util.Util.decodeJSON(conn.responseText);

            if (result.success) {

                button.up('mainviewport').destroy();
                window.location.reload();
            }
            else {
                App.util.Util.showErrorMsg(result.message);
            }
        },
        failure: function(conn, response, options, eOpts) {
            App.util.Util.showErrorMsg(conn.responseText);
        }
      });
  },

	onSubmitButtonClick : function( btn, e, eOpts ){

		 var formPanel = btn.up('form'),
       login = btn.up('login'),
       user = formPanel.down('textfield[name=user]').getValue(),
       pass = formPanel.down('textfield[name=password]').getValue();
       // passEnc = App.util.MD5.encode(pass);
       passEnc = btoa(pass); //  base64
       userEnc = btoa(user);
       if (formPanel.getForm().isValid()) {
					Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');
					Ext.Ajax.request(
             {
             		url: getBaseUrl()+'/login.php',
             		params: {user: userEnc, password: passEnc },
							success: function(conn, response, options, eOpts) {

								var result = Ext.JSON.decode(conn.responseText, true);
								if (!result){
									result = {};
									result.success = false;
									result.msg = conn.responseText;
							}
							Ext.get(login.getEl()).unmask();
							if (result.success) {
								// if (isDebug()) Ext.Msg.show({msg : conn.responseText});
								// statusbar;
								// Ext.ComponentQuery.query('statusbar#lodingad');

								login.close();
								// Ext.create('App.view.Viewport');
								// App.util.SessionMonitor.start();
								window.location.reload();
							} else {
								Ext.Msg.show({
								title:'Fail Login!',
								msg: result.msg,
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							}); }
								/*End success function*/
							},
           		failure: function(conn, response, options, eOpts) {
           			var respon = conn.responseText, obj = json_decode(respon);
								msg = respon;
								Ext.get(login.getEl()).unmask();
						     Ext.Msg.show({
						           title:'Error!',
						           msg: isDebug() ? msg : 'User or Password Invalid !',
						           icon: Ext.Msg.ERROR,
						           buttons: Ext.Msg.OK });

						   }

           	});
			};

		// btn.up('form').getForm().submit();
		log('Login...');

	},

});
