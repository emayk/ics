Ext.define('App.view.menu.Master', {
    extend: 'Ext.tree.Panel',
    title: 'Simple Tree',
    store: 'menu.Masters',
    alias: 'widget.menuMasters',
    id: 'tree-panel',
    rootVisible: false,
    autoScroll: true,

    initComponent: function () {
        this.store = Ext.getStore(this.store);
        this.callParent(arguments);
    },

    myTitle : '[Master] ',
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
/*==========  Home  ==========*/

                        tabIndex = tabPanel.setActiveTab(0);
                        break;
/*==========  Master  ==========*/

                    case 1 :
                        tabIndex = this.createtabs(tabPanel,record,true,'tabMaster');
                        break;
                    case 11 :
/*==========  Legalitas  ==========*/

                        tabIndex = this.createtabs(tabPanel,record,true,'legalitasGridList');
                        break;
                    case 12 :
                        //users
                        tabIndex = this.createtabs(tabPanel,record,true,'gridUsers');
                        break;
                    case 13 :
                        tabIndex = this.createtabs(tabPanel,record,true,'bankListGrid');
                        break;
                    case 14 :
                        tabIndex = this.createtabs(tabPanel,record,true,'contactpersonList');
                        break;
                    case 15 :
                        tabIndex = this.createtabs(tabPanel,record,true,'departementGridList');
                        break;
                    case 16 :
                        tabIndex = this.createtabs(tabPanel,record,true,'gradekainGridList');
                        break;
                    case 17 :
                        tabIndex = this.createtabs(tabPanel,record,true,'gudangGridList');
                        break;
                    case 18 :
                        tabIndex = this.createtabs(tabPanel,record,true,'currencyGridList');
                        break;
                    case 19 :
                        tabIndex = this.createtabs(tabPanel,record,true,'colorGridList');
                        break;
                    case 20 :
                        tabIndex = this.createtabs(tabPanel,record,true,'typeorderGridList');
                        break;
                    case 22 :
                        tabIndex = this.createtabs(tabPanel,record,true,'listcountriesGP');
                        break;
                    case 23 :
                        tabIndex = this.createtabs(tabPanel,record,true,'listprovincesGP');
                        break;
                        /*==========  List Kota  ==========*/
                    case 24 :
                        tabIndex = this.createtabs(tabPanel,record,true,'listcitiesGP');
                        break;
/*==========  All Office  ==========*/
                    case 25 :
                        // tabIndex = this.createtabs(tabPanel,record,true,'listheadGP');
                        break;
                    //
/*==========  HO Supplier  ==========*/
                    case 26 :
                        tabIndex = this.createtabs(tabPanel,record,true,'listheadGP');
                        break;
/*==========  HO Buyer  ==========*/
                    // case 26 :
                    //     tabIndex = this.createtabs(tabPanel,record,true,'listcitiesGP');
                    //     break;

/*==========  Product  ==========*/
                    case 32 :
                        tabIndex = this.createtabs(tabPanel,record,true,'tabProducts');
                        // tabIndex = this.createtabs(tabPanel,record,true,'gridProducts');
                        break;
/*==========  Supplier  ==========*/
                    case 33 :
                        tabIndex = this.createtabs(tabPanel,record,true,'tabSupplier');
                        // tabIndex = this.createtabs(tabPanel,record,true,'gridProducts');
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
                        title : this.myTitle + record.data.text,
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
