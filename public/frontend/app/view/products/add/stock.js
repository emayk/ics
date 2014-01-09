
Ext.define('App.view.products.add.stock', {
    extend: 'Ext.panel.Panel'
    ,requires: ['Ext.panel.Panel']
    ,alias: 'widget.masterproductaddstock',
    items: [
        {
            xtype: 'container',
            title: 'Grid Stock'
        }
    ],
    bbar : [
        {
            text : 'Help',
            itemId : 'help',
            iconCls : 'help'
        },
        '->'
        ,{
            text : 'Save',
            itemId : 'save',
            iconCls : 'save'
        },
        {
            text : 'Cancel Add',
            itemId : 'cancel',
            iconCls : 'close',
            handler : function(btn){
                var panel = btn.up('masterproductaddstock');
                panel.close();
            }
        }
    ]
});
