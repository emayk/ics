/**
*
* Combo box Color
*
**/

Ext.define('App.form.combobox.cbColor', {
	alias : 'widget.cbcolor',
    extend: 'Ext.form.ComboBox',
//    queryMode: 'local',
    queryMode: 'remote',
    fieldLabel : 'Choose Color', allowBlank: false ,
    displayField : 'name', valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false, emptyText: 'Select Color',
    store : 'App.store.combo.cbColors',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){ this.callParent(arguments); }
});
