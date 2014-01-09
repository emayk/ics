Ext.define('App.view.security.formProfile', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formprofile',
	/*bodyPadding: 5,*/
    frame : true,
    layout: { type: 'vbox', align : 'stretch'},
    items: [
        { xtype: 'container', flex: 1, items:[
        {

            //
        layout: {type: 'hbox', align: 'stretch'},
        autoScroll: true,
        items: [
            {xtype: 'fieldset',  flex: 2, title: e('userinfo'), defaults: { afterLabelTextTpl: App.util.Util.required, anchor: '100%', xtype: 'textfield', allowBlank: false, labelWidth: 60 },
                items: [
                    {xtype: 'hiddenfield',  name: 'id'},
                    {fieldLabel: e('username'), name: 'username',allowBlank: true },
                    {fieldLabel: e('fullname'), maxLength: 100, name: 'fullname'},
                    {fieldLabel: e('email'), maxLength: 100, name: 'email'},

                ]
            },
            {
                xtype: 'fieldset',
                title: e('picture'),
                width: 170,
                items: [
                    {
                        xtype: 'image',
                        height: 150,
                        width: 150,
                        src: '',
                        itemId: 'imgUser',

                    }
                ]
            }
        ],
        }



        ]},
        { xtype: 'container', height: 10},
        {xtype: 'tabpanel', flex: 3, layout: { type : 'fit', align: 'stretch'},
            items:[
            { xtype:'panel',iconCls: 'home',title: 'Organisation',closable : false,items:[
                    {xtype: 'combobox', fieldLabel: e('departement'), name: 'departement_id', displayField: 'name', valueField: 'id', queryMode: 'local', store: 'App.store.security.Depts'},
                    {xtype: 'combobox', fieldLabel: e('group'), name: 'group_id', displayField: 'name', valueField: 'id', queryMode: 'local', store: 'App.store.security.Groups'},
            ]},
            { xtype:'panel',iconCls: 'home',title: 'Change Picture',closable : false,items:[
                {xtype: 'filefield', fieldLabel: e('picture'), name: 'picture', allowBlank: true, afterLabelTextTpl: ''}
            ]},
            ]
        }
        // end items End
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Cancel',
                    itemId: 'cancel',
                    iconCls: 'cancel'
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'save',
                    iconCls: 'save'
                }
            ]
        }
    ]
});












// Ext.define('App.view.security.formProfile', {
//     extend: 'Ext.form.Panel',
//     alias: 'widget.formprofile',
//     bodyPadding: 5,
//     layout: {
//         type: 'hbox',
//         align: 'stretch'
//     },
//     autoScroll: true,
//     items: [
//         {
//             xtype: 'fieldset',
//             flex: 2,
//             title: e('userinfo'),
//             defaults: {
//                 afterLabelTextTpl: App.util.Util.required,
//                 anchor: '100%',
//                 xtype: 'textfield',
//                 allowBlank: false,
//                 labelWidth: 60
//             },
//             items: [
//                 {
//                     xtype: 'hiddenfield',
//                     fieldLabel: 'Label',
//                     name: 'id'
//                 },
//                 {
//                     fieldLabel: e('username'),
//                     name: 'username',readOnly: true,
//                 },
//                 {
//                     fieldLabel: e('fullname'),
//                     maxLength: 100,
//                     name: 'fullname'
//                 },
//                 {
//                     fieldLabel: e('email'),
//                     maxLength: 100,
//                     name: 'email'
//                 },
//                 {
//                     xtype: 'combobox',
//                     fieldLabel: e('departement'),
//                     name: 'departement_id',
//                     displayField: 'name',
//                     valueField: 'id',
//                     queryMode: 'local',
//                     store: 'App.store.security.Depts'
//                 },
//                 {
//                     xtype: 'combobox',
//                     fieldLabel: e('group'),
//                     name: 'group_id',
//                     displayField: 'name',
//                     valueField: 'id',
//                     queryMode: 'local',
//                     store: 'App.store.security.Groups'
//                 },
//                 {
//                     xtype: 'filefield',
//                     fieldLabel: e('picture'),
//                     name: 'picture',
//                     allowBlank: true,
//                     afterLabelTextTpl: ''
//                 }
//             ]
//         },
//         {
//             xtype: 'fieldset',
//             title: e('picture'),
//             width: 170,
//             items: [
//                 {
//                     xtype: 'image',
//                     height: 150,
//                     width: 150,
//                     src: '',
//                     itemId: 'imgUser',
//                     name : 'picture',
//                 }
//             ]
//         }
//     ],
//     dockedItems: [
//         {
//             xtype: 'toolbar',
//             flex: 1,
//             dock: 'bottom',
//             ui: 'footer',
//             layout: {
//                 pack: 'end',
//                 type: 'hbox'
//             },
//             items: [
//                 {
//                     xtype: 'button',
//                     text: 'Cancel',
//                     itemId: 'cancel',
//                     iconCls: 'cancel'
//                 },
//                 {
//                     xtype: 'button',
//                     text: 'Save',
//                     itemId: 'save',
//                     iconCls: 'save'
//                 }
//             ]
//         }
//     ]
// });