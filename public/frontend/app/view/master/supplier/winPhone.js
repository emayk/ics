Ext.define('App.view.master.supplier.winPhone',{
    extend: 'Ext.window.Window',
    alias: 'widget.winPhone',
    layout : { type : 'fit', align : 'stretch'},
    width : 400,
    height : 200,
    modal : true,
    items: [{ xtype: 'formPhone' } ]
});
