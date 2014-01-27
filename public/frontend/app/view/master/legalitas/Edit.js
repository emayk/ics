Ext.define('App.view.master.legalitas.Edit', {
	extend: 'Ext.window.Window',
	alias: 'widget.legalitasEdit',
	title: 'Edit Legalitas ',
	padding : 10,
	height: 150,
	width: 350,
	layout: 'fit',
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'form',
					bodyPadding: 5,
					defaults: {
						anchor: '95%'
					},
					items: [
						{
							xtype: 'textfield',
							name: 'name',
							fieldLabel: 'Nama',
							allowBlank:false
						},
						{
							xtype: 'textfield',
							name: 'info',
							fieldLabel: 'Keterangan '
						}
					]
				}
			],
			bbar: [
				{ text: 'Bantuan', iconCls: 'help', action: 'help' },
				'->',
				{ text: 'Save', iconCls: 'add', action: 'save' },
				{ text: 'Cancel', iconCls: 'close',
					handler: function (btn) {
						btn.up('window').close();
					}
				}
			]
		});
		me.callParent(arguments);

	}
});
