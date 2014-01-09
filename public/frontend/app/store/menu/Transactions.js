Ext.define('App.store.menu.Transactions',{
	// extend: 'Ext.data.Store',
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            { text: "Order", leaf: false ,expanded:true,id: 1,
                children:[
                /*==========  Yang Dicomment Yang Sudah Selesai  ==========*/

                        { text: "Invoice", leaf: true ,id: 2},
                        { text: "BPB", leaf: true ,id: 3},


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

