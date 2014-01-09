/**
*
* Controller orderApproval
*
* Programmer By Emay Komarudin.
* 2013
*
*
* Description Controller orderApproval
*
*
**/

Ext.define('App.controller.corderApproval',{
	extend: 'Ext.app.Controller',
	views: [
	'App.view.orderApproval.tab',
	'App.view.orderApproval.vorderApproval',
	'App.view.orderApproval.vInfoOrder',
	],
	models:[
    'App.model.orderApproval.morderApproval',
    'App.model.orderApproval.mOrderItems'
    ],
	stores:['App.store.orderApproval.sorderApproval'],
 refs: [
        {ref: 'gridTrx', selector: 'tabVorderApproval > vorderApproval grid#gridTrx'},
        {ref: 'infoOrder', selector: 'vInfoOrder'}
    ],
	init: function(){
		  var me = this;

        me.control({
            'tabVorderApproval > vorderApproval grid#gridTrx': {
                selectionchange: me.on_grid_transaction_selection_change
            },
            'tabVorderApproval > vorderApproval grid#agree': {
                selectionchange: me.on_grid_transaction_selection_change
            },
            'tabVorderApproval > vorderApproval grid#decline': {
                selectionchange: me.on_grid_transaction_selection_change
            },

        });

		log('Controller corderApproval Loaded');
	},

	on_grid_transaction_selection_change: function(view,records){
        if (records.length) {
            this.show_detail_order(records[0]);
        }
	},
	   /**
     * Shows a specified record by binding it to
     */
    show_detail_order: function(record) {
        var me = this;
        me.getInfoOrder().bind(record);
        // me.getBookView().bind(record);
        // me.getReviewList().bind(record, me.getReviewsStore());
    }


});

