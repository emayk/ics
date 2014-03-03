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
			'appprordervprorderview': {
//				render: function (panel) {
//					var fid = panel.down('appprordervprorderviewform [name=ponumber]');
//					var fnumber = panel.down('appprordervprorderviewform [name=id]');
//					log(fid);
//					log(fnumber);
////					var id = panel.poid,
////						number = panel.ponumber;
////					poidfield.setValue(id);
////					ponumberfield.setValue(number);
////					log(poidfield);
////					log(ponumberfield);
////					log('Panel',panel);
//				}
			},
			'appprordervprorderview > appprordervprorderviewgrid': {
				render: function (grid) {
					var panel = grid.up('appprordervprorderview');
					log('Main Panel dari grid', panel);
					if (panel) {
//						var poidfield = panel.down('appprordervprorderviewform [name=ponumber]');
//						var ponumberfield = panel.down('appprordervprorderviewform [name=id]');
////						var poidfield = mp.down('[name=poidpanel]');
////						var ponumberfield = mp.down('[name=ponumberpanel]');
//						log(poidfield);
//						log(ponumberfield);
//
////						var store = grid.getStore();
//						var id = poidfield.getValue();
//						log(id);
//						var number = ponumberfield.getValue();
//						log(number);
//						store.clearFilter();
//						store.getProxy().setExtraParam('orderid', id);
//						store.getProxy().setExtraParam('ordernumber', number);
//						store.load();
					} else {
						log('Main Panel tidak ada');
					}
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

	setupStoreOrderItem: function (id, number) {
		var store = Ext.create('App.store.prorder.sitem');
		store.clearFilter();
		store.getProxy().setExtraParam('orderid', id);
		store.getProxy().setExtraParam('ordernumber', number);
		store.load();
		return store;
	},

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
//			var store = Ext.create('App.store.prorder.sitem');
//			var listgrid = Ext.create('App.view.prorder.griditem', {
//				ponumber: ponumber,
//				poid: poid,
//				store: store
//			});
//			var formpanel = Ext.create('App.view.prorder.formview');
			var panel = Ext.create('App.view.prorder.view', {
//			var panel = Ext.create('App.view.prorder.griditem', {
				title: title,
				closable: true,
				ponumber: ponumber,
				poid: poid,
				storegrid: me.setupStoreOrderItem(poid,ponumber),
				record: record
			});

			var form = panel.down('appprordervprorderviewform');
			if (form) {
				form.getForm().loadRecord(record);
			}
//			var store = Ext.create('App.store.prorder.sitem');
//			var grid2 = panel.down('appprordervprorderviewgrid');
//			grid2.getProxy().setExtraParam('orderid', poid);
//			grid2.getProxy().setExtraParam('ordernumber', ponumber);
//			log(grid2.getStore().getProxy().extraParams);
//			var pg = grid.getPlugin('pgPoGrid' + panel.getId());//.moveFirst();
//			log(pg);

//			grid.reconfigure(store);
			newtab = tab.add(panel);
		}

		tab.setActiveTab(newtab);

//		App.util.box.openNewtab(tab, title, view, config);
	}
});

