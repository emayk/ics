/**
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
 **/

Ext.define('App.util.box', {
	statics: {
		error: function (text, title) {
			Ext.MessageBox.show({
				title: title || 'Error!',
				msg: text || 'Error Terjadi',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
		},
		isdev: function () {
			return (ismodedev == 'true') ? true : false;
		},
		info: function (text, title) {
			Ext.MessageBox.show({ title: title || 'Information', msg: text || 'Info Message', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
		},
		confirm: function (title, msg, callbackfn) {
			Ext.MessageBox.confirm(title, msg, callbackfn);
		},
		showConfirm: function (msg, title, Fn) {
			/*@todo: menampilkan confirm*/
		},
		msgCt: null,

		alert: function (title, format) {

			function createBox(t, s) {
				return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
			}

			if (!App.util.box.msgCt) {
				App.util.box.msgCt = Ext.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
			}

			var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append(App.util.box.msgCt, createBox(title, s), true);
			m.hide();
			m.slideIn('t').ghost("t", { delay: 3000, remove: true});
		},
		maxHeightwindow: function () {
			var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
			var height = w.innerHeight || e.clientHeight || g.clientHeight;
			return height - 100;
			wWinMax()
		},
		maxWidthWindow: function wWinMax() {
			var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
			var width = w.innerWidth || e.clientWidth || g.clientWidth;
			return width - 100;
		},
		createSelectionModel: function (config) {
			var config = config || { checkOnly: true };
			var sm = Ext.create('Ext.selection.CheckboxModel', config);
			return sm;
		},
		getSelectionModel: function (grid) {
			var records = grid.getSelectionModel().getSelection();
			Ext.each(records, function (record, index, value) {
//				ids = ids + row.data.id + ',';
			});
		},
		deleteSingleRecordFromGrid: function (grid, rowIndex, colIndex) {
			var store = grid.getStore();
			Ext.MessageBox.confirm('Konfirmasi', 'Anda Yakin akan hapus Record ini ?', function (btn, text) {
				if (btn == 'yes') {
					var rec = store.getAt(rowIndex);
					rec.destroy({
						callback: function (records, ops, s) {
							if (ops.error) {
								/*Undefined artinya Success deleted*/
								App.util.box.error('Record ' + records.get('name') + ' gagal dihapus');
								store.load();
								return false;
							} else {
								App.util.box.info('Record ' + records.get('name') + ' berhasil dihapus');
								store.load();
							}
						}
					});
				}
			});
		},
		/**
		 * Menampilkan Component pada tab baru
		 * @param tab
		 * @param title
		 * @param fileview
		 * @param config
		 */
		openNewtab: function (tab, title, fileview, config) {
			var newtab = tab.items.findBy(function (t) {
				return t.title === title
			});

			if (!newtab) {
				var component = Ext.create(fileview, config);
				newtab = tab.add(component);
			}

			tab.setActiveTab(newtab);
		},
		createNoticeInfo: function (msg, title, closable) {
			Ext.create('widget.uxNotification', {
				title: 'Informasi ',
				autoCloseDelay: 3000,
				spacing: 200,
				position: 'tr',
				manager: 'instructions',
				cls: 'ux-notification-light',
				iconCls: 'ux-notification-icon-information',
				html: msg,
				slideBackDuration: 500,
				slideInAnimation: 'bounceOut',
				slideBackAnimation: 'easeIn'
			}).show();
			/*Ext.create('widget.uxNotification', {
			 position: 'tr',
			 cls: 'ux-notification-light',
			 closable: false,
			 title: '',
			 iconCls: 'ux-notification-icon-information',
			 html: 'Using document as manager. No title and closable: false. Entering from the t edge.'
			 }).show();*/
		},
		createNoticeInfo2: function (msg, title, closable) {
			var closable = closable || false,
				title = title || '';
//			Ext.create('widget.uxNotification', {
			Ext.create('App.util.Notification', {
				position: 'tr',
				useXAxis: true,
				cls: 'ux-notification-light',
				iconCls: 'ux-notification-icon-information',
				closable: closable,
				title: title,
				html: msg,
				slideInDuration: 800,
				slideBackDuration: 1500,
				autoCloseDelay: 4000,
				slideInAnimation: 'elasticIn',
				slideBackAnimation: 'elasticIn'
			}).show();
		},

		ajax: function (url, params, method, successfn, failurefn) {
			var method = method || 'GET';
			Ext.Ajax.request({
				url: url,
				params: params,
				method: method,
				success: successfn, failure: failurefn
			});
		},
		rendererDisplayField: function (v, field) {
			var formattedval = Ext.util.Format.number(v, '0,00');
			return formattedval;
		},
		dockedItemsForm: [
			{
				xtype: 'toolbar',
				dock: 'bottom',

				items: [
					{
						text: 'Reset', iconCls: 'reset',
						handler: function (btn) {
							var form = btn.up('form').getForm();
							form.reset();
						}
					},
					'->',
					{
						text: 'Simpan', iconCls: 'save',
						action: 'save'
					}
				]

			}
		],
		print: function (htmlElement, printPreview, closeAutomaticallyAfterPrint) {
			/*test*/
			var me = this;
			if (printPreview) {
				me.createWindowPrintPreview(htmlElement);
			} else {
				var win = window.open('', 'Print Panel');
				var outerHtml = htmlElement.outerHTML;
				if (!outerHtml) {
					outerHtml = htmlElement;
				}

				var windoc = win.document;
				if (!windoc){
					me.error('Sepertinya Document terkena Block Pop-Up Browser yang digunakan' +
						'<br/>Silahkan Allow Website ini');
					return false;
				}

				win.document.open();
				win.document.write(outerHtml);
				win.document.close();

				win.print();
				if (closeAutomaticallyAfterPrint) {
					if (Ext.isIE) {
						window.close();
					} else {
						win.close();
					}
				}
			}
		},
		/**
		 * Setelah Request Print Document,
		 * Panel dari tab yang diberikan
		 * akan diremove.
		 * @param tab
		 * @param key
		 * @param id
		 * @param number
		 * @param preview
		 */
		printDocumentAndRemoveTabFromPanel: function (tab, key, id, number, preview) {

		},
		/**
		 * Request Print Document
		 * @param key
		 * @param id
		 * @param number
		 * @param fnSuccess
		 * @param fnFailure
		 */
		printDocument: function (key, id, number, preview) {
			var me = this;
			Ext.Ajax.request({
				method: 'POST',
				params: {
					trxid: id,
					trxnumber: number,
					trxkey: key,
					preview: preview,
					_token: gettoken(),
					uid: user_login_id()
				},
				url: getApiUrl() + '/print/doc',
				success: function (res, opts) {
					var html = res.responseText;
					if (preview) {
						me.createWindowPrintPreview(html, key, id, number);
					} else {
						me.print(html, false, true);
						me.msgSuccessPrintDocument();
					}
				},
				failure: function (res, opts) {
					me.msgFailurePrintDocument();
				}
			});
		},

		msgSuccessPrintDocument: function () {
			this.info('Print Document Berhasil dilakukan');
		},
		msgFailurePrintDocument: function () {
			this.error('Print Document Gagal dilakukan');
		},
		/**
		 * Buat Window Print Preview
		 * @param html
		 */
		createWindowPrintPreview: function (html, key, id, number) {
			var me = this;
			var win;
			if (!win) {
				win = Ext.create('Ext.window.Window', {
					layout: { type: 'vbox', align: 'stretch'},
					width: me.maxWidthWindow() - 100,
					height: me.maxHeightwindow() - 100,
					items: [
						{
							autoScroll: true,
							xtype: 'panel',
							id: 'panelpreview',
							flex: .5,
							html: html
						}
					],
					dockedItems: [
						{xtype: 'toolbar',
							dock: 'bottom',
							items: [
								'->',
								{ text: 'Print', iconCls: 'print',
									handler: function (btn) {
										var preview = false;
										me.printDocument(key, id, number, preview);
										btn.up('window').close();
									}},
								{
									text: 'Keluar', iconCls: 'close',
									handler: function (btn) {
										btn.up('window').close();
									}
								}
							]}
					]

				});
				win.show();
			}
		}
		/*End Statics*/
	}
});
