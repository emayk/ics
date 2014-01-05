<?php
/**
 * Created by PhpStorm.
 * User: emayk
 * Date: 12/28/13
 * Time: 12:20 PM
 */

namespace Emayk\Ics\Service\Notification;


use Illuminate\Support\Facades\Log;

class Notify implements NotifierInterface{
    public function notify($msg)
    {
        return Log::error($msg);
    }
}
