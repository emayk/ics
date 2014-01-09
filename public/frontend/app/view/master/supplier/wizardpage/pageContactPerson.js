Ext.define('App.view.master.supplier.wizardpage.pageContactPerson', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.wizardPageCountactPersonSupplier',
	layout: { type : 'vbox', align : 'stretch'},
	items: [
		{ xtype: 'formContact', flex: 3 },
		{ xtype: 'container', flex: 3, layout : { type : 'fit', align : 'stretch' },
		items:[
		{ xtype : 'grid',store : 'App.store.supplier.wizard.ContactPerson',
			columns: [
			    {width: 150, text: 'Name',  dataIndex: 'name' },
			    {width: 100, text: 'Departement', dataIndex : 'departement_id', renderer: function(v, m, record, r, c, s, grid){ return record.getDept().get('name'); } },
			    {width: 300, text: 'Position', dataIndex : 'jabatan_id', renderer: function(v, m, record, r, c, s, grid){ return record.getPosition().get('name'); } },
			    {width: 300, text: 'Handphone Number', dataIndex : 'nohp'},
					{width: 150, text: 'Number Fax',  dataIndex: 'fax' },
			    {width: 300, text: 'Email Address', dataIndex : 'email'},
			    {width: 300, text: 'Create By', dataIndex : 'createby_id', renderer: function(v, m, record, r, c, s, grid){ return record.getCreator().get('username'); } },
			    {width: 300, text: 'Create By', dataIndex : 'lastupdateby_id', renderer: function(v, m, record, r, c, s, grid){ return record.getUpdater().get('username'); } },
			],
	    dockedItems: [{   xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.supplier.wizard.ContactPerson', displayInfo: true } ],

				  }
		] },
	],
});