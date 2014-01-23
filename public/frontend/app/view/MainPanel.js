
if (fromLocal()) {
    // log('Hiding West Menu');
//    var m = myq('mainmenu');
//    if (typeof m !=='undefined') m.toggleCollapse();
//    log('Im From Local Just Create for Development Only');
    itemsMainPanel = [
        { xtype : 'vOrders', title: 'Orders', iconCls:'home', closable:false},
//        { xtype : 'appreceiveProductvreceiveProduct', title: 'Receive Product', iconCls:'home', closable:false},
//        { xtype : 'appsaleProductvsaleProduct', title: 'Sale Product', iconCls:'home', closable:false},
//        { xtype : 'apptypepaymentvtypepayment', title: 'Type Payment', iconCls:'home', closable:false},
//        { xtype : 'apptypesupbuyvtypesupbuy', title: 'Type Supplier and Buyer', iconCls:'home', closable:false},
//        { xtype : 'apptypeAccountBankvtypeAccountBank', title: 'Type Account Bank', iconCls:'home', closable:false},
//        { xtype : 'appfabrictypevfabrictype', title: 'Type Fabric', iconCls:'home', closable:false},
//        { xtype : 'apptypeproductvtypeproduct', title: 'Type Product', iconCls:'home', closable:false},
//        { xtype : 'masterlegalitasGridList', title: 'Legalitas', iconCls:'home', closable:false},
//        { xtype : 'productstab', title: 'Products', iconCls:'home', closable:false},
//        { xtype : 'appSuppliersvSuppliers', title: 'Suppliers', iconCls:'home', closable:false},
//        { xtype : 'apptaxtypevtaxtype', title: 'Tax Type', iconCls:'home', closable:false},
//        { xtype : 'appBuyersvBuyers', title: 'Buyer', iconCls:'home', closable:false},
//        { xtype : 'typeorderGridList', title: 'Type Order', iconCls:'home', closable:false},
//        { xtype : 'gudangGridList', title: 'Warehouse', iconCls:'home', closable:false},
//        { xtype : 'gradekainGridList', title: 'Fabric Grade', iconCls:'home', closable:false},
//        { xtype : 'currencyGridList', title: 'Currency', iconCls:'home', closable:false},
//        { xtype : 'masterlocationtab', title: 'Locations', iconCls:'home', closable:false},
//        { xtype : 'colorGridList', title: 'Colors', iconCls:'home', closable:false},
//        { xtype : 'bankListGrid', title: 'Banks', iconCls:'home', closable:false},
//        { xtype : 'masterdepartementtabs', title: 'Departements', iconCls:'home', closable:false}
    ];
} else {
    // log('Im From Outside Local');
    itemsMainPanel = [
        // { xtype:'cardimport',iconCls: 'home',title: 'Working On',closable : false},
        { xtype: 'container', iconCls: 'home', title: 'Home', closable: false
            // items: [
            // {xtype : 'button', text : 'Create Window',
            // handler : function(btn){
            //     var win;
            //     if (!win){
            //         var win = Ext.widget('winWizCreateOrder');
            //         win.show();
            //     }
            // }
            // }
            // ]
        }
        // { xtype:'cardimport',iconCls: 'home',title: 'Working On',closable : false},
        // { xtype:'formProfile',iconCls: 'home',title: 'Devel Wizard Supplier',closable : false},
        // { xtype:'vOrders',iconCls: 'home',title: 'Devel Wizard Supplier',closable : false},
        // { xtype:'wizardSupplier',iconCls: 'home',title: 'Devel Wizard Supplier',closable : false},
        // { xtype:'formContact',iconCls: 'home',title: 'Form Contact Person',closable : true},
        // { xtype:'tabSupplier',iconCls: 'home',title: 'Tab Supplier',closable : true}
    ];

}

Ext.define('App.view.MainPanel', {
    extend: "Ext.tab.Panel",
//    requires: [
//        'App.view.trx.order.TabOrder'],
    alias: 'widget.mainpanel',
    activeTab: 0,
    plain: true,
    items: itemsMainPanel,
    plugins: [{
        ptype: 'tabscrollermenu',
        maxText  : 15,
        pageSize : 5
    }]
//    items: [
//        { xtype : 'container', title: 'Home', iconCls:'home', closable:false}
//    ]
});