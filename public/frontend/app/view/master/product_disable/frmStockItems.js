

Ext.define('App.view.master.product.frmStock',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.frmProductAddstockItems',
	border: false,
	layout : {	type: 'fit', align: 'stretch'},
     initComponent: function(){
     	this.callParent();
     },


    items : [
     {	xtype: 'container',
     	defaults : {
     		border : false,
     	},
     	layout: { type: 'vbox', align: 'stretch'},
     	items: [
    /*==========  Form   ==========*/
     		// { xtype : 'container', flex: .3 , html: 'Form'},
     		{ xtype : 'form', flex: .3 , /*html: 'Form',*/
     		// margin : '0 0 0 10',
			layout : { type : 'anchor', align : 'stretch' },
	     		items: [
                    { xtype: 'cbTypeLocation', fieldLabel: 'Tipe Lokasi', name: 'tipelokasi_id',anchor: '100%'  },
                    { xtype: 'cbwarehouse', fieldLabel: 'Lokasi Penyimpanan', name: 'lokasigudang_id', anchor: '100%'  },
		     		{ xtype: 'numberfield', fieldLabel: 'Panjang Kain', name: 'panjangkain',anchor: '100%',allowblank: false, minValue: 1, value: 0  },
		     		{ xtype: 'cbunits', fieldLabel: 'Satuan Kain', name: 'satuan_id',anchor: '100%'  },

		     		{ xtype: 'textfield', fieldLabel: 'Product ID', name: 'product_id',hidden: true,value: 100 },
     		]},
    /*==========  /Form   ==========*/
    /*==========  /End Items    ==========*/
 		]
 	}
     ],
	 dockedItems  : [{xtype: 'toolbar', dock: 'bottom', ui: 'footer',
	 items: ['->', {iconCls: 'icon-save', text: 'Save', formBind:true,
	 handler: function(btn){
        	var form = btn.up('panel').down('form'), val = form.getValues();
            log(form.isValid());
        	cDir(val);
    },
    action: 'addstock'}]}
    ],
 });
