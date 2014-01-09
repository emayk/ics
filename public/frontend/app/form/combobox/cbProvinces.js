Ext.define('App.form.combobox.cbProvinces', {
	alias : 'widget.cbProvinces',
	extend: 'Ext.form.ComboBox',
    fieldLabel: 'Choose Provinces',
    // store: 'cbProvinces',
    store: 'App.store.combo.cbProvinces',
    queryMode: 'remote',
    displayField: 'name',
    valueField: 'id',
    emptyText : 'Province Not Found',
    forceSelection: false,
    allowBlank : false,
    tpl: App.util.Form.combobox_tpl ,
    displayTpl: App.util.Form.combobox_displayTpl,
    initComponent : function(){
    	this.callParent(arguments);
    },



});
