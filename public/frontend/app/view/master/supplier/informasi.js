/**
*
* List / grid Supplier
*
* Menampilkan Semua Supplier
*
**/

Ext.define('App.view.master.supplier.informasi',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.infosupplierpanel',

    requires: ['Ext.toolbar.Toolbar'],

    // cls: 'preview',
    autoScroll: true,
    border: false,

    initComponent: function() {
        Ext.apply(this, {
            tpl: new Ext.XTemplate('<table>', '<tr>', '<td colspan="2">Information of {name}<td>', '</tr>', '<tr>', '<td>Address<td>','<td>{address}<td>', '</tr>', '</table>',
                '<div class="post-data">',
                    // '<span class="post-date">{pubDate:this.formatDate}</span>',
                    '<h3 class="post-title">Template Belum Selesai Di implementasikan</h3>',
                    // '<h4 class="post-author">by {author:this.defaultValue}</h4>',
                '</div>', {
                // '<div class="post-body">{address:this.getBody}</div>', {

                getBody: function(value, all) {
                    return Ext.util.Format.stripScripts(value);
                },

                defaultValue: function(v) {
                    return v ? v : 'Unknown';
                },

                formatDate: function(value) {
                    if (!value) {
                        return '';
                    }
                    return Ext.Date.format(value, 'M j, Y, g:i a');
                }
            }),

            // dockedItems: [{
            //     dock: 'top',
            //     xtype: 'toolbar',
            //     items: [{
            //         iconCls: 'tab-new',
            //         text: 'View in new tab',
            //         action: 'viewintab'
            //     }, {
            //         iconCls: 'post-go',
            //         text: 'Go to post',
            //         action: 'gotopost'
            //     }]
            // }]
        });

        this.callParent(arguments);
        log('Information loaded');
    }
});


// Ext.create('Ext.view.View', {
//     store: Ext.data.StoreManager.lookup('imagesStore'),
//     tpl: imageTpl,
//     itemSelector: 'div.thumb-wrap',
//     emptyText: 'No images available',
//     renderTo: Ext.getBody()
// });