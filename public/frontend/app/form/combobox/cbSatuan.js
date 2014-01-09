/**
*
* Combo box Satuan
*
**/

Ext.define('App.form.combobox.cbSatuan', {
	alias : 'widget.cbSatuan',
	extend: 'Ext.form.ComboBox',
    queryMode: 'local',
    // queryMode: 'remote',
    fieldLabel : 'Choose Unit',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    forceSelection : false,
    emptyText: 'Select Unit',
    store : 'combo.cbUnits',
    tpl: App.util.Form.combobox_tpl ,
displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
    	this.callParent(arguments);
    },



});
