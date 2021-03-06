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


Ext.define('App.form.combobox.cbcurrsp', {
    alias : 'widget.cbcurrsp',
    extend: 'Ext.form.ComboBox',
    queryMode: 'remote',
    pageSize : 10,
    // queryMode: 'remote',
    fieldLabel : 'Choose Currency',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    // forceSelection : true,
    emptyText: 'Select Currency',
    store : 'App.store.combo.currsp',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
        this.callParent(arguments);
    }
});
