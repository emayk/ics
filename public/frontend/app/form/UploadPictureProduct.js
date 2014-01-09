
Ext.define('App.form.UploadPictureProduct',{
	alias : 'widget.frmUploadPictureProduct',
    extend: 'Ext.window.Window',
    // requires: ['Ext.form.Panel'],
    title   : 'Change / View Picture Product',
    layout  : {
        type: 'fit',
        align: 'stretchmax',
    },
    id : 'formUploadImageProduct',
    // autoShow : true,
	// anchor : '-100', 
    height: 400,
    
    width: 500,
    frame: true,
    title: 'File Upload Form',
    bodyPadding: '10 10 0 10',

    defaults: {
        anchor: '100%',
        allowBlank: false,
        msgTarget: 'side',
        labelWidth: 50
    },
    
    initComponent : function() {
        log('Form upload Product Loaded');
        this.callParent(arguments);
    },

    items : [
            {
/*==========  Form Item  ==========*/
                                
                xtype : 'form',
                padding: '5 5 0 5',
                frame : true,

                // bodyPadding: '10 10 0',
                border: false,
                style: 'background-color: #fff;',
                


                layout : {
                    type : 'vbox',
                    align :'stretch',
                },

                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items : [ 
                /*==========  Image Product  ==========*/
                
                {
                            xtype: 'container',
                            flex : 4,
                            layout : {
                                type: 'fit',
                                align : 'stretchmax',
                            },
                            items : [
                            {
                                xtype: 'image',
                                // maxWidth : 300,
                                // minWidth: 100,
                                // maxHeight : 200,
                                // minHeight : 200,
                                listeners : {
                                    render : function(image){
                                        var fileImage = this.up('window').down('form').getRecord().get('urlpicture');
                                        var na = '/assets/img/na.jpg';
                                        log(fileImage);

                                        if (fileImage == null ) {
                                            image.setSrc(na);
                                        } else {
                                            image.setSrc(fileImage)
                                        };
                                    }
                                }    
                            }]
                            
                },

/*==========  Form Fields  ==========*/
                {
                    xtype : 'container',
                    flex: .1,
                },

                    {
                        xtype : 'container',
                        flex : 2,
                        layout : {
                            type : 'vbox',
                            align : 'stretch'
                        },
                        items: [
                        {
                            xtype: 'textfield',
                            name : 'id',
                            flex : 1,
                            hidden: true,
                        },
                        
                        {
                            xtype: 'displayfield',
                            name : 'name',
                            fieldLabel: 'Name'
                        },
                        {
                            xtype: 'filefield',
                            formBind : true,
                            id: 'form-file',
                            emptyText: 'Select an image',
                            fieldLabel: 'Photo',
                            name: 'picture',
                            buttonText: 'Select Image',
                            buttonConfig: {
                                iconCls: 'upload-icon'
                            }
                        }


                        ]
                    
                        
 
        }],
        }],

	     dockedItems  : [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Save',
                action: 'save'
            },
            {
                iconCls: 'icon-reset',
                text: 'Cancel',
                action: 'cancel',
            } ]
        }],

    tools:[
	{
	    type:'help',
	    tooltip: 'Get Help',
	    callback: function(panel, tool, event) {
	        log('help button Clicked');
            // tampilkan regional kanan/east untuk memberikan informasi tambahan (help doc)
	    }
	}]
});