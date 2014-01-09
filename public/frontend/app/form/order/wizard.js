var navigate = function(panel, direction){
    var layout = panel.getLayout();
    layout[direction]();
    Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
    Ext.getCmp('move-next').setDisabled(!layout.getNext());
};

Ext.define('App.form.order.wizard', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.formWizardOrder',
    requires: [
    'Ext.layout.container.HBox',
    'App.form.order.step1',
    'App.form.order.step2',
    'App.form.order.gridproducts',
    'App.form.order.gridbasket',
    ],
    title: 'Wizard Form - Order',
    width: 300,
    height: 200,
    layout: 'card',
    bodyStyle: 'padding:15px',
    defaults: {
        // applied to each contained panel
        border: false
    },
    
    bbar: [
        {
            id: 'move-prev',
            text: 'Back',
            handler: function(btn) {
                navigate(btn.up("panel"), "prev");
            },
            disabled: true
        },
        '->', 
        {
            id: 'move-next',
            text: 'Next',
            handler: function(btn) {
                navigate(btn.up("panel"), "next");
            }
        }
    ],
    
    items: [{
        id: 'card-0',
        title: '<h1>Welcome to the Wizard!</h1><p>Step 1 of 3</p>',
        xtype : 'container',
        layout: 'anchor',
        frame : true,
        items : [
        {
            xtype: 'gridOrderproducts',
            height : 200,
            anchor: '100%'
        },
        {
            xtype : 'gridOrderBasket',
            anchor: '100%',
            height: 200,
        },
        {
            // xtype : 'gridOrderBasket',
            // anchor: '100%',
            html : 'Catatan : '+
            '<ul>' +
                '<li>Jika Pada Basket Product (kolom Qty == Please click me) maka silahkan masukan Qty yang akan dimasukan untuk Product tersebut</li>'+
                '<li>Semua Qty == 0 saat penutupan Order tidak akan dimasukan</li>'+
            '</ul>',
            xtype: 'container',
            anchor: '100%',

            height: 100,
        },

        ]

    },
    {
        id: 'card-1',
        title: '<p>Step 2 of 3</p>',
        // xtype : 'panel',
        frame : true,

        // items: [
        //     {
                xtype: 'frmOrderStep2'
        //     }
        // ]
    },
    {
        id: 'card-2',
        html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
    }],
    
});