Ext.define('App.util.Alert', {

    statics : {
        msgCt : null,

        msg : function (title, format) {

            function createBox (t, s) {
                return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
            }

            if(!App.util.Alert.msgCt) {
                App.util.Alert.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }

            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(App.util.Alert.msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 3000, remove: true});
        },

    }
});