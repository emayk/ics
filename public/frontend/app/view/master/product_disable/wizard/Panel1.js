Ext.define('App.view.master.product.wizard.Panel1',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.panel1',
    title: 'Step 1: Order Entry - Header',
    items: [
 {
  xtype: 'container',
  margin: '10 0 5 0',
  layout: {
         type: 'hbox'
     },
     width: 300,
  defaults: {
         flex: 1,
     },
  items: [
       {
              xtype: 'button',
                 id: 'add',
                 text: 'New Order',
                 iconCls: 'icon-add'
       },
             {
              xtype: 'button',
                 id: 'continue',
                 text: 'Continue',
                 iconCls: 'icon-go'
             }
       ]
 },
    {
     xtype: 'headerEntry'
    }],
    layout: 'auto'
});