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
namespace Emayk\Ics\Repo\Productcategory;

use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Productcategory\Productcategory'
 *
 * @property integer $id
 * @property string $name
 * @property string $info
 * @property integer $parent_id
 * @property string $parent_type
 * @property string $kodeinternal
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Emayk\Ics\Repo\Products\Products[] $products
 */
class Productcategory extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = array();
	/**
	 * @var string
	 */
	protected $table = 'master_category_product';
    protected $hidden = array('parent_type');
	/**
	 * @var array
	 */
	public static $rules = array();


	/**
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function products()
	{
		return $this->hasMany('\Emayk\Ics\Repo\Products\Products', 'cat_id');
	}


	/**
	 * @return \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate
	 */
	protected static function getFake()
	{
		return new \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate();
	}

	/**
	 * @return array
	 */
	public static function getIdsOrCreateSampelData()
	{
		$record     = static::getFake()->getProduct();
		$categories = array();
		$total1     = rand(3,5);
		$total2     = rand(3, 5);
		$total3     = rand(3, 5);
		$total4     = rand(3, 5);

		for ($level1 = 1; $level1 < $total1; $level1++) {
			$newrecord      = static::createRecord($record->createRecordCategory("Parent {$level1}", 0));
			$parentId       = $newrecord->id;
			$categories [ ] = $newrecord->id;
			for ($level2 = 1; $level2 <= $total2; $level2++) {
				$newrecord      = static::createRecord(
					$record->createRecordCategory("Category {$level1}-{$level2}", $parentId)
				);
				$parentId2      = $newrecord->id;
				$categories [ ] = $newrecord->id;
				for ($level3 = 1; $level3 <= $total3; $level3++) {
					$newrecord     = static::createRecord(
						$record->createRecordCategory("Category {$level1}-{$level2}-{$level3}", $parentId2)
					);
					$parentId3     = $newrecord->id;
					$categories[ ] = $newrecord->id;
					for ($level4 = 1; $level4 <= $total4; $level4++) {
						$newrecord     = static::createRecord(
							$record->createRecordCategory("Category {$level1}-{$level2}-{$level3}-{$level4}", $parentId3)
						);
						$parentId4     = $newrecord->id;
						$categories[ ] = $newrecord->id;
					}
				}
			}
		}

		return $categories;
	}

	/**
	 * @param array $record
	 *
	 * @return Model|static
	 */
	protected static function createRecord(array $record)
	{
		return static::create($record);
	}
}
