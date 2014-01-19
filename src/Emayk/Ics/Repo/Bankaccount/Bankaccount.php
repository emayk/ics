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
namespace Emayk\Ics\Repo\Bankaccount;

use Emayk\Ics\Repo\Bank\Bank;
use Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype;
use Emayk\Ics\Repo\Buyers\Buyers;
use Emayk\Ics\Repo\Suppliers\Suppliers;
use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Bankaccount\Bankaccount'
 *
 * @property integer $id
 * @property integer $bank_id
 * @property string $number
 * @property string $name
 * @property integer $owner_id
 * @property string $owner_type
 * @property integer $type_id
 * @property string $uuid
 * @property integer $createby_id
 * @property integer $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Emayk\Ics\Repo\Bank\Bank $bank
 * @property-read \Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype $type
 */
class Bankaccount extends Model
{
    /**
     * @var array
     */
    protected $guarded = array();
    /**
     * @var string
     */
    protected $table = 'master_account_bank';
    /**
     * @var array
     */
    public static $rules = array();
    /**
     * @var array
     */
    public $appends = array('bankname','banktype');

    /**
     * @return string
     */
    public function getBanknameAttribute()
    {
        return $this->attributes['bankname'] = $this->bank->name;
    }

    /**
     * @return string
     */
    public function getBanktypeAttribute()
    {
        return $this->attributes['banktype'] = $this->type->name;
    }

    /**
     * @return bool
     */
    public function getHasStocksAttribute(){
				return $this->attributes["hasStocks"] = true;
	 }
//

    /**
     *
     * Information Bank
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function bank()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Bank\Bank', 'bank_id');
    }

    /**
     *
     * Mendaapatkan Pemilik Account / Rekening Bank
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->morphTo();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function type()
    {
        return $this->belongsTo('Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype', 'type_id');
    }


    /**
     * @return \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate
     */
    protected static function  getSample()
    {
        return new \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate();
    }

    /**
     * @param int $count
     *
     * @return array
     */
    public static function  createSampleAccountBank($count = 10)
    {
        $sample = static::getSample()->getFake();
        $listBanksId = Bank::getIdsOrCreateBanks(true);
        $listtypeId = Bankaccounttype::getDefaultBankTypeIdsOrCreate(true);

        $buyerIds = Buyers::getRecordIdsOrCreate(30);
        $supplierIds = Suppliers::getRecordIdsOrCreate();

        $ids = array();
        for ($rec = 0; $rec < $count; $rec++) {
            $bankId = $sample->randomElement($listBanksId);
            $TypeId = $sample->randomElement($listtypeId);
            $buyerId = $sample->randomElement($buyerIds);
            $supplierId = $sample->randomElement($supplierIds);
            $parents = static::getSample()->getBank()->getListOwners($supplierId, $buyerId);
            $parentId = $parents['id'];
            $parentType = $parents['type'];

            $records = static::create(
                static::getSample()->getBank()->createAccountBank($bankId, $parentId, $parentType, $TypeId));

            $ids [] = $records->id;
        }
        return $ids;
//		$bankId,$parentId, $parentType, $typeId

    }

    /**
     * @param bool $resultsId
     * @param int $count
     * @return array|string
     */
    public static function createMassiveSampleRecord($resultsId = false, $count = 10)
    {
        $records = static::createSampleAccountBank($count);
        return ($resultsId) ? $records : "Generate Successfully with " . count($records) . " records";
    }

    /**
     * @param $query
     * @param $id
     * @return mixed
     */
    public function scopeSuppliers($query,$id)
    {
        return $query->whereOwnerType('\Emayk\Ics\Repo\Suppliers\Suppliers')->whereOwnerId($id);
    }

    /**
     * @param $query
     * @param $id
     * @return mixed
     */
    public function scopeBuyers($query,$id)
    {
        return $query->whereOwnerType('\Emayk\Ics\Repo\Buyers\Buyers')->whereOwnerId($id);
    }

    /**
     * Mendapatkan Supplier Account Bank
     * @param $id
     * @return mixed
     */
    public function getSupplier($id)
    {
        return $this->Suppliers($id);
    }

    /**
     * Mendapatkan Buyer Account Bank
     * @param $id
     * @return mixed
     */
    public function getBuyer($id)
    {
        return $this->Buyers($id);
    }

}
