

Ext.define('App.view.master.product.frmStock',{
	extend : 'Ext.panel.Panel',
	alias : 'widget.frm_product_addstock',
	border: false,
	layout : {	type: 'fit', align: 'stretch'},
     initComponent: function(){
     	this.callParent();
     },
     /**
     *
     * Page terdiri dari 2 yaitu
     * Form , dan Grid List
     *
     **/

// 'id',
// 'tipelokasi_id',
// 'product_id',
// 'rollnumber',
// 'lokasigudang_id',
// 'detail_id',
// 'panjangkain',
// 'onday',
// 'satuan_id',
// 'hargabeli',
// /*==========  Mapping  ==========*/
// 'uuid',
// 'createby_id',
// 'lastupdateby_id',

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
		     		{ xtype: 'numberfield', fieldLabel: 'Panjang Kain', name: 'panjangkain',anchor: '100%',allowblank: false, minValue: 1, value: 0,maxValue: 2147483647  },
		     		{ xtype: 'cbunits', fieldLabel: 'Satuan Kain', name: 'satuan_id',anchor: '100%'  },

		     		{ xtype: 'textfield', fieldLabel: 'Product ID', name: 'product_id',hidden: true,value: 100 },
     		]},
    /*==========  /Form   ==========*/
    /*==========  Grid   ==========*/
     		// { xtype : 'container', flex: .3 , html: 'Grid List Here'},
     		// { xtype : 'container', flex: .3 , html: 'Grid List Here'},
    /*==========  /End Items    ==========*/
 		]
 	}
     ],
	 dockedItems  : [
     {xtype: 'toolbar', dock: 'bottom', ui: 'footer',
	 items: [
        {
            iconCls: 'icon-save', text: 'Add Stock', formBind:true,
            handler: function(btn){
            	var form = btn.up('panel').down('form'), val = form.getValues();
                log(form.isValid());
            	cDir(val);

                if (!form.isValid()){
                    msgError('Isi Form dengan Lengkap dan Benar');
                    return;
                }
                tunggu();

                form.submit({
                    url: api_url + '/stockproducts',
                    waitMsg: 'Added New Stock Product',
                    success: function(fp, o) {
                        Ext.Msg.alert('Success', 'Processed file "' + o.result.results + '" on the server');
                        // Ext.getCmp('PgProduct').doRefresh();
                        // win.close();
                    },
                    failure: function() {
                        Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).error.message);
                    }
                });

            },
        action: 'addstock'}
        ,{
            iconCls: 'icon-reset',
            text: 'Cancel',
            action: 'resetNewStock',
            // handler: function(btn){
            //     var form = btn.up('panel').down('form'), val = form.getValues();
            //     form.reset();
            // }
        }
        ]
    },
    ],
 });
