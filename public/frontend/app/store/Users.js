Ext.define('App.store.Users',  {
    extend: 'Ext.data.Store',
    model: 'App.model.User',
    proxy: {
        type: 'rest',
        url : '/api/users',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
        // ,
        // writer: {
        //         type: 'json'
        //     }
    },
    // listeners: {
    //     // load: function(store){
    //     //     var rec = { abbr: '', name: '-' };
    //     //     store.insert(0,rec);
    //     // }
    // }


});