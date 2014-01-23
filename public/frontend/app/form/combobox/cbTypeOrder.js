/**
 *
 * Combo box Type Order
 *
 **/

Ext.define('App.form.combobox.cbTypeOrder', {
    alias: 'widget.cbTypeOrder',
    extend: 'Ext.form.ComboBox',
    // queryMode: 'local',
    queryMode: 'remote',
    // pageSize:1,
    fieldLabel: 'Choose Type Order',
    allowBlank: false,
    anchor: '-10',
    displayField: 'name',
	pageSize: 20,
    valueField: 'id',
    // triggerAction: 'all',
    // forceSelection : true,
    emptyText: 'Select Type Order',
    store: 'App.store.combo.cbTypeOrder',
    tpl: App.util.Form.combobox_tpl,
    displayTpl: App.util.Form.combobox_displayTpl,

    initComponent: function () {
        this.callParent();
    }
});
