/**
*
* List Rekening Bank Supplier
*
* Menampilkan Semua Rekening Bank sesuai dengan Supplier yang diberikan
*
**/

Ext.define('App.view.master.supplier.ListRekeningBank',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridrekening',
    title : 'Rekening',
    store: 'App.store.supplier.sAccountbank',
    emptyText : 'No Account Bank ',
    columns: [
        {xtype: 'rownumberer'},
        { width: 100, header: 'Type', dataIndex : 'type_name'/*,  editor: { allowBlank: false },*/ },
        { width: 100,header: 'Account Number ', dataIndex : 'norek', },
        { width: 100,header: 'Account Name ', dataIndex : 'name', },
        { width: 300,header: 'Name Bank', dataIndex : 'bank_name', },
        { width: 300,header: 'Address Bank', dataIndex : 'bank_address', },
        { width: 150,header : 'Create By', dataIndex: 'creator_name', },
        { width: 150,header : 'Last Update By', dataIndex: 'updater_name'},
        { width: 300,header : 'UUID', dataIndex: 'uuid', },
    ],
    columnLines: true,
    selModel: 'rowmodel',
    /*==========  DockedItems  ==========*/
    dockedItems: [{ xtype: 'vActionBtn' }, {   xtype: 'pagingtoolbar', id: 'PgRekeningSupplier', dock:'bottom', store: 'App.store.supplier.sAccountbank', displayInfo: true } ],
    initComponent : function(){
        this.callParent(arguments);
    },
    // listeners : {
    //     render : function(){
    //         Ext.getStore(this.store).load();
    //         console.warn('ListRekeningBank Store saat render');
    //     }
    // },
});


