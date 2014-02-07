Ext.define('App.view.menu.vMenuEditor', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.vMenuEditor',
	layout: { type: 'fit', align: 'stretch'},
	bodyPadding: 10,
	autoScroll: true,

	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{ xtype: 'container', flex: 1, layout: { type: 'vbox', align: 'stretch'},
					items: [
						/*path : vMenuEditor grid #gridMenu*/
						{ xtype: 'grid', flex: 2, itemId: 'gridMenu',
							store: Ext.create('Ext.data.Store', {
								autoLoad: true, model: 'App.model.menu.menuEditor'}),
							columns: [
								{ dataIndex: 'id', header: 'Id'},
								{ dataIndex: 'text', header: 'Name'},
								{ dataIndex: 'iconCls', header: 'Style Icon'},
								{ dataIndex: 'className', header: 'Xtype Type'},
								{ dataIndex: 'parent_id', header: 'Parent'},
							]
						},
						{ xtype: 'container', height: 10},
						{ xtype: 'form', itemId: 'formEditor', flex: 2, bodyPadding: 10, title: 'Form Menu', layout: { type: 'vbox', align: 'stretch'},
							items: [
								{ xtype: 'textfield', fieldLabel: 'Id', name: 'id'},
								{ xtype: 'textfield', fieldLabel: 'Name', name: 'text'},
								{ xtype: 'textfield', fieldLabel: 'icon', name: 'iconCls'},
								{ xtype: 'textfield', fieldLabel: 'xtype', name: 'className'},
								{ xtype: 'combobox', fieldLabel: 'xtype', name: 'parent_id',
									store: Ext.create('Ext.data.Store', {
										fields: ['id', 'name'],
										data: [
											{ id: 0, name: 'Parent 0'},
											{ id: 1, name: 'Parent 1'},
											{ id: 2, name: 'Parent 2'},
											{ id: 3, name: 'Parent 3'},
											{ id: 4, name: 'Parent 4'},
											{ id: 5, name: 'Parent 5'},
											{ id: 6, name: 'Parent 6'},
											{ id: 7, name: 'Parent 7'},
											{ id: 8, name: 'Parent 8'},
											{ id: 9, name: 'Parent 9'},
											{ id: 10, name: 'Parent 10'},
										],
									}),
									queryMode: 'local',
									displayField: 'name',
									valueField: 'id',
								},
							],
							bbar: [
								{ text: 'Help', iconCls: 'help', itemId: 'help'},
								'->',
								{ text: 'Save', iconCls: 'save', itemId: 'save'},
								{ text: 'Cancel', iconCls: 'cancel', itemId: 'cancel'},
							]
						}
					]
				}
			],
		});
		this.callParent(arguments);
		// this.down('grid#gridMenu').getStore().getProxy().setExtraParams( im, 'here');
	}
});