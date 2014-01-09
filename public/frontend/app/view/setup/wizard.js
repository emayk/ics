/**
*
* Wizard Setup
*
* Flow :
* - Setup Program
* Unit
* gradekain
* - Setup Departement
* - Setup User
* - Setup Legalitas
* - Setup Product , Detail , Stock , Stock Items
*
**/
var navigate = function(panel, direction){
    var layout = panel.getLayout();
    layout[direction]();
    Ext.getCmp('setup-move-prev').setDisabled(!layout.getPrev());
    Ext.getCmp('setup-move-next').setDisabled(!layout.getNext());
};

Ext.define('App.view.setup.wizard',{
	extend : 'Ext.panel.Panel',
	alias :'widget.wizardSetup',
	// layout: 'crossfadecard',
	layout: 'card',
	requires: [ 'App.view.master.product.frmAddProduct'],
	bodyStyle: 'padding:15px',
	itemId: 'wizardsetup',
	// layout: 'card',
	defaults: {border: false, bodyPadding: 20 },
	activeItem: 0,
	items: [
/*==========  Page Welcome  ==========*/
		{ xtype: 'wizard_setup_welcome'},
		{ xtype: 'wizard_setup_catproduct'},
		{ xtype: 'wizard_setup_currency'},
		{ xtype: 'wizard_setup_program'},
		{ xtype: 'wizard_setup_unit'},
		{ xtype: 'wizard_setup_jabatan'},
		{ xtype: 'wizard_setup_gradekain'},
		{ xtype: 'wizard_setup_bank'},
		{ xtype: 'wizard_setup_legalitas'},
		{ xtype: 'wizard_setup_departement'},
		{ xtype: 'wizard_setup_location'},
		{ xtype: 'wizard_setup_jeniskain'},
		{ xtype: 'wizard_setup_category_warehouse'},
		{ xtype: 'wizard_setup_finish'},
/*==========  /Page Welcome  ==========*/
	],
	 // just an example of one possible navigation scheme, using buttons
    bbar: [
        {
            id: 'setup-move-prev',
            text: 'Back',
            handler: function(btn) {
                navigate(btn.up("panel"), "prev");
            },
            disabled: true
        },
        '->', // greedy spacer so that the buttons are aligned to each side
        {
            id: 'setup-move-next',
            text: 'Next',
            handler: function(btn) {
                navigate(btn.up("panel"), "next");
            }
        }
    ],
});