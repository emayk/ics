/**
*
* Combo box Category Product
*
**/

Ext.define('App.form.combobox.cbTypeLocation', {
	alias : 'widget.cbTypeLocation',
	extend: 'Ext.form.ComboBox',
    // queryMode: 'local',
    queryMode: 'remote',
    // pageSize:1,
    fieldLabel : 'Choose Type Location',
    allowBlank: false ,
    anchor : '-10',
    displayField : 'name',
    valueField: 'id',
    // triggerAction: 'all',
    // forceSelection : true,
    emptyText: 'Select Type Location',
    store : 'App.store.combo.cbTypeLocations',
   tpl: App.util.Form.combobox_tpl ,
displayTpl: App.util.Form.combobox_displayTpl,

    initComponent : function(){
    	this.callParent();
    },



});
