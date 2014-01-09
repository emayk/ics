// var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
Ext.define('App.view.master.contactperson.List',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.contactpersonList',
	title: 'List Contact Person',
	// plugins : [rowEditing],
	// uses: [
 //        'Ext.ux.exporter.Exporter'
 //    ],
	store : 'ContactPersons',
	initComponent: function(){
		/*==========  Pastikan Store di Loaded  ==========*/
		log('ContactPerson Loaded');
		this.callParent(arguments);
		Ext.getStore(this.store).load();
	},
	features: [
		{	ftype:'grouping'	}
	],
	columns:[
		// 'name','info','jabatan_id','departement_id','nohp','email','fax',
		{xtype: 'rownumberer'},
		{
			header: 'Name',
			dataIndex: 'name',
			flex: 1,
		},
		{
			header: 'Information',
			dataIndex: 'info',
			flex: 1
		},
		// {header: 'Position',dataIndex: 'jabatan_id',flex: 1},
		{
			header: 'Position',
			dataIndex: 'positionnname',
			flex: 1
		},
		// {header: 'Departement',dataIndex: 'departement_id',flex: 1},
		{header: 'Departement',dataIndex: 'deptname',flex: 1},
	 {
	 	text: 'Department (ID)',
	 	xtype:'templatecolumn',
	 	tpl:'{deptname} ({departement_id})'
	 },
		{header: 'nohp',dataIndex: 'nohp',flex: 1},
		{header: 'email',dataIndex: 'email',flex: 1},
		{header: 'fax',dataIndex: 'fax',flex: 1},
        {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            // tdCls:'delete',
            items: [{
                // icon: '/assets/fugue/icons/cross-shield.png',
                iconCls:'delete',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                            Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
                            if (btn == 'yes'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    grid.getStore().remove(rec);
                                    grid.getStore().sync();
                                    grid.getStore().load();
                                    Ext.getCmp('pagingContactPerson').doRefresh();
                            }
                            });
                    }
                }]
        }

	],
	dockedItems : [
	{
		/*==========  Pagination  ==========*/
		xtype: 'pagingtoolbar',
		id: 'pagingContactPerson',
		dock:'bottom',
		stateId: 'stateGridListCp',
        stateful: true,
		store: 'ContactPersons',
		displayInfo: true,
	},
	{
		/*==========  Toolbar  ==========*/
		xtype: 'toolbar',
        items: [{
        	type:'plus',
            iconCls: 'icon-save',
            itemId: 'add',
            text: 'Add',
            action: 'add'
        }]
    },

	]


});