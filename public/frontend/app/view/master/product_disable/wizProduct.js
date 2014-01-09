/**
*
* Form Wizard Add Product
*
* Flow tambah Product
* 1. Add Information Basic
* 2. Tambah Detail Product
* 3. Tambah Stock Product (bisa lebih dari 1) dan Detailnya dalam 1 Page Card.
* 4. Finish
*
*
**/



Ext.define('App.view.master.product.wizProduct',{
    extend : 'Ext.panel.Panel',
    alias :'widget.formwizardproduct1',
    layout: 'card',
    requires: [ 'App.view.master.product.frmAddProduct'],
    bodyStyle: 'padding:15px',


    items: [

/*==========  Page Stock   ==========*/
        {
            /*page Stock Product */
            /*id: 'card-2',*/  itemId: 'pagestock',xtype : 'container',border: false,layout: { type : 'vbox',align: 'stretch'},
            items: [
                { xtype: 'container',html: '<h1>Step 4 of 5 : Stock Product </h1>',flex:.1 },
                { xtype:'container', flex: .3, layout: { type: 'hbox', align:'stretch'},
                    items: [
                        { xtype: 'frm_product_addstock',flex: .4,padding: 10,border:true, title: 'Form Stock'},
                        { xtype:'gridnewstockproduct', html: 'Grid Stock Yang Sudah Diinput', flex: .6}
                ] },

                { xtype:'container', flex: .3, layout: { type: 'hbox', align:'stretch'},
                    items: [
                        { xtype: 'frm_product_addstock',flex: .4,padding: 10,border:true, title: 'Form Add Detail Stock'},
                        { xtype:'gridNewStockProductItems', flex: .6}
                ]},
                { xtype:'container',items:[
                    {xtype: 'button', text: 'Prev',handler: function(){
                        log('Clicked Prev , Go To Product Detail')
                    } },
                    {xtype: 'button', text: 'Next',handler: function(){
                        log('Next, Go To Finish Page');

                    }}
                ]}

            ],
            // dockedItems: [{ xtype: 'button',text: 'Next', handler: function(){ log('Clicked');}}]
        },
/*==========  // Page Stock   ==========*/



/*==========  Add Product   ==========*/
        {   /*page Add Product */
            /*id: 'card-1',*/ itemId: 'pageproduct', xtype : 'container',border: false,layout: {type : 'vbox',align: 'stretch'},
            items: [
            { xtype: 'container',html: '<h1>Step 2 of 5 : Product </h1>',flex:.1 },
            {   xtype: 'frmAddProduct',flex: .9 } ]
        },
/*==========  //Add Product   ==========*/


        {
            /*page Product Detail */
            /*id: 'card-2',*/  itemId: 'pageproductdetail',xtype : 'container',border: false,layout: {type : 'vbox',align: 'stretch'},
            items: [
            { xtype: 'container',html: '<h1>Step 3 of 5 : Product Detail </h1>',flex:.1 },
            {   xtype: 'frmproductdetail',flex: .9 } ]
        },

        { /*page 4*/ /*id: 'card-2',*/  xtype : 'container',itemId: 'pagefinish',
            items:[
                    {xtype:'container',html: '<h1>Congratulations!</h1><p>Step 5 of 5 - Complete</p>' },
                    {xtype: 'button', text: 'Input Lagi',action:'readdproduct'},
        ] },


        {/*page 1*/ /*id: 'card-0',*/ itemId: 'pagewelcome',html: '<h1>Welcome to the Wizard!</h1><p>Step 1 of 5</p>', xtype : 'container',border: true, },
    ],

});