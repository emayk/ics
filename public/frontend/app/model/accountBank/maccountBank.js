/**
 * Model accountBank
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
Ext.define('App.model.accountBank.maccountBank', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'name',
        'bank_id',
        'number',
        'name',
        'owner_id',
        'owner_type',
        'type_id',
        'bankname',
        'banktype',
	    'currency_id',
	    'tax_id'
//        { name : 'bankname',mapping : 'bank.name'},
//        { name : 'banktype',mapping : 'type.name'}
    ],
    proxy: {
        type: 'rest',
        url: getApiUrl() +'/bankaccount',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});
