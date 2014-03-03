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



Ext.define('App.view.prorder.formview', {
	extend: 'Ext.form.Panel',
	alias: 'widget.appprordervprorderviewform',
	iconCls: 'grid',
	itemId: 'formpo',
	layout: { type: 'vbox', align: 'stretch'},
	items: [
		{ xtype: 'hiddenfield', fieldLabel: '', name: 'id'},
		{ xtype: 'displayfield', fieldLabel: 'No PO', name: 'ponumber'},
		{ xtype: 'displayfield', fieldLabel: 'Pemasok', name: 'supplier'}
	]
});