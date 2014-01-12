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
 * Class Banks
 *
 * @see     http://id.wikipedia.org/wiki/Daftar_bank_di_Indonesia
 * @package Emayk\Ics\Support\Dummy\Faker
 */
/**
 * Class Banks
 *
 * @package Emayk\Ics\Support\Dummy\Faker
 */
class Banks extends AbstractGenerate
{

	/**
	 * Bank Cental
	 *
	 * @var array
	 */
	protected static $sentral = array('Bank Indonesia');
	/**
	 * Bank_umum_konvensional_pemerintah
	 *
	 * @var array
	 */
	protected static $bu_kon_pemerintah = array('Mutiara Bank', 'Bank Negara Indonesia', 'Bank Rakyat Indonesia', 'Bank Tabungan Negara');
	/**
	 * Bank Umum Konvensional Swasta Nasional devisa
	 *
	 * @var array
	 */
	protected static $bu_kon_swasta_nas_devisa = array('Bank BRI Agroniaga', 'Bank Anda (Surabaya)', 'Bank Artha Graha Internasional', 'Bank Bukopin', 'Bank Bumi Arta', 'Bank Capital Indonesia', 'Bank Central Asia', 'Bank CIMB Niaga', 'Bank Danamon Indonesia', 'Bank Ekonomi Raharja', 'Bank Ganesha', 'Bank Hana', 'Bank Himpunan Saudara 1906 ', 'Bank ICB Bumiputera', 'Bank ICBC Indonesia', 'Bank Index Selindo', 'Bank Maybank Indonesia', 'Bank Maspion (Surabaya)', 'Bank Mayapada', 'Bank Mega', 'Bank Mestika Dharma (Medan)', 'Bank Metro Express', 'Bank Nusantara Parahyangan (Bandung)', 'Bank OCBC NISP', 'Bank of India Indonesia ', 'Panin Bank', 'Bank Permata', 'Bank QNB Kesawan', 'Bank SBI Indonesia', 'Bank Sinarmas', 'Bank UOB Indonesia');
	/**
	 * Bank Umum Konvensional Swasta Nasional devisa
	 *
	 * @var array
	 */
	protected static $bu_kon_swasta_nas_nondevisa = array('Anglomas Internasional Bank (Surabaya)', 'Bank Andara', 'Bank Artos Indonesia (Bandung)', 'Bank Bisnis Internasional (Bandung)', 'Bank Tabungan Pensiunan Nasional (Bandung)', 'Centratama Nasional Bank (Surabaya)', 'Bank Sahabat Sampoerna', 'Bank Fama Internasional (Bandung)', 'Bank Harda Internasional', 'Bank Ina Perdana', 'Bank Jasa Jakarta', 'Bank Kesejahteraan Ekonomi', 'Bank Dinar Indonesia', 'Bank Mayora', 'Bank Mitraniaga', 'Bank Multi Arta Sentosa', 'Bank Nationalnobu ', 'Prima Master Bank', 'Bank Pundi Indonesia ', 'Bank Royal Indonesia', 'Bank Sahabat Purba Danarta (Semarang) ', 'Bank Sinar Harapan Bali', 'Bank Victoria Internasional', 'Bank Yudha Bhakti');
	/**
	 * Bank Umum Konvensional Pembangunan daerah
	 *
	 * @var array
	 */
	protected static $bu_kon_nas_bpd = array('Bank BPD Aceh (Banda Aceh)', 'Bank Sumut (Medan)', 'Bank Nagari (Padang)', 'Bank Riau Kepri (Pekanbaru)', 'Bank Jambi (Jambi)', 'Bank Bengkulu (Kota Bengkulu)', 'Bank Sumsel Babel (Palembang)', 'Bank Lampung (Bandar Lampung)', 'Bank DKI (Jakarta)', 'Bank BJB (Bandung)', 'Bank Jateng (Semarang)', 'Bank BPD DIY (Yogyakarta)', 'Bank Jatim (Surabaya)', 'Bank Kalbar (Pontianak)', 'Bank Kalteng (Palangka Raya)', 'Bank Kalsel (Banjarmasin)', 'Bank Kaltim (Samarinda)', 'Bank Sulsel (Makassar)', 'Bank Sultra (Kendari)', 'Bank BPD Sulteng (Palu)', 'Bank Sulut (Manado)', 'Bank BPD Bali (Denpasar)', 'Bank NTB (Mataram)', 'Bank NTT (Kupang)', 'Bank Maluku (Ambon)', 'Bank Papua (Jayapura)');
	/**
	 * Bank Umum Konvensional Campuran
	 *
	 * @var array
	 */
	protected static $bu_kon_campuran = array('Bank ANZ Indonesia', 'Bank Commonwealth', 'Bank Agris', 'Bank BNP Paribas Indonesia', 'Bank Capital Indonesia', 'Bank Chinatrust Indonesia', 'Bank DBS Indonesia', 'Bank KEB Indonesia', 'Bank Mizuho Indonesia', 'Bank Rabobank International Indonesia', 'Bank Resona Perdania', 'Bank Sumitomo Mitsui Indonesia', 'Bank Windu Kentjana International', 'Bank Woori Indonesia');
	/**
	 * Bank Umum Konvensional Asing
	 *
	 * @var array
	 */
	protected static $bu_kon_asing = array('Bank of America', 'Bangkok Bank', 'Bank of China', 'Citibank', 'Deutsche Bank', 'HSBC', 'JPMorgan Chase', 'Standard Chartered', 'The Bank of Tokyo-Mitsubishi UFJ',);


	/**
	 * Bank Umum Syariah Swasta Nasional devisa
	 *
	 * @var array
	 */
	protected static $bu_syariah_swasta_nasional_devisa = array('Bank BNI Syariah', 'Bank Mega Syariah', 'Bank Muamalat Indonesia', 'Bank Syariah Mandiri');

	/**
	 * Bank Umum Syariah Swasta Nasional Non devisa
	 *
	 * @var array
	 */
	protected static $bu_syariah_swasta_nasional_nondevisa = array('BCA Syariah', 'Bank BJB Syariah', 'Bank BRI Syariah', 'Panin Bank Syariah', 'Bank Syariah Bukopin', 'Bank Victoria Syariah');

	/**
	 * Bank Umum Syariah Swasta Nasional Campuran
	 *
	 * @var array
	 */
	protected static $bu_syariah_swasta_nasional_campuran = array('Bank Maybank Syariah Indonesia');

	/**
	 *
	 * Unit Usaha Syariah
	 * Bank Konvensional
	 * Milik Pemerintah
	 *
	 * @var array
	 */
	protected static $uu_syariah_pemerintah = array('Bank BTN Syariah');


	/**
	 *
	 * Bank Umum Syariah Swasta Nasioanl Devisa
	 *
	 * @var array
	 */
	protected static $uu_syariah_swasta_devisa = array('Bank Danamon Syariah', 'CIMB Niaga Syariah', 'BII Syariah', 'OCBC NISP Syariah', 'Bank Permata Syariah');

	/**
	 *
	 * Unit usaha syariah BPD
	 *
	 * @var array
	 */
	protected static $uu_syariah_swasta_bpd = array('Bank Nagari Syariah', 'Bank BPD Aceh Syariah', 'Bank DKI Syariah', 'Bank Kalbar Syariah', 'Bank Kalsel Syariah', 'Bank NTB Syariah', 'Bank Riau Kepri Syariah', 'Bank Sumsel Babel Syariah', 'Bank Sumut Syariah', 'Bank Kaltim Syariah');

	/**
	 * Unit Usaha Syariah Bank Umum Konvensioan Asing
	 *
	 * @var array
	 */
	protected static $uu_syariah_swasta_asing = array('HSBC Amanah');

	/**
	 * @var array
	 */
	protected static $deposit = array('Checking account', 'Current account', 'Personal account', 'Transaction deposit', 'Demat account');

	/**
	 * @var array
	 */
	protected static $savings_account = array('Individual Savings Account', 'Time deposit / certificate of deposit', 'Tax-Exempt Special Savings Account', 'Tax-Free Savings Account', 'Money market account');

	/**
	 * @var array
	 */
	protected static $other_accounts = array('Loan account', 'Joint account', 'Low-cost account', 'Nostro and vostro accounts', 'Numbered bank account', 'Negotiable Order of Withdrawal account');

	/**
	 * @var array
	 */
	protected $accountType = array(
		'Deposit', 'Tabungan'
	);

	/**
	 * Membuat Account Type
	 *
	 * @param $name
	 *
	 * @return array
	 */
	protected function accountType($name)
	{
		return array_merge(
			array(
				'name' => $name,
				'info' => "Information Of {$name}",
			),
			$this->othersAttributesArray()
		);

	}

	/**
	 * @param $bankId
	 * @param $ownerId
	 * @param $ownerType
	 * @param $typeId
	 *
	 *
	 * @return array
	 */
	protected  function BankAccountSample($bankId, $ownerId,$ownerType, $typeId)
	{
		return array_merge(
			array(
				'bank_id'    => $bankId,
				'number'     => $this->fake->numberBetween(),
				'name'       => $this->fake->name,
				'owner_id'   => $ownerId,
				'owner_type' => $ownerType,
				'type_id'    => $typeId,
			),
			$this->othersAttributesArray()
		);
	}

	/**
	 * @param $supplierId
	 * @param $buyerId
	 *
	 * @return array
	 */
	protected static function  getowners($supplierId, $buyerId)
	{
		return array_merge(
			static::getOwnerSupplier($supplierId),
			static::getOwnerBuyer($buyerId)
		);
	}

	public function getListOwners($supplierId,$buyerId)
	{
		return static::getowners($supplierId,$buyerId);
	}
	/**
	 * @param $supplierId
	 *
	 * @return array
	 */
	protected static function  getOwnerSupplier($supplierId)
	{
		return array('id' => $supplierId, 'type' => '\Emayk\Ics\Repo\Suppliers\Suppliers');
	}

	/**
	 * @param $buyerId
	 *
	 * @return array
	 */
	protected static function  getOwnerBuyer($buyerId)
	{
		return array('id' => $buyerId, 'type' => '\Emayk\Ics\Repo\Suppliers\Suppliers');
	}

	/**
	 * @param $bankId
	 * @param $parentId
	 * @param $parentType
	 * @param $typeId
	 *
	 * @return array
	 */
	public function createAccountBank($bankId,$parentId, $parentType, $typeId)
	{
		return $this->BankAccountSample($bankId,$parentId, $parentType, $typeId);
	}

	/**
	 * Generate Banks
	 *
	 * @return array
	 */
	public function createBanks()
	{
		$banks = array();
		foreach ($this->getAllBanks() as $name)
		{
			$banks [] = $this->createRecordBank($name);
		}

		return $banks;
	}

	/**
	 * Generate record Bank
	 * @param $name
	 *
	 * @return array
	 */
	protected function createRecordBank($name)
	{
		return array_merge(
			array('name' => $name ,
				'info' => "Information {$name}",
				'address' => $this->fake->streetAddress,
				'notelp' => $this->fake->phoneNumber
			),
			$this->othersAttributesArray()
		);

	}

	/**
	 * Membuat Record Tipe Bank
	 *
	 * @param $name
	 *
	 * @throws
	 *
	 * @return array
	 */
	public function createBankType($name)
	{
		if (is_array($name)) throw \Exception("Butuh String , yang diberikan array");
		return $this->accountType($name);
	}

	/**
	 * @param array $typeBank
	 *
	 * @return array
	 */
	public function createBankTypes(array $typeBank)
	{
		foreach ($typeBank as $type) {
			$AccountType [ ] = array_merge(
				array('name' => $type, 'info' => "Information Of {$type}"),
				$this->othersAttributesArray()
			);
		}
		return $AccountType;
	}

	/**
	 * @return array
	 */
	protected function bank()
	{
		$name = $this->fake->name;
		$info = 'Information ' . $name;
		return array_merge(
			array(
				'notelp'  => $this->fake->phoneNumber,
				'address' => $this->fake->numberBetween(),
				'name'    => $name,
				'info'    => $info,
			),
			$this->othersAttributesArray($this->fake->uuid));
	}

	/**
	 * @return array
	 */
	protected function getAllBanks()
	{
		return array_merge(
			static::$sentral,
			static::$bu_kon_pemerintah,
			static::$bu_kon_swasta_nas_devisa,
			static::$bu_kon_swasta_nas_nondevisa,
			static::$bu_kon_nas_bpd,
			static::$bu_kon_campuran,
			static::$bu_kon_asing,
			static::$bu_syariah_swasta_nasional_devisa,
			static::$bu_syariah_swasta_nasional_nondevisa,
			static::$bu_syariah_swasta_nasional_campuran,
			static::$uu_syariah_pemerintah,
			static::$uu_syariah_swasta_devisa,
			static::$uu_syariah_swasta_bpd,
			static::$uu_syariah_swasta_asing
		);
	}

	/**
	 * @return int
	 */
	public function totalbank()
	{
		return count($this->getAllBanks());
	}
}

/** 1/8/14 **/





