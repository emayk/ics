Ext.define('App.view.products.tab', {
    extend: 'Ext.tab.Panel',
    requires: [
        'App.view.products.ListPrd',
	    'App.view.typeproduct.vtypeproduct',
	    'App.view.catprod.vcatprod'

    ],
    alias: 'widget.productstab',
    activeTab: 0,
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