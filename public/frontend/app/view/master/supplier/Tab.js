/**
*
* Tab Supplier
*
* menampilkan List Supplier dengan tambahan Informasi Account Bank,
*
**/
Ext.define('App.view.master.supplier.Tab',{
    extend : 'Ext.tab.Panel',
    alias: 'widget.tabSupplier',
     activeTab: 1,
    layout : { type : 'fit', align : 'stretch' },
    items : [
    { padding : 10, xtype: 'panel', title : 'Supplier',
    // layout: {type : 'vbox', align: 'stretch' },
    layout: 'border',
    flex: 1,
        items:[
            {xtype: 'gridSuppliers', flex: 2 , region : 'center'},
            // {xtype: 'container', height: 10 },
            {flex: 3, xtype: 'tabpanel', activeTab: 0, region: 'south', collapsible: true, title: 'Informasi Detail Supplier',
                items: [
                    {title : 'Informasi',xtype:'infosupplierpanel',html: 'Tidak Ada Informasi tentang Supplier' },
                    {xtype:'gridrekening', title : 'Account Bank',disabled: true },
                    {xtype:'gridsuppliercontactperson',disabled: true },
                    {xtype: 'tabofficessupplier',disabled: true }
                ]
            }

    ]},

    ]
 });



/**
*
* Tab Supplier
*
* menampilkan List Supplier dengan tambahan Informasi Account Bank,
*
**/
// Ext.define('App.view.master.supplier.Tab',{
//     extend : 'Ext.tab.Panel',
//     alias: 'widget.tabSupplier',
//      activeTab: 1,
//     layout : { type : 'fit', align : 'stretch' },
//     items : [
//     { padding : 10, xtype: 'panel', title : 'Supplier', layout: {type : 'vbox', align: 'stretch' }, flex: 1,
//         items:[
//             {xtype: 'gridSuppliers', flex: 2 },
//             {xtype: 'container', height: 10 },
//             {flex: 3, xtype: 'tabpanel', activeTab: 0,
//                 items: [
//                     {title : 'Informasi',xtype:'infosupplierpanel',html: 'Tidak Ada Informasi tentang Supplier' },
//                     {xtype:'gridrekening', title : 'Account Bank',disabled: true },
//                     {xtype:'gridsuppliercontactperson',disabled: true },
//                     {xtype: 'tabofficessupplier',disabled: true }
//                 ]
//             }

//     ]},
//         // { xtype: 'wizardSupplier' , title :'Wizard Add Form', closable: true}
//     ]
//  });