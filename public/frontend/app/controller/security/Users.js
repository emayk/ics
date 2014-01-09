Ext.define('App.controller.security.Users', {
    extend: 'Ext.app.Controller',

    requires: [
        'App.util.Util'
    ],
    models: [
    'App.model.security.profile',
    ],
    views: [
        'App.view.security.Users',
        'App.view.security.Profile',
        'App.view.security.ChangeProfile'
    ],

    stores: [
        'App.store.security.Groups',
        'App.store.security.Users',
        'App.store.security.Depts',
    ],

    refs: [
        {ref: 'usersList', selector: 'userslist'},
        {ref: 'userPicture', selector: 'profile image'},
        {ref: 'userPicture2', selector: 'mainpanel formprofile image'},
        {ref: 'changeProfile', selector: 'changeprofile'},
        {ref: 'formProfile', selector: 'formprofile'},
    ],

    init: function(application) {

        this.control({
            "userslist": {
                render: this.onRender
            },
            "changeprofile" : {
                render: this.onRenderProfile
            },
            "changeprofile button#cancel" :{
                click: function() { log('im Clicked'); }
            },
            "changeprofile button#save" :{
                click: this.onChangeProfileButtonSave
            },
            "users button#add": {
                click: this.onButtonClickAdd
            },
            "users button#edit": {
                click: this.onButtonClickEdit
            },
            "users button#delete": {
                click: this.onButtonClickDelete
            },
            "profile button#save": {
                click: this.onButtonClickSave
            },
            "profile button#cancel": {
                click: this.onButtonClickCancel
            },
            "profile formprofile filefield": {
                change: this.onFilefieldChange
            },
            "mainpanel formprofile filefield": {
                change: this.onFilefieldChange2
            },
        });

        // if (!Ext.getStore('groups')) {Ext.create('App.store.security.Groups'); }
        if (!Ext.getStore('groups')) {Ext.create('App.store.security.Groups'); }
        if (!Ext.getStore('depts')) {Ext.create('App.store.security.Depts'); }
    },

    onRender: function(component, options) {
        component.getStore().load();
    },
    onRenderProfile: function(component,options){
         log('Change Profile Rendered');
         var profile = Ext.ModelManager.getModel('App.model.security.profile');
         profile.load(getloginid(),{
            success: function(p){
                log(p);
                log('Success Loading Profile for '+ p.get('username') );
                App.util.Alert.msg('Success', 'Loading Profile '+ p.get('username') + 'Successfully');
                Ext.ComponentQuery.query('formprofile')[0].loadRecord(p);
                component.down('image').setSrc(p.getPicture().get('url') );
            },
            failure: function(p){
                log(p);
                log('Failure Loading Profile '+ getloginid());
                App.util.Alert.msg('Failure', 'Loading Profile '+ loginas() +', Please Try Again');
            }
         });
    },

    onChangeProfileButtonSave: function(btn,e,opt){
        // var f = btn.up('form'), val = f.getValues();

        // if (!f.isValid()) return false;

        // val['lastupdateby_id'] = getloginid();
        // var profile = Ext.create('App.model.security.profile',val);
        // profile.save({
        //     success: function(p){
        //         App.util.Alert.msg('Success!', 'User Profile Updated');
        //         log(p);
        //     },
        //     failure: function(p){
        //         App.util.Util.showErrorMsg('Failed Updated');
        //     }
        // });
        // return false;


// Stop OLD Here
        var form = this.getFormProfile();

        methodMsg = 'Updated ...';

        if (form.isValid()){
            form.submit({
                clientValidation: true,
                url : api_url + '/users/'+ getIdLogin(),
                params :  {id: getIdLogin(), _method: 'PUT', _token : gettoken() },
                success: function(form, action) {
                    var result = action.result;
                    if (result.success) {
                        App.util.Alert.msg('Success!', 'User Profile Updated');
                    } else {
                        App.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                   }
                }
            });

        }
    },
    onButtonClickAdd: function (button, e, options) {
        // var win = Ext.create('App.view.security.Profile');
        var win = Ext.widget('profile');
        win.setTitle('Add new User');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {

        var grid = this.getUsersList(),
        record = grid.getSelectionModel().getSelection();
        if(record[0]){
            var editWindow = Ext.create('App.view.security.Profile');
            editWindow.down('form').loadRecord(record[0]);
            editWindow.down('image').setSrc('');
            if (record[0].get('image_url')) {
                var img = editWindow.down('image');
                var url_image =  getBaseUrl() + record[0].get('image_url');
                img.setSrc(url_image);
            }

            editWindow.setTitle('Edit User [ ' + record[0].get('username') + ' ]');
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getUsersList(),
        record = grid.getSelectionModel().getSelection(),
        store = grid.getStore();

        if (store.getCount() >= 2 && record[0]){

            Ext.Msg.show({
                 title:'Delete?',
                 msg: 'Are you sure you want to delete?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                                    Ext.Ajax.request({
                                        url: api_url+'/users/'+record[0].get('id'),
                                        params: {
                                            id: record[0].get('id'),
                                            _method: 'DELETE',
                                            _token : gettoken(),
                                        },
                                        success: function(conn, response, options, eOpts) {
                                            var result = App.util.Util.decodeJSON(conn.responseText);
                                            if (result.success) {
                                                App.util.Alert.msg('Success!', 'User deleted.');
                                                store.load();
                                            } else {
                                                App.util.Util.showErrorMsg(conn.responseText);
                                            }
                                        },
                                        failure: function(conn, response, options, eOpts) {
                                            App.util.Util.showErrorMsg(conn.responseText);
                                        }
                                    });
                                }
                             }
                        });
        } else if (store.getCount() == 1) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the users from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }



    },
     onButtonClickSave: function(button, e, options) {

        // var win = button.up('window'),
        // formPanel = win.down('form'),
        var formPanel = button.up('form'),
        store = this.getUsersList().getStore(),win,
        val = formPanel.getValues(),url,params;

        // var f = button.up('form'), val = f.getValues();

        // if (!f.isValid()) return false;

        // val['lastupdateby_id'] = getloginid();
        // var profile = Ext.create('App.model.security.profile',val);
        // profile.save({
        //     success: function(p){
        //         App.util.Alert.msg('Success!', 'User Profile Updated');
        //         log(p);
        //     },
        //     failure: function(p){
        //         App.util.Util.showErrorMsg('Failed Updated');
        //     }
        // });
        // return false;


        if (val.id !== '') {
            // update
            url = api_url + '/users/'+ val.id;
            params =  {
                    id: val.id,
                    _method: 'PUT',
                    _token : gettoken(),
                };
                methodMsg = 'Updated ...';
        }else{
            url = api_url +'/users',
            params  = {};
            methodMsg = 'Saved...';
        };

        if (formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                clientValidation: true,
                url : url,
                params : params,
                success: function(form, action) {
                    var result = action.result;
                    if (result.success) {
                        App.util.Alert.msg('Success!', 'User '+methodMsg);
                        store.load();
                        if ( button.up('window') !== undefined ) button.up('window').close();
                        log('Save User Editing From Windows');
                    } else {
                        App.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                   }
                }
            });
        }

    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },

    onFilefieldChange2: function(filefield, value, options) {
        var file = filefield.fileInputEl.dom.files[0];
        var picture = this.getFormProfile().down('image');

        /*
            If the file is an image and the web browser supports FileReader,
            present a preview in the image component
        */
        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            filefield.reset();
        }
    },

    onFilefieldChange: function(filefield, value, options) {
        log('change getUserPicture');
        var file = filefield.fileInputEl.dom.files[0];
        var picture = this.getUserPicture();

        /*
            If the file is an image and the web browser supports FileReader,
            present a preview in the image component
        */
        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            filefield.reset();
        }
    }
});