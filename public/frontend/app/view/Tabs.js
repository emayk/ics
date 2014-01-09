// =================================
// =            View Tabs            =
// =================================
/**
*
* Menyimpan semua Tab Yang ada secara
* default di-inisialisasi
*
**/

Ext.define('App.view.Tabs', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabsApp',
    id: 'content-panel',
    activeTab: 1,
    items: [
        {title: 'Home', id: 'tab-home', xtype: 'wizardSetup', closable : false},
        {
            id: 'tabtest',
            title: 'Generate Component',
            xtype: 'container', items:[
                {xtype: 'container', html: 'Load From Ajax'},
                {xtype: 'button',text:'AJax Load',
                handler: function(){
                    // execute an Ajax request to invoke server side script:
                    Ext.Ajax.request({
                        url: api_url + '/gen-invoice-grid.php',
                        // params: {
                        //     // startDate: Ext.getCmp('start-date').getValue(),
                        //     startDate: '01/01/2008',
                        //     // endDate: Ext.getCmp('end-date').getValue()
                        //     endDate: '01/01/2009',
                        // },
                        success: function(xhr) {
                            var obj = Ext.JSON.decode(xhr.responseText);
                            var title = obj.title;
                            var newComponent = eval(obj);
                            // var newComponent = JSON.parse(obj);
                            var tabPanel = Ext.getCmp('content-panel'),
                            tabBar = tabPanel.getTabBar(), tabIndex;

                               for ( var i = 0; i< tabBar.items.length; i++) {
                                if (tabBar.items.get(i).getText() === title) {tabIndex = i; }
                            }

                                if (Ext.isEmpty(tabIndex) ) {
                                    tabPanel.add(newComponent); tabIndex = tabPanel.items.length - 1;
                                }
                                tabPanel.setActiveTab(tabIndex);

                        },
                        failure: function() {
                            msgError(" Component Cannot Generate");
                        }
                    });
                }

            },
            ]
        }
    ],
});
/*-----  End of View Tabs  ------*/