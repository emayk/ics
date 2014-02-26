Ext.define('App.view.import.departement', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.importdepartement',
	bodyPadding: 10,
	layout: { type: 'vbox', align: 'stretch'},
	items: [
		{ xtype: 'form', bodyPadding: 10, autoScroll: true, flex: 2, title: 'Form departement', layout: { type: 'hbox', align: 'stretch'},
			items: [
				{ xtype: 'container', flex: 3, bodyPadding: 10, layout: 'anchor', defaults: { anchor: '95%', allowBlank: false }, items: [
					{ xtype: 'filefield', fieldLabel: 'File Excel', name: 'file'},
					{ xtype: 'textfield', fieldLabel: 'Additional Information', name: 'info', allowBlank: true},
				]},
				{ xtype: 'container', flex: 1, layout: 'fit', items: [
					{ xtype: 'button', text: 'Download Sample', iconCls: 'excel', itemId: 'download' }
				]}
			],
			bbar: [
				{ text: 'Help', iconCls: 'help'},
				'->',
				{ text: 'Upload', iconCls: 'excel', itemId: 'upload', formBind: true}
			]
		},
		{ xtype: 'container', height: 10 },
		{ xtype: 'container', flex: 3, layout: 'fit', items: [
			{xtype: 'grid', title: 'Status ', itemId: 'griddept',
				store: Ext.create('Ext.data.Store', { fields: ['id', 'name', 'status'] }),
				columns: [
					{xtype: 'rownumberer'},
					{header: 'Id', dataIndex: 'id', flex: 1 },
					{header: 'Name', dataIndex: 'name', flex: 2 },
					{header: 'Status', dataIndex: 'status', flex: 3,
						renderer: function (v) {
							return (v == 0) ? '<span style="color:green">OK</span>' : '<span style="color:red">Fail, has Already on System</span>';
						} }
				]
			}
		]}
	]
})