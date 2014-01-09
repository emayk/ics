Ext.define('App.view.reports.column',{
    extend: 'Ext.chart.Chart',
    alias: 'widget.chartsalescolumn',
    animate : true,
    store : 'App.store.chart.sSales',
    shadow : true,
    insetPadding : 60,
    theme : 'Base:gradients',
    axes : [
    	{ type : 'Numeric', position: 'left', fields: ['total_sales'], label :  Ext.util.Format.numberRenderer('0,0'), title : 'Total Sales', grid: true,minimum: 0 },
    	{ type: 'Category', position : 'bottom', fields : ['category'], title: 'Film Category' }
    ],

    series : [
    	{
    		type : 'column', axis : 'vertical', highlight : true,
    		tips : {
    			trackMouse : true, width : 140, height : 28,
    			renderer : function  (storeitems,items) {
    				var title = storeitems.get('category') + ' : '
    						+ storeitems.get('total_sales') +' $' ;
    				this.setTitle(title) ;
    			}
    		},
  			label : {
  				display : 'insideEnd','text-anchor' : 'middle', field : 'total_sales',
  				renderer :  Ext.util.Format.numberRenderer('0'),
  				orientation : 'vertical',color : '#333'
  			},
				xField : 'category',
				yField : 'total_sales'
    	} ]
});
