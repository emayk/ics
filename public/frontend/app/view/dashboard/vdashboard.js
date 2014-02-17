/**
 * View dashboard
 *
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
 *
 *
 **/
Ext.define('App.view.dashboard.vdashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appdashboardvdashboard',
	layout: { type: 'vbox', align:'stretch'},
	bodyPadding: 5,
	frame: true,
	autoScroll: true,
	defaults:{
		margin: '0 0 5 0'
	},
    items: [
        {
	        flex:.5,
	        xtype: 'container',
	        layout: { type: 'hbox', align: 'stretch'},
	        items: [
		        {
			        xtype : 'panel',flex:.3,
			        title: 'Master',
			        bodyPadding: 10,
			        items:[
				        {
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        }
			        ]
		        },{
			        margin: '0 5 0 5',
			        xtype : 'panel',flex:.3,
			        title: 'Master',
			        bodyPadding: 10,
			        items:[
				        {
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        }
			        ]
		        },{
			        xtype : 'panel',flex:.25,
			        title: 'Master',
			        bodyPadding: 10,
			        items:[
				        {
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        }
			        ]
		        }
	        ]
        },
        {
	        flex:.5,
	        xtype: 'container',
	        layout: { type: 'hbox', align: 'stretch'},
	        items: [
		        {
			        xtype : 'panel',flex:.3,
			        title: 'Master',
			        bodyPadding: 10,
			        items:[
				        {
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        }
			        ]
		        },{
			        margin: '0 5 0 5',
			        xtype : 'panel',flex:.3,
			        title: 'Master',
			        bodyPadding: 10,
			        items:[
				        {
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        }
			        ]
		        },{
			        xtype : 'panel',flex:.25,
			        title: 'Master',
			        bodyPadding: 10,
			        items:[
				        {
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        },{
					        xtype: 'button', text: 'Produk'
				        }
			        ]
		        }
	        ]
        },



    ]
});
