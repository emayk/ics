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
 **/

namespace Emayk\Ics\Exception;


use Emayk\Ics\Service\Notification\NotifierInterface;

class NotifiHandler implements NotifierInterface{
    protected $notifier;

    function __construct(NotifierInterface $notifier)
    {
        $this->notifier = $notifier;
    }

    public function handle(IcsException $exception)
    {
        $this->sendException($exception);
    }

    protected function sendException($e)
    {
        $this->notifier->notify('Error : '.
            get_class($e) . $e->getMessage()
        );
    }


}