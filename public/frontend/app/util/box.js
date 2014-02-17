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
		isdev : function(){
			return (ismodedev == 'true') ? true : false ;
		},
		info: function (text, title) {
			Ext.MessageBox.show({ title: title || 'Information', msg: text || 'Info Message', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
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
				title: 'Notification',
				spacing: 200,
				position: 'tr',
				manager: 'instructions',
				cls: 'ux-notification-light',
				iconCls: 'ux-notification-icon-information',
				html: 'Using document as manager. No title and closable: false. Entering from the t edge.',
//				html: msg || 'tidak ada isi',
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
		}

	}
});
