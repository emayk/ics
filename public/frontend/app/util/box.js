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
	statics : {
		error: function (text, title) {
			Ext.MessageBox.show({
				title: title || 'Error!',
				msg: text || 'Error Terjadi',
				icon: Ext.MessageBox.ERROR,
				buttons: Ext.MessageBox.OK
			});
		},
		info: function (text, title) {
			Ext.MessageBox.show({ title: title || 'Information', msg: text || 'Info Message', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
		},

		showConfirm: function(msg,title,Fn){
			/*@todo: menampilkan confirm*/
		},
		msgCt : null,

		alert : function (title, format) {

			function createBox (t, s) {
				return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
			}

			if(!App.util.box.msgCt) {
				App.util.box.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
			}

			var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append(App.util.box.msgCt, createBox(title, s), true);
			m.hide();
			m.slideIn('t').ghost("t", { delay: 3000, remove: true});
		},
		maxHeightwindow : function () {
			var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
			var height =  w.innerHeight || e.clientHeight || g.clientHeight;
			return height - 100;
			wWinMax()
		},
		maxWidthWindow: function wWinMax() {
			var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
			var width =  w.innerWidth || e.clientWidth || g.clientWidth;
			return width - 100;
		}

	}
});
