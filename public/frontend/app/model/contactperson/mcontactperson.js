/**
 * Model contactperson
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
Ext.define('App.model.contactperson.mcontactperson', {
    extend: 'Ext.data.Model',
    fields: [ 'id', 'name',
	    /*Jabatan*/
	    'pos_id',
	    /*Divisi*/
	    'dept_id',
	    /*No Phone*/
	    'phone',
	    /*alamat Email */
	    'email',
	    'fax',
	    { name : 'posname', mapping : 'position.name'},
	    { name : 'deptname', mapping : 'departement.name'}
    ],
	proxy: {
		type: 'rest',
		url: getApiUrl() +'/contactperson',
		reader: {
			type: 'json',
			root: 'results',
			totalProperty: 'total'
		}
	}
});
