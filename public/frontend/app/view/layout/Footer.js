var clock = Ext.create('Ext.toolbar.TextItem', { text: getWaktu() });
Ext.define('App.view.layout.Footer', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.appfooter',
    ui: 'footer',
    width : '100%',
    height : 30,
    // xtype: 'statusbar',
    id: 'status',
    defaultText: 'Ready',
    statusAlign: 'right',
    defaultIconCls: 'default-icon',
    text: 'Ready',
    iconCls: 'ready-icon',
    items: [
        'Login sebagai : ' + loginas() , '-',
        { xtype: 'tbtext', text : licence_to(),itemId: 'license' }, '-',
        getFullVersion(), '->',
        getTanggal(), '-',
        clock,
    ],
    listeners: {
    render: {
        fn: function(){
         Ext.TaskManager.start({run: function(){Ext.fly(clock.getEl()).update(getWaktu()); }, interval: 1000 });
        },
        delay: 100
    }
}
});