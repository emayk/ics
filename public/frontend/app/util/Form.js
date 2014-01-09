Ext.define('App.util.Form', {

    statics : {
    tpl_combobox_idname : ['<tpl for=".">', '<div class="x-boundlist-item">{id} - {name}</div>', '</tpl>'],
    tpl_combobox_idname_displayTpl : ['<tpl for=".">', '{id} - {name}', '</tpl>'],
		combobox_displayTpl: Ext.create('Ext.XTemplate', '<tpl for=".">', '{id} - {name}', '</tpl>'),
    combobox_tpl : Ext.create('Ext.XTemplate', '<tpl for=".">', '<div class="x-boundlist-item">{id} - {name}</div>', '</tpl>'),

    }
});