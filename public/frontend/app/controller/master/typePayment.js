
/**
*
* Controller
*
* Programmer By Emay Komarudin (2013)
*	ExtJs Controller
**/
Ext.define('App.controller.master.typePayment', {
    extend: 'Ext.app.Controller',
    models: [],
    stores: ['App.store.typePayment'],
    views: [
	    'App.view.master.typePayment.List'
    ],
    refs: [
        /*{ref: 'ini', selector: 'danitu'}*/
    ],
    init: function(application) {
        this.control({

        });
        log('Initialize.. Type Payment.');
    },
});