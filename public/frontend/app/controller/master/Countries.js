/**
 * Controller Location
 *
 *
 * @todo
 * - saat pilih negara, provinse reload , city disable
 * - saat pilih province, city reload
 *
 */
Ext.define('App.controller.master.Countries', {
	extend: 'Ext.app.Controller',
	views: [
		/*Grids*/
		'App.view.master.location.tabs',
		'App.view.master.location.ListCountries',
		'App.view.master.location.ListProvinces',
		'App.view.master.location.ListCities',
		/*Form and Window */
		'App.view.master.location.winCountry',
		'App.view.master.location.frmCountry',

		/*Province*/
		'App.view.master.location.winProvince',
		'App.view.master.location.frmProvince',
		/*City*/
		'App.view.master.location.winCity',
		'App.view.master.location.frmCity',

		'App.form.combobox.cbProvinces',
		'App.form.combobox.cbCountries'

	],
	models: [
		'App.model.Country',
		'App.model.Province',
		'App.model.City'
	],
	stores: [
		'App.store.Countries',
		'App.store.Provinces',
		'App.store.Cities',
		'App.store.combo.cbCountries',
		'App.store.combo.cbProvinces'
	],
	refs: [
		/*Grids*/
		{ ref: 'gridCountry', selector: 'masterlocationtab #countries' },
		{ ref: 'gridProvince', selector: 'masterlocationtab #provinces' },
		{ ref: 'gridCity', selector: 'masterlocationtab #cities' },
		/*Buttons*/
		{ ref: 'btnExportCountry', selector: 'masterlocationtab > toolbar #export' },
		{ ref: 'btnImportCountry', selector: 'masterlocationtab > toolbar #import' },
		/*Country*/
		{ ref: 'btnAddCountry', selector: 'masterlocationtab listcountriesGP > toolbar #add' },
		{ ref: 'btnRemoveCountry', selector: 'masterlocationtab listcountriesGP > toolbar #remove' },
		/*Province*/
		{ ref: 'btnAddProvince', selector: 'masterlocationtab listprovincesGP > toolbar #add' },
		{ ref: 'btnRemoveProvince', selector: 'masterlocationtab listprovincesGP > toolbar #remove' },
		/*City*/
		{ ref: 'btnAddCity', selector: 'masterlocationtab listcitiesGP > toolbar #add' },
		{ ref: 'btnRemoveCity', selector: 'masterlocationtab listcitiesGP > toolbar #remove' }
	],
	cnt: {
		newcountry: 1,
		newprovince: 1,
		newcity: 1
	},
	init: function () {
		log('Countries Controller Init');
		var me = this;
		me.control({
			"listcountriesGP": {
				edit: function (editor, object) {
					log('Save Process');
					object.store.save();
					me.doRefresh();
				},
				itemclick: me.onCountriesrecordClick,
				render: me.renderGridCountry,

				selectionchange: function (grid, selections) {
					var me = this, selected = selections.length > 0;
					/**
					 * Disable Button remove Jika tida yang dipilih
					 */
					me.getBtnRemoveCountry().setDisabled(!selected);
//                    me.onCountriesrecordClick(grid,selections[0]);
				},
				canceledit: me.onCancelEditingCountry
			},
			/**
			 * Add Country
			 */
			'listcountriesGP > toolbar > button[action=add]': {
//                click: me.addCountryProcess
				click: me.addRecordCountry
			},
			/**
			 * Remove Country
			 */
			'listcountriesGP > toolbar > button[action=remove]': {
				click: me.removeCountryProcess
			},
			/*Province*/

			'listprovincesGP': {
				itemclick: me.getRecordsCities,
				canceledit: me.onCancelEditingProvince,
				selectionchange: function (grid, selections) {
					var me = this, selected = selections.length > 0;
					/**
					 * Disable Button remove Jika tida yang dipilih
					 */
					me.getBtnRemoveProvince().setDisabled(!selected);
				}
			},
			/*Add Province*/
			'listprovincesGP > toolbar > button[action=add]': {
				click: me.addRecordProvince
			},

			'listprovincesGP > toolbar > button[action=remove]': {
				click: me.removeCountryProcess
			},

			'listcitiesGP': {
				canceledit: me.onCancelEditingCity,
				selectionchange: function (grid, selections) {
					var me = this, selected = selections.length > 0;
					/**
					 * Disable Button remove Jika tida yang dipilih
					 */
					me.getBtnRemoveCity().setDisabled(!selected);
				}
			},
			/*Add City*/
			'listcitiesGP > toolbar > button[action=add]': {
				click: me.addRecordCity
			},
			'listcitiesGP > toolbar > button[action=remove]': {
				click: me.removeCountryProcess
			}
		});
	},
	/**
	 *
	 * Launch Controller Override Parent
	 *
	 */
	onLaunch: function () {
		/**
		 * Setup Store Listener
		 */
		var me = this;
		/*Country*/
		me.setupCountryStoreListener();
		me.setupProvinceStoreListener();
		me.setupCityStoreListener();

		log('controller launcher countries');
	},

	/**
	 * Setup Listener Store Country
	 */
	setupCountryStoreListener: function () {
		/**
		 * Catatan :
		 * @todo :
		 * Untuk semua response
		 * yang menentukan adalah error = true,
		 * walaupun success = true,
		 * extjs tidak akan mengeksekusi listener write (kalo success == false)
		 * apalagi kalo code status != 200.
		 */
		var me = this,
			grid = me.getGridCountry();


		if (!grid) {
			return false;
		}

		var storeCountries = grid.getStore();
		/**
		 * Fixed saat reload,
		 * logout automatis
		 */
		if (storeCountries) {
			storeCountries.on(
				/**
				 * Ini akan selalu dijalankan saat proses edit
				 */
				'update', function (store, record, operation, eOpts) {
//                    store.reload();
				}, this
			);
			/**
			 * Ini fire saat proxy berubah data.
			 */
			storeCountries.on(
				'datachanged', function (store, eOpts) {
					log('data changed bray');
				}, this
			);
			/**
			 * masih tanda tanya :-)
			 */
			storeCountries.on(
				'beforesync', function (options, eOpts) {
					log('before sync');
					log(options);
					log(eOpts);
				}, this
			);

			storeCountries.on(
				/**
				 * Ini Tidak Akan Fire!
				 * jika success dari proxy == false (success == false)
				 * maka untuk mengatasinya
				 * gunakan success = true, tapi dengan tambahan
				 * error = true,
				 * misal jsonnya
				 * { success : true, error : false, reason : 'update fail' }
				 *
				 */
				'write', function (store, operation, eOpts) {
					var json = Ext.JSON.decode(operation.response.responseText),
						error = json.error;
					if (error) {
						/**
						 * Jika Error, tampilkan Message (reason)
						 * @type {string|String}
						 */
						var reason = json.reason;
						msgError(reason);
					}
					;
				}, this
			);
		}
	},

	setupProvinceStoreListener: function () {
		/**
		 * Catatan :
		 * @todo :
		 * Untuk semua response
		 * yang menentukan adalah error = true,
		 * walaupun success = true,
		 * extjs tidak akan mengeksekusi listener write (kalo success == false)
		 * apalagi kalo code status != 200.
		 */
		var me = this,
			grid = me.getGridProvince();

		if (!grid) return false;
		var store = grid.getStore();

		store.on(
			/**
			 * Ini akan selalu dijalankan saat proses update
			 */
			'update', function (store, record, operation, eOpts) {
//                store.reload();
			}, this
		);
		/**
		 * Ini fire saat proxy berubah data.
		 */
		store.on(
			'datachanged', function (store, eOpts) {
				log('datachanged fire!!!');
			}, this
		);
		/**
		 * masih tanda tanya :-)
		 */
		store.on(
			'beforesync', function (options, eOpts) {
				log('before sync fire!!!');

				if (!options.create) {
					log("Option Bukan Create");
				} else {
					log("Option Create");
					grid.getView().refresh();
				}
				log(options.create);
//                log(eOpts);
			}, this
		);

		store.on(
			/**
			 * @see Note setupCountryStoreListener#L135
			 */
			'write', function (store, operation, eOpts) {
				var json = Ext.JSON.decode(operation.response.responseText),
					error = json.error;
				if (error) {
					/**
					 * Jika Error, tampilkan Message (reason)
					 * @type {string|String}
					 */
					var reason = json.reason;
					msgError(reason);
				}
				;
			}, this
		);
	},

	/**
	 * Setup Listener City
	 */
	setupCityStoreListener: function () {
		/**
		 * Note
		 * @see setupCountryStoreListener
		 */
		var me = this,
			grid = me.getGridCity();
		if (!grid) return false;
		var store = grid.getStore();

		store.on(
			/**
			 * Ini akan selalu dijalankan saat proses update
			 */
			'update', function (store, record, operation, eOpts) {
//                store.reload();
			}, this
		);

		store.on(
			/**
			 * @see Note setupCountryStoreListener#L135
			 */
			'write', function (store, operation, eOpts) {
				var json = Ext.JSON.decode(operation.response.responseText),
					error = json.error;
				if (error) {
					/**
					 * Jika Error, tampilkan Message (reason)
					 * @type {string|String}
					 */
					var reason = json.reason;
					msgError(reason);
				}
				;
			}, this
		);
	},
	/**
	 * Proses Tambah Record Kota
	 */
	addRecordCity: function () {

		/**
		 * Check Parent ID
		 */

		var me = this,
			provinceSelected = me.getGridProvince().getSelectionModel().getSelection()[0];

		if (!provinceSelected) {
			var msg = 'Province  Belum dipilih';
			msgError(msg);
			log(msg);
			return false;
		}
		;

		var idProvince = provinceSelected.get('id');

		var me = this, grid = me.getGridCity(),
			cnt = me.cnt.newprovince,
			model = Ext.create('App.model.City', {
				name: ' ',
				parent_id: idProvince
			}),
			idRowEdit = 'cellEditorCities';
		/*Proses Tambah */
		me.processAdd(grid, model, idRowEdit);
		me.cnt.newprovince++;
	},
	/**
	 * Proses Tambah Record Province
	 */
	addRecordProvince: function () {

		/**
		 * Check Parent ID
		 */

		var me = this,
			countrySelected = me.getGridCountry().getSelectionModel().getSelection()[0];

		if (!countrySelected) {
			var msg = 'Negara Belum dipilih';
			msgError(msg);
			log(msg);
			return false;
		}
		;

		var idNegara = countrySelected.get('id');
		log(idNegara);
		var grid = me.getGridProvince(),
			cnt = me.cnt.newprovince,
			name = ' ', // 'New Province ' + cnt,
			model = Ext.create('App.model.Province', {
				name: name,
				info: "Information " + name,
				parent_id: idNegara,
				parentId: idNegara
			}),

			idRowEdit = 'cellEditorProvinces';
		/*Proses Tambah */
		me.processAdd(grid, model, idRowEdit);
		me.cnt.newprovince++;
	},
	/**
	 * Proses Tambah Record Negara
	 */
	addRecordCountry: function () {
		/*Tambah negara*/
		var me = this, grid = me.getGridCountry(),
			cnt = me.cnt.newcountry,
			model = Ext.create('App.model.Country', {
				name: ' ',
				parent_id: 0
			}),
			idRowEdit = 'cellEditorCountries';
		/*Proses Tambah */
		me.processAdd(grid, model, idRowEdit);
		me.cnt.newcountry++;
	},
	processAdd: function (grid, model, idRowedit) {
		var rowEditing = grid.getPlugin(idRowedit);
		grid.getStore().insert(0, model);
		rowEditing.startEdit(0, 0);
	},
	doRefresh: function (grid) {
		log(grid);
//        grid.getView().refresh();
	},
	onCancelEditingCountry: function () {
		var store = this.getGridCountry().getStore();
		store.each(function (record) {
			if (record.phantom) {
				store.remove(record);
				return false;
			}
		}, this);

	},
	onCancelEditingProvince: function () {
		var store = this.getGridProvince().getStore();
		store.each(function (record) {
			if (record.phantom) {
				store.remove(record);
				return false;
			}
		}, this);

	},
	onCancelEditingCity: function () {
		var store = this.getGridCity().getStore();
		store.each(function (record) {
			if (record.phantom) {
				store.remove(record);
				return false;
			}
		}, this);

	},
	/**
	 * Saat Grid Country render
	 * @param grid
	 */
	renderGridCountry: function (grid) {
		grid.getStore().load();
	},

	/**
	 * Remove Negara
	 * @param button
	 */
	removeCountryProcess: function (button) {
		var me = this,grid = button.up('grid'),
			store = grid.getStore(),
			selection = grid.getSelectionModel();
		Ext.each(selection.selected.items, function (record) {
//			record.destroy(
//				{
//					failure: function(){
//						App.util.box.error('Ada data yang tidak bisa dihapus');
//					}
//				}
//			)
			store.remove(record);
		});
//		store.sync();
		store.load();
//		me.doRefresh(grid);
	},
	/**
	 * Saat Grid di click
	 * Tampilkan Province
	 *
	 * @param grid
	 * @param record
	 * @param item
	 * @param index
	 * @param e
	 * @param eOpts
	 */
	onCountriesrecordClick: function (grid, record, item, index, e, eOpts) {
		/**
		 * request to server , param level = 1
		 * set proxy grid ke parameter level 1 dan country id yang dipilih
		 * load grid province
		 */
		var me = this,
			gridProvince = me.getGridProvince(),
			idCountry = record.get('id'),
			name = record.get('name');

		/*Setup Grid Province to param idCountry*/
		var storeProvince = gridProvince.getStore(), provincerecords;
		gridProvince.setTitle(name);
		storeProvince.clearFilter();
		storeProvince.clearData();
		storeProvince.getProxy().setExtraParam('parentId', idCountry);
		storeProvince.load({
			scope: this,
			callback: me.processRecordProvince
		});
		gridProvince.getView().refresh();
	},
	/**
	 * Proses Record Province
	 * Fallback
	 * @param records
	 * @param operation
	 * @param success
	 */
	processRecordProvince: function (records, operation, success) {
//        if (records.length > 0) {
//            /*Check Apakah ada Record Yang dipilih ? */
//            var me = this, selectedProvince = me.getGridProvince().getSelectionModel().getSelection();
//            if (selectedProvince.length) {
//                var recordProvince = selectedProvince[0];
//                var idProvince = recordProvince.get('id');
//                /*Jika Grid Province memiliki data*/
//                var gridCity = me.getGridCity(), storeCity = gridCity.getStore();
//                storeCity.clearFilter();
//                storeCity.getProxy().setExtraParam('parentId', idProvince);
//                storeCity.load();
//                gridCity.getView().refresh();
//            }
//
//        } else {
//            /*Jika Tidak Ada Disable Grid*/
//
//        }

	},
	/**
	 * Mendapatkan Records City
	 */
	getRecordsCities: function (grid, record, item, index, e, eOpts) {
		var me = this, idProvince = record.get('id'),
			grid = me.getGridCity(), store = grid.getStore();
		store.clearFilter();
		store.clearData();
		store.getProxy().setExtraParam('parentId', idProvince);
		store.reload();
		grid.getView().refresh();
	}

});
