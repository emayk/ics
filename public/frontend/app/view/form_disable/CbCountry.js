Ext.define('App.view.form.CbCountry', {
    extend : 'Ext.form.ComboBox',
    alias: 'widget.cbCountry',
    // fieldLabel: 'Choose Country',
    store: 'Countries',
    queryMode: 'local',
    valueField: 'id',
    // renderTo: Ext.getBody(),
    // Template for the dropdown menu.
    // Note the use of "x-boundlist-item" class,
    // this is required to make the items selectable.
    tpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div class="x-boundlist-item">{id} - {name}</div>',
        '</tpl>'
    ),
    // template for the content inside text field
    displayTpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '{id} - {name}',
        '</tpl>'
    )
});