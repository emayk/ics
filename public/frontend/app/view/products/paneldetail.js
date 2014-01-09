Ext.define('App.view.products.paneldetail',{
    alias : 'widget.panelDetail',
    extend: 'Ext.panel.Panel',
    initComponent: function() {
        Ext.apply(this, {
            cls: 'item-ct',
            flex: 2,
            border: false,
            autoScroll: true,
            layout: {
                type : 'vbox',
                align: 'stretch'
            },

            items: [

//                {
//                xtype: 'image',
//                itemId: 'imgCt',
//                src: Ext.BLANK_IMAGE_URL,
//                margin: '0 20 0 0',
//                width : 250,
//                height: 308
//                },
                {
                xtype: 'component',
                tpl: [
//                    '<div>{id}</div>',
                    '<div>{name}</div>',
                    '<div>{contruction}</div>',
                    '<div>{nodesign}</div>',
                    '<div>{weight}</div>',
                    '<div>{width}</div>',
                    '<div>{created_at}</div>',
                    '<div>{updated_at}</div>',
                    '<div>{uuid}</div>'
                ],
                itemId: 'product',
//                width: 500,
                border: false
            },{
                xtype: 'component',
                tpl: [
                    '<div class="name">Category : {name}></div>'
                ],
                itemId: 'category',
//                width: 500,
                border: false
            },{
                xtype: 'component',
                tpl: [
                    '<div class="name">Type : {name}</div>'
                ],
                itemId: 'type',
//                width: 500,
                border: false
            },{
                xtype: 'component',
                tpl: [
                    '<div class="name">Type : {name}</div>'
                ],
                itemId: 'type',
//                width: 500,
                border: false
            }
            ]
        });

        this.callParent(arguments);
    },

    /**
     * Binds a record to this view
     */
    bind: function(record) {
        log(record);
//        this.child('#imgCt').setSrc(record.get('image'));
        this.child('#product').update(
            record.getData()
        );
        this.child('#category').update(
            record.getCat().getData()
        );

        this.child('#type').update(
            record.getType().getData()
        );
    }
});