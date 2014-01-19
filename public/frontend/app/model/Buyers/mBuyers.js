/**
 * Model Buyers
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
Ext.define('App.model.Buyers.mBuyers', {
    extend: 'Ext.data.Model',
    fields: [
        "id",
        "name",
        "codepos",
        "npwp",
        "fax",
        "email",
        {name : "plafon",type : 'int'},
        {name : "kredit",type : 'int'},
        {name : "rt",type : 'int'},
        {name : "rw",type : 'int'},
        "address",
        "phone",
        "status_id",
        "tipe_id",
        "legality_id",
        "typeprod_id",
        "country_id",
        "province_id",
        "city_id",
        "note"
//        "uuid",
//        "createby_id",
//        "lastupdateby_id",
//        "codeinternal",
//        "created_at",
//        "updated_at"
    ],

    proxy: {
        type: 'rest',
        url: getApiUrl() + '/buyers',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }

});

