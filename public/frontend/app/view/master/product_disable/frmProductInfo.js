/*==========  Simulasi Input  ==========*/

var name = sim_input_text('Nama Product'),
	nodesign = sim_input_text('nodesign',3),
	article = sim_input_text('Article ',5),
	supplier_id = '1',
	kategori_id = '1',
	tipe_id = '1',
	berat = randomNumber(),
	beratsatuan_id = '1',
	lebar = randomNumber(),
	lebarsatuan_id = '1' ;


Ext.define('App.view.master.product.frmProductInfo',{
    alias : 'widget.frmproductinfo',
    extend: 'Ext.panel.Panel',
    border: false,
    items: [
	{
	    xtype :'fieldset',
	    title : 'Informasi Product',
	    // columnWidth : 0.5,
	    defaultType : 'textfield',
	    layout : { type : 'anchor', align : 'stretch' },
	    items : [
	            {xtype : 'textfield', name: 'name', fieldLabel : 'Name ', value: name  },
	            {xtype : 'textfield', name: 'nodesign', allowBlank: false, fieldLabel : 'Article Number',value: article },
	            {xtype : 'textfield', name: 'kontruksi', allowBlank: false, fieldLabel : 'Dimension', value: nodesign},
	            {xtype : 'cbSupplier',name : 'supplier_id',  forceSelection : !isDebug(), hiddenName: 'supplier_id', value: supplier_id },
	            {xtype : 'cbcatproduct', name : 'kategori_id', forceSelection : !isDebug(), hiddenName : 'kategori_id', value: kategori_id},
	            {xtype : 'cbTypeProduct', name : 'tipe_id', forceSelection : !isDebug(), hiddenName : 'tipe_id' , value: tipe_id },
	            {xtype : 'container', layout: 'hbox',
	            	items : [
	            		{xtype : 'numberfield', name: 'berat', anchor : '-10', forceSelection : !isDebug(), hideTrigger: true, minValue: 0, allowBlank: false, fieldLabel : 'Weigth', value : berat},
	            		{name : 'beratsatuan_id', xtype : 'cbSatuan',  forceSelection : !isDebug(), hiddenName: 'beratsatuan_id', fieldLabel: '', value: beratsatuan_id}
	            		]
            	},

	             /*==========  Space  ==========*/
	            {  xtype : 'container', height: 5,  },
	            /*==========  Satuan  ==========*/
	            {xtype : 'container', layout: 'hbox',
	                items : [
	                    {xtype : 'numberfield', anchor : '-10', name: 'lebar',hideTrigger: true, minValue: 0, allowBlank: false, forceSelection : !isDebug(), fieldLabel : 'Width', value: lebar},
	                    {name : 'lebarsatuan_id', xtype : 'cbSatuan', forceSelection : !isDebug(), hiddenName: 'lebarsatuan_id', fieldLabel: '',value: lebarsatuan_id, }]
	            },
	            /*==========  Sub Space  ==========*/

	            // { xtype: 'frm-product-detail'}
	            { xtype: 'container', height: 10}
	        ]
	}],
    dockedItems  : [{
    xtype: 'toolbar',
    dock: 'bottom',
    ui: 'footer',
    items: ['->', {
        iconCls: 'icon-save',
        text: 'Save',
        formBind:false,
        action: 'addproduct',
    },{
        iconCls: 'icon-reset',
        text: 'Cancel',
        action: 'cancel',
    }]
}],

initComponent: function(){this.callParent(); }

});



// p.getLayout().setActiveItem(1);
