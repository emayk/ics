Ext.define('App.view.master.departement.List',{
	extend : 'Ext.grid.Panel',
	title: 'List Departement\'s',
	alias: 'widget.departementGridList',
	store: 'Departements',
	id: 'deptGridList',

	columns: [
			{
				xtype: 'rownumberer',
				width : 30,
				// flex: .2,
			},
			// {
   //          text: 'ID',
   //          width: 40,
   //          sortable: true,
   //          dataIndex: 'id'
   //      	},
			{
				header: 'Name',
				dataIndex : 'name',
				flex: 1,
				// renderer : function(v){
				// 	return Ext.util.Format.uppercase(v);
				// },
				editor: { allowBlank: true },
			},
			{
				header: 'Information',
				dataIndex : 'info',
				flex: 1,
				editor: {
					allowBlank: true
				}
			},
        {
            header: 'Action',
            xtype:'actioncolumn',
            flex: .4,
            // tdCls:'delete',
            items: [{
                // icon: '/assets/fugue/icons/cross-shield.png',
                tooltip: 'Delete',
                iconCls:'delete',
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
			]
	,
	// columnLines: true,
	selModel: 'rowmodel',
     /*==========  Plugins  ==========*/
     plugins: [
     Ext.create('Ext.grid.plugin.RowEditing',{
     		clicksToEdit: !1,
     		pluginId: 'cellEditorDept',
     		clicksToMoveEditor: 1
     	})
     ],
	/*==========  DockedItems  ==========*/
	dockedItems: [
	{
		xtype: 'toolbar',
		items: [{
				action: 'add',
				text: 'Add Dept'
		},
		{
			action: 'remove',
			text: 'Remove Dept',
			disabled : true
		}
		]
	},
	{
        xtype: 'pagingtoolbar',
        id: 'pagingDept',
        dock:'bottom',
        store: 'Departements',
        displayInfo: true
	}],
	initComponent : function(){
		this.callParent(arguments);
		Ext.getStore(this.store).load();
	}
});




















// Ext.define('App.view.master.departement.List',{
// 	extend : 'Ext.tab.Panel',
// 	alias: 'widget.mainContainer',
// 	title : 'Dept Manager',
// 	// id: 'deptGridList',
// 	items:[
// 	{
// 		xtype: 'gridpanel',
// 		title: 'List Departement\'s',
// 		store: 'Departements',
// 		name : 'editableGrid',

// columns: [
// 			// {
// 			// 	xtype: 'rownumberer'
// 			// },
// 			{
//             text: 'ID',
//             width: 40,
//             sortable: true,
//             dataIndex: 'id'
//         	},
// 			{
// 				header: 'Name',
// 				dataIndex : 'name',
// 				editor: { allowBlank: false },
// 			},
// 			{
// 				header: 'Information',
// 				dataIndex : 'info',
// 				editor: {
// 					allowBlank: true
// 				}
// 			},
// 			]
// 	,
// 	columnLines: true,
// 	selModel: 'rowmodel',
//      /*==========  Plugins  ==========*/
//      plugins: [
//      Ext.create('Ext.grid.plugin.RowEditing',{
//      		clicksToEdit: 1
//      })
//      ],
// 	/*==========  DockedItems  ==========*/
// 	dockedItems: [
// 	{
// 		xtype: 'toolbar',
// 		items: [{
// 				action: 'add',
// 				text: 'Add Dept'
// 		},
// 		{
// 			action: 'remove',
// 			text: 'Remove Dept',
// 			disabled : true
// 		}
// 		]
// 	},
// 	{
//         xtype: 'pagingtoolbar',
//         id: 'pagingDept',
//         dock:'bottom',
//         store: 'Departements',
//         displayInfo: true
// 	}]

// 	}]

// });














//  // var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//  //        clicksToMoveEditor: 1,
//  //        autoCancel: false
//  //    });


// var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//         listeners: {
//             cancelEdit: function(rowEditing, context) {
//                 // Canceling editing of a locally added, unsaved record: remove it
//                 if (context.record.phantom) {
//                 	var store = Ext.getCmp('deptGridList');
//                     store.remove(context.record);
//                 }
//             }
//         }
//     });

// Ext.define('App.view.master.departement.List',{
// 	extend : 'Ext.grid.Panel',
// 	title: 'List Departement\'s',
// 	alias: 'widget.departementGridList',
// 	store: 'Departements',
// 	id: 'deptGridList',
// 	columns: [
// 			// {
// 			// 	xtype: 'rownumberer'
// 			// },
// 			{
//             text: 'ID',
//             width: 40,
//             sortable: true,
//             dataIndex: 'id'
//         	},
// 			{
// 				header: 'Name',
// 				dataIndex : 'name',
// 				// editor: { allowBlank: false },
// 				 field: {
// 	                xtype: 'textfield'
// 		            }
// 			},
// 			{
// 				header: 'Name',
// 				dataIndex : 'info',
// 				// editor: {
// 				// 	allowBlank: true
// 				// }
// 								 field: {
// 	                xtype: 'textfield'
// 		            }
// 			},
// 	     //    {
//       //       header: 'Action',
//       //       xtype:'actioncolumn',
//       //       width:40,
//       //       tdCls:'delete',
//       //       items: [{
//       //           icon: '/assets/img/cancel-on.png',  // Use a URL in the icon config
//       //           tooltip: 'Delete',
//       //           handler: function(grid, rowIndex, colIndex) {
//       //           	/*=============================================
//       //           	=            Handler Action Delete            =
//       //           	=============================================*/
//       //               Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', function(btn,text){
//       //               if (btn == 'yes'){
//       //                       var rec = grid.getStore().getAt(rowIndex);
//       //                       grid.getStore().remove(rec);
//       //                       grid.getStore().sync();
//       //                       grid.getStore().load();
//       //                       Ext.getCmp('pagingBank').doRefresh();

//       //               }
//       //               });
//       //           	/*-----  End of Handler Action Delete  ------*/
//       //               }
//       //           }
//       //           ]
// 		    // }
// 			]
// 	,
// 	/*==========  Tbar  ==========*/
// 	 tbar: [
// 	 {
//             text: 'Add Departement',
//             iconCls: 'dept-add',
//             handler : function() {
//                 // rowEditing.cancelEdit();

//                 // // Create a model instance
//                 // var r = Ext.create('App.model.Departement', {
//                 //     name: 'Departement',
//                 //     info: 'Departement Baru'
//                 // });
//                 var grid = Ext.getCmp('deptGridList');
//                 var store = grid.getStore();
//                 // store.insert(0, r);
//                 // rowEditing.startEdit(0, 0);

//                 // store.insert(0, new Person());

//                 store.insert(0, new App.model.Departement());
//                 rowEditing.startEdit(0, 0);

//             }
//      },
//      {
//             itemId: 'removeDept',
//             text: 'Remove Departement',
//             iconCls: 'dept-remove',
//             handler: function() {
//             // handler: function(grid, rowIndex, colIndex){
//             	// var rec = grid.getStore().getAt(rowIndex);
//                     // grid.getStore().remove(rec);
//                     var grid = Ext.getCmp('deptGridList');
//                 // var sm = grid.getSelectionModel();
//                 // rowEditing.cancelEdit();
//                 // var store = grid.getStore();
//                 // store.remove(sm.getSelection());
//                 // if (store.getCount() > 0) {
//                 //     sm.select(0);
//                 // }

//                   var selection = grid.getView().getSelectionModel().getSelection()[0];
//                     if (selection) {
//                         store.remove(selection);
//                     }
//             },
//             disabled: true
//      }],
//      /*==========  Plugins  ==========*/
//      plugins: [rowEditing],
// 	/*==========  DockedItems  ==========*/
// 	listeners: {
//             'selectionchange': function(grid,view, records) {
//             	var grid = Ext.getCmp('deptGridList');
//                 grid.down('#removeDept').setDisabled(!records.length);
//             }
//     },
// 	dockedItems: [{
//         xtype: 'pagingtoolbar',
//         id: 'pagingDept',
//         dock:'bottom',
//         store: 'Departements',
//         displayInfo: true
// 	}],
// 	initComponent : function(){
// 		this.callParent(arguments);
// 	}
// });