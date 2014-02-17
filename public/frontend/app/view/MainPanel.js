Ext.define('App.view.MainPanel', {
	extend: "Ext.tab.Panel",
	alias: 'widget.mainpanel',
	activeTab: 1,
	plain: true,
	items: [
		{ xtype: 'appdashboardvdashboard', title: 'Dashboard', iconCls: 'home', closable: false}
	],
	plugins: [
		{
			ptype: 'tabscrollermenu',
			maxText: 15,
			pageSize: 5
		}
	]
});