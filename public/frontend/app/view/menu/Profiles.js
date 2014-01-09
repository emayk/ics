Ext.define('App.view.menu.Profiles', {
    extend: 'Ext.tree.Panel',
    store: 'menu.Profiles',
    alias: 'widget.menuProfiles',
    id: 'tree-panel-profiles',
    rootVisible: false,
    autoScroll: true,
    // requires: [
    // ],
    initComponent: function () {
        this.store = Ext.getStore(this.store);
        this.callParent(arguments);
    },
    myTitle : '[Profiles] ',
    listeners : {
        /*========================================
        =            Items Click Menu            =
        ========================================*/
           itemclick : function(tree, record, item, index, e,options) {
            /*==========  Dapatkan Content Panel  ==========*/
                    var nodeText = this.myTitle +record.data.text,
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
                        tabIndex = this.createtabs(tabPanel,record,true,'tabChangePassword');
                        break;
                    case 3 :
                        // tabIndex = this.createtabs(tabPanel,record,true,'tabChangePassword');
                        log('Logout Program');
                        // var a = Ext.Msg.show({
                        //      title:'Save Changes?',
                        //      msg: 'You are closing a tab that has unsaved changes. Would you like to save your changes?',
                        //      buttons: Ext.Msg.YESNO,
                        //      icon: Ext.Msg.QUESTION
                        // });
                        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do Logout Program ?' + App.config.APP_NAME, function(btn){
                              if (btn == 'yes') { logout(); }
                        });
                        // cDir(a);
                        break;

                    default:
                        tabIndex = this.createtabs(tabPanel,record);
                   }

               }

               tabPanel.setActiveTab(tabIndex);

           }
       /*-----  End of Items Click Menu  ------*/
   },
   createtabs : function(tabPanel,record,xtype,namaXtype){
            if (xtype){
                    tabPanel.add({
                        title : this.myTitle + record.data.text,
                        bodyPadding : 10,
                        xtype : namaXtype,
                        closable: true,
                        closeAction: 'destroy'
                    });
            }else{
                    tabPanel.add({
                        title :  this.myTitle + record.data.text,
                        // bodyPadding : 10,
                        html :'['+ record.data.id +']' + record.data.text,
                        closable: true,
                        closeAction: 'destroy'
                    });
            }

            return tabPanel.items.length - 1;
   }
});
