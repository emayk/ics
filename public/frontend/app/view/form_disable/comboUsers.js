// Create the combo box, attached to the states data store
Ext.define('App.view.form.comboUsers', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.comboUsers',
    fieldLabel: 'Choose State',
    store: 'Users',
    queryMode: 'local',
    displayField: 'name',
    valueField: 'abbr',
    // renderTo: Ext.getBody()
});