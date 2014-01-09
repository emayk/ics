Ext.define('App.view.menu.menus', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.mainmenus',

    border: 0,
    autoScroll: true,
    rootVisible: false,
    store: 'App.store.menu.menus',
     items: [
                { xtype: 'treepanel',store: 'App.store.menu.menus',
                columns: [
                        { xtype: 'treecolumn', header: 'Name', dataIndex: 'id', flex: 1 },
                        { xtype: 'treecolumn', header: 'Text', dataIndex: 'text', flex: 1 },
                        { xtype: 'treecolumn', header: 'Class Name', dataIndex: 'className', flex: 1 }
                    ]
                }
            ],
    // initComponent: function  () {
    //     this.callParent();
    // }
 singleExpand: true,
 dockedItems: [{ xtype: 'toolbar', items:[
     {xtype: 'button', text: 'Refresh',handler: function(btn){
        btn.up('mainmenus').getStore().reload();
     }
    }
 ]}
 ]
});
