Ext.define('App.store.menu.Profiles',{
	// extend: 'Ext.data.Store',
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            { text: "Users", leaf: false ,expanded:true,id: 1,
                children:[
                /*==========  Yang Dicomment Yang Sudah Selesai  ==========*/

                        { text: "Change Password", leaf: true ,id: 2},
                        { text: "Logout", leaf: true ,id: 3, itemId: 'logout-program'},

                        // { text: 'Location', leaf: false,expanded: false,id:21,
                        // children:[
                        //     { text: "Country", leaf: true ,id: 22},
                        //     { text: "Province", leaf: true ,id: 23},
                        //     { text: "City", leaf: true ,id: 24},
                        //     ]
                        // },
            ]},
        ]
    }
});

