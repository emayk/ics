/**
*
* Combo box Status
*
**/

Ext.define('App.form.combobox.cbStatus', {
	alias : 'widget.cbStatus',
	extend: 'Ext.form.ComboBox',
    // queryMode: 'local',
    queryMode: 'remote',
    fieldLabel : 'Choose Status',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Status',
    store : 'App.store.combo.cbStatus',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
 });
