Ext.define('App.view.master.office.ListHead',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.listheadGP',
    store: 'Headoffices',
    id: 'listheadGPId',
    columns: [
            {
                header: ' No ',
                xtype: 'rownumberer',
                flex: .3,
            },
            {
                header: 'Type',flex: 1,
                dataIndex: 'tipe',
                renderer: function(v){
                    return (v == 1) ? 'Buyer' : 'Supplier';
                }
            },
            {
                header: 'Address',flex: 1,
                dataIndex : 'alamat'
            },
            // {
            //     header: 'Owner',
            //     dataIndex : 'parent_id',
            //     renderer: rowProvinces,
            //     editor:
            //         {
            //             xtype: 'combobox',
            //             store: 'Provinces',
            //             displayField: 'name',
            //             valueField: 'id'
            //         }
            // },
           {
                header: 'Country',flex: 1,
                dataIndex : 'negara_id',
                renderer: function(val){
                    return getNameById('Countries',val);
                }
            },
            {
                header: 'Province',flex: 1,
                dataIndex : 'provinsi_id',
                renderer: function(val){
                 return    getNameById('Provinces',val);
                }
            },

            {
                header: 'City',flex: 1,
                dataIndex : 'kota_id',
                renderer: function(val){
                   return  getNameById('Cities',val);
                }
            },
            {
                header: 'Pos Code',flex: 1,
                dataIndex : 'kodepos',
            },
            {
                header: 'Main',
                dataIndex: 'mainoffice',
                renderer: function(v){
                    return (v==1) ? 'Yes' : 'No';
                }
            }    ,

            // {
            //     header: 'Information',
            //     dataIndex : 'negara_id',
            //     // editor: {
            //     //     allowBlank: true
            //     // }
            // },

            // {
            //     header: 'UUID',
            //     dataIndex : 'uuid'
            // },
                    {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            // tdCls:'delete',
            items: [{
                // icon: '/assets/fugue/icons/cross-shield.png',
                iconCls:'delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('pagingContactPerson').doRefresh();
                            }
                            });
                    }
                }]
        }
            ]
    ,
    columnLines: true,
    selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     // plugins: [
     // Ext.create('Ext.grid.plugin.RowEditing',{
     //        clicksToEdit: !1,
     //        pluginId: 'cellEditorCities',
     //        clicksToMoveEditor: 1
     //    })
     // ],
    /*==========  DockedItems  ==========*/
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
        }
        ]
    },
    {
        xtype: 'pagingtoolbar',
        id: 'pagingHeadoffice',
        dock:'bottom',
        store: 'Headoffices',
        displayInfo: true
    }],
    initComponent : function(){

        Ext.getStore('Countries').load();
        Ext.getStore('Cities').load();
        Ext.getStore('Provinces').load();
        Ext.getStore(this.store).load();
        this.callParent(arguments);

    }
});