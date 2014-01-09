/**
*
* Phone Supplier
*
**/


Ext.define('App.view.master.supplier.ListPhones',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridPhonesSupplier',
    title : 'Phones',
    store: 'App.store.supplier.sPhones',
    emptyText : 'Belum ada Nomor Telp Yang di Input',

    columns: [
            {
                xtype: 'rownumberer'
            },
            {
                header: 'Nomor Telp',
                dataIndex : 'telp',
                flex: 1,

            },
            ],
	columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [{ xtype: 'vActionBtn' }, {   xtype: 'pagingtoolbar', id: 'PgPhonesSupplier', dock:'bottom', store: 'App.store.supplier.sPhones', displayInfo: true } ],

});
