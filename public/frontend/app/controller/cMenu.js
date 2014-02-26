/**
 *
 * Controller Menu
 *
 */
Ext.define('App.controller.cMenu', {
	extend: 'Ext.app.Controller',

	models: [
		"App.model.menu.Root",
		'App.model.menu.Item',
		'App.model.menu.menus',
		'App.model.menu.menusItem',
		'App.model.menu.menuEditor'
	],
	stores: [
		'App.store.Menu',
		'App.store.menu.menus'
	],
	views: [
		'App.view.security.UsersList',
		'App.view.menu.Accordion',
		'App.view.menu.Item',
		'App.view.menu.menus',
		'App.view.menu.vMenuEditor'
	],

	refs: [
		{ref: 'mainPanel', selector: 'mainpanel'},
		{ref: 'devmainPanel', selector: 'devmainpanel'},
		{ref: 'mainMenus', selector: 'mainmenus'},
		{ref: 'gridMenu', selector: 'vMenuEditor grid#gridMenu'},
		{ ref: 'formMenu', selector: 'vMenuEditor form#formEditor'},
		{ ref: 'toolRefresh', selector: 'mainmenu tool#refresh'}

	],

	init: function (application) {

		var me = this;
		me.control({
			/**
			 * Render Main Menu
			 *
			 * @at region West
			 */
			"mainmenu": {
				render: me.onPanelRender
			},
			/**
			 * Saat Refresh pada Main Menu
			 * @region West
			 * */
			'mainmenu tool#refresh': { click: me.refresh_data_menu },

			/**
			 * Generate Main Menu Item
			 */
			"mainmenuitem": {
				/**
				 * Saat Select
				 */
				select: me.onTreepanelSelect,
				/*Saat di click */
				itemclick: me.onTreepanelItemClick
			},
			/**
			 * Edit Menu
			 */
			"vMenuEditor grid#gridMenu": {
				selectionchange: me.selectMenuChange
			},
			/**
			 * Simpan Menu Form Edit
			 */
			'vMenuEditor form#formEditor toolbar #save': { click: me.onSave_FormMenu }

		});
		log('Menu');
	},

	refresh_data_menu: function (btn) {
		// this.getMenuStore().removeAll(true);
		// this.getMenuStore().load();
		this.onPanelRender();
	},
	/**
	 * Saat Pemilihan Menu Pada Grid Menu Editor
	 * @param grid
	 * @param sels
	 */
	selectMenuChange: function (grid, sels) {
		var me = this, rec = sels[0];
		me.getFormMenu().down('[name=id]').setReadOnly(true);
		me.getFormMenu().loadRecord(sels[0]);
	},
	/**
	 * Saat Simpan Form yang sudah diedit
	 * @param btn
	 */
	onSave_FormMenu: function (btn) {
		var me = this, f = btn.up('form#formEditor'),
			val = f.getValues(), rec = f.getRecord(),
			m = Ext.ModelManager.getModel('App.model.menu.menuEditor');

		log(m);
	},

//    onTreepanelItemClickMainMenus: function (treepanel, record, item, index, e, eOpts) {
//        var tp = Ext.ComponentQuery.query('mainmenus')[0];
//        log('treepanel component ', treepanel);
//        log('record ', record);
//        // log('item ', item);
//        log('index ', index);
//        log('Get Depth Record', record.get('depth'));
//
//        var sm = treepanel.getSelectionModel();
//        if (sm.hasSelection()) {
//            selectedRoot = sm.getSelection()[0];
//        }
//        ;
//
//        log('Selected Root : ', selectedRoot);
//        var id = record.get('id');
//
//        if (typeof id == 'undefined') return false;
//        if (typeof selectedRoot == 'undefined') return false;
//
//        log('Selected ID : ', selectedRoot.get('id'));
//        log('Selected depth : ', selectedRoot.get('depth'));
//        if (selectedRoot.get('depth') == '2') {
//            log('im depth 2 bray');
//            var parentId = selectedRoot.parentNode.get('index'),
//                childId = selectedRoot.get('index');
//            // return;
//        }
//
////        log('Parent ID : ', selectedRoot.get('parentId'));
////        log('Parent Index : ', selectedRoot.parentNode.get('index'));
//
//        // var item = Ext.ModelManager.getModel('App.model.menu.menusItem');
//        var item = Ext.ModelManager.getModel('App.model.menu.menus');
//        item.load(id, {success: function (items) {
//            Ext.each(items.children(), function (a) {
//                Ext.each(a.data.items, function (b, c) {
//                    var textC = b.get('text');
//                    var hasCreated = selectedRoot.findChild('id', b.get('id'));
//                    if (hasCreated == null) {
//                        var i = Ext.create('App.model.menu.menus', {
//                            text: b.get('text'),
//                            leaf: b.get('leaf') || true,
//                            iconCls: b.get('iconCls'),
//                            id: b.get('id'),
//                            className: b.get('className')
//                        });
//                        selectedRoot.appendChild(i);
//                    }
//                    ;
//                })
//            })
//
//        }, failure: function (o) {
//            msgError('Error Loading Menu ');
//        }
//        });
//        tp.getView().refresh();
//        selectedRoot.expand();
//    },

	/**
	 * Saat Render Panel Menu
	 * @param abstractcomponent
	 * @param options
	 */
	onPanelRender: function (abstractcomponent, options) {
		var me = this;
		me.getAppStoreMenuStore().load(function (records, op, success) {
			var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
			menuPanel.removeAll();
			Ext.each(records, function (root) {
				var menu = Ext.create('App.view.menu.Item', {
					title: root.get('text'),
					iconCls: root.get('iconCls')
				});

				Ext.each(root.items(), function (itens) {
					Ext.each(itens.data.items, function (item) {
						menu.getRootNode().appendChild({
							// text: translations[item.get('text')],
							text: item.get('text'),
							text: translations[item.get('text')] || item.get('text'),
							leaf: true,
							iconCls: item.get('iconCls'),
							id: item.get('id'),
							className: item.get('className')
						});
					});
				});
				menuPanel.add(menu);
			});
		});
	},

	onTreepanelSelect: function (selModel, record, index, options) {

		var mainPanel = this.getMainPanel();
		if (!mainPanel){
			mainPanel = this.getDevmainPanel();
		}
		var newTab = mainPanel.items.findBy(
			function (tab) {
				return tab.title === record.get('text');
			});

		if (!newTab) {
			newTab = mainPanel.add({
				xtype: record.raw.className,
				closable: true,
				iconCls: record.get('iconCls'),
				title: record.get('text')
			});
		}

		mainPanel.setActiveTab(newTab);
	},
	onTreepanelItemClick: function (view, record, item, index, event, options) {
		// log('onTreepanelItemClick Exe');
		this.onTreepanelSelect(view, record, index, options);
	}
});