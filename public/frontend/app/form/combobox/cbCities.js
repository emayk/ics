Ext.define('App.form.combobox.cbCities', {
	alias: 'widget.cbCities',
	extend: 'Ext.form.ComboBox',
	fieldLabel: 'Choose Cities',
	store: 'App.store.combo.cbCities',
	queryMode: 'remote',
	pageSize: 20,
	displayField: 'name',
	valueField: 'id',
	forceSelection: false,
	tpl: App.util.Form.combobox_tpl,
	displayTpl: App.util.Form.combobox_displayTpl
});
