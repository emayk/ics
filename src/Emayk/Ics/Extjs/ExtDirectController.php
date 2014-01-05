<?php namespace Emayk\Ics\Extjs;
// use ExtDirect;
// use ExtDirectRequest;
// use ExtDirectResponse;
/**
 * Ext.Direct API controller
 *
 * @author J. Bruni
 */
class ExtDirectController
{
	/**
	 * @var ExtDirectRequest   Object to process HTTP request
	 */
	public $request;

	/**
	 * @var ExtDirectResponse   Object to store HTTP response
	 */
	public $response;

	/**
	 * @param string $api_classes   Name of the class or classes to be published to the Ext.Direct API
	 * @param boolean $autorun   If true, automatically run the controller
	 */
	public function __construct( $api_classes = null, $autorun = true )
	{
		if ( is_array( $api_classes ) )
			ExtDirect::$api_classes = $api_classes;

		elseif ( is_string( $api_classes ) )
			ExtDirect::$api_classes = array( $api_classes );

		$this->request   = new ExtDirectRequest();
		$this->response  = new ExtDirectResponse();

		if ( $autorun )
		{
			$this->run();
			$this->output();
			exit();
		}
	}


	/**
	 * @return string   JSON or JavaScript API declaration for the classes on "api_classes" configuration array
	 */
	public function get_api()
	{
		if ( isset( $_GET['javascript'] ) || ( ExtDirect::$default_api_output == 'javascript' ) )
			return ExtDirect::get_api_javascript();
		else
			return ExtDirect::get_api_json();
	}

	/**
	 * Process the request, execute the actions, and generate the response
	 */
	public function run()
	{
		if ( empty( $this->request->actions ) )
			$this->response->contents = $this->get_api();

		else
		{
			$response = array();
			foreach( $this->request->actions as $action )
				$response[] = $action->run();

			if ( count( $response ) > 1 )
				$this->response->contents = utf8_encode( json_encode( $response ) );
			else
				$this->response->contents = utf8_encode( json_encode( $response[0] ) );

			if ( $this->request->upload )
				$this->response->contents = '<html><body><textarea>' . preg_replace( '/&quot;/', '\\&quot;', $this->response->contents ) . '</textarea></body></html>';
		}

		if ( $this->request->upload )
			$this->response->headers[] = 'Content-Type: text/html';
		else
			$this->response->headers[] = 'Content-Type: text/javascript';
	}

	/**
	 * Output response contents
	 */
	public function output()
	{
		foreach( $this->response->headers as $header )
			header( $header );

		echo $this->response->contents;
	}
}
