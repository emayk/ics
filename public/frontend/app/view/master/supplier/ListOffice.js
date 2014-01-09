/**
*
* Supplier Office
*
**/


Ext.define('App.view.master.supplier.ListOffice',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.gridOfficesSupplier',
    title : 'Offices',
    store: 'App.store.supplier.sOffices',


    columns: [
            { xtype: 'rownumberer'},
            { header: 'Main', dataIndex : 'mainoffice', flex: 1,
                renderer: function(value, metaData, record, row, col, store, gridView){
                    return (value == 1) ? 'Yes' : 'No';
                }
            },
            { header: 'Address', dataIndex : 'alamat',
                renderer: function(value, metaData, record, row, col, store, gridView){
                        var out = value +   ' ' +
                                record.get('country')  +' ' +
                                record.get('province') +' ' +
                                record.get('city') +' ' +
                                record.get('kodepos') ;
                        return out;
                },
            flex: 5
        },
            { header: 'UUID', dataIndex : 'uuid', flex: 1
            },

            ],
	columnLines: true,
    selModel: 'rowmodel',
    // /*==========  DockedItems  ==========*/
    dockedItems: [{ xtype: 'vActionBtn' }, {   xtype: 'pagingtoolbar', id: 'PgOfficesSupplier', dock:'bottom', store: 'App.store.supplier.sOffices', displayInfo: true } ],
});
