/**
 * Created by emayk on 3/10/14.
 */

Ext.define('App.view.Suppliers.import', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.suppliersimport',
    bodyPadding: 10,
    frame: true,
    storeImport: Ext.create('App.store.Suppliers.simport'),
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            layout: { type: 'vbox', align: 'stretch'},
            items: [

                {
                    xtype: 'form',
                    flex: .2,
                    bodyPadding: 10,
                    clientValidation: true,
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'supplier',
                            fieldLabel: 'File Excel',
                            labelWidth: 100,
                            msgTarget: 'side',
                            allowBlank: false,
                            anchor: '100%',
                            buttonText: 'Pilih File Excel ...',
                            accept: ['xls', 'xlsx', 'csv'],
                            listeners: {
                                afterrender: function (cmp) {
                                    cmp.fileInputEl.set({
                                        accept: 'xls'
                                    });
                                }
                            }
                        }
                    ],
                    buttons: [
                        {
                            text: 'Unggah',
                            handler: function (btn) {
                                var form = btn.up('form').getForm();
                                var grid = btn.up('panel').down('grid');
                                var store = grid.getStore();
                                if (store) {
                                    var proxy = store.getProxy();
                                }
                                var fname = btn.up('form').down('[name=supplier]');
                                var rawValue = fname.getRawValue();
                                var indexofPeriod = rawValue.lastIndexOf("."),
                                    uploadedExtension = rawValue.substr(indexofPeriod + 1, rawValue.length - indexofPeriod);
                                var acceptExt = fname.accept;
                                if (!Ext.Array.contains(acceptExt, uploadedExtension)) {
                                    fname.setActiveError('Silahkan Upload hanya berextention :  ' + acceptExt.join() + ' saja!');
                                    Ext.MessageBox.show({
                                        title: 'File Type Error',
                                        msg: 'Silahkan Upload file dengan extention :  ' + acceptExt.join() + ' saja!',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                    fname.setRawValue(null);
                                    return false;
                                }


                                if (form.isValid()) {
                                    form.submit({
                                        url: getApiUrl() + '/suppliers',
                                        waitMsg: 'Unggah file...',
                                        params: {
                                            upload: true,
                                            _token: gettoken(),
                                            uid: user_login_id()
                                        },
                                        success: function (fp, o) {
                                            log(o);
                                            var results = o.result;
                                            if (results) {
                                                var success = results.success;
                                                if (success) {
                                                    var msg = (o.result.msg) ? o.result.msg : 'Anda berhasil mengunggah "'
                                                        + o.result.file + '" ';
                                                    App.util.box.info(msg);
                                                    var importId = results.importId;
                                                    if (!importId) App.util.box.error('Maaf,<br/>Tidak Mendapatkan Id Import' +
                                                        '<br/>Sepertinya ada masalah dengan proses diserver<br/>Silahkan dicoba lagi'
                                                    );

                                                    if (proxy) {
                                                        proxy.setExtraParam('listImport', true);
                                                        proxy.setExtraParam('importid', importId);
                                                        proxy.setExtraParam('token', gettoken());
                                                        store.load();
                                                    }
                                                } else {
                                                    App.util.box.error('Ada Kesalahan di server, silahkan coba lagi');
                                                    return false;
                                                }
                                            }

                                        },
                                        failure: function (fp, o) {
                                            App.util.box.error('Kesalahan', 'ada kesalahan silahkan coba lagi');
                                        }
                                    });
                                }
                            }
                        }
                    ]
                },
                {
                    flex: .75,
                    title: 'Supplier Yang berhasil diimport',
                    xtype: 'grid',
                    margin: '10 0 0 0',
                    autoScroll: true,
                    itemId: 'gridimportlist',
                    store: me.storeImport,
                    defaults: { flex: 1 },
                    viewConfig: {
                        getRowClass: function (record) {
                            if (record) {
                                var success = 'cgreen';
                                var fail = 'corange';
                                var status = parseInt(record.get('status'));
                                return (status == 1) ? success : fail;
                            }
                        }
                    },
                    columns: [
                        { xtype: 'rownumberer', width: 50 },
                        {
                            text: 'Status',
                            dataIndex: 'status',
                            renderer: function (v, m, r) {
                                return (v == 1) ? 'Berhasil' : "Tidak Berhasil"
                            }
                        }
                    ],
                    dockedItems: [
                        { xtype: 'pagingtoolbar', store: me.storeImport,
                            dock: 'bottom', displayInfo: true }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});