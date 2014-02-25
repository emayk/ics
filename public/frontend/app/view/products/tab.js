Ext.define('App.view.products.tab', {
    extend: 'Ext.tab.Panel',
    requires: [
        'App.view.products.ListPrd',
	    'App.view.typeproduct.vtypeproduct',
	    'App.view.catprod.vcatprod'

    ],
    alias: 'widget.productstab',
	layout: { type: 'fit', align: 'stretch'},
    activeTab: 3,
	defaults:{
		flex:1
	},
    items: [
        {
	        /*Product*/
            xtype: 'productList',
            iconCls: 'home',
            title: 'Daftar'
        },{
		    /*Kategori*/
		    title : 'Kategori',
		    xtype: 'appcatprodvcatprod'
	    },{
		    /*tipe*/
		    title : 'Tipe',
		    xtype: 'apptypeproductvtypeproduct'
	    },{
		    /*Test*/
		    title : 'Test Import',

		    xtype: 'productimport'
	    }
    ],
    plugins: [
        {
            ptype: 'tabscrollermenu',
            maxText: 15,
            pageSize: 5
        }
    ]
});