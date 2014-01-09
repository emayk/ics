Ext.define('App.store.menu.menus',{
	// extend: 'Ext.data.Store',
    extend: 'Ext.data.TreeStore',
    // autoLoad: true,
    model: 'App.model.menu.menus',
    pageSize:30,
    // folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }],

    root: {
        name: 'Menu',
				 id: 'menu',
			 // id: 'menu',
        expanded: true
    },


    // listeners: {
    //     load: function (tree, node, records) {
    //         // log('After loading a node: ' , node);
    //         // if(node.get('checked')){
    //         //     node.eachChild(function (childNode){
    //         //         childNode.set('checked',true);
    //         //     });
    //         // }
    //     }
    // }








});