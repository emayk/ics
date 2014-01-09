Ext.define('App.view.file.TreeFile',{
    extend: 'Ext.container.Container',
    
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Ext.layout.container.HBox'
    ],
    xtype: 'tree-file',
    alias: 'widget.treefolder',
    
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    // height: 300,
    // width: 550,
    
    initComponent: function(){
        var group = this.id + '-ddgroup';
        
        Ext.apply(this, {
            items: [
            {
                title: 'List Source Code',
                // xtype: 'treepanel',
                xtype: 'treefilepanel',
                rootVisible: false,
                store: new Ext.data.TreeStore({
                    proxy: {
                        type: 'ajax',
                        url: 'app/home/app/data/get-node-files.php'

                    },
                    root: {
                        text: 'Folder Root',
                        id: 'Sites',
                        // id: 'public',
                        expanded: true
                    },
                    folderSort: true,
                    sorters: [{
                        property: 'text',
                        direction: 'ASC'
                    }]
                }),
                margin: '0 15 0 0',
                flex: 1,
                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        ddGroup: group,
                        appendOnly: true,
                        sortOnDrop: true,
                        containerScroll: true
                    }
                }
            }, 
            // {
            //     title: 'Custom Build',
            //     xtype: 'treepanel',
            //     store: new Ext.data.TreeStore({
            //         proxy: {
            //             type: 'ajax',
            //             url: 'app/home/app/data/get-node-files.php',
            //             extraParams: {
            //                 path: 'public'
            //             }
            //         },
            //         root: {
            //             text: 'Custom Ext JS',
            //             id: 'public',
            //             expanded: true,
            //             children: []
            //         },
            //         folderSort: true,
            //         sorters: [{
            //             property: 'text',
            //             direction: 'ASC'
            //         }]
            //     }),
            //     flex: 1,
            //     viewConfig: {
            //         plugins: {
            //             ptype: 'treeviewdragdrop',
            //             ddGroup: group,
            //             appendOnly: true,
            //             sortOnDrop: true,
            //             containerScroll: true
            //         }
            //     }
            // }
            ]
        });
        this.callParent();
    }
});