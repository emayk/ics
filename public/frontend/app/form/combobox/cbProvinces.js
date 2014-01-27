/**
 *
 * View Combo box untuk Province
 *
 *
 */
Ext.define('App.form.combobox.cbProvinces', {
	alias: 'widget.cbProvinces',
	extend: 'Ext.form.ComboBox',
	fieldLabel: 'Choose Provinces',
	store: 'App.store.combo.cbProvinces',
	queryMode: 'remote',
	pageSize: 20,
	displayField: 'name',
	valueField: 'id',
    emptyText : 'Select Province',
	forceSelection: false,
	allowBlank: false,
	tpl: App.util.Form.combobox_tpl,
	displayTpl: App.util.Form.combobox_displayTpl,
	initComponent: function () {
		this.callParent(arguments);
	}
});


