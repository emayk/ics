Ext.define('App.view.Translation', {
    extend: 'Ext.button.Split',
    alias: 'widget.translation',
    menu: Ext.create('Ext.menu.Menu', {
        items: [
            {
                xtype: 'menuitem',
                iconCls: 'id',
                text: 'Indonesian'
            },
            {
                xtype: 'menuitem',
                iconCls: 'en',
                text: 'English'
            }
        ]
    })
});
