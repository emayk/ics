/**
 * Part Of ICS
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

Ext.define('App.controller.cstandintruction',{
	extend: 'Ext.app.Controller',
	views: ['App.view.standintruction.vstandintruction',
		'App.view.standintruction.winForm'
	],
	models:['App.model.standintruction.mstandintruction'],
	stores:['App.store.standintruction.sstandintruction'],
	init: function(){
		var me = this;
		me.control({
			'appstandintructionvstandintruction' : {

			},

			'appstandintructionvstandintruction grid#active > toolbar [action=add]' : {
				click: function(btn){
					var win;
					if (!win){
						win = Ext.create('App.view.standintruction.winForm',{
							modal: true
						});
						win.setTitle('Simulasi');
						win.show();
					}
				}
			}
		});
	}
});

