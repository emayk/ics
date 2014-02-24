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


namespace Emayk\Ics\Repo\Factory\Supplier;

use Emayk\Ics\Models\BaseModel;
use Emayk\Ics\Support\Dummy\Faker\AbstractGenerate;

class Eloquent extends BaseModel
{

	/**
	 * An Eloquent Model: 'Emayk\Ics\Repo\Factory\Supplier'
	 *
	 * @property integer                                                                           $id
	 * @property string                                                                            $name
	 * @property string                                                                            $codepos
	 * @property string                                                                            $npwp
	 * @property string                                                                            $fax
	 * @property string                                                                            $email
	 * @property float                                                                             $plafon
	 * @property integer                                                                           $kredit
	 * @property \Carbon\Carbon                                                                    $deleted_at
	 * @property string                                                                            $address
	 * @property string                                                                            $rt
	 * @property string                                                                            $rw
	 * @property string                                                                            $phone
	 * @property integer                                                                           $status_id
	 * @property integer                                                                           $tipe_id
	 * @property integer                                                                           $legality_id
	 * @property integer                                                                           $typeprod_id
	 * @property integer                                                                           $country_id
	 * @property integer                                                                           $province_id
	 * @property integer                                                                           $city_id
	 * @property string                                                                            $uuid
	 * @property integer                                                                           $createby_id
	 * @property integer                                                                           $lastupdateby_id
	 * @property string                                                                            $codeinternal
	 * @property \Carbon\Carbon                                                                    $created_at
	 * @property \Carbon\Carbon                                                                    $updated_at
	 * @property string                                                                            $note
	 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Products\Products[] $products
	 * @property-read \Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers                      $type
	 */

	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_suppliers';
	/**
	 * @var array
	 */
	public static $rules = array();

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function products()
	{
		return $this->belongsToMany('\Emayk\Ics\Repo\Products\Products', 'master_product_suppliers', 'master_supplier_id', 'master_product_id');
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function type()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Typesuppliersbuyers\Typesuppliersbuyers', 'tipe_id');
	}

	/**
	 * @return AbstractGenerate
	 */
	public static function getFake()
	{
		$sampledata = new SampleData();
		return $sampledata->getFake();
	}

	/**
	 * @param bool $resultsIds
	 * @param int  $count
	 *
	 * @return array|string
	 */
	public static function generateMassiveDummy($resultsIds = false, $count = 100)
	{
		return SampleData::generateMassiveDummy($resultsIds, $count);
	}

	/**
	 * @param bool $resultIds
	 * @param int  $count
	 *
	 * @return array|string
	 */
	public static function generateRecordsFromDummy($resultIds = false, $count = 100)
	{
		return static::generateMassiveDummy($resultIds, $count);
	}

	/**
	 * @param int $count
	 *
	 * @return array|string
	 */
	public static function getRecordIdsOrCreate($count = 10)
	{
		$recordIds = static::getListIds();
		if (!count($recordIds)) {
			/*Create*/
			$recordIds = static::generateMassiveDummy(true, $count);
		};
		return $recordIds;
	}


	/**
	 * @return mixed
	 */
	protected static function getListIds()
	{
		return static::lists('id');
	}

	public function accountbank()
	{
		return $this->morphMany('\Emayk\Ics\Repo\Bankaccount\Bankaccount', 'owner');
	}

	public function offices()
	{
//		return $this->morphMany('','parent_id','parent_type');
	}

	public function scopeName($q,$name)
	{
		return $q->whereName($name);
	}

	public function getCredit()
	{
		return $this->kredit;
	}

}
 