/**
*
* View Setting Program
*
* - @todo :
* Load Record Belum bisa :-(
*
**/


Ext.define('App.view.vSettingProgram',{
	extend : 'Ext.panel.Panel',
	title: 'Form Setting Program',
	alias: 'widget.SettingProgramPanel',
	// SettingsProgram

	items:[ {
		xtype: 'form',
		defaultType : 'textfield',
    items: [
    {
        fieldLabel: 'First Name',
        name: 'name',
        allowBlank: false
    },{
        fieldLabel: 'Last Name',
        name: 'address',
        allowBlank: false
    }
    // end item Form
    ],
    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        handler: function() {
            this.up('panel').getForm().reset();
        }
    }, {
        text: 'Submit',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
            var form = this.up('panel').getForm();
            if (form.isValid()) {
                   Ext.Msg.alert('Success', 'Valid');
                // form.submit({
                    // success: function(form, action) {
                       // Ext.Msg.alert('Success', action.result.msg);
                    // },
                    // failure: function(form, action) {
                        // Ext.Msg.alert('Failed', action.result.msg);
                    // }
                // });
            }
        }
    },
    {
            text: 'Load',
            // handler: this.show
            handler: function(){
            	var model = Ext.create('App.model.mSettingProgram'),
            	form = this.up('panel').getForm();
                log(form);
            // 	form.loadRecord(model);
            //     // this.up('panel').getForm().loadRecord({
            //     //     // url: 'xml-form-data.xml',
            //     //     url: api_url +'/setupcompany/2',
            //     //     waitMsg: 'Loading...'
            //     // });
            }
    },
     // this.on('afterlayout', this.onLoadClick, this, {single:true});
    ], // end Buttons
    listeners : {
        render : function(){
            var me = this;
            log('afterlayout');

             this.load({
             url: api_url + '/setupcompany/get'
            ,waitMsg:'Loading...'
            ,params:{cmd:'load'}
            });

        }
    },


// end items Panel
    } ],



});




// Ext.create('Ext.form.Panel', {
//     title: 'Simple Form',
//     bodyPadding: 5,
//     width: 350,

//     // The form will submit an AJAX request to this URL when submitted
//     url: 'save-form.php',

//     // Fields will be arranged vertically, stretched to full width
//     layout: 'anchor',
//     defaults: {
//         anchor: '100%'
//     },

//     // The fields
//     defaultType: 'textfield',
//     items: [
//     {
//         fieldLabel: 'First Name',
//         name: 'first',
//         allowBlank: false
//     },{
//         fieldLabel: 'Last Name',
//         name: 'last',
//         allowBlank: false
//     }
//     ],

//     // Reset and Submit buttons
//     buttons: [{
//         text: 'Reset',
//         handler: function() {
//             this.up('form').getForm().reset();
//         }
//     }, {
//         text: 'Submit',
//         formBind: true, //only enabled once the form is valid
//         disabled: true,
//         handler: function() {
//             var form = this.up('form').getForm();
//             if (form.isValid()) {
//                 form.submit({
//                     success: function(form, action) {
//                        Ext.Msg.alert('Success', action.result.msg);
//                     },
//                     failure: function(form, action) {
//                         Ext.Msg.alert('Failed', action.result.msg);
//                     }
//                 });
//             }
//         }
//     }],
//     renderTo: Ext.getBody()
// });




// 	Ext.define('App.view.form.Login', {
//     extend: 'Ext.form.Panel',
//     xtype: 'widget.formLogin',
//     bodyPadding: 10,
//     border: false,
//     defaultType: 'textfield',
//     items: [
//     {
//         fieldLabel: 'Username',
//         name: 'username',
//         allowBlank: false
//     }, {
//         fieldLabel: 'Password',
//         name: 'password',
//         inputType: 'password',
//         allowBlank: false
//     }],
//     buttons: [{
//         text: 'Login',
//         formBind: true,
//         disabled: true,
//         handler: function(){
//           // proses Ajax ke server , callback true or false
//             // alert('Login Button Pressed');
//         }
//     }],


// });
