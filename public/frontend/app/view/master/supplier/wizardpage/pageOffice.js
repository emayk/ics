Ext.define('App.view.master.supplier.wizardpage.pageOffice', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.wizardSupplierOffice',
	bodyPadding :10,
	layout: { type : 'vbox', align : 'stretch'},
	items: [
		{ xtype: 'formOffice', flex: 3 },
		{ xtype: 'container', flex: 3, layout : { type : 'border', align : 'stretch' },
		items:[

		{ region : 'center', flex: 9, xtype : 'grid',itemId: 'office', store : 'App.store.supplier.wizard.Office',
			columns: [
				{ width:  100, header :  'Id', dataIndex : 'id'},
				{ width:  100, header :  'mainoffice', dataIndex : 'mainoffice',
					renderer: function(v, m, rec, r, c, s, grid){ return (v==1) ? 'Y' : 'N' }
				},
				{ width:  100, header :  'Address', dataIndex : 'alamat'},
				{ width:  100, header :  'Country', dataIndex : 'negara_id',
					renderer: function(v, m, rec, r, c, s, grid){ return rec.getCountry().get('name'); }
				},
				{ width:  100, header :  'Province', dataIndex : 'provinsi_id',
					renderer: function(v, m, rec, r, c, s, grid){ return rec.getProvince().get('name'); }
				},
				{ width:  100, header :  'City', dataIndex : 'kota_id',
						renderer: function(v, m, rec, r, c, s, grid){ return rec.getCity().get('name'); }
				},
				{ width:  100, header :  'Post Code', dataIndex : 'kodepos'},
				// { width:  100, header :  'codeinternal', dataIndex : 'codeinternal'},
				// { width:  100, header :  'uuid', dataIndex : 'uuid'},
				{ width:  150, header :  'Create', dataIndex : 'createby_id',
						renderer: function(v, m, rec, r, c, s, grid){
							var cr = Ext.util.Format.date(rec.get('created_at') ,'d M Y') ;
							return rec.getCreator().get('username') +' - '+ cr ;
						}
				},
				{ width:  150, header :  'Update', dataIndex : 'lastupdateby_id',
						renderer: function(v, m, rec, r, c, s, grid){
							var cr = Ext.util.Format.date(rec.get('updated_at') ,'d M Y') ;
							return rec.getCreator().get('username') +' - '+ cr ;
						}
				},

			],
	    dockedItems: [
	    { xtype: 'toolbar', items:[
					{ text: '', iconCls: 'edit', itemId: 'edit' },
					{ text: '', iconCls: 'delete', itemId: 'remove' },
					{ text: '', iconCls: 'help', itemId: 'help' },
				]},
	    {   xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.supplier.wizard.Office', displayInfo: true }
	    ],

				  },

		{ region: 'east' ,   collapsible: true, title : 'Phones', xtype: 'panel',layout: 'fit',
		width:300, items:[
			{
					xtype : 'grid', itemId: 'phones', store : 'App.store.supplier.wizard.Phones', columns: [{ width: 300, header: 'Phone', dataIndex: 'telp' }, ],
				dockedItems: [
				{ xtype: 'toolbar', items:[
					{ text: '', iconCls: 'add', itemId: 'add' },
					{ text: '', iconCls: 'edit', itemId: 'edit' },
					{ text: '', iconCls: 'delete', itemId: 'remove' },
					{ text: '', iconCls: 'help', itemId: 'help' },
				]},
				{xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.supplier.wizard.Phones', displayInfo: false }
				],
			},

		]}


		] },



	],
});









//
//
//
//
//
//
//
//
//

/*Ext.define('App.view.master.supplier.wizardpage.pageOffice', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.wizardSupplierOffice',
	bodyPadding :10,
	layout: { type : 'vbox', align : 'stretch'},
	items: [
		{ xtype: 'formOffice', flex: 3 },
		{ xtype: 'container', flex: 3, layout : { type : 'hbox', align : 'stretch' },
		items:[

		{ flex: 9, xtype : 'grid',itemId: 'office', store : 'App.store.supplier.wizard.Office',
			columns: [
				{ width:  100, header :  'id', dataIndex : 'id'},
				{ width:  100, header :  'alamat', dataIndex : 'alamat'},
				{ width:  100, header :  'negara_id', dataIndex : 'negara_id',
					renderer: function(v, m, rec, r, c, s, grid){ return rec.getCountry().get('name'); }
				},
				{ width:  100, header :  'provinsi_id', dataIndex : 'provinsi_id',
					renderer: function(v, m, rec, r, c, s, grid){ return rec.getProvince().get('name'); }
				},
				{ width:  100, header :  'kota_id', dataIndex : 'kota_id',
						renderer: function(v, m, rec, r, c, s, grid){ return rec.getCity().get('name'); }
				},
				{ width:  100, header :  'kodepos', dataIndex : 'kodepos'},
				{ width:  100, header :  'tipe', dataIndex : 'tipe'},
				{ width:  100, header :  'parent_id', dataIndex : 'parent_id'},
				{ width:  100, header :  'parent_type', dataIndex : 'parent_type'},
				{ width:  100, header :  'codeinternal', dataIndex : 'codeinternal'},
				{ width:  100, header :  'mainoffice', dataIndex : 'mainoffice',
					renderer: function(v, m, rec, r, c, s, grid){ return (v==1) ? 'Y' : 'N' }
				},
				{ width:  100, header :  'uuid', dataIndex : 'uuid'},
				{ width:  100, header :  'createby_id', dataIndex : 'createby_id',
						renderer: function(v, m, rec, r, c, s, grid){ return rec.getCreator().get('username'); }
				},
				{ width:  100, header :  'lastupdateby_id', dataIndex : 'lastupdateby_id',
						renderer: function(v, m, rec, r, c, s, grid){ return rec.getUpdater().get('username'); }
				},
				{ width:  100, header :  'created_at', dataIndex : 'created_at', renderer: Ext.util.Format.dateRenderer('d M Y') },
				{ width:  100, header :  'updated_at', dataIndex : 'updated_at', renderer: Ext.util.Format.dateRenderer('d M Y')},
			],
	    dockedItems: [{   xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.supplier.wizard.Office', displayInfo: true } ],

				  },

		{ width:250, xtype : 'grid', itemId: 'phones', store : 'App.store.supplier.wizard.Phones',
				columns: [
				{ width: 250, header: 'Phone', dataIndex: 'telp' },

			],
			dockedItems: [{   xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.supplier.wizard.Phones', displayInfo: false } ],
		},

		] },



	],
});
*/














