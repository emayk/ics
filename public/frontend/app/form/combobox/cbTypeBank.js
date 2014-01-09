Ext.define('App.form.combobox.cbTypeBank', {
	alias : 'widget.cbTypeBank',
	extend: 'Ext.form.ComboBox',
    fieldLabel: 'Choose Type Account',
    store: 'App.store.combo.cbTypeBank',
    queryMode: 'remote',
    displayField: 'name',
    valueField: 'id',
    forceSelection: false,
     tpl: App.util.Form.combobox_tpl ,
		displayTpl: App.util.Form.combobox_displayTpl,
});
