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


namespace Emayk\Ics\Support\Dummy\Faker;
/**
 * Class Products
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Products extends AbstractGenerate
{
	/**
	 * @var array
	 */
	protected $categories = array(
		'Category A', 'Category B',
		'Category C', 'Category D',
		'Category E', 'Category F',
		'Category G', 'Category H',
		'Category I', 'Category J',
	);

	/**
	 * @var array
	 */
	protected $types = array();
	/**
	 * @var array
	 */
	protected $unitWeight = array();
	/**
	 * @var array
	 */
	protected $unitWidth = array();
	/**
	 * @var array
	 */
	protected $unitOther = array();
	/**
	 * @var array
	 */
	protected $detail = array();
	/**
	 * @var array
	 */
	protected $stock = array();
	/**
	 * @var array
	 */
	protected $stockhistory = array();

	/**
	 * @var string
	 */
	protected $defaultParentType = '\Emayk\Ics\Repo\Productcategory\Productcategory';

	/**
	 * @return string
	 */
	public function getDefaultParentType()
	{
		return $this->$defaultParentType;
	}

	/**
	 * @param        $catId
	 * @param        $typeId
	 * @param        $unitWeightId
	 * @param        $unitWidthId
	 * @param int    $parentId
	 * @param string $parentType
	 *
	 * @return array
	 */
	public function product($catId, $typeId, $unitWeightId, $unitWidthId, $parentId = 0, $parentType = '')
	{
		return array_merge(array(
			"name"          => 'Product ' . $this->createLetters(),
			"nodesign"      => 'Design' . $this->getFake()->randomDigitNotNull . $this->createLetters(5),
			"contruction"   => 'Contruction' . $this->getFake()->randomDigit,
			"cat_id"        => $catId,
			"type_id"       => $typeId,
			"weight"        => $this->getFake()->randomDigit . rand(1, 100),
			"unitweight_id" => $unitWeightId,
			"width"         => $this->getFake()->randomDigit . rand(20, 190),
			"unitwidth_id"  => $unitWidthId,
			"codeinternal"  => $this->getFake()->uuid,
			"parent_id"     => $parentId,
			"parent_type"   => $parentType
		), $this->othersAttributesArray());
	}


	/**
	 * @param null $name
	 * @param int  $parent_id
	 *
	 * @return array
	 */
	public function category($name = null, $parent_id = 0)
	{
		if (null == $name) $name = $this->fake->randomElement($this->categories) . rand(9, 900);
		$category = array(
			'name'         => $name,
			'info'         => "Information {$name}",
			'parent_id'    => $parent_id,
			'parent_type'  => $this->defaultParentType,
			'kodeinternal' => $this->fake->uuid,
		);
		return array_merge($category, $this->othersAttributesArray());
	}

	/**
	 * @param $name
	 * @param $parentId
	 *
	 * @return array
	 */
	public function createRecordCategory($name = '', $parentId = 0)
	{
		return $this->category($name, $parentId);
	}


	/**
	 * @param $productId
	 * @param $colorId
	 * @param $unitId
	 * @param $gradeId
	 * @param $currSp
	 * @param $currSpm
	 *
	 * @return array
	 */
	public function createDetail($productId, $colorId, $unitId, $gradeId, $currSp, $currSpm)
	{
		$sp  = ( $this->getFake()->randomDigit * rand(9000, 10033) );
		$spm = ( $sp - ( 1000 * rand(900, 9999) ) );
		return array_merge(
			array(
				"product_id"    => $productId,
				"color_id"      => $colorId,
				"unit_id"       => $unitId,
				"grade_id"      => $gradeId,
				"salesprice"    => $sp,
				"salespricemin" => $spm,
				"currsp_id"     => $currSp,
				"currspm_id"    => $currSpm,
				"parent_id"     => $productId,
				"parent_type"   => '\Emayk\Ics\Repo\Products\Products'
			),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @param $productId
	 * @param $warehouseId
	 * @param $unitId
	 *
	 * @return array
	 */
	public function createStockProduct($productId, $warehouseId, $unitId)
	{
		return array_merge(array(
			"product_id"   => $productId,
			"total"        => 0,
			"wh_id"        => $warehouseId,
			"lengthfabric" => rand(90, 1000),
			"onday"        => $this->getFake()->dateTimeBetween("-2 month"),
			"unit_id"      => $unitId,
		), $this->othersAttributesArray());
	}

	/**
	 * @param $stockId
	 * @param $rollNumber
	 * @param $qtyIn
	 * @param $qtyOut
	 *
	 * @param $qtyBalance
	 *
	 *
	 * @return array
	 */
	public function createHistoryStockProduct($stockId,$rollNumber, $qtyIn, $qtyOut,$qtyBalance,$total)
	{
//		$qtyBalance = ($qtyIn - $qtyOut);
		return array_merge(array(
			"stock_id"    => $stockId,
			"refdoc"      => $this->getFake()->uuid,
			"noroll"      => $rollNumber,
			"qty_in"      => $qtyIn,
			"qty_out"     => $qtyOut,
			"qty_balance" => $qtyBalance,
			"total" => $total,
		), $this->othersAttributesArray());
	}
}

/** 1/8/14 **/