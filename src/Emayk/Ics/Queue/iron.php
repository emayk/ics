<?php


namespace Emayk\Ics\Queue;

use Log;
class iron {

	 public function fire($job, $data)
	 {

//			\DB::table('iron')->insert(
//				 array('data'=> $data['message'] )
//			);

			Log::info('Log message', array('context' => $data));

			$job->delete();
	 }


} 