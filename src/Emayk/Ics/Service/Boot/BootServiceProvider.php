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

//$app = $this->app;
//$app->error(function(\Emayk\Ics\Exception\IcsException $e) use ($app) {
//    $app['ics.exception']->handler($e);
//});


Log::listen(function ($level, $message, $context) {

	if ($level == '404') {
		$context = $message;
		\DB::table('sys_log')->insert(
			array(
				'message'     => "[{$level}] {$message}",
				'description' => "{$context}"
			)
		);
	}

	if ($level == 'info') {

		if (!$context == 'test')
		{
		\DB::table('sys_user_history')->insert(
			array(
				'message'     => "[{$level}] {$message}",
				'parent_id'   => 1,
				'parent_type' => '\Emayk\Ics\Repo\Users\Users',
				'info'        => "{$level}",
				'uuid'        => uniqid('user_'),
				'created_at'  => \Carbon\Carbon::create(),
				'updated_at'  => \Carbon\Carbon::create()
			)
		);
		}

	}

});




