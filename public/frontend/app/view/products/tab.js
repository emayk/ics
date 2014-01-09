Ext.define('App.view.products.tab',{
    extend: 'Ext.tab.Panel',
    requires: [
        'App.view.products.ListPrd'
    ],
    alias : 'widget.productstab',
    items: [
        {
            xtype : 'productList',
            title : 'Products'
        }
    ],
    tbar : [
        {
            text: 'Add',
            itemId : 'add',
            iconCls: 'add'
        },
        {
            text: 'Remove',
            itemId : 'remove',
            iconCls: 'delete'
        },
        {
            text: 'test',
            itemId : 'stock',
            iconCls: 'delete'
        },
        '->',
        {
            text: 'Import',
            itemId : 'import',
            iconCls: 'excel',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.text + ' Not Implement Yet')
            }
        },
        {
            text: 'Export',
            itemId : 'export',
            iconCls: 'excel',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.text + ' Not Implement Yet')
            }
        },
        '-',
        {
            xtype: 'textfield',
            itemId: 'search-text',
            emptyText : 'Search Product'
        },
        {
            xtype: 'button',
            itemId: 'search-btn',
            textbtn: 'Search Button',
            iconCls: 'find',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.textbtn + ' Not Implement Yet')
            }

        },
        '-',
        {
            text: 'Help',
            itemId : 'help',
            iconCls: 'help',
            handler: function(btn){
                // todo : implement btn product
                msgError(btn.text + ' Not Implement Yet')
            }
        }
    ]

});