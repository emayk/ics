/**
 * Store Grid List Banks
 *
 * @author Emay K
 */
Ext.define('App.store.Banks',{
	extend: 'Ext.data.Store',
	model: 'App.model.Bank',
//	pageSize: 25,
//	autoLoad: {start: 0, limit: 15},
    proxy: {
        type: 'rest',
        url: getApiUrl() + '/bank',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});