/**
 * View Combo box Countries
 */

Ext.define('App.form.combobox.cbCountries', {
	alias: 'widget.cbCountries',
	extend: 'Ext.form.ComboBox',
	pageSize: 20,
	fieldLabel: 'Choose Countries',
	store: 'App.store.combo.cbCountries',
	/*hiddenName : 'selected_country',*/
	// queryMode: 'local',
	queryMode: 'remote',
	displayField: 'name',
	valueField: 'id',
	forceSelection: false,
	tpl: App.util.Form.combobox_tpl,
	displayTpl: App.util.Form.combobox_displayTpl,


//	store: 'MyStore',
//	displayField: 'Name',
//	valueField: 'Id',
//	fieldStyle: 'cmbfonts',
//	labelCls: 'cmbLabel',
//	mode: 'local',
//	fieldLabel: ' Names ',
//	tooltip: 'Select group of names to show',
//	width: 300,
//	labelWidth: 40,
//	typeAhead: true,
//	triggerAction: 'all',
//	emptyText: 'Kosong ...',
//	selectOnFocus: true,
//	listeners: {
//		'select': function (combo, value) {
//			log(value);
//			log(combo);
//		}
//	}
});


