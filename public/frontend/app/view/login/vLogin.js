Ext.define('App.view.login.vLogin', {
	extend: 'Ext.window.Window',
	alias: 'widget.login',
	requires: [
		'App.view.Translation'
	],
	autoShow: true,
	height: 170,
	width: 360,
	layout: {type: 'fit'},
	iconCls: 'key',
	title: translations.login,
	closeAction: 'hide',
	closable: false,
	initComponent: function () {
		var me = this;
		Ext.apply(me, {
			items: [
				{
					xtype: 'form',
					frame: false,
					bodyPadding: 15,
					defaults: {
						xtype: 'textfield',
						anchor: '100%',
						labelWidth: 90,
						allowBlank: false,
						vtype: 'alphanum',
						minLength: 3,
						msgTarget: 'under'
					},
					items: [
						{
							name: 'user',
							fieldLabel: translations.user,
							maxLength: 25,
							value: isDebug() ? 'admin' : ''
						},
						{
							inputType: 'password',
							name: 'password',
							fieldLabel: translations.password,
							maxLength: 15,
							value: isDebug() ? '123' : '',
							enableKeyEvents: true,
							id: 'formloginpassword'
						}
					],
					dockedItems: [
						{
							xtype: 'toolbar', dock: 'bottom',
							items: [
								{
									xtype: 'translation'
								},
								{
									xtype: 'tbfill'
								},
								{
									xtype: 'button',
									itemId: 'cancel',
									iconCls: 'cancel',
									text: translations.cancel
								},
								{
									itemId: 'submit',
									formBind: true,
									iconCls: 'key-go',
									text: translations.submit
								}
							]
						},
						{
							xtype: 'toolbar',
							dock: 'top',
							items: [
								'->',
								{
									xtype: 'tbtext',
									text: ics.appname + ' Version ' + ics.version
								}
							]
						}
					]

				}
			]
		});
		me.callParent();
	}


});

