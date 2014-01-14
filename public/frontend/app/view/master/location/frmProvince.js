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



Ext.define('App.view.master.location.frmProvince', {
    extend: 'Ext.form.Panel',
    alias : 'widget.masterlocationfrmProvince',
    defaults: {
        xtype : 'textfield',
        anchor : '95%',
        widthLabel : 100
    },
    items: [
        {
            emptyText: 'name',
            name : 'name'
        },
        {
            xtype: 'textfield',
            name : 'info'
        },
        {
            xtype : 'combobox',
            store : Ext.create('Ext.data.Store',{
                fields : ['id','name'],
                data : [
                    {id : 1 , name : 'Indonesia' },
                    {id : 2 , name : 'America' }
                ]
            }),
            valueField : 'id',
            displayField: 'name'
        }
    ]
});
