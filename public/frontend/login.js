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

var fromLocal = function () {
	return true;
//    return ((window.location.protocol + '//' + window.location.host + '/') === 'http://localhost:9090');
};


/**
 *
 * Application Core
 *
 **/

Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

controllers = [
/**
 * Core
 */
	'cLogin',
	'TranslationManager',
	'cMenu'
];

Ext.application({
	requires: [
		// 'App.util.MD5',
		// 'App.view.vActionBtn',
		'App.util.Alert',
		'App.util.box',
		'App.view.Viewport',
		'Ext.container.Viewport',
		'App.util.Util',
		'App.util.dummy',
		'App.util.Form'
	],
	name: 'App',
	appFolder: appjs + '/frontend/app',
	controllers: controllers,
	autoCreateViewport: false,
	/*Display Splash Screen*/
	display_splash: false,
	splashscreen: null,
	init: function () {
		Ext.tip.QuickTipManager.init();
//		if (this.display_splash) {
//			this.app_init();
//		}
	},
	app_init: function () {
//		this.splashscreen = Ext.getBody().mask('Loading application ' + App.config.APP_NAME, 'splashscreen');
//		this.splashscreen.addCls('splashscreen');
//		Ext.DomHelper.insertFirst(
//			Ext.query('.x-mask-msg')[0], {cls: 'x-splash-icon'}
//		);
	},

	/**
	 * Saat Launch Application
	 */
	app_launch: function () {

	},
	/**
	 * Launch Application
	 */
	launch: function () {
		Ext.widget('login');
	}
});



