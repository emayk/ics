<html>
<head>
	<title>Development</title>

	<link rel="stylesheet" type="text/css" href="{{ Icsview::asset('assets/resources/css/app.css') }}">
 <script type="text/javascript" src="{{ Icsview::asset('extjs/ext-all-dev.js') }} "></script>


<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>Ext.Direct Example</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="{{ Icsview::asset('extjs/resources/css/ext-all.css') }}">
<!-- 		// <script type="text/javascript" src="http://extjs.cachefly.net/ext-3.2.1/adapter/ext/ext-base.js"></script>
		// <script type="text/javascript" src="http://extjs.cachefly.net/ext-3.2.1/ext-all.js"></script> -->
		<script type="text/javascript" src="/ics/extjsdirect.php?javascript"></script>
		<script type="text/javascript">
			Ext.onReady( function() {
				Ext.php.Server.date( 'Y-m-d', function(result){ alert( 'Server date is ' + result ); } );
			} );
		</script>
	</head>
	<body>
		<h1>Ext.Direct Example</h1>



	</body>
</html>