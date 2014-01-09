Ext.define('App.view.master.supplier.formOffice',{
    extend: 'Ext.form.Panel',
    alias: 'widget.formOffice',
    autoScroll: true,
    layout: { type : 'vbox', align: 'stretch'},
    bodyPadding : 10,
    defaults : {
    	allowBlank : false,
    	labelWidth : 150,
    },
    items: [
    {xtype: 'fieldset', title: 'Information', defaults : { anchor : '100%',allowBlank: false, forceSelection: isDebug() ? false : true }, items: [
        { name: 'id', hidden: true, xtype: 'hiddenfield', value: null },
      { name: 'parent_id', hidden: true, xtype: 'hiddenfield',value : 0 },
      { name: 'createby_id', hidden: true, xtype: 'hiddenfield',value : getloginid() },
    	{ name: 'tipe', hidden: true, xtype: 'hiddenfield',value : 0 },
    	{ name: 'parent_type', hidden: true, xtype: 'hiddenfield', value: 'Supplier' },
      { name : 'supplier_name' , fieldLabel : 'Name Supplier ', xtype : 'displayfield'},

      { name : 'negara_id',fieldLabel : 'Country', xtype: 'cbCountries',valueNotFoundText: 'Country Not Found', value: isDebug() ? 1 : null },

      { name : 'provinsi_id',fieldLabel : 'Province', xtype: 'cbProvinces',valueNotFoundText: 'Provinces Not Found', value: isDebug() ? 6 : null },

      { name : 'kota_id',fieldLabel : 'City', xtype: 'cbCities',valueNotFoundText: 'Cities Not Found',value: isDebug() ? 2 : null } ,
      { name : 'alamat',height : 100, fieldLabel :'Address', xtype: 'textareafield', anchor: '100%', grow : true, value: isDebug() ?randomString(200) : null },
      { name : 'kodepos',fieldLabel : 'Post Code', xtype: 'numberfield', maxValue: 99999, minValue: 10000, value: 40000 },
      {name : 'mainoffice', xtype: 'checkbox', inputValue: 1, fieldLabel: 'Main Office ' }
    ] }
    ],
    bbar: [
    	{ xtype : 'button', text: 'Help',iconCls : 'help', itemId : 'help' },'->',
    	{ xtype : 'button', text: 'Save',iconCls: 'close', itemId : 'save', formBind: false },
    	{ xtype : 'button', text: 'Cancel', iconCls: 'cancel', itemId : 'cancel' },
    ]
});
