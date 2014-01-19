/**
*
* Combo box Category Product
*
**/

Ext.define('App.form.combobox.cbCatproduct', {
	alias : 'widget.cbcatproduct',
	extend: 'Ext.form.ComboBox',
//    queryMode: 'local',
    pageSize : 10,
    queryMode: 'remote',
    fieldLabel : 'Choose Category',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Category',
    store : 'App.store.combo.cbCategory',
    tpl: App.util.Form.combobox_tpl ,
displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
    	this.callParent(arguments);
    },



});
