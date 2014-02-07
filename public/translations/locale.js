var lang = localStorage ? (localStorage.getItem('user-lang') || 'id') : 'en';
var _session_Expire = _session_Expire || {};
var app_session_Expire = ((typeof _session_Expire !== 'undefined') && (_session_Expire > 0 ) ) ? _session_Expire  : 60 ;
var file = window.ics.appjs +'/translations/' + lang + '.js';
var a = window.ics.extjsbase;
//var extjsFile = extjsbase +'/locale/ext-lang-' + lang + '.js';
var extjsFile = extjsbase +'/locale/ext-lang-id.js';
document.write('<script type="text/javascript" src="' + file + '"></script>');
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');