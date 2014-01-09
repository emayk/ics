/**
*
* Combo box Units (Satuan)
*
**/

Ext.define('App.form.combobox.cbUnitHeight', {
	alias : 'widget.cbunits', extend: 'Ext.form.ComboBox', queryMode: 'local',
    queryMode: 'remote',
    fieldLabel : 'Choose Unit', allowBlank: false ,
    // anchor : '-10',
    displayField : 'name', valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false, emptyText: 'Select Unit', store : 'combo.cbUnitHeight',
    tpl: App.util.Form.combobox_tpl ,
displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){ this.callParent(arguments); },
});
