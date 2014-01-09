/**
*
* List / grid Supplier
*
* Menampilkan Semua Supplier
*
**/
Ext.define('App.view.master.supplier.ListSupplier',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridSuppliers',
    title : 'Suppliers',
    store: 'App.store.supplier.sSuppliers',
    defaults : {width :  300, },
    columns: [
        {xtype: 'rownumberer'},
        {header : 'status', dataIndex: 'status_id', renderer: function(value, metaData, record, row, col, store, gridView){var fontcolor = (value != 1) ? 'red' : 'green'; return '<span style="color:'+fontcolor+'">'+record.get('status')+'</span>'; }, tooltip : 'Status Supplier'},
        {header: 'Name', dataIndex : 'name', },
        {header: 'Post Code', dataIndex : 'codepos', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'None' : value; }, },
        {header: 'NPWP', dataIndex : 'npwp', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'None' : value; }, },
        {header : 'fax', dataIndex: 'fax', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'None' : value; }, },
        {header : 'email', dataIndex: 'email', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'Tidak Ada Email' : value; }, },
        {header : 'plafon', dataIndex: 'plafon', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 0 : value; }, },
        {header : 'kredit', dataIndex: 'kredit', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'None' :  value + ' days'; }, },
        {header : 'alamat', dataIndex: 'alamat', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'None' : value; }, },
        {header : 'phone', dataIndex: 'phone', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'None' : value; }, },
        {header : 'tipe', dataIndex: 'tipe_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('tipe'); }, },
        {header : 'legalitas', dataIndex: 'legalitas_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('legalitas'); }, },
        {header : 'typeprod', dataIndex: 'typeprod_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('tipeproduct'); }, },
        {header : 'Country', dataIndex: 'negara_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('country'); }, },
        {header : 'province', dataIndex: 'province_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('province'); }, },
        {header : 'city', dataIndex: 'city_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('city'); }, },
        {header : 'uuid', dataIndex: 'uuid', renderer: function(value, metaData, record, row, col, store, gridView){return (value == '' ) ? 'No Have Uuid' : value; }, },
        {header : 'createby', dataIndex: 'creator'},
        {header : 'lastupdateby', dataIndex: 'lastupdateby_id', renderer: function(value, metaData, record, row, col, store, gridView){return record.get('updater'); }, },
    ],
    columnLines: true, selModel: 'rowmodel', /*==========  DockedItems  ==========*/
    dockedItems: [
        { xtype: 'toolbar',
            items: [
                {action: 'add', text: '', tooltip : 'Add', itemId: 'add', iconCls: 'action_add' },
                {action: 'edit', text: '', tooltip : 'Edit', disabled : true ,itemId: 'edit',iconCls : 'action_edit' },
                {action: 'remove', text: '', tooltip: 'Delete', disabled : true , itemId: 'remove', iconCls: 'action_delete' },
                {action: 'wizard', iconCls: 'wizard', text: '',  tooltip : 'Wizard', itemId: 'wizard' },
            ]
        },
        {xtype: 'pagingtoolbar', id: 'PgSupplier', dock:'bottom', store: 'App.store.supplier.sSuppliers', displayInfo: true }
    ],
    initComponent : function(){this.callParent(arguments); },
    tools:[/*{type:'refresh', tooltip: 'Refresh form Data', handler: function(event, toolEl, panelHeader) { } },*/ {type:'help', tooltip: 'Get Help', callback: function(panel, tool, event) {winHelp('Supplier'); } } ],
    listeners : {render : function(){Ext.getStore(this.store).load(); } },
});

