Ext.define('App.view.menu.Accordion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainmenu',
    width: 300,
    layout: {type: 'accordion'},
    collapsible: false,
    hideCollapseTool: false,
    iconCls: 'sitemap',
    title: 'Menu',
      defaults: {
       stateEvents: ["collapse","expand"],
       getState:function() {return { collapsed:this.collapsed}; }
    },
    tools:[{
    type:'refresh',
    tooltip: 'Refresh Menu',
    itemId: 'refresh'
    // // hidden:true,
    // handler: function(event, toolEl, panelHeader) {
    //     // refresh logic
    // }
    }]
});
