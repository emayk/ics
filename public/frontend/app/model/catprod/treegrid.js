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

Ext.define('App.model.catprod.treegrid', {
	extend: 'Ext.data.TreeModel',
//	fields: [ 'id', 'task','duration','user','iconCls' ],
//	proxy: {
//		type: 'ajax',
//		url: '/packages/emayk/ics/json/treegrid.json'
//	}

		extend: 'Ext.data.Model',
		idProperty: 'postid',
		fields: [{
			name: "title",
			convert: undefined
		}, {
			name: "threadid",
			convert: undefined
		}, {
			name: "username",
			convert: undefined
		}, {
			name: "userid",
			convert: undefined
		},  {
			name: "dateline",
			type: 'date',
			dateFormat: 'timestamp'
		}, {
			name: "postid",
			convert: undefined
		}, {
			name: "forumtitle",
			convert: undefined
		}, {
			name: "forumid",
			convert: undefined
		}, {
			name: "replycount",
			type: 'int',
			convert: undefined
		}, {
			name: "lastpost",
			dateFormat: 'timestamp',
			convert: undefined
		}, {
			name: "excerpt",
			convert: undefined
		}]
});