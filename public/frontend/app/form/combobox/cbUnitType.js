Ext.define('App.form.combobox.cbUnitType', {
	alias : 'widget.cbUnitType',
	extend: 'Ext.form.ComboBox',
    // fieldLabel: 'Choose Type Unit',
    // fieldLabel: '',
	pageSize: 10,
    store: 'App.store.combo.cbUnitType',
    queryMode: 'remote',
    displayField: 'name',
    valueField: 'id',
    forceSelection: true,
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){
    	this.callParent(arguments);
    },



});
