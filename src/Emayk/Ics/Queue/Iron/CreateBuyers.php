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


namespace Emayk\Ics\Support\Queue;


use Carbon\Carbon;
use Input;
use Log;
class CreateBuyers
{

	public function fire($job, $data)
	{
    Log::debug('im execute at'.date('d m Y h:i:s'));
		if (isset( $data[ 'total' ] )) {
			$total = $data[ 'total' ];
			$fake = \Faker\Factory::create();

			set_time_limit(9000);
			$legalities = \Emayk\Ics\Repo\Legality\Legality::lists('id');
			if (!count($legalities)) throw new \Exception( 'Daftar Legality tidak ada' );
			$status = \Emayk\Ics\Repo\Status\Status::lists('id');
			if (!count($status)) throw new \Exception( 'Status tidak ada' );


			$type = \Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers::lists('id');
			if (!count($type)) throw new \Exception( 'Type Tidak ada' );


			$type_products = \Emayk\Ics\Repo\Producttype\Producttype::lists('id');
			if (!count($type_products)) throw new \Exception( 'Type Product Tidak ada' );


			$uid = $data['uid'];
			$total = 1000;
			for ($i = 0; $i < $total; $i++) {
				$legality_id    = $legalities[ rand(0, count($legalities) - 1) ];
				$status_id      = $status[ rand(0, count($status) - 1) ];
				$type_id        = $type[ rand(0, count($type) - 1) ];
				$typeproduct_id = $type_products[ rand(0, count($type_products) - 1) ];


				Input::replace(array(
						'name'            => $fake->name,
						'codepos'         => '450' . rand(10, 90),
						'npwp'            => '0299-292-18002990-' . rand(100, 900),
						'fax'             => $fake->phoneNumber,
						'email'           => $fake->companyEmail,
						'plafon'          => ( rand(900, 92093) * $fake->randomDigitNotNull() ),
						'kredit'          => rand(1, 365),
						'address'         => $fake->streetAddress,
						'status_id'       => 1,
						'rt'              => rand(1, 15),
						'rw'              => rand(1, 15),
						"city_id"         => 12,
						"country_id"      => 1,
						"legality_id"     => $legality_id,
						"phone"           => $fake->phoneNumber,
						"province_id"     => 8,
						"status_id"       => $status_id,
						"tipe_id"         => $type_id,
						"typeprod_id"     => $typeproduct_id,
						'uuid'            => $fake->uuid,
						'createby_id'     => $uid,
						'lastupdateby_id' => $uid,
						'created_at'      => $fake->dateTimeBetween("-5 years"),
						'updated_at'      => $fake->dateTimeBetween("-11 month"),
						'codeinternal'    => $fake->uuid
					)
				);
				/*==========  Sesuaikan dengan Field di table  ==========*/
				\Emayk\Ics\Repo\Buyers\Buyers::create(Input::all());
				$memory = $this->niceUnits(memory_get_usage(true));
				\Log::debug("Memory Usage {$memory}", array('context' => 'Send TO Queue'.date('d m Y h:i:s') ));
			}
			$job->delete();
		}
	}

	protected function niceUnits($size)
	{
		$unit=array('b','kb','mb','gb','tb','pb');
		return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
	}

}

/** 1/8/14 **/ 