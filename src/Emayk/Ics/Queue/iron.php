<?php


namespace Emayk\Ics\Queue;

use Log;
class iron {

	 public function fire($job, $data)
	 {
			Log::info('Log message', array('context' => $data));

			$job->delete();
	 }


} 