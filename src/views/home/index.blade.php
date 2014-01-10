<html>
<head>
	<title>Development {{ time() }} </title>
	<link rel="stylesheet" type="text/css" href="{{ Icsview::extjsasset('resources/css/ext-all.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ Icsview::asset('frontend/css/app.css') }}">
	<script type="text/javascript"> var _session_Expire = -1;
		/*Menit*/ </script>
	<script type="text/javascript">
		var appjs = "{{ Icsview::asset()}}";
		var extjsbase = "{{Icsview::extjsasset()}}";
		var app_session_Expire = ((typeof _session_Expire !== 'undefined') && (_session_Expire > 0 ) ) ? _session_Expire : 60;
		var ics = {
			root: "{{ Icsview::linkBaseUrl()}}",
			appjs: "{{ Icsview::asset()}}",
			appname: "{{ Icsconfig::getAppName() }}",
			license: "{{ Icsconfig::getLicense() }}",
			version: "{{ Icsconfig::getVersion() }}",
			extjsbase: '{{Icsview::extjsasset()}}',
			api_url: '{{ route("icsservice") }}',
			baseurl: '{{ Icsview::routeBase() }}',
			app_session_Expire: app_session_Expire,
			token: '{{ csrf_token() }}',
			user: {
				id: "{{ (Auth::check()) ? Auth::user()->id : 0 }}",
				as: "{{ (Auth::check()) ? Auth::user()->username : 'Anonymous' }}",
				fn: "{{ (Auth::check()) ? Auth::user()->fullname : 'Anonymous' }}"
			},
			logged: "{{( Auth :: check() ) ? 'true' : 'false'; }}"
		};
		var assets = "{{ Icsview::asset()}}";
		var api_url = '{{ route("icsservice") }}';
		var urlroot = '{{ route("icsroot") }}';
		var baseurl = urlroot;

		var logged = '{{( Auth :: check() ) ? true : false; }}';
		var login_uid = '{{ (Auth::check()) ? Auth::user()->id  : null }}',
			login_as = "{{ (Auth::check() ) ? Auth::user()->username : 'Anonymous' }}";
		var token = '{{ csrf_token() }}';
		var local = true;
		var fromLocal = function () {
			return local;
		};
		var license_to = "{{ Icsconfig::getLicense() }}";
		var user = {
			id: "{{ (Auth::check()) ? Auth::user()->id : 0 }}",
			as: "{{ (Auth::check()) ? Auth::user()->username : 'Anonymous' }}",
			fn: "{{ (Auth::check()) ? Auth::user()->fullname : 'Anonymous' }}",
		};
		window.stats = {};
	</script>

	<!--    <script type="text/javascript" src="{{ Icsview::asset('extjs/ext-all.js') }} "></script>-->
	<script type="text/javascript" src="{{ Icsview::extjsasset('ext-all-dev.js') }} "></script>

	<script src="{{ Icsview::asset('translations/locale.js')}}"></script>
	<script type="text/javascript">var app_session_Expire = 30;</script>

</head>
<script type="text/javascript" src="{{Icsview::asset('frontend/app/function.js')}}"></script>
<script type="text/javascript" src="{{ Icsview::asset('frontend/app.js')}}"></script>
<body>
</body>
</html>
