/**
*
* Combo box Supplier Product
*
**/

Ext.define('App.form.combobox.cbSupplier', {
	alias : 'widget.cbSupplier',
	extend: 'Ext.form.ComboBox',
	fieldLabel : 'Supplier Name',
	allowBlank: false ,
	pageSize: 20,
	displayField : 'name',
	valueField: 'id',
	queryMode: 'remote',
	triggerAction:'all',
	forceSelection: !isDebug(),
	store : 'App.store.combo.cbSuppliers',
	anchor : '-10',
	emptyText : 'Select Supplier Name',
	editable :false,
	 tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){this.callParent(arguments); },
});


