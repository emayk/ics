/**
*
* Combo box Units (Satuan)
*
**/

Ext.define('App.form.combobox.cbUnitWeight', {
	alias : 'widget.cbUnitWeight', extend: 'Ext.form.ComboBox',
    queryMode: 'remote',
    fieldLabel : 'Choose Unit Weight', allowBlank: false ,
    displayField : 'name', valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false, emptyText: 'Select Unit Weight',
    store : 'App.store.combo.cbUnitWeight',
    pageSize: 5,

    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){ this.callParent(arguments); },
});
