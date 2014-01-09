Ext.define('App.model.Flickr',{
		extend: 'Ext.data.Model',
		fields: [
		{
			name: 'title',
			type: 'string'
		}, 
		{
			name: 'link',
			type: 'string'
		},
		{
			name: 'media',
			type: 'string'
		}
		],
		proxy: {
			type: 'ajax',
			url: '/app/home/app/data/flickr.json',
			reader: {
				type: 'json',
				root: 'items'
			}
		} 
});

