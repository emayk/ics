<?php


namespace Emayk\Ics\Queue;

use Log;

/**
 * Class iron
 * @package Emayk\Ics\Queue
 */
class Iron
{

    /**
     * @param $job
     * @param $data
     */
    public function fire($job, $data)
    {
        Log::info('Log message', array('context' => $data));

        $job->delete();
    }


} 