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


namespace Emayk\Ics\Support\Log\Clockwork;

use Clockwork;

class Base
{
    protected $clockwork;
    protected $event;
    protected $description;

    function __construct($event = 'icsevent', $decription = 'an event ics')
    {
        $this->clockwork = new Clockwork\Clockwork();
        $this->description = $decription;
        $this->event = $event;
    }

    /**
     * @return \Clockwork\Clockwork
     */
    public function getClockwork()
    {
        return $this->clockwork;
    }

    /**
     * @param mixed $event
     */
    public function setEvent($event)
    {
        $this->event = $event;
    }

    /**
     * @return mixed
     */
    public function getEvent()
    {
        return $this->event;
    }

    public function start()
    {
        return $this->clockwork->startEvent($this->$event, 'an Event');
    }

    public function end()
    {
        return $this->clockwork->endEvent($this->event);
    }

    public function example()
    {

        Clockwork::startEvent('bank', 'Retrieve Bank'); // event called 'Event description.' appears in Clockwork timeline tab

        Clockwork::info('Message text.'); // 'Message text.' appears in Clockwork log tab
        Log::debug('Message text 22222.'); // 'Message text.' appears in Clockwork log tab as well as application log file

        Clockwork::info(array('hello' => 'world')); // logs json representation of the array
        Clockwork::endEvent('bank');
    }

}

 