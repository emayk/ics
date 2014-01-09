Ext.define('App.view.master.supplier.wizardpage.wizFormSupplier',{
	extend : 'Ext.form.Panel',
	alias: 'widget.wizFormSupplier',
	requires: [
	'App.form.combobox.cbCountries',
	'App.form.combobox.cbProvinces',
	'App.form.combobox.cbCities',
	'App.form.combobox.cbStatus',
	'App.form.combobox.cbTypeProduct',
	'App.form.combobox.cbTypeSupBuy',
	'App.form.combobox.cbLegalitas',
	],
	title: 'Form Add Supplier',
	autoScroll: true,
	fieldDefaults: {/*labelAlign: 'top',*/ msgTarget: 'side',labelWidth : 150 },
	layout: { type : 'vbox' , align : 'stretch' },
	bodyPadding : 10,
	items: [
			{xtype: 'fieldset', title: 'Information', defaults : { anchor : '100%',allowBlank: false, forceSelection: isDebug() ? false : true }, items: [
						{ name : 'name',fieldLabel : 'Name', xtype: 'textfield', value: isDebug() ? randomText('Supplier Name ',20) : null },
						{ name : 'codepos',fieldLabel : 'Post Code', xtype: 'numberfield', maxValue: 99999, minValue: 10000, value: 40000 },
						{ name : 'npwp',fieldLabel : 'NPWP', xtype: 'textfield',value: isDebug() ? 'NPWP-'+randomInt() : null },
						{ name : 'fax',fieldLabel : 'Fax Number', xtype: 'textfield', value: isDebug() ? '022-9000'+randomInt(1) : null },
						{ name : 'email',fieldLabel : 'Email Address', xtype: 'textfield',vtype: 'email' , value: isDebug() ? 'user'+randomInt()+'@example.com' : null },
						{ name : 'plafon',fieldLabel : 'Plafon', xtype: 'numberfield',minValue:1, maxValue: 999, value: isDebug() ? 100 :  null },
						{ name : 'kredit',fieldLabel : 'Credit Periode', xtype: 'numberfield',minValue: 0, maxValue:365, value: isDebug() ? 90 : 0 },
						{ name: 'id', xtype: 'hiddenfield'},
			]},

			{xtype : 'fieldset', title : 'Address', layout: 'anchor', defaults : { anchor : '100%',allowBlank: false, forceSelection: isDebug() ? false : true }, items: [
						{ name : 'negara_id',fieldLabel : 'Country', xtype: 'cbCountries',valueNotFoundText: 'Country Not Found', value: isDebug() ? 1 : null },
						{ name : 'province_id',fieldLabel : 'Province', xtype: 'cbProvinces',valueNotFoundText: 'Provinces Not Found', value: isDebug() ? 6 : null },
						{ name : 'city_id',fieldLabel : 'City', xtype: 'cbCities',valueNotFoundText: 'Cities Not Found',value: isDebug() ? 2 : null } ,
						{ name : 'alamat',height : 100,
						fieldLabel :'Address', xtype: 'textareafield', anchor: '100%',
						grow : true, value: isDebug() ?randomString(200) : null },

			]},
			{xtype: 'fieldset', title : 'Additional Information',  defaults : { anchor : '100%',allowBlank: false, forceSelection: isDebug() ? false : true }, items: [
						{ name : 'phone',fieldLabel : 'Phone', xtype: 'textfield', value: isDebug() ? '022-0299-'+randomInt(100) : null },
						{ name : 'status_id',fieldLabel : 'Status', xtype: 'cbStatus', value: isDebug() ? randomInt(2) : null },
						{ name : 'tipe_id',fieldLabel : 'Type', xtype: 'cbTypeSupBuy', forceSelection: false, value: isDebug() ? randomInt(2) : null },
						{ name : 'legalitas_id',fieldLabel : 'Legalitas', xtype: 'cbLegalitas', value: isDebug() ? randomInt(2) : null },
						{ name : 'typeprod_id',fieldLabel : 'Type Product', xtype: 'cbTypeProduct', value: isDebug() ? randomInt(12) : null },
				]
			}
			],
			bbar : [
			{ xtype : 'button', text : 'Help', itemId: 'help',iconCls: 'help' },'->',
			{ xtype : 'button', text : 'Cancel', itemId: 'cancel' , iconCls: 'cancel' },
			{ xtype : 'button', text : 'Save', itemId: 'save' , iconCls: 'save'},
			]
});