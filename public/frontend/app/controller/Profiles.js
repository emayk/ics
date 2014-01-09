Ext.define('App.controller.Profiles',{
	extend: 'Ext.app.Controller',
	views: [
	// change password
	'App.form.profile.ChangePassword',
	'App.view.profile.tabChangePassword'
	],
	stores: [],
	models:[],
	init: function(){
		log('Login Ctl Loaded ----');
		// this.control({
		// 'frmLogin' : {

		// }
		// });
	},
});
