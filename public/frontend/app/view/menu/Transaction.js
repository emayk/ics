Ext.define('App.view.menu.Transaction', {
    extend: 'Ext.tree.Panel',
    store: 'menu.Transactions',
    alias: 'widget.menuTransactions',
    id: 'tree-panel-transaction',
    rootVisible: false,
    autoScroll: true,
    myTitle : '[Transaction] > ',
    initComponent: function () {
        this.store = Ext.getStore(this.store);
        this.callParent(arguments);
    },
    listeners : {
        /*========================================
        =            Items Click Menu            =
        ========================================*/
           itemclick : function(tree, record, item, index, e,options) {
            /*==========  Dapatkan Content Panel  ==========*/
                    var nodeText = this.myTitle + record.data.text,
                        tabPanel = Ext.getCmp('content-panel'),
                        tabBar = tabPanel.getTabBar(),
                        id = record.data.id,
                        tabIndex;

                   for ( var i = 0; i< tabBar.items.length; i++) {
                       if (tabBar.items.get(i).getText() === nodeText) {
                           tabIndex = i;
                            }
                    }                        

               if (Ext.isEmpty(tabIndex) ) {

                   switch (id){
                    case 0 :
                        tabIndex = tabPanel.setActiveTab(0);
                        break;
                    case 2 :
                        tabIndex = this.createtabs(tabPanel,record,true,'tabOrder');
                        break;                           
                    default:
                        tabIndex = this.createtabs(tabPanel,record);
                   }
                   
                   // tabIndex = (id === 0 ) ? tabPanel.setActiveTab(0) : (id === 1) ? 
                   //  this.createtabs(tabPanel,record,true,'tabMaster')
                   //  :this.createtabs(tabPanel,record);
                   // tabIndex = tabPanel.items.length - 1;
               }

               tabPanel.setActiveTab(tabIndex);
           
           }
       /*-----  End of Items Click Menu  ------*/
   },
   createtabs : function(tabPanel,record,xtype,namaXtype){
            if (xtype){
                    tabPanel.add({
                        title :this.myTitle + record.data.text,
                        // bodyPadding : 10,
                        xtype : namaXtype,
                        closable: true,
                        closeAction: 'destroy'
                    });
            }else{
                    // if (record.data.leaf){
                            // return;
                    // }else{
                    tabPanel.add({
                        title : this.myTitle + record.data.text,
                        // bodyPadding : 10,
                        html :'['+ record.data.id +']' + record.data.text,
                        closable: true,
                        closeAction: 'destroy'
                    });
                    // }                
            }

            return tabPanel.items.length - 1;
   }
});
