Ext.define('App.view.master.supplier.wizardpage.pageAccount', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.wizardPageAccountSupplier',
	layout: { type : 'vbox', align : 'stretch'},
	items: [
		{ xtype: 'formAccountBank', flex: 3 },
		{ xtype: 'container', flex: 3, layout : { type : 'fit', align : 'stretch' },items:[
		{ xtype : 'grid',store : 'App.store.supplier.wizard.AccountBank',
				    columns: [
				        {width: 150, text: 'Name',  dataIndex: 'name' },
				        {width: 150, text: 'Number',  dataIndex: 'norek' },
				        {width: 100, text: 'Type Account', dataIndex : 'type_id',
									renderer: function(v, m, record, r, c, s, grid){ return record.getType().get('name'); }
					      },
				        {width: 300, text: 'Name Bank', dataIndex : 'bank_id',
									renderer: function(v, m, record, r, c, s, grid){ return record.getBank().get('name'); }
					      },
				    ],
			    dockedItems: [
			    {   xtype: 'pagingtoolbar', dock:'bottom', store: 'App.store.supplier.wizard.AccountBank', displayInfo: true }
			    ],

				  }
		] },
	],
});