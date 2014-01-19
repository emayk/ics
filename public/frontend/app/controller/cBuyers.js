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

Ext.define('App.controller.cBuyers', {
    extend: 'Ext.app.Controller',
    views: [
        'App.view.Buyers.vBuyers',
        'App.view.Buyers.Lists',
        'App.view.Buyers.Edit',

        'App.form.combobox.cbCountries',
        'App.form.combobox.cbProvinces',
        'App.form.combobox.cbCities',
        'App.form.combobox.cbTypeSupBuy',
        'App.form.combobox.cbLegalitas',
        'App.form.combobox.cbTypeProduct'
    ],
    models: [
        'App.model.Buyers.mBuyers'
    ],
    stores: [
        'App.store.Buyers.sBuyers',
        'App.store.combo.cbCountries',
        'App.store.combo.cbProvinces',
        'App.store.combo.cbCities',
        'App.store.combo.cbTypeSupBuy',
        'App.store.combo.cbLegalitas',
        'App.store.combo.cbTypeProduct'
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'appBuyersvBuyersLists'
        },
        {
            ref: 'tabs',
            selector: 'appBuyersvBuyers'
        }
    ],
    init: function () {
        var me = this;
        me.control({
            /*Begin Control*/
            /**
             * Grid List Buyer
             */
            'appBuyersvBuyersLists': {
                render: me.onRenderGridBuyer,
                itemdblclick: me.showInfoBuyer
            },
            /**
             * tambah Buyer
             */
            'appBuyersvBuyersLists button[action=add]': {
                click: me.addRecordBuyer
            },
            /**
             * Hapus Buyer
             */
            'appBuyersvBuyersLists button[action=remove]': {
                click: me.removeRecordBuyer
            },
            /**
             * Edit Buyer/Info
             */
            'appBuyersvBuyersEdit': {
                render: function (panel) {
                    log(panel.mode);
                }
            },
            /**
             * Tombol save
             */
            'appBuyersvBuyersEdit #formbuyer #save': {
                click: me.saveRecord
            },
            /**
             * Tombol Help
             */
            'appBuyersvBuyersEdit #formbuyer #help': {
                click: function (btn) {
                    belumImplement();
                }
            },
            /**
             * Tombol Reset
             */
            'appBuyersvBuyersEdit #formbuyer #reset': {
                click: function (btn) {
                    btn.up('form').getForm().reset();
//                    belumImplement();
                }
            }, /**
             * Tombol Close / Remove Form
             */
            'appBuyersvBuyersEdit #formbuyer #close': {
                click: me.closeFormEdit
            }
            /*End Control*/
        });

    },
    /**
     * Save Record
     * @param btn
     */
    saveRecord: function (btn) {
        log(btn);
        var me = this,
            form = btn.up('form').getForm(),
            record = form.getRecord(),
            values = form.getValues(),
            store = me.getGrid().getStore();
        if (!record) {
            var record = Ext.create('App.model.Buyers.mBuyers');
            record.set(values);
            var errors = record.validate();
            log(errors);
            store.add(record);
        } else {
//            record.set(values);
//            record.save();
            form.updateRecord(record);
        }
        store.sync();
        me.closeFormEdit(btn);
    },
    /**
     * Close Form Edit/Info
     * @param btn
     */
    closeFormEdit: function(btn){
        btn.up('appBuyersvBuyersEdit').close();
    },
    /**
     *
     * Menampilkan Informasi Buyer
     *
     * @param grid
     * @param record
     */
    showInfoBuyer: function (grid, record) {
//        tampilkan info buyer
//        load record dan relasi info (history,chart)
        var me = this, title = 'Information Buyer ' + record.get('name'),
            tabinfo = Ext.create('App.view.Buyers.Edit', {
                title: title,
                closable: true,
                iconCls: 'home',
                mode: 'edit'
            });
        tabinfo.down('#formbuyer').getForm().loadRecord(record);
        me.openNewTab(title, tabinfo);
    },
    /**
     * Saat Render
     */
    onRenderGridBuyer: function () {
        this.getGrid().getStore().load();
    },
    /**
     * Add Buyer
     * @param btn
     */
    addRecordBuyer: function (btn) {
        var me = this, cnt = me.newtab,
            title = 'New Buyer ' + cnt,
            newtab = Ext.create('App.view.Buyers.Edit', {
                title: title,
                closable: true,
                iconCls: 'home',
                mode: 'edit'
            }),
            model = Ext.create('App.model.Buyers.mBuyers', {
                name: 'New Buyer ' + cnt
            });

//        newtab.down('#formbuyer').getForm().loadRecord(model);
        me.openNewTab(title, newtab);
        me.newtab++;
    },
    /**
     * Counter New Record
     */
    newtab: 1,
    /**
     * Menampilkan pada tab baru
     * @param titleS judul
     * @param xtypeS type X
     */
    openNewTab: function (titleS, xtypeS) {
        var me = this, mainPanel = this.getTabs(),
            title = titleS || '[Untitled ' + cnt + ']',
            newTab = mainPanel.items.findBy(function (tab) {
                return tab.title === title
            });

        if (!newTab) {
            newTab = mainPanel.add(xtypeS);
        }

        mainPanel.setActiveTab(newTab);
    },
    /**
     * Remove Record
     * @param btn
     */
    removeRecordBuyer: function (btn) {
        log(btn.text)
        var me = this, grid = me.getGrid(),
            store = grid.getStore(),
            selection = grid.getSelectionModel();

        Ext.each(selection.selected.items, function (record) {
            store.remove(record);
        });
        store.sync();

    }
});

