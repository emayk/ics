Ext.define('App.controller.TranslationManager', {
    extend: 'Ext.app.Controller',
    views: ['App.view.Translation'],
    refs: [
        {
            ref: 'translation',
            selector: 'translation'
        }
    ],
    init: function (application) {
        this.control({
            "translation menuitem": {
                click: this.onMenuitemClick
            },
            "translation": {
                beforerender: this.onSplitbuttonBeforeRender
            }
        });
        log('Translation Manager');
    },

    onSplitbuttonBeforeRender: function (abstractcomponent, options) {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'id') : 'id';
        abstractcomponent.iconCls = lang;
        if (lang == 'id') {
            abstractcomponent.text = 'Indonesian';
//        } else if (lang == 'es') {
//            abstractcomponent.text = 'Español';
//        } else if (lang == 'id') {
//            abstractcomponent.text = 'Português';
        } else {
            abstractcomponent.text = 'English';
        }
    },

    onMenuitemClick: function (item, e, options) {
        var menu = this.getTranslation();

        menu.setIconCls(item.iconCls);
        menu.setText(item.text);

        localStorage.setItem("user-lang", item.iconCls);
        window.location.reload();
    }

});