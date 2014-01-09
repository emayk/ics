Ext.define('App.model.Flickr',{
	extend: 'Ext.data.Model',
	// masukan Proxy disini
	fields: [
	{
		name: 'title',
		type: 'string'
	},
	{
		name: 'link',
		type: 'string'
	}
	] ,
	// assosiasi ke Items
	hasMany: { model: 'FlickrItems', name: 'items'},
});


Ext.define('App.model.FlickrItems',{
	extend: 'Ext.data.Model',
	fields: ['title','link','date_taken'],
	belongsTo: 'App.model.Flickr',
	hasMany: {
		model: 'FlickrItemsMedia',
		name: 'media',
	}
});

Ext.define('App.model.FlickrItemsMedia',{
	extend: 'Ext.data.Model',
	fields: [
		'media'
	]
});

