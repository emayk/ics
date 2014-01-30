/**
 *
 * Combo box Warehouse
 *
 **/

Ext.define('App.form.combobox.cbWarehouse',
	{
		alias: 'widget.cbwarehouse',
		extend: 'Ext.form.ComboBox',
		// queryMode: 'local',
		queryMode: 'remote',
		fieldLabel: 'Choose Warehouse',
		allowBlank: false,
		pageSize: 20,
		// anchor : '-10',
		anchor: '95%',
		displayField: 'name',
		valueField: 'id',
		// triggerAction: 'all',
		forceSelection: false,
		emptyText: 'Select Warehouse',
		store: 'App.store.combo.cbWarehouseStore',
		tpl: App.util.Form.combobox_tpl,
		displayTpl: App.util.Form.combobox_displayTpl,

		initComponent: function () {
			this.callParent(arguments);
		},


	});