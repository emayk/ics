Ext.define('App.view.master.legalitas.AddMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.addmenuLegalitas',
    width: 120,
 
    initComponent: function() {
        var me = this;
 
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    text: 'Add',
                    iconCls: 'icon-add'
                }
            ]
        });
 
        me.callParent(arguments);
    }
});