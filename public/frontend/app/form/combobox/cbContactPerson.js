/**
 *
 * Combo box Contact Person
 *
 **/

Ext.define('App.form.combobox.cbContactPerson', {
	alias: 'widget.cbContactperson',
	extend: 'Ext.form.ComboBox',
	// queryMode: 'local',
	queryMode: 'remote',
	pageSize: 20,
	fieldLabel: 'Choose Contact Person',
	allowBlank: false,
	anchor: '-10',
	displayField: 'name',
	valueField: 'id',
	// triggerAction: 'all',
	forceSelection: false,
	emptyText: 'Contact Person',
	store: 'App.store.combo.cbContactPerson',

	tpl: App.util.Form.combobox_tpl,
	displayTpl: App.util.Form.combobox_displayTpl,

	initComponent: function () {
		this.callParent(arguments);
	}
});
