Ext.define('App.view.master.location.ListProvinces',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.listprovincesGP',
    store: 'Provinces',
    id: 'listprovincesGPId',
    columns: [
            {
                xtype: 'rownumberer',flex: .3,
            },
            {
                header: 'Name',
                flex: 1,
                dataIndex : 'name',
                editor: { allowBlank: true },
            },
            {
                header: 'Country',flex: 1,
                dataIndex : 'parent_id',
                renderer: function(val){
                    return getNameById('Countries',val);
                },
                editor:
                    {
                        xtype: 'combobox',
                        store: 'Countries',
                        displayField: 'name',
                        valueField: 'id'
                    }
            },
            {
                header: 'Information',flex: 1,
                dataIndex : 'info',
                editor: {
                    allowBlank: true
                }
            },

            {
                header: 'UUID',flex: 1,
                dataIndex : 'uuid'
            },
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
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
            clicksToEdit: !1,
            pluginId: 'cellEditorProvinces',
            clicksToMoveEditor: 1
        })
     ],
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
        id: 'pagingProvinces',
        dock:'bottom',
        store: 'Provinces',
        displayInfo: true
    }],
    initComponent : function(){
        this.callParent(arguments);
        // Ext.getStore('Provinces').load();
        Ext.getStore(this.store).load();
    }
});