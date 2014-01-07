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
		* Model Structure Eloquent
		*
		**/

	 /**
		*
		* Register Command
		*
		**/
	 use Emayk\Ics\Commands;

	 $this->app['ics.about'] = $this->app->share (function ($app) {
			return new  Commands\AboutCommand();
	 });

	 /*==========  Repo Command  ==========*/
	 $this->app['ics.repo.create'] = $this->app->share (function ($app) {
			return new Commands\CreateRepoCommand();
	 });

	 $this->app['ics.migration.create'] = $this->app->share (function ($app) {
			return new Commands\CreateMigrationCommand();
	 });

	 $this->app['ics.create.controller'] = $this->app->share (function ($app) {
			return new Commands\CreateControllerCommand();
	 });

	 $this->commands (
			'ics.about',
			'ics.repo.create',
			'ics.migration.create',
			'ics.create.controller'
	 );