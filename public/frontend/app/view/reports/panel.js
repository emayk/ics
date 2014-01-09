Ext.define('App.view.reports.panel',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.reportsales',
	layout : 'card',
	items : [
		{ xtype : 'chartsalescolumn'},
		{ xtype : 'chartsalespie'},
	],
	dockedItems : [
		{ xtype : 'toolbar', flex: 1, dock: 'top',
			items : [
/*Ubah Tipe*/
				{
					text : 'Change Chart Type',
					iconCls : 'menu_reports',
					menu: {
						xtype : 'menu',
						itemId : 'changeType',
						items : [
							{ xtype : 'menuitem', text: 'Pie', itemId : 'pie', iconCls: 'chart_pie'},
							{ xtype : 'menuitem', text: 'Column', itemId : 'column', iconCls: 'chart_column'},
						]
					}
				},
/*Download Menu*/
		{
			text : 'Download Chart',
			iconCls : 'download',
			menu : {
				xtype: 'menu',
				itemId: 'download',
				items: [
					{ xtype : 'menuitem', text: 'Download as Image', itemId: 'png', iconCls: 'image'},
					{ xtype : 'menuitem', text: 'Download as SVG', itemId: 'svg', iconCls: 'svg'},
					{ xtype : 'menuitem', text: 'Download as PDF', itemId: 'pdf', iconCls: 'pdf'},
				]
			}
		}

			]
		},
	]
});