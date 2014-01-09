/**
*
* Combo box Legalitas
*
**/

Ext.define('App.form.combobox.cbLegalitas', {
	alias : 'widget.cbLegalitas',
	extend: 'Ext.form.ComboBox',
    queryMode: 'remote',
    fieldLabel : 'Choose Legality',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Legality',
    store : 'App.store.combo.cbLegalitas',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){this.callParent(arguments); },
});
