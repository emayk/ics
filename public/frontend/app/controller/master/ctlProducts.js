/**
 *
 * Controller Products
 *
 **/
Ext.define('App.controller.master.ctlProducts', {
    extend: 'Ext.app.Controller',
    views: [
        'App.view.products.tab',
        'App.view.products.ListPrd',
        'App.view.products.tabdetail',
        'App.view.products.stocks',
        'App.view.products.win',
        'App.view.products.panelinfo',

        /*
         * Flow Add Product
         * */
        'App.view.products.formProduct',
        'App.view.products.add.stock',

        'App.form.combobox.cbUnitWeight',
        'App.form.combobox.cbUnitWidth',
        'App.form.combobox.cbColor',
        'App.form.combobox.cbUnits',
        'App.form.combobox.cbGradeKain',
        'App.form.combobox.cbCurrencies',
        'App.form.combobox.cbTypeProduct',
        'App.form.combobox.cbCatproduct'
    ],

    models: [
        'App.model.product.product',
        'App.model.product.detail',
        'App.model.product.type',
        'App.model.product.category',
        'App.model.product.units',
        'App.model.product.user',
        'App.model.product.creator',
        'App.model.product.Stock',
        'App.model.warehouse.category',
        'App.model.warehouse.warehouse',
        'App.model.product.updater'
    ],
    stores: [
        'App.store.product.Product',
        'App.store.product.pstocks',
        // stores Combobox
        'App.store.combo.cbUnitWeight',
        'App.store.combo.cbUnitWidth',
        'App.store.combo.cbTypeProduct',
        'App.store.combo.cbColors',
        'App.store.combo.cbUnits',
        'App.store.combo.cbGradeKain',
        'App.store.combo.cbTypeProduct',
        'App.store.combo.cbCurrency',
        'App.store.combo.cbCategory'

    ],
    refs: [
        { ref: 'tab', selector: 'productstab'},
        { ref: 'btnAdd', selector: 'productstab button#add'},
        { ref: 'gridProducts', selector: 'productstab productList grid#gridProducts'},
        { ref: 'panelDetail', selector: 'productstab productList > tabproductdetail panelDetail'},
        { ref: 'gridStocks', selector: 'productstab productList > tabproductdetail productsstocks grid#gridproductstocks'},
        { ref: 'winProduct', selector: 'winproductinfo'},

        { ref: 'productInfo', selector: 'productinfo'},
        { ref: 'gridProductStock', selector: 'gridProductStocks'},
        { ref: 'formProduct', selector: 'productform'},
        { ref: 'btnSave', selector: 'productform button#save'}


    ],
    storeProductFormLoaded: false,
    init: function () {
        var me = this;
        me.control({
            'productList': {
                render: function () {
                    this.getGridProducts().getStore().load();
                }
            },
            'productList grid#gridProducts': {
                selectionchange: function (grid, records) {
                    var selected = records.length > 0;

//                    if (records.length) this.showDetailProduct(records[0]);
                },
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    me.open_new_tab_product_info(record);
                },

                itemcontextmenu: function (view, record, item, index, e, eOpts) {
                    e.stopEvent();
                    var pName = record.get('name');
                    var me = this;
                    var menu = Ext.create('Ext.menu.Menu', {
                        items: [
                            {
                                text: 'Information Product ' + pName,
                                iconCls: 'find',
                                handler: function (btn) {
                                    me.open_new_tab_product_info(record);
                                }
                            },
                            {
                                text: 'Edit Product ' + pName,
                                iconCls: 'edit',
                                handler: function (btn) {
                                    log(btn.text);
                                }
                            },
                            {
                                text: 'Delete Product ' + pName,
                                iconCls: 'delete',
                                handler: function (btn) {
                                    log(btn.text);
                                }
                            }
                        ]
                    });
                    menu.showAt(e.getXY());

                }

            },
            'productinfo': {
                render: function (panel) {
                    if (!this.storeProductFormLoaded) {
                        this.getAppStoreComboCbCategoryStore().load();
                        this.getAppStoreComboCbTypeProductStore().load();
                        this.getAppStoreComboCbUnitWeightStore().load();
                        this.getAppStoreComboCbUnitWidthStore().load();
                        this.getAppStoreComboCbColorsStore().load();
                        this.getAppStoreComboCbGradeKainStore().load();
                        this.getAppStoreComboCbCurrencyStore().load();
                    }
                }
            },
            'productstab button#add': {
                click: me.add_new_product
            },
            'productform button#save': {
                click: function (btn) {
                    var me = this;
                    var panel = btn.up('productform');
                    var f = btn.up('form').getForm();
                    var v = f.getValues();
                    if (!f.isValid()) return msgError('Please Validate Form');
                    if (v.salesprice < v.salespricemin)
                        return msgError('Sales Price Mustbe Higher than Sales Price Minimal');

                    var product = Ext.create('App.model.product.product', {
                        name: v.name,
                        nodesign: v.nodesign,
                        contruction: v.contruction,
                        cat_id: v.cat_id,
                        type_id: v.type_id,
                        weight: v.weight,
                        unitweight_id: v.unitweight_id,
                        width: v.width,
                        unitwidth_id: v.unitwidth_id
                    });
                    var tab = me.getTab();
                    product.save({
                        success: function (p) {
                            var pid = p.get('id');
                            log(p);
                            me.saved = true;
                            var detail = {
                                product_id: pid,
                                color_id: v.det_color_id,
                                unit_id: v.det_unit_id,
                                grade_id: v.det_grade_id,
                                salesprice: v.det_salesprice,
                                salespricemin: v.det_salespricemin,
                                currsp_id: v.det_currsp_id,
                                currspm_id: v.det_currspm_id
                            };
                            me.add_product_detail(panel, tab, pid, detail);
                        },
                        failure: function (p) {
                            me.messageErrorBox();
                        }
                    });
                }
            },
            'productstab button#stock': {
                click: function(btn){ me.show_page_addstock(); }
            },
            'masterproductaddstock': {
//                render: function (panel) {
//                    log(panel);
//                }
            }
        });
    },
    messageErrorBox: function () {
        msgError('Failure Creation Product , Please Try Again');
    },
    add_product_detail: function (panel, tab, id, detail) {
        var me = this, mdldetail = Ext.create('App.model.product.detail', detail);

        mdldetail.save({
            success: function (d) {
                log('Product detail ' + d.get('id') + 'Success Added');
                Ext.Msg.show({
                    title: 'Success Added with id ' + id,
                    icon: Ext.MessageBox.INFO,
                    msg: 'Thanks',
                    buttons: Ext.MessageBox.OK
                });
                tab.remove(panel);
            },
            failure: function () {
                me.messageErrorBox();
            }
        });
    },
    add_new_product: function () {
        var me = this, title = 'New Product ';
        var component = Ext.create('App.view.products.formProduct',
            {
                title: title
            }
        );
        if (isDebug()) {
            component.down('[name=name]').setValue(randomText(10));
            component.down('[name=cat_id]').setValue(randomInt(22, 6));


            component.down('[name=contruction]').setValue(randomText(3));
            component.down('[name=nodesign]').setValue(randomText(5));
            component.down('[name=type_id]').setValue(randomInt(22));

            component.down('[name=weight]').setValue(randomInt(10));
            component.down('[name=unitweight_id]').setValue(randomInt(10));

            component.down('[name=width]').setValue(randomInt(100));
            component.down('[name=unitwidth_id]').setValue(randomInt(22));

            component.down('[name=det_color_id]').setValue(4);
            component.down('[name=det_unit_id]').setValue(randomInt(10));
            component.down('[name=det_grade_id]').setValue(randomInt(8));
            component.down('[name=det_salesprice]').setValue(randomInt(10000));
            component.down('[name=det_currsp_id]').setValue(randomInt(5));
            component.down('[name=det_salespricemin]').setValue(randomInt(9999));
            component.down('[name=det_currspm_id]').setValue(randomInt(5));
        }
        this.open_new_tab(title, component);
    },
    open_new_tab_product_info: function (record) {
        var title = 'Product ' + record.get('name');
        var component = Ext.create('App.view.products.panelinfo', {
            prodId: record.get('id'),
            title: title,
            autoScroll: true,
            iconCls: 'home',
            closable: true,
            record: record,
            stockStore: Ext.create('App.store.product.pstocks')
        });
        component.down('form#detail').setTitle('Information Of ' + record.get('name'));
        component.down('form#detail').loadRecord(record);

        var pStock = component.down('#panelStock');
        var gridstock = component.down('gridProductStocks#gridStocks'),
            pg1 = component.down('gridProductStocks#gridStocks #pgstockStore1');

        pStock.setTitle('Stock Product ' + record.get('name'));
        gridstock.reconfigure(component.stockStore);
        pg1.bindStore(component.stockStore);
        gridstock.getStore().getProxy().setExtraParam('product_id', record.get('id'));
        gridstock.getStore().load();
        this.open_new_tab(title, component)
    },
    open_new_tab: function (title, component) {
        var tabs = this.getTab();
        var newTab = tabs.items.findBy(
            function (tab) {
                return tab.title === title;
            });

        if (!newTab) {
            newTab = tabs.add(component);
        }
        tabs.setActiveTab(newTab);
    },
    add_stock_product: function () {
//        todo : menampilkan form untuk menambahkan product
    },
    show_page_addstock: function (productid) {
        var pid = productid || randomInt(90);
        var pageStock;
        if (!pageStock) {
            /*
             * Buat Stock Model
             * */
            var mdlstock = Ext.create('App.model.product.Stock', {
                product_id: pid
            });
            /*
             Buat Page Stock
             * */
            var title = 'Add Stock For Product ID ' + pid;

            pageStock = Ext.create('App.view.products.add.stock', {
                title: title,closable : true
            });
        }
        this.open_new_tab(title, pageStock);
    }
});