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

namespace Emayk\Ics\Support\Seed;

class BanksTableSeeder extends Seeder
{

	public function run()
	{
		DB::table('master_bank')->delete();
		$banks = $this->bank();
		DB::table('master_bank')->insert($banks);
        $this->command->info('Done ['.__CLASS__.']');
	}

	protected function bank()
	{
		$uuid =  uniqid('bank_');
		return array(
			array('name' => 'ABN AMRO BANK', 'alamat' => ' JSX TOWER II,11th FLOOR SCBD JL.JEND.SUDIRMAN KAV 52-53 JKT-10029', 'notelp' => ' 021-5156000 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'AMERICAN EXPRESS BANK LTD.', 'alamat' => ' GD.GRAHA AKTIVA JL.HR.RASUNA SAID KAV.03 BLOK X-1,', 'notelp' => ' (021)-5216000 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'BANK OF AMERICA, N.A', 'alamat' => ' GD.BURSA EFEK JAKARTA TOWER 2 LT.23 JL.JEND.SUDIRMAN KAV 52-53', 'notelp' => ' 021-5158000, 5151415 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'BANK OF CHINA LIMITED', 'alamat' => ' JL. JEND.SUDIRMAN KAV.24 WS.TAMARA SUITE 101 201', 'notelp' => ' 021-5205502 , 5207552 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'CITIBANK N.A.', 'alamat' => ' CITIBANK TOWER 7th FLOOR JL.JEND.SUDIRMAN KAV 54-55 JKT-12190', 'notelp' => ' 021-52908545 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'DEUTSCHE BANK AG.', 'alamat' => ' JL. IMAM BONJOL NO. 80, JAKARTA', 'notelp' => ' (021) 3191092 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'JP. MORGAN CHASE BANK, N.A.', 'alamat' => ' CHASE PLAZA LT 4 JL.JEND SUDIRMAN KAV 21 JAKARTA', 'notelp' => ' (021) 52918000 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT ANGLOMAS INTERNASIONAL BANK', 'alamat' => ' ANDHIKA PLAZA, JL. SIMPANG DUKUH NO.38 - 40 SURABAYA', 'notelp' => ' (031) 5355005-9 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK AGRONIAGA, TBK.', 'alamat' => ' PLAZA GRI, JL. HR.RASUNA SAID BLOK X2 NO.1, JAKARTA 12950', 'notelp' => ' 021-5262570 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK AKITA', 'alamat' => ' JL.SAMANHUDI NO.17-19,JAKARTA', 'notelp' => ' (021) 2310881 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK ALFINDO', 'alamat' => ' JL.KH.MOCH MANSYUR NO.34, JAKARTA 11250', 'notelp' => ' 021-2600519, 2600523 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK ANTARDAERAH', 'alamat' => ' JL.BONGKARAN NO.28-30, SURABAYA', 'notelp' => ' (031) 3540909 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK ARTA NIAGA KENCANA', 'alamat' => ' JL.BUBUTAN NO 127-137 SURABAYA 60174', 'notelp' => ' 031-3534123 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK ARTHA GRAHA INTERNASIONAL, Tbk.', 'alamat' => ' GED.ARTHA GRAHA Lt.5 JL.JEND.SUDIRMAN KAV.52-53', 'notelp' => ' 021-5152168 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK ARTOS INDONESIA', 'alamat' => ' JL OTO ISKANDARDINATA NO 18 BANDUNG', 'notelp' => ' 022-4200203, 4200303 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK BINTANG MANUNGGAL', 'alamat' => ' JL.PASAR PAGI NO 24 JAKARTA 11230', 'notelp' => ' (021) 2600313, 2600455 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK BISNIS INTERNASIONAL', 'alamat' => ' JL ASIA AFRIKA NO 121 Lt. 111, BANDUNG', 'notelp' => ' 022- 4233458 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK BUANA INDONESIA Tbk.', 'alamat' => ' JLN GAJAH MADA NO.1 A, JAKARTA 10130', 'notelp' => ' (021) 2312429, 6330585 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK BUKOPIN', 'alamat' => ' JL MT.HARYONO KAV 50-51 JAKARTA 12770', 'notelp' => ' 7989837-7988266 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK BUMI ARTA', 'alamat' => ' JL.KH.WAHID HASYIM NO 234 LT.1-2 JAKARTA PUSAT', 'notelp' => ' 021-2300893, 2300455 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK BUMIPUTERA INDONESIA,Tbk', 'alamat' => ' WISMA BUMIPUTERA LT.14 JL.JEND SUDIRMAN KAV 75 JKT', 'notelp' => ' (021) 5701626 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK CENTRAL ASIA Tbk.', 'alamat' => ' JL.JEND.SUDIRMAN KAV 22-23 JAKARTA 12920,WISMA BCA', 'notelp' => ' (021) 5208650-5711250-5208750 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK CENTURY, Tbk', 'alamat' => ' GD. SENTRAL SENAYAN I , JL. ASIA AFRIKA NO.8, JKT', 'notelp' => ' (021) 5724180 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK DANAMON INDONESIA Tbk', 'alamat' => ' JL. JEND.SUDIRMAN NO.45-46, WISMA BANK DANAMON,JAKARTA', 'notelp' => ' 021-5770160-61 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK DIPO INTERNATIONAL', 'alamat' => ' JL.LETJEN S PARMAN KAV 75 GD. WISMA SEJAHTERA, JKT', 'notelp' => ' 021-5306360 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK EKONOMI RAHARJA', 'alamat' => ' GED. GRAHA EKONOMI, JL. SETIABUDI SELATAN KAV.10', 'notelp' => ' (021) 25445800 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK EKSEKUTIF INTERNASIONAL', 'alamat' => ' JL.TOMANG RAYA NO.14, JAKARTA BARAT 11430', 'notelp' => ' (021) 5605678 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK EKSPOR INDONESIA (PERSERO)', 'alamat' => ' GED.BRS.EFEK MENARA II LT.8 JL.JEND SUDIRMAN KAV.52-53,JKT', 'notelp' => ' (021)5154638 (HUNTING)','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK FAMA INTERNASIONAL', 'alamat' => ' JL. ASIA AFRIKA NO.115 BANDUNG', 'notelp' => ' 022-4200808 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK GANESHA', 'alamat' => ' JL.HAYAM WURUK NO 28 JAKARTA', 'notelp' => ' (021)3855345 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HAGA', 'alamat' => ' JL.ABDUL MUIS NO 28 JAKPUS', 'notelp' => ' 2312888, 2312021 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HAGAKITA', 'alamat' => ' JL TUNJUNGAN NO 60 SURABAYA 60275', 'notelp' => ' 031- 5325969-5325975 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HALIM INDONESIA', 'alamat' => ' JL.COKLAT NO 23- 25 SURABAYA', 'notelp' => ' (031) 3530472 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HARDA INTERNASIONAL', 'alamat' => ' GRAND BOUTIQUE CENTRE BLK B NO 3-4 JL MANGGA DUA RAYA JKT 14430', 'notelp' => ' 021-6127011 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HARFA', 'alamat' => ' JL. DIPONEGORO 145-147, SURABAYA', 'notelp' => ' (031) 5674353 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HARMONI INTERNATIONAL', 'alamat' => ' JL.BALIK PAPAN NO 17B, JAKARTA 10160', 'notelp' => ' (021) 2313164 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK HIMPUNAN SAUDARA 1906', 'alamat' => ' JL. BUAH BATU NO. 58 BANDUNG', 'notelp' => ' (022) 7322150 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK IFI', 'alamat' => ' PLAZA ABDA,OFFICE PARK UNIT 3,Lt1 s.d 5, JL.JEND SUDIRMAN KAV 59 JAKARTA 12190', 'notelp' => ' 021-5150555 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK INA PERDANA', 'alamat' => ' JL.ABDUL MUIS NO 40 JAKARTA PUSAT', 'notelp' => ' 021-3859050 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK INDEX SELINDO', 'alamat' => ' JL.ASEMKA RAYA NO 18-19 JAKARTA BARAT', 'notelp' => ' 2600477-479, 2600491-494 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK INDOMONEX', 'alamat' => ' JL.PASAR BARU SEL. NO 19 JAKARTA PUSAT', 'notelp' => ' 021-3805080 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK INTERNASIONAL INDONESIA Tbk', 'alamat' => ' PLAZA BII TOWER 2 JL. MH. THAMRIN KAV.2 NO.51 WISMA BII, JAKARTA 10350', 'notelp' => ' (021) 2300888 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK JASA ARTA', 'alamat' => ' JL WAHID HASYIM NO. 228, JAKARTA PUSAT', 'notelp' => ' 021-3924588, 3924589 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK JASA JAKARTA', 'alamat' => ' JL TIANG BENDERA NO 26-30, JAKARTA 11230', 'notelp' => ' 021-6902611, 6906950 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK KESAWAN Tbk', 'alamat' => ' JL. HAYAM WURUK NO. 33 JAKARTA 10160', 'notelp' => ' (021) 3508888 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK KESEJAHTERAAN EKONOMI', 'alamat' => ' GD. IKP RI, JL R.P. SOEROSO NO 21 JAKARTA 10330', 'notelp' => ' 3100422, 3100448 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK LIPPO, TBK', 'alamat' => ' MENARA ASIA, LIPPO VILLAGE KARAWACI JL.DIPONEGORO 101, TANGERANG', 'notelp' => ' 021-5460555, 5460666 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MASPION INDONESIA', 'alamat' => ' JL. BASUKI RAHMAT NO. 50 - 54 SURABAYA', 'notelp' => ' (031) 5356123 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MAYAPADA INTERNATIONAL Tbk', 'alamat' => ' MAYAPADA TOWER GROUND FLOOR JL.JEND.SUDIRMAN KAV 28 JAKARTA', 'notelp' => ' (021) 5212288, 5212300 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MAYORA', 'alamat' => ' GEDUNG MAYORA JL.TOMANG RAYA NO 21-23 JAKARTA BARAT 11440', 'notelp' => ' 021- 5655287-88 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MEGA, Tbk', 'alamat' => ' MENARA BANK MEGA,JL.KAPT TANDEAN KAV 12-14A JKT-12970', 'notelp' => ' (021) 79175000 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MESTIKA DHARMA', 'alamat' => ' MESTIKA BUILDING, JL. ZAINAL ARIFIN 118, MEDAN 20153', 'notelp' => ' (061) 4525800 ( Hunting ) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK METRO EXPRESS', 'alamat' => ' JL.HAYAM WURUK NO 19 - 20 JAKARTA 10120', 'notelp' => ' 021-2311888 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MITRANIAGA', 'alamat' => ' WISMA 77 JL.LETJEN S PARMAN KAV 77 JAKARTA BARAT 11410', 'notelp' => ' (021) 5481877 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MUAMALAT INDONESIA', 'alamat' => ' ARTHALOKA BUILDING JL.JEND.SUDIRMAN NO 2 JKT 10220', 'notelp' => ' (021)2511414-2511451-2511470 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK MULTI ARTA SENTOSA', 'alamat' => ' JL.SURYOPRANOTO NO 24 A JAKARTA PUSAT', 'notelp' => ' 021-6335140, 6335150 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK NEGARA INDONESIA (PERSERO) TBK', 'alamat' => ' GEDUNG BNI JL.JEND.SUDIRMAN KAV 1 JAKARTA 10220', 'notelp' => ' 021-2511946','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK NIAGA, Tbk', 'alamat' => ' GRAHA NIAGA, JL.JEND.SUDIRMAN KAV.58 JAKARTA', 'notelp' => ' 021-2505151,2505252,2505353 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK NISP, Tbk', 'alamat' => ' JL. GUNUNG SAHARI NO. 38 JAKARTA', 'notelp' => ' (021) 26508400 (Hunting) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK NUSANTARA PARAHYANGAN,Tbk', 'alamat' => ' JL. Ir. JUANDA NO. 95 BANDUNG 4013', 'notelp' => ' 022-4202088 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK PERMATA Tbk', 'alamat' => ' PERMATA BANK TOWER I JL.SUDIRMAN KAV.27 JAKARTA', 'notelp' => ' 021-5237899, 5237999 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK PERSYARIKATAN INDONESIA', 'alamat' => ' JL SALEMBA RAYA NO 55 JAKPUS 10440', 'notelp' => ' 021-2300912 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK PURBA DANARTA', 'alamat' => ' JL VETERAN NO 7 SEMARANG', 'notelp' => ' 024-314793, 413914 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK RAKYAT INDONESIA (PERSERO) TBK.', 'alamat' => ' JL.JEND SUDIRMAN KAV 44-46 JAKARTA', 'notelp' => ' 021-2510244, 2510254','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK ROYAL INDONESIA', 'alamat' => ' JL.SURYOPRANOTO NO 52 JAKARTA 10130', 'notelp' => ' (021) 63864472-473 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SHINTA INDONESIA', 'alamat' => ' PLAZA BII TOWER I, JL.MH.THAMRIN NO.51,JAKPUS', 'notelp' => ' (021) 31990101 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SINAR HARAPAN BALI', 'alamat' => ' JL MELATI NO 65 DENPASAR BALI', 'notelp' => ' 0361-227076, 227887 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SRI PARTHA', 'alamat' => ' JL WR SUPRATMAN NO 27X DENPASAR', 'notelp' => ' 0361-227721,228221 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SWADESI Tbk', 'alamat' => ' JL.SAMANHUDI NO 37 JAKARTA', 'notelp' => ' (021) 3808178 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SWAGUNA', 'alamat' => ' JL.RS FATMAWATI NO 85 A JAKARTA 12150', 'notelp' => ' 021-7397300, 7397244 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SYARIAH MANDIRI', 'alamat' => ' GD. BANK SYARIAH MANDIRI, JL. MH.THAMRIN NO.5, JKT', 'notelp' => ' (021) 2300509 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK SYARIAH MEGA INDONESIA', 'alamat' => ' MEGA TOWER,JL.KAPTEN TANDEAN NO.12-14,MAMPANG PRAPATAN,JKT', 'notelp' => ' 021-5208428 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK TABUNGAN NEGARA (PERSERO)', 'alamat' => ' GEDUNG MENARA BTN JL.GAJAH MADA NO 1 JAKARTA , 021-2310490; 6336789', 'notelp' => '','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK TABUNGAN PENSIUNAN NASIONAL', 'alamat' => ' JL OTTO ISKANDARDINATA NO 392 BANDUNG 40242', 'notelp' => ' 022-5202822, ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK UIB', 'alamat' => ' JL.JATINEGARA TIMUR NO 72, JAKARTA', 'notelp' => ' 021-8190072, 8505030 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK VICTORIA INTERNATIONAL, Tbk', 'alamat' => ' GEDUNG BANK PANIN SENAYAN LT DASAR JL JEND.SUDIRMAN NO.1 JKT 10270', 'notelp' => ' (021) 5735425 (HUNTING) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK WINDU KENTJANA', 'alamat' => ' WISMA WINDU, JL LET.JEND. S. PARMAN KAV.92, JAKARTA 11420', 'notelp' => ' (021) 5663030 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT BANK YUDHA BHAKTI', 'alamat' => ' GD.PRIMAGRAHA PERSADA JL.GEDUNG KESENIAN NO.3-7,JKT-10710', 'notelp' => ' 021-3517523, 3517533 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT CENTRATAMA NASIONAL BANK', 'alamat' => ' JL KEDUNGDORO NO 32 SURABAYA', 'notelp' => ' 031-5458522, 5319001 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT LIMAN INTERNATIONAL BANK', 'alamat' => ' JL.IR.H.JUANDA NO 12 JAKARTA PUSAT 10120', 'notelp' => ' (021) 2312633 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT PAN INDONESIA BANK, Tbk', 'alamat' => ' GED. PANIN CENTRE LT.1-2 JL. JEND. SUDIRMAN KAV. 1 JAKARTA', 'notelp' => ' 021-2700545 (10 lines) ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT PRIMA MASTER BANK', 'alamat' => ' JL VETERAN NO 10-12 SURABAYA 60175', 'notelp' => ' (031) 3531253 (HUNTING)','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'PT. BANK MANDIRI (PERSERO), TBK.', 'alamat' => ' PLZ. MANDIRI, JL.JEND GATOT SUBROTO KAV.36-38, JKT', 'notelp' => ' (021) 5245006, 5245858, 5245849','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'STANDARD CHARTERED BANK', 'alamat' => ' WISMA STANDARD CHARTERED, .JL.SUDIRMAN KAV 33 A,', 'notelp' => ' (021) 57999000 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'THE BANGKOK BANK COMP. LTD', 'alamat' => ' JL MH THAMRIN NO 3 JAKARTA PUSAT', 'notelp' => ' 021-2311008 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'THE BANK OF TOKYO MITSUBISHI UFJ LTD', 'alamat' => ' JL.JEND SUDIRMAN KAV.10-11, MIDPLAZA LT.1-3, JAKARTA 10227', 'notelp' => ' 021-5706185, 5705177 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
			array('name' => 'THE HONGKONG SHANGHAI B.C.', 'alamat' => ' WORLD TRADE CENTER JL.JEND.SUDIRMAN KAV.29-31, JA', 'notelp' => ' (021)-5246222 ','createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ,'uuid' => $uuid ),
		);
	}

}
