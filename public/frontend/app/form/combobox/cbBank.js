Ext.define('App.form.combobox.cbBank', {
	alias : 'widget.cbBank',
	extend: 'Ext.form.ComboBox',
    fieldLabel: 'Choose Bank',
    store: 'App.store.combo.cbBank',
    pageSize: 10,
    queryMode: 'remote',
    displayField: 'name',
    valueField: 'id',
    forceSelection: false,
     tpl: App.util.Form.combobox_tpl ,
		displayTpl: App.util.Form.combobox_displayTpl
});
