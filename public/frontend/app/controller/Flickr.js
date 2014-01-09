Ext.define('App.controller.Flickr',{
	extend: 'Ext.app.Controller',
	views:['form.Flickr'],
	stores:['Flickrs'],
	init: function(){
		 log('Flickers Init');
	}
});
