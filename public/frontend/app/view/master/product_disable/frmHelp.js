Ext.define('App.view.master.product.frmHelp',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.frm-new-product-help',
	layout : {type: 'fit', align: 'stretch'},
    items : [
     {xtype: 'container',html:'Content Help Here'}],
     initComponent: function(){
     	this.callParent();
     }
 });
