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

Ext.define('App.controller.cprorder', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.prorder.vprorder',
		'App.view.prorder.view',
		'App.view.prorder.griditem',
		'App.view.prorder.formview'
	],
	models: [
		'App.model.prorder.mprorder',
		'App.model.prorder.item'
	],
	stores: [
		'App.store.prorder.sprorder',
		'App.store.prorder.sitem'
	],
	init: function () {
		var me = this;
		me.listen({
			component: {
				'appdashboardvdashboard button[action=openlistpo]': {
					/**
					 * Fire event untuk Dashboard List Adjustment PR dari dashboard
					 */
					'click': me.openListPoFromBtnDashboard
				}
			}
		});

		me.control({
			'appprordervprorder #gridlistpoaktif ': {
				itemdblclick: function (grid, record, item, index, e, eOpts) {
					me.openViewPO(grid, record);
				}
			},
			/**
			 * Grid Preview Order
			 */
			'appprordervprorderview > appprordervprorderviewgrid': {
				render: function (grid) {
					var panel = grid.up('appprordervprorderview');
				}
			}
		});
	},
	openListPoFromBtnDashboard: function (btn) {
		var tab = btn.up('tabpanel');
		if (!tab) {
			tab = btn.up('mainpanel');
			if (!tab) {
				tab = btn.up('devmainpanel');
			} else {
				Ext.Error.raise('Tab Komponent tidak diketemukan');
			}
		}
		var title = 'Daftar PO',
			config = {
				iconCls: 'grid', closable: true, title: title
			};
		App.util.box.openNewtab(tab, title, 'App.view.prorder.vprorder', config);
	},
	/**
	 * Setup Store Order Item
	 * @param id
	 * @param number
	 * @returns {sitem|*}
	 */
	setupStoreOrderItem: function (id, number) {
		var store = Ext.create('App.store.prorder.sitem');
		store.clearFilter();
		store.getProxy().setExtraParam('orderid', id);
		store.getProxy().setExtraParam('ordernumber', number);
		store.load();
		return store;
	},
	/**
	 * Tampilkan PO
	 * @param grid
	 * @param record
	 * @returns {boolean}
	 */
	openViewPO: function (grid, record) {
		log('Results....');
		belumImplement();
		return false;
		var poid = record.get('id');
		var ponumber = record.get('ponumber');
		var title = 'Informasi Order [ ' + ponumber + ' ]';
		var me = this;
		var tab = grid.up('tabpanel');
		if (!tab) {
			tab = grid.up('mainpanel');
			if (!tab) {
				tab = grid.up('devmainpanel');
			} else {
				Ext.Error.raise('Tab Komponent tidak diketemukan');
			}
		}

		var newtab = tab.items.findBy(function (t) {
			return t.title === title
		});

		if (!newtab) {
			var panel = Ext.create('App.view.prorder.view', {
				title: title,
				closable: true,
				ponumber: ponumber,
				poid: poid,
				storegrid: me.setupStoreOrderItem(poid, ponumber),
				record: record
			});

			var form = panel.down('appprordervprorderviewform');
			if (form) {
				form.getForm().loadRecord(record);
			}
			newtab = tab.add(panel);
		}
		tab.setActiveTab(newtab);
	}
});

