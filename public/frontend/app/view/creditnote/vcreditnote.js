/**
 * View creditnote
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
Ext.define('App.view.creditnote.vcreditnote', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appcreditnotevcreditnote',
	layout: { type: 'fit', align: 'stretch'},
    items: [

        {
	        xtype: 'tabpanel',
	        items: [
		        {
			        xtype: 'container',
			        title: 'Daftar',
			        html: 'Content Daftar Credit Note'
//			        dockedItems:[
//				        {
//					        xtype: 'toolbar',
//					        dock: 'top',
//					        items:[
//						        {
//							        text: translations.add,
//							        iconCls: 'add',
//							        action : 'Add'
//						        },
//						        {
//							        text: 'Cetak',
//							        iconCls: 'print',
//							        action : 'print'
//						        }
//					        ]
//				        }
//			        ]
		        },
		        {
			        xtype: 'container',
			        closable: true,
			        iconCls: 'add',
			        title: 'Form Buat Credit Note',
			        html: 'Content Pembuatan Credit Note'
		        },
		        {
			        xtype: 'container',
			        closable: true,
			        iconCls: 'print',
			        title: 'Cetak',
			        html: 'Content Cetak Credit Note '
		        }
	        ]
        }
    ]
});
