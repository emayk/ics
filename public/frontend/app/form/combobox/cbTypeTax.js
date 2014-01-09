
/**
*
* Combo box Type Tax
*
**/

Ext.define('App.form.combobox.cbTypeTax', {
	alias : 'widget.cbtypetax', extend: 'Ext.form.ComboBox', /*queryMode: 'local',*/ queryMode: 'remote', fieldLabel : 'Choose Type Tax ', allowBlank: false , /*anchor : '-10',*/ anchor:'95%', displayField : 'name', valueField: 'id', /*triggerAction: 'all',*/ forceSelection : false, emptyText: 'Select Type Tax', store : 'App.store.combo.cbTypeTax',
    tpl: App.util.Form.combobox_tpl ,
displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){this.callParent(arguments); }, });