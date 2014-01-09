Ext.define('App.store.menu.Masters',{
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            // { text: "Home", leaf: true ,expanded:true,id: 0},
            { text: "Master", leaf: false ,expanded:true, id: 1, iconCls : 'icon-save' ,
                children:[
                /*==========  Yang Dicomment Yang Sudah Selesai  ==========*/

                        { text: "Legalitas", leaf: true ,id: 11 ,iconCls : 'icon-legalitas'},
                        { text: "User\'s", leaf: true ,id: 12},
                        { text: "Bank\'s", leaf: true ,id: 13},
                        { text: "Contact Person", leaf: true ,id: 14},
                        { text: "Departement", leaf: true ,id: 15},
                        { text: "Product Grade", leaf: true ,id: 16},
                        { text: "Warehouse", leaf: true ,id: 17},
                        { text: "Currency", leaf: true ,id: 18},
                        { text: "Color", leaf: true ,id: 19},
                        { text: "Type Order", leaf: true ,id: 20},
                        { text: 'Location', leaf: false,expanded: false,id:21,
                        children:[
                            { text: "Country", leaf: true ,id: 22},
                            { text: "Province", leaf: true ,id: 23},
                            { text: "City", leaf: true ,id: 24},
                            ]
                        },
                        { text: 'Office', leaf: false,expanded: true,id:25,
                        children:[
                            { text: "Head", leaf: false ,expanded: true,id: 26,
                                children: [
                                { text : "HO > Supplier", leaf: true, id: 27 },
                                { text : "HO > Buyer", leaf: true, id: 28 }
                                ]
                            },
                            { text: "Branch", leaf: false,expanded: false ,id: 29,
                            children: [
                                { text : "BO > Supplier", leaf: true, id: 30 },
                                { text : "BO > Buyer", leaf: true, id: 31 }
                                ]
                            },
                            { text: "Products", leaf: true ,id: 32},

                            ]
                        },
                        { text: "Supplier", leaf: true ,id: 33},


            ]},
        ]
    }
});

