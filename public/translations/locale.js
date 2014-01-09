var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
var app_session_Expire = ((typeof _session_Expire !== 'undefined') && (_session_Expire > 0 ) ) ? _session_Expire  : 60 ;
var file = window.ics.appjs +'/translations/' + lang + '.js';
var a = window.ics.extjsbase;
var extjsFile = extjsbase +'/locale/ext-lang-' + lang + '.js';

console.log(extjsFile);
console.log(file);
document.write('<script type="text/javascript" src="' + file + '"></script>');
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');