/**
 * Created by emayk on 3/9/14.
 */

Ext.define('App.store.product.listImportPrd', {
    extend: 'Ext.data.Store',
    fields: [
        "id",
        "catname",
        "name",
        "typename",
        "nodesign",
        "width",
        "weight",
        "unitname",
        "code_internal",
        "status",
        "importId",
        "totallength",
        "totalroll",
        "information"
    ],
    pageSize: 25,
    proxy: {
        url: getApiUrl() + '/products',
//        url: "/ba/test/import/product",
        type: 'rest',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});