/**
*
* Combo box Type Product
*
**/

Ext.define('App.form.combobox.cbTypeProduct', {
	alias : 'widget.cbTypeProduct',
	extend: 'Ext.form.ComboBox',
    queryMode: 'remote',
    fieldLabel : 'Choose Type',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Type Product',
    store : 'App.store.combo.cbTypeProduct',
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
    	this.callParent(arguments);
    },



});



