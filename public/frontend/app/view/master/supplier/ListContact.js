/**
*
* Contact Supplier
*
* Menampilkan Semua Contact Sesuai dengan Supplier yang ditentukan
*
**/
Ext.define('App.view.master.supplier.ListContact',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridsuppliercontactperson',
    title : 'Contact Person',
    store: 'App.store.supplier.sContacts',
    columns: [
            {xtype: 'rownumberer'},
            {width : 300, header: 'Name', dataIndex : 'name' },
            {width : 300, header: 'Position', dataIndex : 'position_name', },
            {width : 300, header: 'Divisi', dataIndex : 'departement_name', },
            {width : 300, header: 'nohp', dataIndex : 'nohp', },
            {width : 300, header : 'Email', dataIndex: 'email', },
            {width : 300, header : 'Fax Number', dataIndex: 'fax', },
            {width : 300, header : 'UUID', dataIndex: 'uuid', },
            {width : 300, header : 'Create By', dataIndex: 'updater_name', },
            {width : 300, header : 'Last Update By', dataIndex: 'creator_name', },
    ],
    columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [{xtype: 'vActionBtn'}, {   xtype: 'pagingtoolbar', id: 'PgContactsSupplier', dock:'bottom', store: 'App.store.supplier.sContacts', displayInfo: true } ],
    initComponent : function(){this.callParent(arguments); },
});


