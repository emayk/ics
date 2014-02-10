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


Ext.define('App.view.contacts.vForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.appcontactsform',
	requires:[
		'App.form.combobox.cbDept',
		'App.form.combobox.cbPositions'
	],
	config: {
		isReadonly: false,
		parentId : null,
		parenttype : null
	},
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			defaults: {
				anchor: '95%'
			},
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Nama',
					name: 'name',
					allowblank:false
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Keterangan',
					name: 'info'
				},{
					xtype: 'cbdept',
					fieldLabel: 'Divisi',
					name: 'dept_id'
				},{
					xtype: 'cbpositions',
					fieldLabel: 'Jabatan',
					name: 'pos_id'
				},{
					xtype: 'textfield',
					fieldLabel: 'Alamat Email',
					name: 'email',
					vtype:'email'
				},{
					xtype: 'textfield',
					fieldLabel: 'Nomor Telp',
					name: 'phone'
				},{
					xtype: 'textfield',
					fieldLabel: 'Nomor Fax ',
					name: 'fax'
				},{
					xtype: 'hiddenfield',
					name: 'parent_id' ,value: me.getParentId()
				},{
					xtype: 'hiddenfield',
					name: 'parenttype',value: me.getParenttype()
				}
			]
		});
		me.callParent(arguments);
	}
});
