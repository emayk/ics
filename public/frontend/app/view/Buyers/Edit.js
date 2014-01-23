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


/**
 * Proses Info Buyer atau delete
 */
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('App.view.Buyers.Edit', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.appBuyersvBuyersEdit',
    layout: { type: 'fit', align: 'stretch'},
    requires:[
        'App.form.combobox.cbCountries',
        'App.form.combobox.cbProvinces',
        'App.form.combobox.cbCities',
        'App.form.combobox.cbTypeSupBuy',
        'App.form.combobox.cbLegalitas',
        'App.form.combobox.cbTypeProduct'
    ],
    padding: 10,
    mode: null,
    frame: true,
    items: [
        {
            xtype: 'form',
            itemId: 'formbuyer',
            frame: true,
            autoScroll: true,
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'top',
                msgTarget: 'side'
            },
            defaults: {
                anchor: '100%'
            },
            title: 'Information Buyer',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            border: false,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [
                                {
                                    fieldLabel: 'Full Name',
                                    afterLabelTextTpl: required,
                                    allowBlank: false,
                                    name: 'name',
                                    anchor: '95%'
                                },
                                {
                                    fieldLabel: 'Email',
//                                    afterLabelTextTpl: required,
                                    allowBlank: true,
                                    name: 'email',
                                    vtype: 'email',
                                    anchor: '95%'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [
                                {
                                    fieldLabel: 'credit',
                                    afterLabelTextTpl: required,
                                    allowBlank: false,
                                    name: 'kredit',
                                    anchor: '95%',
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    value: 0,
                                    maxValue: 365
                                },
                                {
                                    fieldLabel: 'plafon',
                                    afterLabelTextTpl: required,
                                    allowBlank: false,
                                    name: 'plafon',
                                    xtype: 'numberfield',
                                    minValue: 0,
                                    anchor: '95%'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    plain: true,
                    activeTab: 0,
                    defaults: {
                        bodyPadding: 10
                    },
                    items: [
                        {
                            title: 'Office',
                            defaults: {
                                width: 230,
                                anchor : '95%'
                            },
                            layout: 'anchor',
                            defaultType: 'textfield',
                            frame: true,

                            items: [
                                {
                                    fieldLabel: 'Npwp',
                                    name: 'npwp'
                                },
                                {
                                    fieldLabel: 'Type',
                                    name: 'tipe_id',
                                    xtype: 'cbTypeSupBuy',
	                                allowBlank:true
                                },
                                {
                                    fieldLabel: 'Legality',
                                    name: 'legality_id',
                                    xtype: 'cbLegalitas',
	                                allowBlank:true
                                }
//                                {
//                                    fieldLabel: 'Buy Type Product',
//                                    name: 'typeprod_id',
//                                    xtype: 'cbTypeProduct'
//                                }

                            ]
                        },
                        {
                            title: 'Phone Numbers',
                            frame: true,
                            defaults: {
                                width: 230,
                                anchor: '95%'
                            },
                            defaultType: 'textfield',

                            items: [
                                {
                                    fieldLabel: 'Phone',
                                    name: 'phone'
                                },
                                {
                                    fieldLabel: 'Fax',
                                    name: 'fax'
                                }
                            ]
                        },

                        {
                            title: 'Locations',
                            defaults: {
                                width: 230
                            },
                            frame: true,
                            defaultType: 'textfield',
                            layout: { type: 'hbox', align: 'stretch'},
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: 'anchor',
                                    defaults: {
                                        anchor: '95%'
                                    },
                                    items: [
                                        {
                                            xtype: 'cbCountries',
                                            name: 'country_id',
                                            fieldLabel: 'Country',
//                                            afterLabelTextTpl: required,
                                            allowBlank: true
                                        },
                                        {
                                            xtype: 'cbProvinces',
                                            name: 'province_id',
                                            fieldLabel: 'Province',
//                                            afterLabelTextTpl: required,
                                            allowBlank: true
                                        },
                                        {
                                            xtype: 'cbCities',
                                            name: 'city_id',
                                            fieldLabel: 'City',
//                                            afterLabelTextTpl: required,
                                            allowBlank: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: 'anchor',
                                    items: [
                                        {
                                            name: 'address',
                                            fieldLabel: 'Address',
                                            xtype: 'textareafield',
                                            flex: 1,
//                                            afterLabelTextTpl: required,
                                            allowBlank: true,
                                            anchor: '95%'
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            fieldLabel: 'PostCode/Rt/Rw',
                                            items: [
                                                {
//                                                    fieldLabel: 'Post Code',
                                                    xtype: 'textfield',
                                                    name: 'codepos',
                                                    anchor: '95%',
                                                    width:100,
                                                    maxLengthText: 5
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'rt',
                                                    width: 50,
                                                    maxLengthText: 3

                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'rw',
                                                    width: 50,
                                                    maxLengthText: 3

                                                }
                                            ]
                                        }

                                    ]
                                }
                            ]
                        },
                        {
                            cls: 'x-plain',
                            title: 'Note',
                            frame: true,
                            layout: 'fit',
                            items: {
                                xtype: 'htmleditor',
                                name: 'note'
                            }
                        }
                    ]
                },
                {
                    xtype: 'checkbox',
                    name: 'status_id',
                    labelAlign: 'left',
                    fieldLabel: 'Active ?'
                }
            ],
            buttons: [
                {
                    text: 'Help',
                    itemId: 'help',
                    iconCls: 'help'
                },
                '->',
                {
                    text: 'Save',
                    itemId: 'save',
                    iconCls: 'save',
                    formBind: true
                },
//                {
//                    text: 'Reset',
//                    itemId: 'reset',
//                    iconCls: 'cancel'
//                },
                {
                    itemId: 'close',
                    iconCls: 'close',
                    text: 'Cancel'
                }
            ]
        },
        {
            xtype: 'container',
            title: 'History',
            html: 'History Buyer'
        },
        {
            xtype: 'container',
            title: 'Chart',
            html: 'Info Basic Buyer'
        }
    ]
});
