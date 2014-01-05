#Tempat Source Code Extjs.direct

cara penggunaan :

## Server
require 'ExtDirect.php';

class Server
{
    public function date( $format )
    {
        return date( $format );
    }
}

ExtDirect::provide( 'Server' );

##########Client
	<script type="text/javascript" src="example.php?javascript"></script>
		<script type="text/javascript">
			Ext.onReady( function() { Ext.php.Server.date( 'Y-m-d', function(result){ alert( 'Server date is ' + result ); } ); } );
		</script>
	</head>