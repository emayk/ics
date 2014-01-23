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

Ext.define('App.view.master.location.tabs', {
    extend: 'Ext.panel.Panel',
    title: 'Master Location',
    autoScroll: true,
    alias: 'widget.masterlocationtab',
    activeTab: 0,
    layout : { type : 'hbox', align : 'stretch' },
    requires: [
        'App.view.master.location.ListCountries',
        'App.view.master.location.ListProvinces',
        'App.view.master.location.ListCities'
    ],
    items: [
        {
            xtype: 'listcountriesGP', itemId: 'countries',flex:.3,
            title: 'Locations Countries', iconCls: 'home', closable: false
        },
	    {
		    xtype: 'splitter'
	    },
        {
            xtype: 'listprovincesGP', itemId: 'provinces',flex:.3,
            title: 'Locations Province', iconCls: 'home', closable: false
        },
	    {
		    xtype: 'splitter'
	    },
        {
            xtype: 'listcitiesGP', itemId: 'cities',flex:.4,
            title: 'Locations Cities', iconCls: 'home', closable: false
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                '->',
                {
                    itemId: 'import',
                    iconCls: 'excel',
                    text: 'Export',
                    handler: function () {
                        belumImplement();
                    }
                } ,
                {
                    itemId: 'export',
                    text: 'Export', iconCls: 'excel',
                    handler: function () {
                        belumImplement();
                    }
                },
                {
                    itemId: 'help',
                    text: 'Help', iconCls: 'help',
                    handler: function () {
                        belumImplement();
                    }
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
    }

});