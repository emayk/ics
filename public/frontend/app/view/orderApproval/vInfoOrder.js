/**
*
* View orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
* Description View  vInfoOrder
*
*
**/

Ext.define('App.view.orderApproval.vInfoOrder', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.vInfoOrder',
    initComponent: function() {
        Ext.apply(this, {
            cls: 'item-ct',
            flex: 2,
            border: false,
            autoScroll: true,
            layout: {
                // type : 'hbox',
                // align: 'middle',
                type : 'vbox',
                align: 'stretch',
                pack : 'center',
                availableSpaceOffset: Ext.getScrollbarSize().width
            },

            items: [
            {
                xtype: 'image',
                itemId: 'imageProduct',
                // src: Ext.BLANK_IMAGE_URL,
                src: picturex(),
                margin: '10 10 10 10',
                flex: 2,
                // width : 250,
                // height: 308
            },
            { xtype: 'container', height : 10},
            {
                xtype: 'component',flex: 5,
           //      tpl: [
           //          // '<div class="name">{name} <span>${price}</span></div>',
           //          // '<div class="author">By {author}</div>',
           //          // '<div class="detail">{detail}</div>'
           //          '<div class="author">No Transaksi {trx_no}</div>',
										 // '<div class="name">{order_no} <span>${price}</span></div>',
           //          '<div class="author">status {status}</div>',
           //          // '<div class="detail">{detail}</div>'
           //      ],
                tpl: new Ext.XTemplate(
           //          '<div class="author">No Transaksi {trx_no}</div>',
										 // '<div class="name">No Order <span>order_no</span></div>',
										 // '<div class="name">Total Items <span>{count_items}</span></div>',
           //          '<div class="author">status {status:this.status}</div>'
                    // '<div class="detail">{detail}</div>'
                '<tpl for=".">',
                //     '<div class="review {[xindex === 1 ? "first-review" : ""]}">',
                //         '<div class="title">{title} {[this.stars(values)]}</div>',
                //         '<div class="author">By <span>{author}</span> - {date}</div>',
                //         '<div class="comment">{comment}</div>',
                //     '</div>',
                    '<div class="author">No Transaksi {trx_no}</div>',
										 '<div class="name">No Order <span>order_no</span></div>',
										 '<div class="name">Total Items <span>{count_items}</span></div>',
                    '<div class="author">status {status:this.status}</div>',
                '</tpl>',
                {
                    status: function(v){
                        // log(v);
                        return v;
                    }
                }
                // {
                //     stars: function(values) {
                //         var res = [],
                //             extension = Ext.isIE6 ? 'gif' : 'png',
                //             i = 0;

                //         //print out the stars for each of the ratings
                //         for (; i < values.rating; i++) {
                //             res.push('<img src="./resources/images/star.', extension, '" />');
                //         }

                //         //print out transparent stars for the rest (up to 5)
                //         while (i < 5) {
                //             res.push('<img src="./resources/images/star_no.', extension, '" />');
                //             i++;
                //         }

                //         return res.join('');
                //     }
                // }
            // ) }
								),
                itemId: 'contentDetail',
                // width: 500,
                // border: false
            }]
        });

        this.callParent(arguments);
    },

    /**
     * Binds a record to this view
     */
    bind: function(record) {
	    	// log(record);
        // this.child('#imageProduct').setSrc(record.get('image'));
        this.child('#contentDetail').update(record.getData());
    }
});