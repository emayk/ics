Ext.define('App.view.master.typePayment.List',{

    extend : 'Ext.grid.Panel',
    alias : 'widget.gridTypePayment',
    store: 'App.store.typePayment',
    columns: [
            {
                xtype: 'rownumberer'
            },
            {
                header: 'Name',
                dataIndex : 'name',
                flex: 1,

            },
            {
                header: 'Information',
                dataIndex : 'info',
                flex: .7,

            },



            // {
            //     header: 'Last Update By',
            //     flex: 1,
            //     dataIndex : 'updater'
            // },

            // {
            //     header: 'Create By',
            //     flex: 1,
            //     dataIndex : 'creator'
            // },

            ]
    ,
    columnLines: true,
    selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     // plugins: [
     // Ext.create('Ext.grid.plugin.RowEditing',{
     //        clicksToEdit: !1,
     //        pluginId: 'ceAllUnits',
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

        dock:'bottom',
        store: 'App.store.typePayment',
        displayInfo: true
    }],
    initComponent : function(){
        this.callParent(arguments);
        Ext.getStore(this.store).load();
    }
});