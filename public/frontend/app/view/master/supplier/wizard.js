Ext.define('App.view.master.supplier.wizard', {
		extend : 'Ext.panel.Panel',
		alias: 'widget.wizardSupplier',
		activeItem: 'welcome',
        iconCls: 'wizard',
		layout: 'card',
		title : 'Form Add Supplier',
		items: [
        // {title: 'Welcome', html: 'Welcome To Setup Wizard', itemId: 'welcome'},
         {title: 'Welcome', itemId: 'welcome', xtype: 'container',
         layout: {type : 'vbox', align: 'stretch' }, bodyPadding: 10,
        items:[
            {xtype : 'container', height: 50, margin : '0 0 10 0', html: '<h1>Welcome</h1>' },
            {xtype : 'container', flex: 3, html: 'Halaman ini untuk Buat Supplier' },
            { xtype: 'toolbar', items: [
            '->',
            { text : 'Next' , itemId: 'welcomeBtn', iconCls: 'next'}
            ] }
        ] },
        {title: 'Information Supplier', xtype : 'formSupplier', itemId: 'page1'},
        {title: 'Account Bank', xtype : 'wizardPageAccountSupplier' ,
        itemId: 'page2'},
        {title: 'Contact Person', xtype:'wizardPageCountactPersonSupplier' , itemId: 'page3'},
        {title: 'Office', xtype:'wizardSupplierOffice' , itemId: 'page4'},
        {title: 'Office Phones', html : 'Next' , itemId: 'page5'},
        {title: 'Account Bank', html : 'Next' , itemId: 'page6'},

        {title: 'Finish', itemId: 'finish', xtype: 'container', layout: {type : 'vbox', align: 'stretch' },bodyPadding: 10,
        items:[
            {xtype : 'container', height: 50, margin : '0 0 10 0', html: '<h1>Congratulation</h1>' },
            {xtype : 'container', flex: 3, html: 'Anda Sudah Berhasil Menambahkan Supplier Baru' },
            { xtype: 'toolbar', items: [
            '->',
            { text : 'Finish' , itemId: 'finishBtn', iconCls: 'close'}
            ] }
        ] },
    ],

	  // bbar: [
   //      {
   //          id: 'setup-move-prev',
   //          text: 'Back',
   //          handler: function(btn) {
   //              navigate(btn.up("panel"), "prev");
   //          },
   //          disabled: true
   //      },
   //      '->', // greedy spacer so that the buttons are aligned to each side
   //      {
   //          id: 'setup-move-next',
   //          text: 'Next',
   //          handler: function(btn) {
   //              navigate(btn.up("panel"), "next");
   //          }
   //      }
   //  ],
});