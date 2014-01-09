/**
*
* View Help
*
* Programmer By Emay Komarudin.
* 2013
*
* Menampilkan Info Order
*
**/
Ext.define('App.view.help.vHelp', {
    extend: 'Ext.window.Window',
    alias: 'widget.vhelpWin',
    bodyPadding : 5,
    layout : 'fit',
    title: '[Help]',
    items: [
	    { xtype: 'panel', flex: 1,
	    autoScroll: true,
	    items: [
	    { xtype: 'dataview',bodyPadding : 2,
            store: Ext.create('App.store.help.sHelp'),
		    // store: 'App.store.help.sHelp',
		    tpl: new Ext.XTemplate(
								'<tpl for=".">',
	                  '<div class="post-data">',
                    '<h3 class="post-title">{title}</h3>',
                '</div>',
                 '<div class="post-body">{content:this.getBody}</div>',
								'</tpl>',
											{
				                getBody: function(value, all) {
				                    return Ext.util.Format.stripScripts(value);
				                },
								}
								),


		    emptyText: 'No Help Available'
		  }
    ]}
    ],
    bbar: ['->',
    { xtype: 'button', iconCls : 'close',text: 'close',
            handler: function(btn){btn.up('window').close(); }
    }],
    initComponent: function(){    	this.callParent(arguments); },

    listeners:{
    	show:function() {
            this.loadMask = new Ext.LoadMask(this.body, {
                msg:'Loading. Please wait...'
            });
      },
      render: function(){
        this.height = hWinMax();
        this.width = wWinMax();
      }
  }
});



 // ,autoScroll:true
 //        ,autoLoad:{
 //            url:'autoload-content.php'
 //        }
 //        ,title:Ext.getDom('page-title').innerHTML
 //        ,tbar:[{
 //             text:'Reload'
 //            ,handler:function() {
 //                win.load(win.autoLoad.url + '?' + (new Date).getTime());
 //            }
 //        }]
 //        ,listeners:{show:function() {
 //            this.loadMask = new Ext.LoadMask(this.body, {
 //                msg:'Loading. Please wait...'
 //            });
 //        }}
 //    });