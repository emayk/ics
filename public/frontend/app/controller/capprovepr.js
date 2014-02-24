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

Ext.define('App.controller.capprovepr', {
	extend: 'Ext.app.Controller',
	views: ['App.view.approvepr.vapprovepr',
		'App.view.approvepr.process'
	],
	models: [
		'App.model.approvepr.mapprovepr',
		'App.model.approvepr.mitem'],
	stores: [
		'App.store.approvepr.sapprovepr',
		'App.store.approvepr.sapprovepraggree',
		'App.store.approvepr.sapproveprdenied',
		'App.store.approvepr.items'

	],
	init: function () {
		var me = this;
		me.control({
			'appapproveprvapprovepr > tabpanel #listpr': {
				render: function (grid) {
					grid.getStore().load();
				}
			},
			'appapproveprvapprovepr > tabpanel #listprapprove': {
				render: function (grid) {
					grid.getStore().load();
				}
			},
			'appapproveprvapprovepr > tabpanel #listprdenied': {
				render: function (grid) {
					grid.getStore().load();
				}
			},
			/*Panel Proses Approve PR (Single)*/
			'appapproveprvprocess': {
				/**
				 * Saat Render Lakukan Setup Proxy dengan Parameter.
				 * @param panel
				 */
				render: function (panel) {
//					log('render process pr');
				}
			},
			'appapproveprvprocess #listsproduct': {
				/**
				 * Saat Melakukan Edit
				 * @param editor
				 * @param o
				 */
				edit: function (editor, o) {
					log(o);
					var newVals = o.newValues;
					var oriVals = o.originalValues;
					var view = o.view;
					var store = o.store;
					var rec = o.record;
					var grid = o.grid;
					var panel = grid.up('appapproveprvprocess');
					var aprid = panel.getAprid();
					store.sync();
				}
			},
			/*Tombol Bantuan*/
			'appapproveprvprocess [action=help]': {
				click: function (btn) {
					me.fireEvent('clickedHelp');
				}
			},
			/*Tombol Approve PR*/
			'appapproveprvprocess [action=prapproved]': {
				/*Proses Simpan ke Server dan Setting Status Approve */
				click: function (btn) {
					me.fireEvent('approvePrFromButton', btn);
				}
			},
			/*Tombol Denied PR*/
			'appapproveprvprocess [action=prdenied]': {
				click: function (btn) {
					me.fireEvent('deniedPrFromButton', btn);
					/*Notice dialog*/

				}},
			/*Tombol Close*/
			'appapproveprvprocess [action=close]': {
				click: function (btn) {
					var panel = btn.up('appapproveprvprocess');
					var tab = panel.up('tabpanel');
					tab.remove(panel);
				}
			}
		});
	}
});

