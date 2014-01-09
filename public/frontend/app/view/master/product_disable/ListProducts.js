Ext.define('App.view.master.product.ListProducts',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridProducts',
    requires : [ 'Ext.ux.DataTip',
    'App.store.combo.cbSuppliers',
    'App.form.UploadPictureProduct'
    ],
    title : 'All Product',
    store: 'App.store.product.MasterProducts',

    columns: [
            {
                xtype: 'rownumberer'
            },
            { header: 'ID', dataIndex: 'id', hidden: isDebug() },
            {
                header: 'Name',
                dataIndex : 'name',
                flex: 1,
                editor: { allowBlank: false }
            },
            {
                header: 'Design',
                dataIndex : 'nodesign',
                flex: .7,
                editor: {
                    allowBlank: true
                }
            },

            {
                header: 'Dimension',
                flex: .5,
                dataIndex : 'kontruksi',
                editor: {
                    allowBlank : true
                }
            },

            {
                header: 'Supplier',
                flex: 1,
                dataIndex : 'supplier_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                        return record.get('supname');
                },
                editor: {
                    xtype : 'combobox',
                    allowBlank: false,
                    displayField : 'name',
                    valueField: 'id',
                    value: 'supplier_id',
                    store : 'App.store.combo.cbSuppliers'
                    }

            },


            {
                header: 'Category',
                flex: 1,
                dataIndex : 'kategori_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                        return record.get('catname');
                },
                editor: {
                    allowBlank: false ,
                    xtype : 'combobox',
                    allowBlank: false,
                    displayField : 'name',
                    valueField: 'id',
                    value: 'kategori_id',
                    store : 'App.store.combo.cbCategory'
                }
            },


            {
                header: 'Type',
                flex: 1,
                dataIndex : 'tipe_id',
                renderer: function(value, metaData, record, row, col, store, gridView){
                        return record.get('typename');
                },
                 editor: {
                    allowBlank: false ,
                    xtype : 'combobox',
                    allowBlank: false,
                    displayField : 'name',
                    valueField: 'id',
                    value: 'tipe_id',
                    store : 'App.store.combo.cbTypeProduct'
                }
            },


            {
                header: 'Weight',
                flex: 1,
                dataIndex : 'berat',
                renderer: function(value, metaData, record, row, col, store, gridView){
                        return value + ' ' + record.get('beratName');
                }
            },


            {
                header: 'Width',
                flex: 1,
                dataIndex : 'lebar',
                renderer: function(value, metaData, record, row, col, store, gridView){
                        return value + ' ' + record.get('lebarName');
                }
            },


            // {
            //     header: 'URL',
            //     flex: 1,
            //     dataIndex : 'gambar_id',
            //     renderer: function(value, metaData, record, row, col, store, gridView){
            //             return record.get('urlpicture');
            //     }
            // },

            {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .7,
            items: [
            {
                // icon: '/assets/fugue/icons/cross-shield.png',
                iconCls:'delete',
                tooltip: 'Delete',
                padding : '0 10 0 10',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('pagingBank').doRefresh();

                            }
                            });
                    }
                },

                {
                icon: '/assets/fugue/icons/camera--arrow.png',
                tooltip: 'Edit Picture',
                handler: function(grid, rowIndex, colIndex) {
                            var record = grid.getStore().getAt(rowIndex);
                            log('im here , i will loaded form upload from here .... ');
                            var view = Ext.widget('frmUploadPictureProduct');
                                view.down('form').loadRecord(record);
                                view.show();
                        },
                    scope:this
                    }
                ]
        } ] ,
    columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [
    {
        xtype: 'toolbar',
        items: [{
                action: 'add',
                text: 'Add'
        },
        {
            action: 'remove',
            text: 'Remove',
            disabled : true
        },
        {
            action: 'addstock',
            text: 'Add Stock',
            disabled : true
        }

        ]
    },
    {
        xtype: 'pagingtoolbar',
        dock:'bottom',
        store: 'App.store.product.MasterProducts',
        displayInfo: true
    }]
//    ,
//    initComponent : function(){
//        this.callParent(arguments);
//        // Ext.getStore(this.store).load();
//        // this.addEvents('editImageProduct');
//    }
//    ,listeners : {render : function(){Ext.getStore(this.store).load(); } },
});