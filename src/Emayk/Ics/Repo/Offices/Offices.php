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
namespace Emayk\Ics\Repo\Offices;

use Illuminate\Database\Eloquent\Model;

/**
 * An Eloquent Model: 'Emayk\Ics\Repo\Offices\Offices'
 *
 * @property integer        $id
 * @property string         $address
 * @property integer        $country_id
 * @property integer        $province_id
 * @property integer        $city_id
 * @property string         $postcode
 * @property integer        $type
 * @property integer        $parent_id
 * @property string         $parent_type
 * @property string         $codeinternal
 * @property boolean        $mainoffice
 * @property string         $uuid
 * @property integer        $createby_id
 * @property integer        $lastupdateby_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Offices extends Model
{
	/**
	 * @var array
	 */
	protected $guarded = [];
	/**
	 * @var string
	 */
	protected $table = 'master_offices';
	/**
	 * @var array
	 */
	public static $rules = [];
	/**
	 * @var array
	 */
	public $hidden = ['parent_type', 'uuid', 'lastupdateby_id', 'createby_id'];
	/**
	 * @var array
	 */
	public $appends = ['createby', 'updateby', 'typename', 'hasmain', 'countryname', 'provincename', 'cityname', 'parenttype'];

	/**
	 * @return mixed
	 */
	public function getCreatebyAttribute()
	{
		return $this->attributes[ 'createby' ] = $this->user('createby_id')->pluck('username');
	}


	/**
	 * @return string
	 */
	public function getParenttypeAttribute()
	{
		return $this->attributes[ 'parenttype' ] = $this->getOwnerTypeInverse( $this->attributes[ 'parent_type' ] );
	}

	/**
	 * @return mixed
	 */
	public function getUpdatebyAttribute()
	{
		return $this->attributes[ 'updateby' ] = $this->user('lastupdateby_id')->pluck('username');
	}

	/**
	 * @param $field
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function user($field)
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Users\Users', $field);
	}

	/**
	 * @return mixed
	 */
	public function getCitynameAttribute()
	{
		return $this->attributes[ 'cityname' ] = $this->city()->pluck('name');
	}

	/**
	 * @return mixed
	 */
	public function getProvincenameAttribute()
	{
		return $this->attributes[ 'provincename' ] = $this->province()->pluck('name');
	}

	/**
	 * @return mixed
	 */
	public function getCountrynameAttribute()
	{
		return $this->attributes[ 'countryname' ] = $this->country()->pluck('name');
	}


	/**
	 * Attribute Typename
	 *
	 * @return string
	 */
	public function getTypenameAttribute()
	{
		return $this->attributes[ 'typename' ] = ( $this->type == 1 ) ? 'Main' : 'Branch';
	}

	/**
	 * Menentukan Apakah Record sudah memiliki Kantor Utama
	 *
	 * @return bool
	 */
	public function hasMain()
	{
		return $this->OfParent($this->parent_type, $this->parent_id)->where('mainoffice', 1)->count() > 0;
	}

	/**
	 * Menentukan Apakah Record sudah memiliki Kantor Utama
	 *
	 * @return bool
	 */
	public function getHasmainAttribute()
	{
		return $this->attributes[ 'hasmain' ] = $this->hasMain();
	}

	/**
	 * Mendapatkan record Negara
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function country()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Locations\Locations', 'country_id');
	}

	/**
	 * Mendapatkan record City
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function city()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Locations\Locations', 'city_id');
	}


	/**
	 * Mendapatkan Record Province
	 *
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 */
	public function province()
	{
		return $this->belongsTo('\Emayk\Ics\Repo\Locations\Locations', 'province_id');
	}

	/**
	 * Mendapatkan Semua Office Contact
	 *
	 * @param $q
	 * @param $contactid
	 *
	 * @return mixed
	 */
	public function scopeContacts($q, $contactid)
	{
		return $q->OfParent('\Emayk\Ics\Repo\Suppliers\Suppliers', $contactid);
	}

	/**
	 * Mendapatkan Semua Office Supplier
	 *
	 * @param $q
	 * @param $supplierid
	 *
	 * @return mixed
	 */
	public function scopeSuppliers($q, $supplierid)
	{
		return $q->OfParent('\Emayk\Ics\Repo\Suppliers\Suppliers', $supplierid);
	}

	/**
	 * Mendapatkan Semua Office Buyer
	 *
	 * @param $q
	 * @param $buyerid
	 *
	 * @return mixed
	 */
	public function scopeBuyers($q, $buyerid)
	{
		return $q->OfParent('\Emayk\Ics\Repo\Buyers\Buyers', $buyerid);
	}

	/**
	 * Mendapatkan Semua Parent berdasarkan $parentType dan $idParent yang diberikan
	 *
	 * @param $q
	 * @param $parentType
	 * @param $idparent
	 *
	 * @return mixed
	 */
	public function scopeOfParent($q, $parentType, $idparent)
	{
		return $q->whereParentType($parentType)->whereParentId($idparent);
	}

	/**
	 * @param $type
	 *
	 * @return string
	 */
	public function getOwnerTypeInverse($type)
	{
		$allowOwner = [
			'\Emayk\Ics\Repo\Buyers\Buyers',
			'\Emayk\Ics\Repo\Suppliers\Suppliers',
			'\Emayk\Ics\Repo\Contactperson\Contactperson'

		];
		if (!in_array($type, $allowOwner))
			$type = '\Emayk\Ics\Repo\Suppliers\Suppliers';

		switch ($type) {
			case '\Emayk\Ics\Repo\Buyers\Buyers' :
				$owner = 'buyer';
				break;
			case '\Emayk\Ics\Repo\Suppliers\Suppliers' :
				$owner = 'supplier';
				break;
			case '\Emayk\Ics\Repo\Contactperson\Contactperson' :
				$owner = 'contact';
				break;
		};
		return $owner;
	}

	/**
	 * @param $owner
	 *
	 * @return string
	 */
	public function getOwnerType($owner)
	{
		$allowOwner = ['supplier', 'buyer', 'contact'];
		if (!in_array($owner, $allowOwner)) $owner = 'supplier';
		switch ($owner) {
			case 'buyer' :
				$type = '\Emayk\Ics\Repo\Buyers\Buyers';
				break;
			case 'supplier' :
				$type = '\Emayk\Ics\Repo\Suppliers\Suppliers';
				break;
			case 'contact' :
				$type = '\Emayk\Ics\Repo\Contactperson\Contactperson';
				break;
		};
		return $type;
	}

}
