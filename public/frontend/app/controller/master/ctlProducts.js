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
		'App.view.products.stocks',
		'App.view.products.panelinfo',
		'App.view.products.formbasicinfo',
		/*Form Detail Product*/
		'App.view.products.formproductdetail',
		'App.view.products.productstock',
		'App.view.products.history',
		'App.view.products.import',

		/*Setup Hpp*/
		'App.view.products.setuphpp',


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
		'App.form.combobox.cbCatproduct',
		'App.form.combobox.cbcurrsp',
		'App.form.combobox.cbcurrspm',
		'App.form.combobox.cbWarehouse'
	],

	models: [
		'App.model.product.product',
		/*Hpp*/
		'App.model.product.hpp',

		'App.model.product.detail',
		'App.model.product.type',
		'App.model.product.category',
		'App.model.product.units',
		'App.model.product.user',
		'App.model.product.creator',
		'App.model.product.Stock',
		'App.model.product.stockhistory',
		'App.model.warehouse.category',
		'App.model.warehouse.warehouse',
		'App.model.product.updater',
		'App.model.product.history',


	],
	stores: [
		'App.store.product.Product',
		/*Hpp*/
		'App.store.product.hpp',

		'App.store.product.pstocks',
		'App.store.product.stockhistory',
		// stores Combobox
		'App.store.combo.cbUnitWeight',
		'App.store.combo.cbUnitWidth',
		'App.store.combo.cbTypeProduct',
		'App.store.combo.cbColors',
		'App.store.combo.cbUnits',
		'App.store.combo.cbGradeKain',
		'App.store.combo.cbTypeProduct',
		'App.store.combo.cbCurrency',
		'App.store.combo.currsp',
		'App.store.combo.currspm',
		'App.store.combo.cbCategory',
		'App.store.product.history',
		'App.store.combo.cbWarehouseStore'

	],
	/**
	 * Reference
	 */
	refs: [
		{ ref: 'tab', selector: 'productstab'},
		{ ref: 'btnAdd', selector: 'productstab button#add'},
		{ ref: 'gridProducts', selector: 'productstab productList grid#gridProducts'},
		{ ref: 'productInfo', selector: 'productinfo'},
		{ ref: 'formProduct', selector: 'productinfo #formbasicinfo'},
		{ ref: 'formDetail', selector: 'productinfo #formdetail'},
		{ ref: 'gridHistory', selector: 'productinfo #gridHistoryProduct'},
		{ ref: 'gridStockHistory', selector: 'productinfo #panelGridStock gridProductStockHistory'},
		{ ref: 'gridStock', selector: 'productinfo productgridstocks gridproductstocks'},
		{ ref: 'formAddStock', selector: "productinfo productgridstocks #formaddstock"},
		{ ref: 'btnAddStock', selector: "productinfo productgridstocks #formaddstock #addstock"},
		{ ref: 'btnResetStock', selector: "productinfo productgridstocks #formaddstock #resetstock"},
		{ ref: 'btnSave', selector: 'productform button#save'}
	],
	storeProductFormLoaded: false,
	storeComboLoaded: false,
	formBasicInfoLoaded: false,
	formDetailLoaded: false,
	/**
	 * Initialize
	 */
	init: function () {
		var me = this;

		me.listen({
			component: {
				'appdashboardvdashboard button[action=setupsaldoproduct]': {
					/**
					 * Fire event untuk Dashboard Buka Setup Saldo barang
					 */
					'click': me.openListProductHppFromBtnDashboard
				}
			}
		});

		me.control({
			/**
			 * Grid Product
			 */
			'productList': {
				render: function (grid) {
//					this.getGridProducts().getStore().load();
					grid.down('grid#gridProducts').getStore().load();
				}
			},
			/**
			 * Grid Edit Hpp
			 */
			'appviewproductsetuphpp grid' :{
				edit: function(editor,o){
					var grid = o.grid;
					var store = grid.getStore();
					store.sync({
						success: function(res,opts){
							log(res);
//							var r = Ext.JSON.decode(res.responseText,true);
//							log(r);
//							if (r){
//								var success = r.success;
//								if (success){
									App.util.box.info('Berhasil diupdate');
//								}else{
//									App.util.box.error('Gagal diupdate');
//								}
//							}
						},
						failure: function(res,opts){
							App.util.box.error('Maaf ada Kesalahan saat Update record');
							return false;
						}
					});

					log(editor);
					log(o);
				}
			},
			/**
			 * Cari Produk
			 */
			'productList toolbar #searchtext': {
				/**
				 * Saat Cari Produck
				 * @param field
				 * @param e
				 * @param opts
				 */
				specialkey: function (field, e, opts) {
					if (e.getKey() == e.ENTER) {
						var value = field.getValue();
						log(field);
						log('Enter Press with value ' + value);
						var panel = field.up('productList');
						var grid = panel.down('#gridProducts');
						if (grid) {
							var store = grid.getStore();
							if (store) {
								var proxy = store.getProxy();
								if (proxy) {
									proxy.setExtraParam('search', value);
									store.reload();
								}
							}
						}

//						var form = field.up('form').getForm();
//						form.submit();
					}
				}
			},
			/**
			 * Tombol Cari Produk
			 */
			'productList toolbar #searchbtn': {
				click: function (btn) {
					log(btn.text);
				}
			},
			/**
			 * Grid Product
			 */
			'productList grid#gridProducts': {
				/**
				 * Show Info Product at Double click event
				 * @param grid
				 * @param record
				 * @param item
				 * @param index
				 * @param e
				 * @param eOpts
				 */
				itemdblclick: function (grid, record, item, index, e, eOpts) {
					me.showInfoProduct(record);
				},
				/**
				 * Context Menu
				 * @param view
				 * @param record
				 * @param item
				 * @param index
				 * @param e
				 * @param eOpts
				 */
				itemcontextmenu: me.createContextMenu
			},
			/**
			 * Form Basic
			 */
			'formproductbasicinfo': {
				/**
				 * Render Form Basic Informasi
				 * @param form
				 */
				render: function (form) {
					var newrecord = form.up('productinfo').new;
					if (!newrecord) {
						var record = form.getForm().getRecord();
						/*Load Store weight*/
						form.down('[name=unitwidth_id]').getStore().load({ params: { selected: record.get('unitwidth_id')  } });
						/*Load Store width*/
						form.down('[name=unitweight_id]').getStore().load({ params: { selected: record.get('unitweight_id')  } });
						form.down('[name=unitweight_id]').getStore().load({ params: { selected: record.get('unitweight_id')  } });
						form.down('[name=cat_id]').getStore().load({ params: { selected: record.get('cat_id')  } });
						form.down('[name=type_id]').getStore().load({ params: { selected: record.get('type_id')  } });
					}
				}
			},
			/**
			 * Close Product Info Panel
			 */
			'formproductbasicinfo button#close': {
				click: function (btn) {
					/*Check apakah New or exist*/
					var panel = btn.up('productinfo'),
						newrecord = panel.new;
					panel.close();
				}
			},

			/**
			 * Simpan Record Form Basic
			 */
			'formproductbasicinfo button#save': {
				/**
				 * Proses Simpan
				 * @param btn Button fire
				 */
				click: function (btn) {

					var panel = btn.up('productinfo'),
						newrecord = panel.new,
						form = panel.down('form').getForm(),
						values = form.getValues();
					if (newrecord) {
						var record = Ext.create('App.model.product.product', values);
					} else {
						var record = form.getRecord();
					}
					record.set(values);
					record.save({
						success: function (rec, ops) {
							msgInfo('Updated Success');
							/*Update name*/
							if (newrecord) {
								var name = rec.get('name');
								var prodId = rec.get('id');
								var fieldsetname = panel.down('formproductbasicinfo #fieldsetbasicinfo');
								fieldsetname.setTitle('Basic Info ' + name);

								/*Confirm Mau Update Detail Product */
								var fieldsetdetail = panel.down('formproductdetail #fieldsetdetail');
								fieldsetdetail.setTitle('Form Detail Product ' + name);
								panel.down('formproductdetail [name=prodname]').setValue(name);
								panel.down('formproductdetail [name=product_id]').setValue(prodId);

								/*Buat model detail*/
								var modeldetail = Ext.create('App.model.product.detail', {
									product_id: prodId,
									salesprice: 0,
									salespricemin: 0
								});

								/*get form detail*/
								var formdetail = panel.down('formproductdetail').getForm();
								formdetail.loadRecord(modeldetail);
								panel.setActiveTab('formdetail');
//								newrecord = false;
							}
						},
						failure: function (rec, ops) {
							msgError('Terjadi Error Saat Simpan ke server');
						}
					});
				}
			},
			/**
			 * Render Form Detail
			 */
			'formproductdetail': {
				/**
				 * Render Form Detail
				 * @param form
				 */
				render: function (form) {
					var newrecord = form.up('productinfo').new;
					if (!newrecord) {
						var record = form.getForm().getRecord();
						/*Load Store weight*/
						form.down('[name=color_id]').getStore().load({ params: { selected: record.get('color_id')  } });
						form.down('[name=unit_id]').getStore().load({ params: { selected: record.get('unit_id')  } });
						form.down('[name=grade_id]').getStore().load({ params: { selected: record.get('grade_id') } });
						/*Untuk Currencies hanya salah satu saja*/
						form.down('[name=currsp_id]').getStore().load({ params: { selected: record.get('currsp_id')  } });
						form.down('[name=currspm_id]').getStore().load({ params: { selected: record.get('currspm_id')  } });

					}
					;
//					else{
//						var id = form.up('productinfo').down('formproductbasicinfo [name=id]').getValue();
//						form.down['[name=product_id]'].setValue(id);
//					}
				}
//				beforeactivate: function( form ){
//					var id = form.up('productinfo').down('formproductbasicinfo [name=id]').getValue();
////					log(id);
//					form.prodId = id;
////					log(form.prodId);
//					form.down('[name=product_id]').setValue(id);
////					/*Boleh aktif kalau bukan new record */
////					/*Jika Panel Product belum diisi*/
////					var newrecord = panel.up('productinfo').new;
////					return !newrecord;
//				}
			},
			/**
			 * Form Detail Tombol Simpan
			 */
			'formproductdetail button#save': {
				/**
				 * Save Informasi Detail
				 */
				click: function (btn) {

					var form = btn.up('form').getForm(),
						record = form.getRecord(),
						values = form.getValues();

					var newrecord = btn.up('productinfo').new;
					log(record);
					/*check sales harus > sales min*/
					var sp = values.salesprice;
					var spm = values.salespricemin;

					if (parseFloat(spm) > parseFloat(sp)) {
						msgError('Maaf, Sales Price Minimal tidak boleh lebih besar dari Sales Price');
						return false;
					}
					;

					record.set(values);
					record.save({
						success: function (rec, ops) {
							msgInfo('Save berhasil');
						},
						failure: function (rec, ops) {
							msgError('Terjadi Error Pada saat Simpan detail ke server');
						}
					});


//					if (newrecord) {
//						log('record Baru');
//					} else {
//						log('Bukan Record Baru');
//					}
//					;
//					log(values);
				}
			},
			/**
			 * Add New Product
			 */
			'productList button#add': {
				click: function (btn) {
					log('Product Add Button fire!');
					/*Cek apakah requirement data terpenuhi ?*/
					var title = 'New Product';
					var panel = Ext.create('App.view.products.panelinfo', {
						new: true, closable: true, iconCls: 'home', title: title
					});

					this.open_new_tab(title, panel);
				}
			},

			/**
			 * History
			 */
			'productinfo productgridstocks gridproductstocks': {
				/**
				 * Menampilkan History Stock
				 */
				itemclick: me.showHistoryStock
			},
			'productinfo productgridstocks #formaddstock #addstock': {
				/**
				 * Add Stock
				 * @param btn
				 */
				click: function (btn) {
					log('click add stock', btn.text);
				}
			},
			'productinfo productgridstocks #formaddstock #resetstock': {
				/**
				 * Reset Form Stock
				 * @param btn
				 */
				click: function (btn) {
					log('click add stock', btn.text);
				}
			},

			'productinfo productshistory': {
				render: function (panel) {
					var mp = panel.up('productinfo');
					var id = mp.down('formproductbasicinfo [name=id]').getValue();
					var grid = mp.down('#gridHistoryProduct');
					var store = grid.getStore();
					store.clearFilter();
					store.getProxy().setExtraParam('product_id', id);
					store.load();
				}
			}
		});
	},
	showHistoryStock: function (grid, record, item, index, e, eOpts) {
		/**
		 * Load Record to Form Add Stock
		 * @type {Object|*|get|get|Class|get}
		 */
		var me = this, uuid = record.get('uuid');
		var id = record.get('id');
		var panel = grid.up('productgridstocks');
		var gridHistory = panel.down('gridProductStockHistory');
		var store = gridHistory.getStore();
		store.getProxy().setExtraParam('stock_id', id);
		store.load();
	},
	/**
	 * Create Context Menu
	 * @param view
	 * @param record
	 * @param item
	 * @param index
	 * @param e
	 * @param eOpts
	 */
	createContextMenu: function (view, record, item, index, e, eOpts) {
		e.stopEvent();
		var pName = record.get('name');
		var me = this;
		var menu = Ext.create('Ext.menu.Menu', {
			items: [
				{
					text: 'Information Product ' + pName,
					iconCls: 'find',
					handler: function (btn) {
						me.showInfoProduct(record);
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
	},
	/**
	 * Setup Store History Product
	 * @param id
	 * @returns {history|*}
	 */
	setupStoreHistory: function (id) {
		var store = Ext.create('App.store.product.history');
		store.getProxy().setExtraParam('product_id', id);
		store.load();
		return store;
	},
	/**
	 * Setup Product Stock History
	 * @returns {stockhistory|*}
	 */
	setupStoreStockHistory: function () {
		return Ext.create('App.store.product.stockhistory');
	},
	/**
	 * Setup Store Stock Product
	 * @param id
	 * @returns {pstocks|*}
	 */
	setupStoreStock: function (id) {
		var store = Ext.create('App.store.product.pstocks');
		store.getProxy().setExtraParam('product_id', id);
		store.load();
		return store;
	},
	/**
	 * Menampilkan Informasi Product
	 * @param record
	 */
	showInfoProduct: function (record) {
		var me = this, id = record.get('id');
		me.loadRecordProduct(id);
	},
	/**
	 * Create Panel Info
	 * @param recordProduct
	 */
	createPanelInfo: function (recordProduct) {
		var me = this;
		var name = recordProduct.get('name'),
			id = recordProduct.get('id'),
			title = '[' + id + '] ' + name;
		var storeHistory = me.setupStoreHistory(recordProduct.get('id'));
		var stockStore = me.setupStoreStock(id);
		var storeStockHistory = me.setupStoreStockHistory();

		var panel = Ext.create('App.view.products.panelinfo', {
			storeHistory: storeHistory,
			title: title,
			closable: true,
			iconCls: 'home',
			prodId: id,
			prodName: name,
			stockStore: stockStore,
			storeStockHistory: storeStockHistory,
			record: recordProduct
		});

		me.loadRecordToFormBasic(recordProduct, panel);
		var recordDetail = recordProduct.getDetail();
		me.loadRecordToFormDetail(recordDetail, panel);
		me.open_new_tab(title, panel);
	},
	/**
	 * Load Record Product
	 * @param id
	 */
	loadRecordProduct: function (id) {
		var me = this;
		App.model.product.product.load(id, {
			scope: this,
			failure: function (record, operation) {
				msgError('Cannot Load Record Product ');
			},
			success: function (record, operation) {
				me.createPanelInfo(record);

			}
		});
	},
	/**
	 * Load Record ke Form Basic Info
	 * @param record
	 * @param panel
	 */
	loadRecordToFormBasic: function (record, panel) {
		panel.down('#formbasicinfo').getForm().loadRecord(record);
	},
	/**
	 * Load Record ke Form Detail
	 * @param record
	 * @param panel
	 */
	loadRecordToFormDetail: function (record, panel) {
		panel.down('#formdetail').getForm().loadRecord(record);
	},
	/**
	 * Counter New record
	 */
	cntNewRecord: 1,
	/**
	 * Open New Tab
	 * @param title
	 * @param component
	 */
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
	openListProductHppFromBtnDashboard: function (btn) {
		/*cari tabpanel*/
		var tab = btn.up('tabpanel');

		if (!tab) {
			tab = btn.up('mainpanel');
			if (!tab) {
				tab = btn.up('devmainpanel');
			}
		}

		if (!tab) Ext.error.raise('Tidak diketemukan Tab Panel');

		var title = 'Setting Hpp Produk';
		var newTab = tab.items.findBy(
			function (tab) {
				return tab.title === title;
			});

		if (!newTab) {
			var panel = Ext.create('App.view.products.setuphpp', {
				title: title,
				iconCls: 'grid',
				closable: true
			});
			newTab = tab.add(panel);
		}
		tab.setActiveTab(newTab);

	}
});
