
Ext.define('App.view.file.TreeFilePanel',{
				alias : 'widget.treefilepanel',
                title: 'List Source Code',
                extend : 'Ext.tree.Panel',
                rootVisible: false,
                store: new Ext.data.TreeStore({
                    proxy: {
                        type: 'ajax',
                        url: 'app/home/app/data/get-node-files.php'

                    },
                    root: {
                        text: 'Folder Root',
                        // id: 'public',
                        id: 'Sites',
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
                initComponent: function(){
                	this.callParent();
                }
            }
);