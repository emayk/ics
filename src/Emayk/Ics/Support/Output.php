<?php namespace Emayk\Ics\Support;
use \Response;
/**
* Output Class
*/
class Output implements OutputInterface
{
	protected $format = array('success' => '',
	                          'total' => 0,
	                          'results' => array()
	                          );

	public function toArray($obj)
	{
		/**

			TODO:
			- Bagaimana Jika $obj bukan Arrayable atau JsonAbble Object
		**/
		if (is_array($obj)) return $obj;
		return $obj->toArray();
	}

	public function toJson(array $data,$success = true)
	{
		 return Response::json(
               array('results' => $data,
                     'total' => count($data),
                     'success' => $success)
               );
	}

	public function toExtjs(array $data)
	{
		return $this->toJson($data);
	}

	public function msgError(array $data)
	{
		return $this->toJson($data,false);
	}

	public function msgSuccess(array $data)
	{
		return $this->toJson($data);
	}

	public function json($data)
	{
            if (!is_array($data))
            {
                $data = array($data);
            }

            return $this->toJson($data);

	}


	// public function setFormat($format)
	// {
	// 	return $this->format = $format;
	// }

	// public function getFormat($format)
	// {
	// 	return $this->format;
	// }

	public function toPusher(array $data,$ch = 'my_app',$event = 'my_event'){
		return \Icsmessage::send($data,$ch,$event);
	}

}