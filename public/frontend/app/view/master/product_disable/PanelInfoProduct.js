Ext.define('App.view.master.product.PanelInfoProduct',{
        extend: 'Ext.Panel',
        // register the App.BookDetail class with an xtype of bookdetail
        alias: 'widget.panelInfoProduct',
        // add tplMarkup as a new property
        tpl: [
            'Name : {name}',
            'Author: {Author}<br/>',
            'Manufacturer: {Manufacturer}<br/>',
            'Product Group: {ProductGroup}<br/>'
        ],
        // startingMarup as a new property
        startingMarkup: 'Please select Product',

        bodyPadding: 7,
        // override initComponent to create and compile the template
        // apply styles to the body of the panel and initialize
        // html to startingMarkup
        initComponent: function() {
            this.html = this.startingMarkup;
            // call the superclass's initComponent implementation
            this.callParent();
        }
    });