Ext.define('App.util.Util', {

    statics : {
        required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
        decodeJSON : function (text) {

            var result = Ext.JSON.decode(text, true);

            if (!result){
                result = {};
                result.success = false;
                result.msg = text;
            }

            return result;
        },

        showErrorMsg: function (text) {

            Ext.Msg.show({
                title:'Error!',
                msg: text,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },
        winHelp: function(code){
        if (!Ext.getStore('shelp')) {Ext.create('App.store.help.sHelp'); }
            var codeDoc = code || 'index' , win = Ext.widget('vhelpWin'),
            storeHelp = Ext.data.StoreManager.lookup('shelp');
            win.setTitle('Help for Information');
            storeHelp.clearFilter();
            storeHelp.getProxy().setExtraParam('id',codeDoc);
            storeHelp.load();
            win.show();
        }
    }
});