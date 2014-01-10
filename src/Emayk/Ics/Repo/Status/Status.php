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
	 namespace Emayk\Ics\Repo\Status;

	 use Faker\Factory;
	 use Illuminate\Database\Eloquent\Model;

	 /**
		* An Eloquent Model: 'Emayk\Ics\Repo\Status\Status'
		*
		* @property integer        $id
		* @property string         $name
		* @property string         $info
		* @property string         $uuid
		* @property integer        $createby_id
		* @property integer        $lastupdateby_id
		* @property \Carbon\Carbon $created_at
		* @property \Carbon\Carbon $updated_at
		*/
	 class Status extends Model
	 {
			protected $guarded = array ();
			protected $table = 'master_status';
			public static $rules = array ();

			public function users ()
			{
				 return $this->hasMany ('\Emayk\Ics\Repo\Users\Users', 'status_id');
			}

		 public static function createDataStatus($resultsIds = false)
		 {
			 $statuses = ['Active','Non Active'];
			 foreach ($statuses as $status)
			 {

				 $st = self::create(
					 array_merge(
					 array('info' => "Information {$status}",'name' => $status),static::othersAttributesArray()
				 ) );
				 $stIds [] = $st->id;
			 }

			 return ($resultsIds) ? $stIds : "Generate Status with ". count($stIds). " records";

		 }

		 public static  function othersAttributesArray($uuid = null,$createbyId = 1,$lastUpdateById =1)
		 {
			 $fake = Factory::create();
			 if (null == $uuid) {
				 $uuid = $fake->uuid;
			 }
			 return array(
				 'uuid'            => $uuid,
				 'createby_id'     => $createbyId,
				 'lastupdateby_id' => $lastUpdateById,
				 'created_at'      => $fake->dateTimeBetween(),
				 'updated_at'      => $fake->dateTimeBetween(),
			 );
		 }

	 }
