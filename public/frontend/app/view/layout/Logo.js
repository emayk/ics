Ext.define('App.view.layout.Logo', {
	extend: 'Ext.Img',
    alias: 'widget.Logo',
    width: '50%',
    height: 100,
    title: App.config.APP_NAME ,

    src :  App.config.logoImg,
    layout: 'fit',
    initComponent : function() {
        this.callParent(arguments);
    }
});