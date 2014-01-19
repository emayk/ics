/**
*
* Combo box Color
*
**/

Ext.define('App.form.combobox.cbGradeKain', {
	alias : 'widget.cbgradekain', extend: 'Ext.form.ComboBox',
//    queryMode: 'local',
    pageSize : 10,
    queryMode: 'remote',
    fieldLabel : 'Choose Grade', allowBlank: false ,
    // anchor : '-10',
    displayField : 'name', valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false, emptyText: 'Select Grade', store : 'App.store.combo.cbGradeKain',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){ this.callParent(arguments); }
});
