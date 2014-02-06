/**
 * Part Of ICS
 *
 * Copyright (C) 2013  Emay Komarudin
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * @author Emay Komarudin
 *
 *
 *
 **/

Ext.define('App.controller.cPO', {
	extend: 'Ext.app.Controller',
	views: [
		'App.view.PO.vPO',
		'App.view.PO.formAddPoKain',
		'App.view.PO.listItems',
		'App.view.PO.winContact',
		'App.view.PO.winSupplier',
		'App.view.PO.winProduct',

		'App.view.PO.winWarehouse',
		'App.view.PO.winCurrency'
	],
	models: [
		'App.model.PO.mPO',
		'App.model.PO.items',
		'App.model.typepayment.mtypepayment'
	],
	stores: [
		'App.store.PO.sPO',
		'App.store.PO.ssupplier',
		'App.store.PO.products',
		'App.store.PO.sContact',
		'App.store.combo.cbSuppliers',
		'App.store.combo.cbWarehouseStore',
		'App.store.combo.cbCurrency',
		'App.store.combo.cbTypeTax',
		'App.store.combo.cbTypePaymentStore',
		'App.store.typepayment.stypepayment',
		'App.store.Currencies',
	],
	refs: [
		{
			ref: 'formAddKain', selector: 'formAddPoKain'
		},
		{
			ref: 'valSupplierId', selector: 'formAddPoKain [name=supplier_id]'
		},
		{
			ref: 'gridNewOrderItem', selector: 'panelNewOrderKain > gridorderItems'
		},
		{
			ref: 'panelNewOrderItemPo', selector: 'panelNewOrderKain'
		},
	],
	init: function () {
		var me = this;
		me.control({

			/**
			 * Form
			 */

			/*Pilih Supplier*/
			'formAddPoKain [action=selectsupplier]': {
				click: me.showWindowselectSupplier
			},
			/*Pilih Contact*/
			'formAddPoKain [action=selectcontact]': {
				click: me.showWindowselectContactFromSupplier
			},
			'formAddPoKain [action=selectproduct]': {
				click: me.showWindowselectProductFromSupplier
			},
			/*Quick Add*/
			/*Warehouse*/
			'formAddPoKain [action=quickaddwarehouse]': {
				click: me.showWindowQuickAddWarehouse
			},
			/*Payment*/
			'formAddPoKain [action=quickaddpayment]': {
				click: me.showWindowQuickAddPayment
			},
			/*Tax*/
			'formAddPoKain [action=quickaddtax]': {
				click: me.showWindowQuickAddTax
			},
			/*Currency*/
			'formAddPoKain [action=quickaddcurrency]': {
				click: me.showWindowQuickAddCurrency
			},
			/**
			 * Form Combox Currency
			 */
			'formAddPoKain [name=currency_id]': {
				change: me.selectCurrencyAndSetupSymbol
			},

			/**
			 * Supplier Window
			 */
			'winPoSupplier': {
				beforeshow: me.clearContactBeforeShowWinSupplier
			},
			'winPoSupplier grid': {
				itemdblclick: me.selectSupplierAndCloseWindow
			},
			'winPoSupplier > toolbar [action=selectandclose]': {
				click: me.selectSupplierAndcloseWindow
			},
			'winPoSupplier [action=searchsupplier]': {
				specialkey: me.typeAndSearchSupplier
			},
			/**
			 * Contact Person
			 */
			'winPoContact grid': {
				itemdblclick: me.selectContactAndCloseWindow
			},
			'winPoContact > toolbar [action=selectandclose]': {
				click: me.toolbarselectContactAndcloseWindow
			},

			'winPoContact [action=searchcontact]': {
				specialkey: me.typeAndSearchContact
			},
			/**
			 * Product Window
			 */
			'winPoProduct grid': {
				itemdblclick: me.selectProductAndCloseWindow
			},
			'winPoProduct > toolbar [action=quickaddproduct]': {
				click: me.showQuickAddProductWindow
			},
			'winPoProduct [action=searchproduct]': {
				specialkey: me.typeAndSearchProduct
			},

			'winPoProduct [action=selectandclose]': {
				click: me.selectProductAndAddedToGrid
			},

			'panelNewOrderKain': {
				afterrender: function(panel){
				var grid = panel.down('grid');
				this.calculatedTotalPriceAndDiscount(grid);
				}
			},
			'panelNewOrderKain [name=total]': {
				change: function (txtfield, newValue, oldValue, eOpts) {
				}
			},

			'panelNewOrderKain [name=totaldiscount]': {
				change: function (txtfield, newValue, oldValue, eOpts) {
				}
			},

			'panelNewOrderKain [name=dp_amount]': {
				change: me.calculateTotalAfterDptxtChange
			},

			/**
			 * Grid Order Items
			 */
			'panelNewOrderKain gridorderItems': {
				/*Row Editing Event*/
				edit: function (editor, obj) {
					log('plugin row editing , edit process');
					var grid = obj.grid;

					/*calculasi total price dan discount */
//					me.calculatedTotalPriceAndDiscount(store, txtTotal, txttotalDisc);
					this.calculatedTotalPriceAndDiscount(grid);
				},

//				canceledit: function (editor, context, eOpts) {
//					log('cancel edit');
////					log('Object : ',editor,context,eOpts);
//				},
				validateedit: function (editor, obj, eOpts) {
					log(obj);
				}
			}
		});
		me.callParent(arguments);
	},

	totalPrice: 0,
	totaldiscount: 0,
	totalafterdiscount: 0,
	totalafterdp: 0,
	totaldp: 0,
	calculatedTotalPriceAndDiscountWhenRender:function(grid){
log('render' + grid.getId());
	},
	calculateTotalAfterDptxtChange: function (field, value) {
		var me = this;
		var panel = field.up('panel');
		var totalafterdp = panel.down('[name=totalafterdp]');
		value = parseFloat(value);
		me.totaldp = value;
		field.setValue(value);
		var afterdp = me.totalafterdiscount - field.getValue();
		if (afterdp > 0) {
			if (afterdp <= me.totalafterdiscount) {
				me.totalafterdp = afterdp;
				var formattedValue = Ext.util.Format.number(afterdp, '0,00');
				totalafterdp.setValue(formattedValue);
			}
		}
	},
	selectCurrencyAndSetupSymbol: function (combo, newValue, oldValue, eOpts) {
		/*Dapatkan Mata Uang dari Combo*/
		var name = combo.displayTplData[0].name;
		/*Setup ke combo discount*/
		combo.up('panelNewOrderKain').down('[name=currency_name]').setValue(name);

	},
	/**
	 * Menghitung Jumlah Total Price dan Total Discount
	 * @param store
	 * @param txtTotal
	 * @param txttotalDisc
	 */
//	calculatedTotalPriceAndDiscount: function (store, txtTotal, txttotalDisc) {
	calculatedTotalPriceAndDiscount: function (grid) {
		var me = this,
		store = grid.getStore(),
			panel = grid.up('panelNewOrderKain'),
			txtTotal = panel.down('[name=total]'),
			txttotalDisc = panel.down('[name=totaldiscount]');
		var subtotal = 0;
		var totaldiscount = 0;
		Ext.each(store.data.items, function (record, v) {
			var price = record.get('price');
			var qty = record.get('qty');
			var discount = record.get('discount');
			var total = parseFloat(price) * parseFloat(qty);

			if (discount > 0) {
				if (discount > total) {
					discount = 0;
					record.set('discount', 0);
				}
				total = total - discount;
				totaldiscount = totaldiscount + parseFloat(discount);
			}
			subtotal = subtotal + total;
		});
		me.totalPrice = subtotal;
		me.totaldiscount = totaldiscount;
		var formattedValue = Ext.util.Format.number(subtotal, '0,00');
		var formatdiscount = Ext.util.Format.number(totaldiscount, '0,00');
		txtTotal.setValue(formattedValue);
		txttotalDisc.setValue(formatdiscount);

		var panel = txtTotal.up('panelNewOrderKain'),
			afterdiscount = panel.down('[name=totalafterdisc]');
		var totalafterdiscount = subtotal - totaldiscount;
		me.totalafterdiscount = totalafterdiscount;
		var formatafterdiscount = Ext.util.Format.number(totalafterdiscount, '0,00');
		afterdiscount.setValue(formatafterdiscount);

	},
	/**
	 * Pilihan semua product dimasukan ke grid order item
	 * @param btn
	 */
	selectProductAndAddedToGrid: function (btn) {
		var me = this, win = btn.up('window'),
		/*get grid order product*/
			gridOrderItem = me.getGridNewOrderItem(),
			storeItems = gridOrderItem.getStore(),

		/*get product(s) selected */
			gridProductSelected = win.down('grid'),
			records = gridProductSelected.getSelectionModel().getSelection(),
			productExist = false;

		if (records[0] === undefined) {
			App.util.box.error('Silahkan pilih produk terlebih dahulu');
			return false;
		}
		Ext.each(records, function (rec, index, value) {
			/*Check Apakah Product Sudah ada di Order Items ? */
			var exist = storeItems.findBy(function (recor, id) {
				return (rec.get('name') === recor.get('name'));
			});
			/*Jika Belum ada Tambahkan Pada Store*/
			if (exist <= 0) {
				var items = Ext.create('App.model.PO.items', {
					'name': rec.get('name'),
					'qty': rec.get('qty') || 0,
					'price': rec.get('price') || 0,
					'subtotal': 0
				});
				storeItems.add(items);
			} else {
				productExist = true;
			}

		});

		if (productExist) {
			App.util.box.error('Product Sudah terpilih dalam Item Order');
			return false;
		} else {
			/*Tampilkan Konfirmasi Apakah Mau Menambahkan Lagi Product */
			Ext.MessageBox.confirm('Konfirmasi', 'Apakah Akan Menambah Lagi Produk ? ', function (btn) {
				/*Close Window*/
				if (btn == 'no') win.close();
			});
		}
	},
	/**
	 * Menampilkan Window Add Warehouse
	 * @param btn
	 */
	showWindowQuickAddWarehouse: function (btn) {
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winWarehouse', {
				title: 'Tambah Gudang',
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Menampilkan window Add tax
	 * @param btn
	 */
	showWindowQuickAddTax: function (btn) {
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winTaxtype', {
				title: 'Tambah Tipe Pajak',
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Menampilkan Window Add Payment
	 * @param btn
	 */
	showWindowQuickAddPayment: function (btn) {
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winPayment', {
				title: 'Tambah Metoda Pembayaran',
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Menampilkan window Add payment
	 * @param btn
	 */
	showWindowQuickAddCurrency: function (btn) {

		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winCurrency', {
				title: 'Tambah Mata Uang',
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Menampilkan Window Add Product
	 * @param btn
	 */
	showQuickAddProductWindow: function (btn) {
		/*Menambahkan Product dengan cepat*/
		var supname = btn.up('window').getSupplierName();
		var win;
		if (!win) {
			win = Ext.create('Ext.window.Window', {
				title: 'Tambah Product untuk Supplier ' + supname,
				height: App.util.box.maxHeightwindow() - 200,
				width: App.util.box.maxWidthWindow() - 100,
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Cari Supplier
	 * @param field
	 * @param e
	 */
	typeAndSearchSupplier: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var grid = field.up('grid'),
				store = grid.getStore(),
				suppliername = field.getValue(),
				proxy = store.getProxy();
			proxy.setExtraParam('suppliername', suppliername);
			store.load();
		}
	},
	/**
	 * Cari Contact
	 * @param field
	 * @param e
	 */
	typeAndSearchContact: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var grid = field.up('grid'),
				store = grid.getStore(),
				contactname = field.getValue(),
				proxy = store.getProxy();
			proxy.setExtraParam('contactname', contactname);
			store.load();
		}
	},
	/**
	 * Clear Contact Sebelum Window Tampil
	 */
	clearContactBeforeShowWinSupplier: function () {
		var form = this.getFormAddKain();
		/*Clear Combo Contact */

		form.down('[name=cp_id]').setValue('');
		form.down('[name=cp_name]').setValue('');
	},
	/**
	 * Cari Product
	 * @param field
	 * @param e
	 */
	typeAndSearchProduct: function (field, e) {
		if (e.getKey() == e.ENTER) {
			var grid = field.up('grid'),
				store = grid.getStore(),
				productname = field.getValue(),
				proxy = store.getProxy();
			proxy.setExtraParam('productname', productname);
			store.load();
		}
	},
	/**
	 * Pilih Contact
	 * @param btn
	 * @returns {boolean}
	 */
	toolbarselectContactAndcloseWindow: function (btn) {
		/*Dapatkan record yang dipilih*/
		var win = btn.up('window'),
			grid = win.down('grid'),
			selection = grid.getSelectionModel();

		if (selection.selected.length == 0) {
			App.util.box.error('Silahkan Pilih Contact Terlebih Dahulu');
			return false;
		}
		var record = selection.selected.items[0],
			form = this.getFormAddKain();
		/*Set Combo Contact */
		form.down('[name=cp_id]').setValue(record.get('id'));
		form.down('[name=cp_name]').setValue(record.get('name'));
		/*Setup Proxy Contact di set di initComponent Window */
		/*Close Window*/
		win.close();

	},
	/**
	 * Pilih Contact dalam Window
	 * @param grid
	 * @param record
	 */
	selectContactAndCloseWindow: function (grid, record) {
		/*Select Record Contact*/
		var win = grid.up('window'), me = this,
			form = me.getFormAddKain(),
			cpid = form.down('[name=cp_id]'),
			cpname = form.down('[name=cp_name]');

		/*Setup Combobox Contact id*/
		me.setupValueCombo(record.get('id'), cpid);
		/*Setup Combobox Contact name*/
		me.setupValueCombo(record.get('name'), cpname);
		/*Close Window*/
		win.close();

	},
	/**
	 * Pilih Product dalam Window
	 * @param grid
	 * @param record
	 */
	selectProductAndCloseWindow: function (grid, record) {
		/*Select Record*/
		/*Added to Grid Order Item*/
		/*Close Window*/
	},
	/**
	 * Memilih Record dan Window Langsung Close saat double click
	 * @param grid
	 * @param record
	 */
	selectSupplierAndCloseWindow: function (grid, record) {
		var win = grid.up('window'), me = this,
			form = me.getFormAddKain(),
			cbsupplierid = form.down('[name=supplier_id]'),
			cbsuppliername = form.down('[name=supplier_name]');

		me.setupValueCombo(record.get('id'), cbsupplierid);
		me.setupValueCombo(record.get('name'), cbsuppliername);
		win.close();
	},
	/**
	 * Setup Combo Box
	 * @param val
	 * @param comboid
	 */
	setupValueCombo: function (val, comboid) {
		comboid.setValue(val);
	},
	/**
	 * Menampilkan Window Supplier untuk dipilih
	 * @param btn
	 * @returns {boolean}
	 */
	showWindowselectProductFromSupplier: function (btn) {
		var form = btn.up('formAddPoKain');
		var supplierId = form.down('[name=supplier_id]').getValue();
		if (!supplierId) {
			App.util.box.error('Silahkan Pilih Supplier/Pemasok terlebih dahulu');
			return false;
		}
		var win;
		if (!win) {
			var supplierId = 2;
			var supplierName = form.down('[name=supplier_name]').getValue();
			/*Ambil dari combo Form */
			var store = Ext.create('App.store.PO.products');
			store.getProxy().setExtraParam('supplierid', supplierId)
			/*Butuh ID Supplier */
			win = Ext.create('App.view.PO.winProduct', {
				supplierName: supplierName,
				supplierId: supplierId,
				storeProduct: store
			});
			win.show();
		}
	},
	/**
	 * Memilih Supplier dan Close Window dari Button
	 * @param btn
	 * @returns {boolean}
	 */
	selectSupplierAndcloseWindow: function (btn) {
		/*Dapatkan record yang dipilih*/
		var grid = btn.up('winPoSupplier').down('grid');
		var win = btn.up('window');
		var selection = grid.getSelectionModel();

		if (selection.selected.length == 0) {
			App.util.box.error('Silahkan Pilih Supplier Terlebih Dahulu');
			return false;
		}

		var record = selection.selected.items[0];
		var form = this.getFormAddKain();
		/*Set Combo Supplier */
		form.down('[name=supplier_id]').setValue(record.get('id'));
		form.down('[name=supplier_name]').setValue(record.get('name'));
		/*Clear Contact*/
		form.down('[name=cp_id]').clearValue();
		form.down('[name=cp_name]').clearValue();

		/*Setup Proxy Contact*/

		/*Close Window*/
		win.close();

	},
	/**
	 * Menampilkan Window Supplier Untuk Dipilih
	 * @param btn
	 */
	showWindowselectSupplier: function (btn) {
		var storeSupplier = Ext.create('App.store.PO.ssupplier');
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winSupplier', {
				storeSupplier: storeSupplier,
				modal: true
			});
			win.show();
		}
	},
	/**
	 * Menampilkan Window Contact Untuk Dipilih
	 * @param btn
	 */
	showWindowselectContactFromSupplier: function (btn) {
		/*cari parameter supplier_id*/
		var supplierId = this.getValSupplierId().getValue();
		/*Jika Supplier belum dipilih*/
		if (!supplierId) {
			App.util.box.error('Silahkan Pilih Record Supplier terlebih dahulu');
			return false;
		}
		var supplierName = this.getFormAddKain().down('[name=supplier_name]').getValue();
		var storeContacts = Ext.create('App.store.PO.sContact');
		var win;
		if (!win) {
			win = Ext.create('App.view.PO.winContact', {
				supplierName: supplierName,
				supplierId: supplierId,
				storeContact: storeContacts,
				modal: true
			});
			win.show();
		}
	}
});

