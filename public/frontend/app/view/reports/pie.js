/*Pie Chart Example*/
Ext.define('App.view.reports.pie',{
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartsalespie',
    animate : true,
    store : 'App.store.chart.sSales',
    shadow : true,
    legend : { position : 'right' },
    insetPadding : 60,
    theme : 'Base:gradients',
    series : [
    	{
    		type : 'pie',
    		field: 'total_sales',
    		showInLegend : true,
    		tips : {
    			trackMouse : true, width : 140, height : 28,
    			renderer : function  (storeitems,items) {
    				var title = storeitems.get('category') + ' : '
    						+ storeitems.get('total_sales');
    				this.setTitle(title) ;
    			}
    		},
    		highlight : {
    			segment : { margin : 20}, },
  			label : {
  				field: 'category', display: 'rotate', contrast : true, font : '18px Arial'
  			}
    	} ]
});
