/**
*
* Combo box Category Product
*
**/

Ext.define('App.form.combobox.cbTypePayment', {
	alias : 'widget.cbTypePayment',
	extend: 'Ext.form.ComboBox',
    // queryMode: 'local',
    queryMode: 'remote',
    fieldLabel : 'Choose Type Payment',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : true,
    emptyText: 'Select Category',
    store : 'App.store.combo.cbTypePaymentStore',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
    	this.callParent(arguments);
    },



});
