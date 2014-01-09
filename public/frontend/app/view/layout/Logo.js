Ext.define('App.view.layout.Logo', {
	extend: 'Ext.Img',
    alias: 'widget.Logo',
    width: '50%',
    height: 100,
    title: ics.appname ,

    src :  assets+'/assets/img/logo.jpg',
    layout: 'fit',
    initComponent : function() {
        this.callParent(arguments);
    },
});