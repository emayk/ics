/**
*
* Combo box Legalitas
*
**/

Ext.define('App.form.combobox.cbTypeSupBuy', {
	alias : 'widget.cbTypeSupBuy',
	extend: 'Ext.form.ComboBox',
    // queryMode: 'local',
    queryMode: 'remote',
    pageSize: 10,
    fieldLabel : 'Choose Type ',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Type ',
    store :'App.store.combo.cbTypeSupBuy',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl
});
