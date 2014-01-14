/**
 * Model Bank
 *
 * @author Emay K
 */
Ext.define('App.model.Bank', {
    extend: 'Ext.data.Model',
    fields: [
        'id', 'name', 'address', 'notelp', 'uuid' ],
    validations: [
        {
            type: 'length',
            field: 'name',
            min: 5
        }
    ],

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
