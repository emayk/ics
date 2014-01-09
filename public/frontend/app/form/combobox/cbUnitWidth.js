/**
*
* Combobox Panjang Lebar
*
**/

Ext.define('App.form.combobox.cbUnitWidth', {
	alias : 'widget.cbUnitWidth', extend: 'Ext.form.ComboBox',
    queryMode: 'remote',
    fieldLabel : 'Choose Unit Weight', allowBlank: false ,
    displayField : 'name', valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false, emptyText: 'Select Unit Weight',
    // store : 'combo.cbUnits',
    store: 'App.store.combo.cbUnitWidth',
    pageSize: 5,
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){ this.callParent(arguments); },
});
