/**
*
* List / grid Supplier
*
* Menampilkan Semua Supplier
*
**/

Ext.define('App.view.master.product.ListSuppliers',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridProdSuppliers',
    title : 'Suppliers',
    store: 'App.store.product.prodSuppliers',

    columns: [
            {   xtype: 'rownumberer'    },

            {
                header : 'status',
                dataIndex: 'status_id',
//                renderer: function(value, metaData, record, row, col, store, gridView){
                renderer: function(value, metaData, record){
                        var fontcolor = (value != 1) ? 'red' : 'green';
                        return '<span style="color:'+fontcolor+'">'+record.get('status')+'</span>';

                },
                tooltip : 'Status Supplier'

            },

            {
                header: 'Name',
                dataIndex : 'name'
            },

            {
                header: 'Post Code',
                dataIndex : 'codepos',
                flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 'None' : value;
                }
            },

            {
                header: 'NPWP',
                flex: 1,
                dataIndex : 'npwp',
                renderer: function(value){
                        return (value == '' ) ? 'None' : value;
                }
            },
            {
                header : 'fax',
                dataIndex: 'fax',
                flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 'None' : value;
                }
            },
            {
                header : 'email',
                dataIndex: 'email',
                flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 'Tidak Ada Email' : value;
                }
            },

            {
                header : 'plafon',
                dataIndex: 'plafon',
                flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 0 : value;
                }
            },
            {
                header : 'kredit',
                dataIndex: 'kredit',
                renderer: function(value){
                        return (value == '' ) ? 'None' :  value + ' days';
                }
            },

            {
                header : 'alamat',
                dataIndex: 'alamat',flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 'None' : value;
                }
            },


            {
                header : 'phone',
                dataIndex: 'phone',flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 'None' : value;
                }
            },
            {
                header : 'tipe',
                dataIndex: 'tipe_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('tipe');
                }
            },

            {
                header : 'legalitas',
                dataIndex: 'legalitas_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('legalitas');
                }
            },

            {
                header : 'typeprod',
                dataIndex: 'typeprod_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('tipeproduct');
                }
            },

            {
                header : 'Country',
                dataIndex: 'negara_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('country');
                }
            },

            {
                header : 'province',
                dataIndex: 'province_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('province');
                }
            },

            {
                header : 'city',
                dataIndex: 'city_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('city');
                }
            },

            {
                header : 'uuid',
                dataIndex: 'uuid',flex: 1,
                renderer: function(value){
                        return (value == '' ) ? 'No Have Uuid' : value;
                }
            },

            {
                header : 'createby',
                dataIndex: 'createby_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('creator');
                }
            },

            {
                header : 'lastupdateby',
                dataIndex: 'lastupdateby_id',flex: 1,
                renderer: function(value, metaData, record){
                        return record.get('updater');
                }
            }
    ],
    columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    // dockedItems: [
    //         {   xtype: 'toolbar',
    //             items: [
    //                     {   action: 'add', text: 'Add', tooltip : '' },
    //                     {   action: 'remove', text: 'Remove', disabled : true },
    //                     // {   action: 'addstock', text: 'Add Stock', disabled : true },
    //             ]
    //         },

    //         {   xtype: 'pagingtoolbar', id: 'PgProdSupplier', dock:'bottom', store: 'product.prodSuppliers', displayInfo: true }
    // ],
//    initComponent : function(){
//        this.callParent(arguments);
//    },
//    listeners : {render : function(){Ext.getStore(this.store).load(); } }
});