Ext.define('App.view.master.legalitas.List',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.legalitasGridList',
    store: 'Legalitas',
    id: 'legalitasGridListId',
    columns: [
            {
                xtype: 'rownumberer'
            },
            {
                header: 'Name',
                dataIndex : 'name',
                flex: 1,
                editor: { allowBlank: true },
            },
            {
                header: 'Information',
                dataIndex : 'info',
                flex: .7,
                editor: {
                    allowBlank: true
                }
            },
            {
                header: 'UUID',
                flex: 1,
                dataIndex : 'uuid'
            },
                    {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            // tdCls:'delete',
            items: [{
                // icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Delete',
                iconCls: 'delete',
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
            pluginId: 'cellEditorLegalitas',
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
        id: 'pagingLegalitas',
        dock:'bottom',
        store: 'Legalitas',
        displayInfo: true
    }],
    initComponent : function(){
        this.callParent(arguments);
        Ext.getStore(this.store).load();
    }
});