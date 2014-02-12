if (fromLocal()) {
	itemsMainPanel = [
		{ xtype: 'appdashboardvdashboard', title: 'Dashboard', iconCls: 'home', closable: false},
        { xtype : 'appapproveprvapprovepr', title: 'Persetujuan Pengajuan Pembelian', iconCls:'home', closable:true},
//        { xtype : 'appcheckgoodvcheckgood', title: 'Cek Barang', iconCls:'home', closable:true},
//        { xtype : 'appreceiveProductvtabbarang', title: 'Terima Barang', iconCls:'home', closable:true},
//        { xtype : 'appreturgoodvreturgood', title: 'Retur Barang', iconCls:'home', closable:true},
//		{ xtype: 'appcontrabonvcontrabon', title: 'Tukar Kontra Bon', iconCls: 'home', closable: true},
//		{ xtype: 'apppaymentvpayment', title: 'Pembayaran', iconCls: 'home', closable: true},
//		{ xtype: 'appusersvusers', title: 'Pengguna dan Hak Akses', iconCls: 'home', closable: true},
//        { xtype : 'appSuppliersvSuppliers', title: 'Suppliers', iconCls:'home', closable:true},
//        { xtype : 'appcommisionsalevcommisionsale', title: 'Komisi Penjual', iconCls:'home', closable:true},
//        { xtype : 'appcreditnotevcreditnote', title: 'Credit Note', iconCls:'home', closable:true},
//        { xtype : 'appcheckdeniedvcheckdenied', title: 'Cek Tolak', iconCls:'home', closable:true},
//        { xtype : 'appreceivepaymentvreceivepayment', title: 'Terima Pembayaran', iconCls:'home', closable:true},
//        { xtype : 'appreceivedpvreceivedp', title: 'Terima Uang Muka', iconCls:'home', closable:true},
//        { xtype : 'appinsoutgoodvinsoutgood', title: 'Intruksi Keluar Barang', iconCls:'home', closable:true},

//        { xtype : 'appsalesvsales', title: 'Penjualan', iconCls:'home', closable:true},
//        { xtype : 'appdebitnotevdebitnote', title: 'Debit Note', iconCls:'home', closable:true},

//        { xtype : 'appPOvPO', title: 'PO', iconCls:'home', closable:true},
//		{ xtype : 'appdefaultsettingvdefaultsetting', title: 'Setting Awal', iconCls:'home', closable:true},
//		{ xtype : 'appstandintructionvstandintruction', title: 'Standing Intruction', iconCls:'home', closable:true},
//		{ xtype : 'appcontactpersonvcontactperson', title: 'Contact Person Simulate', iconCls:'home', closable:false},
//		{ xtype : 'apptaxtypevtaxtypeLists', title: 'Tipe Pajak', iconCls:'home', closable:false},
//		{ xtype : 'appcatprodvcatprod', title: 'Kategory Produk', iconCls:'home', closable:false},
//		{ xtype : 'apptypeproductvtypeproduct', title: 'Type Product', iconCls:'home', closable:false},
//		{ xtype : 'appfabrictypevfabrictype', title: 'Type Fabric', iconCls:'home', closable:false},
//		{ xtype : 'apptypesupbuyvtypesupbuy', title: 'Type Supplier and Buyer', iconCls:'home', closable:false},
//        { xtype : 'tabbank', title: 'Bank', iconCls:'home', closable:false},
//        { xtype : 'tabscolor', title: 'Warna', iconCls:'home', closable:false},
//		{ xtype: 'appofficesvoffices', title: 'Office', iconCls: 'home', closable: false},
//		{ xtype: 'appcatprodtreegrid', title: 'Master Category Product Tree', iconCls: 'home', closable: false},
//		{ xtype: 'appcatprodvcatprod', title: 'Master Category Product', iconCls: 'home', closable: false},
//		{ xtype: 'appunittypevunittype', title: 'Master Unit Type ', iconCls: 'home', closable: false},
//		{ xtype: 'gridAllunit', title: 'Master Unit', iconCls: 'home', closable: false},
//		{ xtype: 'apppositionvposition', title: 'Master Position', iconCls: 'home', closable: false},
//		{ xtype: 'vOrders', title: 'Orders', iconCls: 'home', closable: false},
//        { xtype : 'appreceiveProductvreceiveProduct', title: 'Receive Product', iconCls:'home', closable:false},
//        { xtype : 'appsaleProductvsaleProduct', title: 'Sale Product', iconCls:'home', closable:false},
//        { xtype : 'apptypepaymentvtypepayment', title: 'Type Payment', iconCls:'home', closable:false},

//        { xtype : 'apptypeAccountBankvtypeAccountBank', title: 'Type Account Bank', iconCls:'home', closable:false},


//        { xtype : 'masterlegalitasGridList', title: 'Legalitas', iconCls:'home', closable:false},
//        { xtype : 'productstab', title: 'Products', iconCls:'home', closable:false},
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
	activeTab: 1,
	plain: true,
	items: itemsMainPanel,
	plugins: [
		{
			ptype: 'tabscrollermenu',
			maxText: 15,
			pageSize: 5
		}
	]
//    items: [
//        { xtype : 'container', title: 'Home', iconCls:'home', closable:false}
//    ]
});