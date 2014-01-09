Ext.define('App.controller.cMenu', {
    extend: 'Ext.app.Controller',

    models: [
    'menu.Root',
    'menu.Item',
    'menu.menus',
    'menu.menusItem',
    'menu.menuEditor',
    ],
    stores: [
    'Menu',
    'App.store.menu.menus',
    ],
    views: [
    'security.UsersList',
    'menu.Accordion',
    'menu.Item',
    'menu.menus',
    'menu.vMenuEditor',
    ],

    refs: [
        {ref: 'mainPanel', selector: 'mainpanel'},
        {ref: 'mainMenus', selector: 'mainmenus'},
        {ref: 'gridMenu', selector:'vMenuEditor grid#gridMenu'},
        { ref: 'formMenu', selector: 'vMenuEditor form#formEditor'},
        { ref: 'toolRefresh', selector: 'mainmenu tool#refresh'},

    ],

    init: function(application) {
        var me = this;
        me.control({
            "mainmenu": {
                render: me.onPanelRender
            },
            "mainmenuitem": {
                select: me.onTreepanelSelect,
                itemclick: me.onTreepanelItemClick
            },
            // "mainmenus" : {
            //     render: function(){ log('treepanel Render ');},
            //     // select: me.onClick_MainMenus
            //     itemclick: me.onTreepanelItemClickMainMenus
            // }
            "vMenuEditor grid#gridMenu" : {
                selectionchange: me.selectMenuChange
            },
            'vMenuEditor form#formEditor toolbar #save': { click: me.onSave_FormMenu },
            'mainmenu tool#refresh' : { click: me.refresh_data_menu }
        });
        log('cMenu initialize');
    },


    refresh_data_menu: function(btn){
        // this.getMenuStore().removeAll(true);
        // this.getMenuStore().load();
        this.onPanelRender();
    },
    selectMenuChange: function(grid,sels){
        var me = this, rec = sels[0];
        this.getFormMenu().down('[name=id]').setReadOnly(true);
        this.getFormMenu().loadRecord(sels[0]);
    },

    onSave_FormMenu: function(btn){
        var me = this, f = btn.up('form#formEditor'),
        val = f.getValues(), rec = f.getRecord();
        m = me.getMenuMenuEditorModel();
        log(m);
    },

    onTreepanelItemClickMainMenus: function( treepanel, record, item, index, e, eOpts ){
        var tp = Ext.ComponentQuery.query('mainmenus')[0];
        log('treepanel component ', treepanel);
        log('record ', record);
        // log('item ', item);
        log('index ', index);
        log('Get Depth Record', record.get('depth'));

        var sm = treepanel.getSelectionModel();
        if (sm.hasSelection()) {selectedRoot = sm.getSelection()[0]; };

        log('Selected Root : ',selectedRoot);
        var id = record.get('id');

        if (typeof id == 'undefined' ) return false;
        if (typeof selectedRoot == 'undefined' ) return false;

        log('Selected ID : ', selectedRoot.get('id'));
        log('Selected depth : ', selectedRoot.get('depth'));
        if (selectedRoot.get('depth') == '2') {
            log('im depth 2 bray');
            var parentId = selectedRoot.parentNode.get('index'),
                childId = selectedRoot.get('index');
            // return;
        }

        log('Parent ID : ', selectedRoot.get('parentId'));
        log('Parent Index : ', selectedRoot.parentNode.get('index'));

        // var item = Ext.ModelManager.getModel('App.model.menu.menusItem');
        var item = Ext.ModelManager.getModel('App.model.menu.menus');
        item.load(id,{success: function(items){
            Ext.each(items.children(),function(a){
                Ext.each(a.data.items,function(b,c){
                    var textC = b.get('text');
                    var hasCreated = selectedRoot.findChild('id',b.get('id') ) ;
                    if (hasCreated == null) {
                        var i = Ext.create('App.model.menu.menus',{
                            text: b.get('text'),
                            leaf: b.get('leaf') || true,
                            iconCls: b.get('iconCls'),
                            id: b.get('id'),
                            className: b.get('className')
                        });
                        selectedRoot.appendChild(i);
                    };
                })
            })
            // log(items.get('id'));
        }, failure: function(o){
            log('failure Loading');
        }
        });
        tp.getView().refresh();
        selectedRoot.expand();
    },

    create_child_level_2 : function(parentIdx,childIdx){
        log('Im receive parameters',parentIdx,childIdx);
        var treeNode = Ext.ComponentQuery.query('mainmenus')[0].getRootNode();
        treeNode.getChildAt(parentIdx).getChildAt(childIdx).appendChild({
        // id: 'gc13',
        text: 'Just Test ',
        leaf: true
        });
    },
    onClick_MainMenus: function(selModel, record, index, options) {
        log(selModel);
        log(record);
        log(index);
    },

    onClick_MainMenus2: function(selModel, record, index, options) {
        log(selModel);
        log(record);
        log(index);
        log(record.get('id'));
        if (!record) return false;
        var id = record.get('id');
        // 'App.model.menu.menus'
        var menuitems = Ext.ModelManager.getModel('App.model.menu.menus');
        // var menu = this.getMainMenus();
        var menuPanel = Ext.ComponentQuery.query('mainmenus')[0];
        var store = menuPanel.getStore();
        menuitems.load(id, {
            success: function(items){
                log(items.get('id') + items.get('text'));
                // Create Child
                log('Akan di looping dengan items sbb :');
                log(items.get('children'));
                // var records = items.get('children');
                var records = items.children();
                log(records);
                // log(items.children());
              // Ext.each(items.children(), function(itens){
              Ext.each(records, function(item,k){
                // Ext.each(itens.data.children, function(item){
                    // menu.getRootNode().appendChild({
                        // log(item.get('id'));
                        log(item.data);
                        log(item.data.items);
                        log(k);
                        Ext.each(item.data.items, function(i){

                            log(i.id);
                            log(i.get('id'));
                            log(i.get('text'));
                             // Ext.each(itens.data.items, function(item){
                        menuPanel.getRootNode().appendChild({
                        // text: translations[item.get('text')],
                        text: i.get('text'),
                        leaf: true,
                        iconCls: i.get('iconCls'),
                        id: i.get('id'),
                        className: i.get('className')
                    });
                // });
                    //         var iModel = Ext.create('App.model.menu.Item',{
                    //             title: i.get('text'),
                    //             iconCls: i.get('iconCls'),
                    //             // title: i.get('text'),

                    //         })
                    //         // store.getNodeById(id).appendChild(iModel);
                    // //     var iModel = Ext.create('App.model.menu.Item',{

                    // //         item.
                    // //     });
                    //         menuPanel.getRootNode().getChildAt(index).insertChild(iModel);
                    //         // menuPanel.getRootNode().getChildAt(index).insertChild({
                    //         //     text: item.text,
                                // text: item.get('text'),
                                // leaf: true,
                                // iconCls: item.get('iconCls'),
                                // id: item.get('id'),
                                // className: item.get('className')
                            // });
                        });
                // });
            });
                // Ext.each(records, function(root){
                //     log(root.get('id'));
                //     var menu = Ext.create('App.view.menu.Item',{
                //         title: root.get('text') ,
                //         iconCls: root.get('iconCls')
                //     });
                //     menuPanel.add(menu);
                // });
            },
            failure: function(items){
                log(record.get('id') + 'failure Loaded');
            }
        });

        return false;
        this.getMenuStore().load(function(records, op, success){
        var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];

        Ext.each(records, function(root){
            var menu = Ext.create('App.view.menu.Item',{
                // title: translations[root.get('text')],
                // title: root.get('text'),
                title: translations[root.get('text')] || root.get('text'),
                // stateId:'stmenuitem'+ root.get('text'),
                iconCls: root.get('iconCls')
            });
            //
            Ext.each(root.items(), function(itens){
                Ext.each(itens.data.items, function(item){
                    menu.getRootNode().appendChild({
                        // text: translations[item.get('text')],
                        // text: item.get('text'),
                        text: translations[item.get('text')] || item.get('text'),
                        leaf: true,
                        iconCls: item.get('iconCls'),
                        id: item.get('id'),
                        className: item.get('className')
                    });
                });
            });
            //
                menuPanel.add(menu);
            });
        });

    },

    onPanelRender: function(abstractcomponent, options) {
    this.getMenuStore().load(function(records, op, success){
        var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
        menuPanel.removeAll();
        Ext.each(records, function(root){
            var menu = Ext.create('App.view.menu.Item',{
                title: root.get('text'),
                iconCls: root.get('iconCls')
            });

            Ext.each(root.items(), function(itens){
                Ext.each(itens.data.items, function(item){
                    menu.getRootNode().appendChild({
                        // text: translations[item.get('text')],
                        text: item.get('text'),
                        text: translations[item.get('text')] || item.get('text') ,
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

    onTreepanelSelect: function(selModel, record, index, options) {
        var mainPanel = this.getMainPanel();
        var newTab = mainPanel.items.findBy(
        function (tab){
            return tab.title === record.get('text');
        });

        if (!newTab){
            newTab = mainPanel.add({
                xtype: record.raw.className,
                closable: true,
                iconCls: record.get('iconCls'),
                title: record.get('text')
            });
        }

        mainPanel.setActiveTab(newTab);
    },
    onTreepanelItemClick: function(view, record, item, index, event, options){
        // log('onTreepanelItemClick Exe');
        this.onTreepanelSelect(view, record, index, options);
    },

});