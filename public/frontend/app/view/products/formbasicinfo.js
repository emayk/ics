/**
 * Copyright (C) 2013  Emay Komarudin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author Emay Komarudin
 *
 **/


Ext.define('App.view.products.formbasicinfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formproductbasicinfo',
    autoScroll: true,
    bodyPadding: 10,
    frame: true,
    flex: 2,
    title: 'Basic Info',
    itemId: 'detail',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    requires:[
        'App.form.combobox.cbTypeProduct',
        'App.form.combobox.cbCatproduct'
    ],
    record: null,
    prodId : null,
    prodName : null,
    defaults: {
        anchor: '95%',
        widhtLabel: 100
    },
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'fieldset',
	                itemId : 'fieldsetbasicinfo',
                    autoScroll: true,
                    title: 'Basic Info ' + this.prodName,
                    margins: '0 10 0 0',
                    bodyPadding: 2,
                    flex: .6,
                    items: [
                        { xtype: 'hiddenfield', fieldLabel: 'id', name: 'id', anchor: '95%',readOnly: true,value : this.prodId },
                        { xtype: 'textfield', fieldLabel: 'name', name: 'name', anchor: '95%' },
                        { xtype: 'cbcatproduct', fieldLabel: 'Category', name: 'cat_id', anchor: '95%' },
                        { xtype: 'textfield', fieldLabel: 'contruction', name: 'contruction', anchor: '95%' },
                        { xtype: 'textfield', fieldLabel: 'nodesign', name: 'nodesign', anchor: '95%' },
                        { xtype: 'cbTypeProduct', fieldLabel: 'type_id', name: 'type_id', anchor: '95%' },
                        { xtype: 'fieldcontainer', fieldLabel: 'Weight', layout: 'hbox', anchor: '95%',
                            items: [
                                { xtype: 'numberfield', fieldLabel: '', name: 'weight', flex: .3 },
                                {
                                    xtype: 'splitter'
                                },
                                { xtype: 'cbUnitWeight', fieldLabel: '', name: 'unitweight_id', flex: .6}
                            ]
                        },

                        { xtype: 'fieldcontainer', fieldLabel: 'Width', layout: 'hbox', anchor: '95%',
                            items: [
                                { xtype: 'numberfield', fieldLabel: '', name: 'width', flex: .3},
                                {
                                    xtype: 'splitter'
                                },
                                { xtype: 'cbUnitWidth', fieldLabel: '', name: 'unitwidth_id', flex: .6 }
                            ]
                        }

//                        { xtype: 'textfield', fieldLabel: 'uuid', name: 'uuid', anchor: '95%' },
//                        { xtype: 'textfield', fieldLabel: 'updated_at', name: 'updated_at', anchor: '95%' },
//                        { xtype: 'textfield', fieldLabel: 'created_at', name: 'created_at', anchor: '95%' },
//                        { xtype: 'textfield', fieldLabel: 'createby_id', name: 'createby_id', anchor: '95%' },
//                        { xtype: 'textfield', fieldLabel: 'codeinternal', name: 'codeinternal', anchor: '95%' },
//                        { xtype: 'textfield', fieldLabel: 'lastupdateby_id', name: 'lastupdateby_id', anchor: '95%' }
                    ]
                }
            ]
        });
        this.callParent(arguments);

    },

    buttons: [
        {
            text: 'Help', iconCls: 'help', itemId: 'help',action: 'help'
        },
        '->',
        {
            text: 'Save', iconCls: 'save', itemId: 'save',action: 'save'
        },
        {
            text: 'Close', iconCls: 'close', itemId: 'close',action: 'close'
        }
    ]
});

//
//
//        {
//            xtype: 'container',
//            flex: .4,
//            layout: { type: 'vbox', align: 'stretch'},
//            items: [
//                {
//                    xtype: 'fieldset',
//                    title: 'Picture',
//                    autoScroll: true,
//                    flex: .4,
//                    bodyPadding: 2,
////                                    margins: '0 0 0 10',
//                    items: [
//                        {
//                            maxHeight: 256,
//                            maxWidth: 256,
//                            xtype: 'image',
//                            itemId: 'imageProduct',
////                                            resizable: true,
//                            shrinkWrap: true,
//                            src: getIcsPath() + '/frontend/images/uploads_Icon_256x256.png'
//                        }
//                    ]
//                },
//                {
//                    flex: 0.6,
//                    xtype: 'container',
//                    title: 'Detail Info',
//                    bodyPadding: 2,
//                    items: [
//                        {
//                            flex: 0.6,
//                            xtype: 'fieldset',
//                            title: 'Detail Info',
//                            bodyPadding: 2,
//                            items: [
//                                { xtype: 'textfield', name: 'det_color', fieldLabel: 'Color Unit', anchor: '95%'},
//                                { xtype: 'textfield', name: 'det_color1', fieldLabel: 'Color Unit', anchor: '95%'},
//                                { xtype: 'textfield', name: 'det_color2', fieldLabel: 'Color Unit', anchor: '95%'}
//                            ]}
//                    ],
//                    dockedItems: [
//                        { xtype: 'toolbar', items: [
//                            { text: 'Save', itemId: 'saveDetail', iconCls: 'save'}
//                        ]}
//                    ]
//                }
//            ]
//        }
//
//    ]
//},