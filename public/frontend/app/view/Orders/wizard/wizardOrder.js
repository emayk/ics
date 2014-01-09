Ext.define('App.view.Orders.wizard.wizardOrder',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.wizardOrder',
	layout: 'card',activeItem : 0,
	items :[
		{xtype : 'orderpage1', itemId: 'page1',title: 'Page 1/6'},
		{xtype : 'orderpage2', itemId: 'page2'},
		{xtype : 'orderpage3', itemId: 'page3'},
		{xtype : 'orderpage4', itemId: 'page4'},
		{xtype : 'orderpage5', itemId: 'page5'},
		{xtype : 'orderpage6', itemId: 'page6'},
		{xtype : 'container', itemId: 'page7', html: 'Page 7'},
	],
	active : 0,
	bbar : [
			{ text : 'Help',iconCls : 'help',itemId: 'help',
				handler : function() {
					winHelp('Form_Create_Order');
				}
			},
			'->',
			{itemId : 'page1',text : 'Product',iconCls: 'prev', handler : function(btn){btn.up('wizardOrder').getLayout().setActiveItem('page1'); } },
			{itemId : 'page2',text : 'Supplier',iconCls: 'prev', handler : function(btn){btn.up('wizardOrder').getLayout().setActiveItem('page2'); } },
			{itemId : 'page3',text : 'Contacts',iconCls: 'prev', handler : function(btn){btn.up('wizardOrder').getLayout().setActiveItem('page3'); } },
			{itemId : 'page4',text : 'Warehouse',iconCls: 'prev', handler : function(btn){btn.up('wizardOrder').getLayout().setActiveItem('page4'); } },
			{itemId : 'page5',text : 'Payment',iconCls: 'prev', handler : function(btn){btn.up('wizardOrder').getLayout().setActiveItem('page5'); } },
			{itemId : 'page6',text : 'Preview Order',iconCls: 'prev', handler : function(btn){btn.up('wizardOrder').getLayout().setActiveItem('page6'); } },
			'-',
			{
				text : 'Close',iconCls: 'close',itemId: 'close',
				// handler : function(btn){
				// 		btn.up('window').close();
				// }

			}

	],
});