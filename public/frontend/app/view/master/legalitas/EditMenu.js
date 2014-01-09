Ext.define('App.view.master.legalitas.EditMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.editMenuLegalitas',
    width: 120,
 
    initComponent: function() {
        var me = this;
 
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    text: 'Edit',
                    iconCls: 'icon-edit'
                },
                {
                    xtype: 'menuitem',
                    text: 'Delete',
                    iconCls: 'icon-delete',   
                }
            ]
        });
 
        me.callParent(arguments);
    }
});