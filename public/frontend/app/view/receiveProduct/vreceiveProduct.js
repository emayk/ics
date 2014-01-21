/**
 * View receiveProduct
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
Ext.define('App.view.receiveProduct.vreceiveProduct', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appreceiveProductvreceiveProduct',
    padding : 10,
    frame: true,
    items: [
        {
            xtype: 'form',
            itemId: 'formreceive',
            items:[
                /*Surat Jalan*/
                { xtype: 'textfield', fieldLabel:'Document Permit', name:'nosj'},
                { xtype: 'datefield', fieldLabel:'Date', name:'datereceive'},
                { xtype: 'textfield', fieldLabel:'Document Permit', name:'nosj'},
                { xtype: 'textfield', fieldLabel:'Document Permit', name:'nosj'},
                { xtype: 'textfield', fieldLabel:'Document Permit', name:'nosj'}
            ]
        }
    ]
});
