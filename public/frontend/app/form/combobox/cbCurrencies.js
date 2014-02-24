/**
*
* Combo box Category Product
*
**/

Ext.define('App.form.combobox.cbCurrencies', {
	alias : 'widget.cbcurrencies',
	extend: 'Ext.form.ComboBox',
    queryMode: 'remote',
    pageSize : 10,
    // queryMode: 'remote',
    fieldLabel : 'Pilih Mata Uang',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Currency',
    store : 'App.store.combo.cbCurrency',
//   tpl: App.util.Form.combobox_tpl ,
//    displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
    	this.callParent(arguments);
    }
});
