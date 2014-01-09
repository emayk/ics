Ext.define('App.view.import.import',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.cardimport',
	layout: 'card',
	activeItem: 1,
	items: [
		{ xtype: 'container', html: 'page 1'},
		{ xtype: 'importdepartement', html: 'page 2', itemId: 'departement'},
		{ xtype: 'container', html: 'page 3', itemId: 'product'},
		{ xtype: 'container', html: 'page 4', itemId: 'legalitas'},
		{ xtype: 'container', html: 'page 5', itemId: 'currency'},
	],
		dockedItems : [
		{ xtype : 'toolbar', flex: 1, dock: 'top',
			items : [
				{
					text : 'Choose Type Import',
					iconCls : 'menu_country',
					menu: {
						xtype : 'menu',
						itemId : 'typeImport',
						items : [
							{ xtype : 'menuitem', text: 'Departement', itemId : 'departement', iconCls: 'chart_pie'},
							{ xtype : 'menuitem', text: 'Product', itemId : 'product', iconCls: 'chart_column'},
							{ xtype : 'menuitem', text: 'Legalitas', itemId : 'legalitas', iconCls: 'chart_column'},
							{ xtype : 'menuitem', text: 'Currency', itemId : 'currency', iconCls: 'chart_column'},
						]
					}
				},
/*Download Menu*/
		// {
		// 	text : 'Download Chart',
		// 	iconCls : 'download',
		// 	menu : {
		// 		xtype: 'menu',
		// 		itemId: 'download',
		// 		items: [
		// 			{ xtype : 'menuitem', text: 'Download as Image', itemId: 'png', iconCls: 'image'},
		// 			{ xtype : 'menuitem', text: 'Download as SVG', itemId: 'svg', iconCls: 'svg'},
		// 			{ xtype : 'menuitem', text: 'Download as PDF', itemId: 'pdf', iconCls: 'pdf'},
		// 		]
		// 	}
		// }

			] }]
})