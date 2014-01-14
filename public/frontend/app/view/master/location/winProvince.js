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

Ext.define('App.view.master.location.winProvince', {
    extend: 'Ext.form.Panel',
    alias : 'widget.masterlocationWinProvince',
    requires : [
        'App.view.master.location.frmProvince'
    ],
    items : [
        {
            xtype: 'masterlocationfrmProvince'
        }
    ],
    dockedItems: [
        {
            text : 'Help',
            itemId : 'help',
            iconCls : 'help'
//            handler : function() { belumImplement(); }
        },'->',
        {
            text : 'Save',
            itemId : 'save',
            iconCls : 'save'
        },{
            text : 'Close',
            itemId : 'cancel',
            iconCls : 'close',
//            handler : function(btn) { btn.up('form').close()}
        }
    ]
});
