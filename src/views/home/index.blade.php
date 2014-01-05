<html>
<head>
	<title>Development</title>
  <link rel="stylesheet" type="text/css" href="{{ Icsview::asset('extjs/resources/css/ext-all.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ Icsview::asset('assets/resources/css/app.css') }}">
    <script type="text/javascript"> var _session_Expire = -1 ; /*Menit*/ </script>
     <script type="text/javascript">
    var appjs = "{{ Icsview::asset()}}";
    var app_session_Expire = ((typeof _session_Expire !== 'undefined') && (_session_Expire > 0 ) ) ? _session_Expire  : 60 ;
    window.ics = {
    		root : "{{ Icsview::asset()}}",
            appname : "{{ Icsconfig::getAppName() }}",
            license : "{{ Icsconfig::getLicense() }}",
    		version : "{{ Icsconfig::getVersion() }}",
            api_url : '{{ route("icsservice") }}',
    		baseurl : '{{ route("icsroot") }}',
    		app_session_Expire : app_session_Expire,
    		token : '{{ csrf_token() }}',
    		user : {
			        id: "{{ (Auth::check()) ? Auth::user()->id : 0 }}",
			        as: "{{ (Auth::check()) ? Auth::user()->username : 'Anonymous' }}",
			        fn: "{{ (Auth::check()) ? Auth::user()->fullname : 'Anonymous' }}"
			    },
		    logged : {{ ( Auth::check()  ) ? 'true': 'false' ;}}
    };
    var assets = "{{ Icsview::asset()}}";
    var api_url = '{{ route("icsservice") }}';
    var urlroot = '{{ route("icsroot") }}';
    var baseurl = urlroot;

    var logged = {{ ( Auth::check()  ) ? 'true': 'false' ;}};
    var login_uid = '{{ (Auth::check()) ? Auth::user()->id  : null }}',
    login_as = "{{ (Auth::check() ) ? Auth::user()->username : 'Anonymous' }}";
    var token = '{{ csrf_token() }}';
    var local = true;
    var fromLocal = function(){ return local; };
    var license_to = "{{ Icsconfig::getLicense() }}";
    var user = {
        id: "{{ (Auth::check()) ? Auth::user()->id : 0 }}",
        as: "{{ (Auth::check()) ? Auth::user()->username : 'Anonymous' }}",
        fn: "{{ (Auth::check()) ? Auth::user()->fullname : 'Anonymous' }}",
    };
    window.stats = {};
    </script>

<!--    <script type="text/javascript" src="{{ Icsview::asset('extjs/ext-all.js') }} "></script>-->
    <script type="text/javascript" src="{{ Icsview::asset('extjs/ext-all-debug-w-comments.js') }} "></script>

    <script src="{{ Icsview::asset('translations/locale.js')}}"></script>
    <script type="text/javascript">
				var app_session_Expire = 30;
    </script>
</head>
    <script type="text/javascript" src="{{ Icsview::asset('app/home/app/function.js')}}"></script>
    <script type="text/javascript" src="{{ Icsview::asset('app/home/app.js')}}"></script>
<body>
</body>
</html>
