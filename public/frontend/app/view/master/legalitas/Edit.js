Ext.define('App.view.master.legalitas.Edit',{
	extend : 'Ext.window.Window',
	alias : 'widget.legalitasEdit',

	title 	: 'Edit Legalitas ',
	layout 	: 'fit',
	autoShow : true,

	initComponent : function() {
        console.log('Legalitas Edit init');
		this.items = [
			{
				xtype : 'form',
				items : [
					{
						xtype : 'textfield',
						name : 'id',
						hidden: true,
						fieldLabel : 'ID'
					},
					{
						xtype : 'textfield',
						name: 'name',
						fieldLabel : 'Name Legalitas'
					},					
					{
						xtype : 'textfield',
						name: 'info',
						fieldLabel : 'Info Legalitas'
					},
				]
			}
		];

		this.buttons = [
			{
				text : 'Save',
				action : 'save'
			},
			{
				text : 'Cancel',
				scope : this,
				handler : this.close
			}
		];

		this.callParent(arguments);
	}
});
