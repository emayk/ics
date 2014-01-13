function formatCurrency(v) {
    return Ext.util.Format.currency(v);
}
function ucWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//function generate_transaction_list(jml) {
//    var m = [], user = ['timoty', 'fuad', 'syifa', 'edward'],
//        status = ['', 'progress', 'done'];
//
//    for (var i = 0; i < jml; i++) {
//        var u = user[randomInt(user.length - 1)];
//        var s = status[randomInt(status.length - 1)];
//        var jml_order = randomInt(10);
//        var jml_item = randomInt(30);
//        var a = {trx_no: 'TIM-BDG-00' + i,
//            user_name: u,
//            status: s,
//            count_orders: jml_order,
//            count_items: jml_item
//        };
//        m.push(a);
//    }
//    ;
//    return m;
//}
//
//function data_transaction_with_item() {
//    var myData = [];
//    var jml_trx = 5;
//    for (var i = 1; i <= jml_trx; i++) {
//        var jml_order = 3;
//        var trx_no = "TRX-ORDER-16122013-1-8bfc152e-6639-11e3-96da-87c02a90580" + randomInt(10) + randomInt(10) + randomInt(10);
//        for (var j = 1; j <= jml_order; j++) {
//            var orderno = 'Orders-' + randomInt(10) + randomInt(10) + randomInt(10) + randomInt(10);
//            var id = myData.length + 1;
//            var items = [];
//            var jml_item = randomInt(10);
//            for (var item = 0; item <= jml_item; item++) {
//                var item_id = items.length;
//                var a_item = {
//                    id: item_id,
//                    product_name: 'product ' + item_id + '-' + orderno,
//                    product_id: item_id,
//                    product_qty: randomInt(20),
//                    order_no: orderno
//                };
//                items.push(a_item);
//            }
//            ;
//            var total_items = items.length;
//            var m = { id: id, trx_no: trx_no,
//                count_order: jml_order,
//                count_items: total_items,
//                status: "progress",
//                order_no: orderno,
//                items: items
//            };
//            myData.push(m);
//        }
//        ;
//    }
//    ;
//    return myData;
//}


function getVersi() {
    Ext.Ajax.request({
        url: base_url() + '/versi.json',
        callback: function (opt, success, response) {
            var b = Ext.JSON.decode(response.responseText);
            window.var = b;
        }
    });
};


function create_component(url, tocomponent, params) {
    Ext.Ajax.request({
        url: url,
        params: {},
        success: function (xhr) {
            var obj = Ext.JSON.decode(xhr.responseText), newComponent = eval(obj),
                mainPanel = Ext.ComponentQuery.query(tocomponent || 'mainpanel')[0],
                newTab = mainPanel.items.findBy(function (tab) {
                    return tab.title === obj.title;
                });
            if (!newTab) {
                newTab = mainPanel.add(newComponent);
            }
            mainPanel.setActiveTab(newTab);
        },
        failure: function (xhr) {
            msgError(" Component Cannot Generate");
        }
    });
}


function base_url() {
    return getBaseUrl()
};
function getModel(model) {
    return Ext.ModelManager.getModel(model);
}
function myq(m) {
    return myquery(m);
};
function myquery(query) {
    return Ext.ComponentQuery.query(query)[0];
};
function logType(arg) {
    var toPrint = [];
    var debug = isDebug(),
        d = new Date ,
    // fullyear = d.getFullYear,
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        hour = 'Debug:[' + h + ':' + m + ':' + s + ']';
    toPrint.push(hour);
    function getErrorObject() {
        try {
            throw Error('')
        } catch (err) {
            return err;
        }
    }

    var err = getErrorObject() ,
        caller = err.stack.split("\n")[4];

    /**
     TODO:
     - Belum Mendukung Cross Firefox (Hanya Jalan di Chrome(tested))
     **/

    /*    // if ($.browser.mozilla) {
     //     caller = err.stack.split("\n")[2];
     // } else {
     caller = err.stack.split("\n")[4];
     // }
     */
    var index = caller.indexOf('.js');
    var str = caller.substr(0, index + 3);
    index = str.lastIndexOf('/');
    str = str.substr(index + 1, str.length);
    var info = "[" + str;


    /*    // if (this.browser.mozilla) {
     //     str = caller;
     // } else {
     index = caller.lastIndexOf(':');
     str = caller.substr(0, index);
     // }*/

    index = caller.lastIndexOf(':');
    str = caller.substr(0, index);
    index = str.lastIndexOf(':');
    str = str.substr(index + 1, str.length);
    info += ":" + str + "]";
    toPrint.push(info);

    for (var i = 0; i < arguments.length; ++i) {
        toPrint.push(arguments[i]);
    }

    if (debug) {
        console.debug.apply(console, toPrint);
    }
    ;
};

function getErrorObject2() {
    try {
        throw Error('')
    } catch (err) {
        return err;
    }
}


function getViewSize() {
// height:Ext.getBody().getViewSize().height - 100,
// width:Ext.getBody().getViewSize().width*0.8 //80%
}

function requestMessageProcessor(proxy, response) {
    if (response && proxy) {
        try {
            var responseData = proxy.reader.getResponseData(response);
            cDir(responseData);
            if (responseData.message) {
                var messageDescription = 'Information'; // title of the alert box
                var messageIcon = Ext.MessageBox.INFO;

                if (!responseData.success) {
                    var messageDescription = 'Error';
                    var messageIcon = Ext.MessageBox.ERROR;
                }

                Ext.MessageBox.show({
                    title: messageDescription,
                    msg: responseData.message,
                    buttons: Ext.MessageBox.OK,
                    icon: messageIcon
                });
            }
        }
        catch (err) {
            // Malformed response most likely
            log(err);
        }
    }
}

function winHelp(code) {
    App.util.Util.winHelp(code);
}


function getApiUrl() {
    return  api_url;
}
function navigate(panel, direction) {
    var layout = panel.getLayout();
    layout[direction]();
    Ext.getCmp('setup-move-prev').setDisabled(!layout.getPrev());
    Ext.getCmp('setup-move-next').setDisabled(!layout.getNext());
};


function sprintf(format, etc) {
    var arg = arguments;
    var i = 1;
    return format.replace(/%((%)|s)/g, function (m) {
        return m[2] || arg[i++]
    })
}

/**
 *
 * Mendapatkan Gambar
 *
 **/
function picture_na() {
    return getAsset() + '/assets/img/bg_login.jpg';
}
function picturex() {
    return getAsset() + '/assets/img/bg_login.jpg';
}
/**
 *
 * Menghasilkan Angka Acak menggunakan Util ExtJs
 *
 **/
function randomInt(number, awal) {
    var acak = number || 1;
    var aawal = awal || 1;
    return Ext.Number.randomInt(aawal, acak);
}
/**
 *
 * Mendapatkan Tanggal (Pengurangan)
 * berdasarkan @params days yang dimasukan
 *
 **/
function date_subtract(days) {
    var day = days || 0;
    return Ext.Date.subtract(new Date(), Ext.Date.DAY, day);
}
/**
 *
 * Mendapatkan Tanggal Penambahan
 * berdasarkan @params day yang dimasukan
 **/

function date_add(days) {
    var day = days || 0;
    return Ext.Date.add(new Date(), Ext.Date.DAY, day);
}
/**
 *
 * Mendapatkan Link Gambar
 *
 **/
    // function bgLogin() {return getBaseUrl() + '/assets/img/bg_login.jpg'; }
function bgLogin() {
    return assets + '/assets/img/bg_login.jpg';
}
/**
 *
 * Mendapatkan Height Window Maximal
 *
 **/
function hWinMax() {
    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
}
/**
 *
 * Mendapatkan Lebar Window Maximal Browser
 *
 **/
function wWinMax() {
    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
// var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
}

function helpnotfound() {
    // if (!Ext.getStore('shelp')) {Ext.create('App.store.help.sHelp'); }
}
/**
 *
 * Mendapatkan Translation dari Array translations
 *
 **/
function e(stringID) {
    return translations[stringID]
};
/**
 *
 * Mendapatkan Base Url Aplikasi
 *
 **/
function getBaseUrl() {
    return baseurl;
//return window.location.protocol + '//' +  window.location.host + '/';
}
/**
 *
 * Mendapatkan Token
 *
 **/
function gettoken() {
    return token;
}
/**
 *
 * Mendapatkan License Aplikasi
 *
 **/
function licence_to() {
    var lt = (ics.license != '') ? ics.license : ' Unlicensed';
    return 'License To : ' + lt;
};

function generate_transaction_list()
{

}
function generate_trx_list()
{

};
function license_to() {
    return licence_to()
};
function licenseto() {
    return licence_to()
};
function config() {
    return App.config;
}
function getVersion() {
    return ics.version;
};
function getAppName() {
    return app_name() + ' ' + getTahun();
}
function getFullVersion() {
    return getAppName() + ' ' + getVersion()
};

function app_name() {
    return ics.appname
}

function getAsset(file) {
    var afile = file || '';
    return assets + afile;
}

function myId(obj) {
    return cDir(obj);
}
function logout() {
    window.location.href = '/api/logout.php';
}
/**
 *
 * Mengenerate Json Menjadi Object Javascript
 *
 **/
function json_decode(json) {
    return Ext.JSON.decode(json);
}
/**
 *
 * Menentukan Apakah Sudah Login atau Tidak
 *
 **/
function is_login() {
    return logged;
}
/**
 *
 * Menentukan Mode Force Selection Pada Combobox
 *
 **/
function forceSelectionMode() {
    return true;
};
function setKue(key, val) {
    Ext.util.Cookies.set(key, val);
};
function getKue(key) {
    return Ext.util.Cookies.get(key);
};
/*==========  Set Cookies dengan Key dan Value (Expire 1 tahun)  ==========*/
function setCookie(k, v) {
    var now = new Date();
    var expiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    Ext.util.Cookies.set(k, v, expiry);
}
/*==========  Mendapatkan Cookie Berdasarkan Key Yang diberikan  ==========*/
function getCookie(k) {
    Ext.util.Cookies.get(k);
    var cookie = Ext.util.Cookies.get(k);
    console.log(cookie);
}
/**
 *
 * Utility Browser (Debuggin Tools Traditional)
 *
 **/
function cDir(object) {
    if (isDebug()) console.dir(object);
}
function cLog(args) {
    var toPrint = [], debug = isDebug(), d = new Date , h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), hour = 'Debug:[' + h + ':' + m + ':' + s + ']';
    toPrint.push(hour);
    function getErrorObject() {
        try {
            throw Error('')
        } catch (err) {
            return err;
        }
    }

    var err = getErrorObject() , caller = err.stack.split("\n")[4];
    var index = caller.indexOf('.js'), str = caller.substr(0, index + 3);
    index = str.lastIndexOf('/');
    str = str.substr(index + 1, str.length);
    var info = "[" + str;
    index = caller.lastIndexOf(':');
    str = caller.substr(0, index);
    index = str.lastIndexOf(':');
    str = str.substr(index + 1, str.length);
    info += ":" + str + "]";
    toPrint.push(info);
    for (var i = 0; i < arguments.length; ++i) {
        toPrint.push(arguments[i]);
    }
    if (debug) {
        console.log.apply(console, toPrint);
    }
    ;
}
function log(args) {
    if (Ext.isGecko) return '';
    var toPrint = [], debug = isDebug(), d = new Date , h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), hour = 'Debug:[' + h + ':' + m + ':' + s + ']';
    toPrint.push(hour);
    function getErrorObject() {
        try {
            throw Error('')
        } catch (err) {
            return err;
        }
    }

    var err = getErrorObject() , caller = err.stack.split("\n")[4];
    var index = caller.indexOf('.js'), str = caller.substr(0, index + 3);
    index = str.lastIndexOf('/');
    str = str.substr(index + 1, str.length);
    var info = "[" + str;
    index = caller.lastIndexOf(':');
    str = caller.substr(0, index);
    index = str.lastIndexOf(':');
    str = str.substr(index + 1, str.length);
    info += ":" + str + "]";
    toPrint.push(info);
    for (var i = 0; i < arguments.length; ++i) {
        toPrint.push(arguments[i]);
    }
    if (debug) {
        console.log.apply(console, toPrint);
    }
    ;
}
function cWarn(args) {
    var toPrint = [], debug = isDebug(), d = new Date , h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), hour = 'Debug:[' + h + ':' + m + ':' + s + ']';
    toPrint.push(hour);
    function getErrorObject() {
        try {
            throw Error('')
        } catch (err) {
            return err;
        }
    }

    var err = getErrorObject() , caller = err.stack.split("\n")[4];
    var index = caller.indexOf('.js'), str = caller.substr(0, index + 3);
    index = str.lastIndexOf('/');
    str = str.substr(index + 1, str.length);
    var info = "[" + str;
    index = caller.lastIndexOf(':');
    str = caller.substr(0, index);
    index = str.lastIndexOf(':');
    str = str.substr(index + 1, str.length);
    info += ":" + str + "]";
    toPrint.push(info);
    for (var i = 0; i < arguments.length; ++i) {
        toPrint.push(arguments[i]);
    }
    if (debug) {
        console.warn.apply(console, toPrint);
    }
    ;
}
function cDebug(args) {
    var toPrint = [], debug = isDebug(), d = new Date , h = d.getHours(), m = d.getMinutes(), s = d.getSeconds(), hour = 'Debug:[' + h + ':' + m + ':' + s + ']';
    toPrint.push(hour);
    function getErrorObject() {
        try {
            throw Error('')
        } catch (err) {
            return err;
        }
    }

    var err = getErrorObject() , caller = err.stack.split("\n")[4];
    var index = caller.indexOf('.js'), str = caller.substr(0, index + 3);
    index = str.lastIndexOf('/');
    str = str.substr(index + 1, str.length);
    var info = "[" + str;
    index = caller.lastIndexOf(':');
    str = caller.substr(0, index);
    index = str.lastIndexOf(':');
    str = str.substr(index + 1, str.length);
    info += ":" + str + "]";
    toPrint.push(info);
    for (var i = 0; i < arguments.length; ++i) {
        toPrint.push(arguments[i]);
    }
    if (debug) {
        console.debug.apply(console, toPrint);
    }
    ;
}
function time() {
    return new Date;
}

/**
 *
 * Menghasilkan String Acak
 *
 **/
function randomString(length) {
    if (length <= 0) return "";
    var getChunk = function () {
        var i, rand = Math.random() * 10e16, bin = rand.toString(2).substr(2, 10), lcase = (rand.toString(36) + "0000000000").substr(0, 10), ucase = lcase.toUpperCase(), a = [lcase, ucase], str = "";
        b = rand.toString(2).substr(2, 10);
        for (i = 0; i < 10; i++) str += a[bin[i]][i];
        return str;
    }, str = "";
    while (str.length < length) str += getChunk();
    str = str.substr(0, length);
    return str;
}

/**
 *
 * Mendapatkan Random Number
 *
 **/
function randomNumber() {
    var rand = Math.random() * 1000;
    return rand.toFixed();
}
/**
 *
 * Mendapatkan Random Text
 *
 **/
function textRandom(len) {
    var panjang = len || 32;
    return randomString(panjang);
    return Math.random().toString(36).substr(2, 37);
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function randomText(prefix, len) {
    var lengt = len || 10, prefixx = prefix || 'Random Text simulate';
    return (isDebug()) ? prefixx + ' ' + textRandom(lengt) : '';
}
/**
 *
 * Simulasi Input Text
 *
 **/
function sim_input_text(prefix, len) {
    var lengt = len || 10, prefixx = prefix || 'text simulate';
    return (isDebug()) ? prefixx + ' ' + textRandom(lengt) : '';
}
/**
 *
 * Mendapatkan Input Random Text
 *
 **/
function randInputText(prefix, len) {
    var p = prefix || 'Random Text ', panjang = len || 10;
    return sim_input_text(p, panjang);
}
/**
 *
 * Menentukan Mode Aplikasi
 *
 **/
function isDebug() {
    return App.config.APP_DEBUG;
}
/**
 *
 * Mendapatkan Value berdasarkan param
 * @params : store = nama Store , value mendapatkan nama dari value == id yang diberikan
 *
 **/
function getNameById(store, value) {
    if (!isNaN(value)) {
        return ((Ext.getStore(store).findRecord('id', value) != null) ) ? Ext.getStore(store).findRecord('id', value).get('name') : value;
    } else if (typeof value != 'undefined') {
        return ((value.name != null)) ? value.name : '';
    } else return '';
};
/**
 *
 * Melakukan penambahan Hash url
 *
 **/
function onTabChange(tabPanel, tab) {
    var tabs = [], ownerCt = tabPanel.ownerCt, oldToken, newToken;
    tabs.push(tab.id);
    tabs.push(tabPanel.id);
    while (ownerCt && ownerCt.is('tabpanel')) {
        tabs.push(ownerCt.id);
        ownerCt = ownerCt.ownerCt;
    }
    newToken = tabs.reverse().join(':');
    oldToken = Ext.History.getToken();
    if (oldToken === null || oldToken.search(newToken) === -1) {
        Ext.History.add(newToken);
    }
};
function onAfterRender() {
    Ext.History.on('change', function (token) {
        var parts, tabPanel, length, i;
        if (token) {
            parts = token.split(':');
            length = parts.length;
            for (i = 0; i < length - 1; i++) {
                Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
            }
        }
    });
}
/**
 *
 * Template required
 *
 **/
function requiredTpl() {
    return '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
}
/**
 *
 * Mendapatkan Nama User Yang Login
 *
 **/

function getloginid() {
    return getIdLogin()
};
function getIdLogin() {
    return user['id'];
}
function user_login() {
    return user['as'];
}
function user_login_fn() {
    return user['fn'];
}
function user_login_id() {
    return user['id'];
}
function loginas() {
    return getUserLogin();
}
function getUserLogin() {
    return App.config.LOGIN_NAME;
}
function getUrlProfile() { /*http://localhost/api/users/1*/
    return getApiUrl() + '/users/' + getloginid();
}
/**
 *
 * Menentukan apakah Sebuah Angka
 *
 **/
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 *
 * Menampilkan Message Box Error
 *
 **/
function msgError(msg, title) {
    Ext.MessageBox.show({ title: title || 'Error !', msg: msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
}

/**
 *
 * Menampilkan Error Belum di implementasikan
 *
 **/
function belumImplement(msg) {
    msgError(msg, 'Not Implementasi');
}
function noimplement(msg) {
    belumImplement(msg);
}
/**
 *
 * Cancel Edit dari Plugin Row Editing
 * @params : storeName Nama Datastore, me = this
 **/
function cancelEdit(storeName, me) {
    storeName.each(function (record) {
        if (record.phantom) {
            storeName.remove(record);
            return false;
        }
    }, me);
}
/**
 *
 * Mendapatkan info Panel
 *
 **/
function infoPanel() {
    Ext.getCmp('infoPanel');
}
function getInfoPanel() {
    return Ext.getCmp('infoPanel');
}
/**
 *
 * Fungsi Share untuk Simulasi Job
 *
 **/
var jobSimulate = function (statusBar) {
    sb = Ext.getCmp(statusBar);
    sb.showBusy();
    Ext.defer(function () {
        sb.clearStatus({useDefaults: true});
    }, 2000);
};
/**
 *
 * Ubah Status Bar
 *
 **/
function sbtunggu() {
    var sb = getStatusBar();
    sb.showBusy();
    Ext.defer(function () {
        sb.clearStatus({useDefaults: true});
    }, 1000);
}

/**
 *
 * Menampilkan Proses Tunggu dengan Waiting Box Animasi
 *
 **/
function tunggu() {
    return '';
    sbtunggu();
    return;
    var acak = 5;
    Ext.MessageBox.show({title: 'Please wait', msg: 'Loading items...', progressText: 'Initializing...', width: 300, progress: true, closable: false, });
    var f = function (v) {
        return function () {
            var z = acak - 1, y = z - 1;
            if (v == z) {
                Ext.MessageBox.hide();
            } else {
                var i = v / y;
                Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
            }
        };
    };
    for (var i = 1; i < acak; i++) {
        setTimeout(f(i), i * 200);
    }
}
/**
 *
 * Mendapatkan Status bar
 *
 **/
function getStatusBar() {
    return Ext.getCmp('status');
}
function getTahun() {
    return Ext.Date.format(new Date(), 'Y');
}
function getTanggal() {
    return Ext.Date.format(new Date(), 'd F Y');
}
function getTanggalFormat(format) {
    return Ext.Date.format(new Date(), format || 'Y-m-d');
}
function getWaktu() {
    return Ext.Date.format(new Date(), 'g:i:s A');
}
/**
 *
 * Mendapatkan Status Log pada Status Bar
 * Usage :
 * var i = statusLog();
 * i.text('menkoneksikan ke server');
 **/
function statusLog() {
    return Ext.getCmp('statuslog');
}