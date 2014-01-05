<html>
<head>
	<title>Application :: {{ Config::get('App.debug') ? 'Development '.time() .' / Login : '.$logged : 'Program Application ' }}</title>
    <!-- <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootstrap.min.css') }}"> -->
    <link rel="stylesheet" type="text/css" href="{{ asset('extjs/resources/css/ext-all.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('/assets/resources/css/app.css') }}">
    <!-- <link rel="stylesheet" type="text/css" href="{{ asset('extjs/resources/ext-theme-neptune/ext-theme-neptune-all-debug.css') }}"> -->
    <!-- <script type="text/javascript" src="{{ asset('extjs/ext-all-debug.js') }} "></script> <script type="text/javascript" src="{{ asset('extjs/ext-all-dev.js') }} "></script> -->
    <script type="text/javascript"> var _session_Expire = -1 ; /*Menit*/ </script>
</head>
    <script type="text/javascript" src="{{ asset('extjs/ext-all.js') }} "></script>
<!--
    <script type="text/javascript" src="{{ asset('extjs/ext-all-debug-w-comments.js') }} "></script>
 -->
    <script src="{{ asset('translations/locale.js')}}"></script>

    <!-- App Files -->
    <script type="text/javascript">
    var logged = {{ ( Auth::check()  ) ? 'true': 'false' ;}};
    var login_uid = '{{ (Auth::check()) ? Auth::user()->id  : null }}',
    login_as = "{{ (Auth::check() ) ? Auth::user()->username : 'Anonymous' }}";
    var token = '{{ csrf_token() }}';
    var api_url = '{{ route("services") }}';
    var license_to = 'CV MIB Bandung';
    var user = {
        id: "{{ (Auth::check()) ? Auth::user()->id : 0 }}",
        as: "{{ (Auth::check()) ? Auth::user()->username : 'Anonymous' }}",
        fn: "{{ (Auth::check()) ? Auth::user()->fullname : 'Anonymous' }}",
    };
    window.stats = {};
    var baseurl = "{{url()}}";
    </script>

    <script type="text/javascript" src="{{ asset('app/home/app/function.js')}}"></script>
    <script type="text/javascript" src="{{ asset('app/home/app.js')}}"></script>
<body>
</body>
</html>
