Ext.define('App.form.combobox.cbWarehouseCat', {
    alias : 'widget.cbWarehouseCat',
    extend: 'Ext.form.ComboBox',
    fieldLabel: 'Choose Warehouse Category',
    store: 'App.store.warehouse.cbcategory',
    pageSize: 10,
    queryMode: 'remote',
    displayField: 'name',
    valueField: 'id',
    forceSelection: false,
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
});
