<?php
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
?>

<html>
<head>
	<title>Development {{ time() }} </title>
	<link rel="stylesheet" type="text/css" href="{{ Icsview::extjsasset('resources/css/'.$selectedtheme.'.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ Icsview::extjsasset('ux/css/TabScrollerMenu.css') }}">
	<link rel="stylesheet" type="text/css"
	      href="{{ Icsview::asset('frontend/plugins/filterbar/resources/css/uxs.css') }}">
	<link rel="stylesheet" type="text/css"
	      href="{{ Icsview::asset('frontend/plugins/filterbar/resources/css/overrides.css') }}">
	<link rel="stylesheet" type="text/css"
	      href="{{ Icsview::asset('frontend/plugins/filterbar/resources/css/app.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ Icsview::asset('frontend/css/app.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ Icsview::asset('frontend/css/notification.css') }}">

</head>
<body>

<div id="bg">
	<img src="{{ Icsview::asset('frontend/plugins/filterbar/resources/images/logologin.png') }}" id="bg" alt="">
</div>
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
	var isdev = true;
	var modedev = true;
	var user = {
		id: "{{ (Auth::check()) ? Auth::user()->id : 0 }}",
		as: "{{ (Auth::check()) ? Auth::user()->username : 'Anonymous' }}",
		fn: "{{ (Auth::check()) ? Auth::user()->fullname : 'Anonymous' }}"
	};
</script>

<!--	<script type="text/javascript" src="{{ Icsview::extjsasset('ext-all-debug-w-comments.js') }} "></script>-->
<!--<script type="text/javascript" src="{{ Icsview::extjsasset('bootstrap.js') }} "></script>-->
<!--	<script type="text/javascript" src="{{ Icsview::extjsasset('ext-all.js') }} "></script>-->
	<script type="text/javascript" src="{{ Icsview::extjsasset('ext-all-dev.js') }} "></script>

<script src="{{ Icsview::asset('translations/locale.js')}}"></script>
<script type="text/javascript">var app_session_Expire = 30;</script>


<script type="text/javascript"
        src="{{Icsview::asset('frontend/plugins/filterbar/ux/form/field/ClearButton.js')}}"></script>
<script type="text/javascript"
        src="{{Icsview::asset('frontend/plugins/filterbar/ux/form/field/OperatorButton.js')}}"></script>
<script type="text/javascript"
        src="{{Icsview::asset('frontend/plugins/filterbar/ux/grid/column/ActionPro.js')}}"></script>
<script type="text/javascript" src="{{Icsview::asset('frontend/plugins/filterbar/ux/grid/FilterBar.js')}}"></script>
<script type="text/javascript" src="{{Icsview::asset('frontend/plugins/filterbar/ux/grid/AutoResizer.js')}}"></script>

<script type="text/javascript" src="{{Icsview::asset('frontend/app/function.js')}}"></script>
<script type="text/javascript" src="{{Icsview::asset('frontend/config.js')}}"></script>
<script type="text/javascript" src="{{ Icsview::asset('frontend/app-dev.js')}}"></script>


</body>
</html>
