Ext.define('App.store.ContactPersons',{
	extend: 'Ext.data.Store',
	model: 'App.model.ContactPerson',
    autoload: true,
    groupField: 'deptname',
    pageSize: 15
});