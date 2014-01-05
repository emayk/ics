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
use \Seeder,
\Eloquent;
class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();


        #Bank
        $this->call('BanksTableSeeder');
        // $this->call('TypeAccountBankSeeder');

        // #Kain
        // $this->call('JeniskainsTableSeeder');
        // $this->call('StatusesTableSeeder');
        // $this->call('LegalitasTableSeeder');
        // $this->call('JabatansTableSeeder');
        // $this->call('DepartementsTableSeeder');
        // $this->call('WarnasTableSeeder');

        // $this->call('SatuansTableSeeder');
        // $this->call('KategorigudangsTableSeeder');
        // $this->call('MasterkategoriproductTableSeeder');
        // $this->call('GradekainsTableSeeder');

        // $this->call('TipesupplierandbuyersTableSeeder');

        // $this->call('NegarasTableSeeder');
        // $this->call('CurrenciesTableSeeder');

        // //        $this->call('ImagesTableSeeder');

        // $this->call('UsersTableSeeder');
        // $this->call('GudangsTableSeeder');
        // //        $this->call('RekeningsTableSeeder');
        // $this->call('TipeproductsTableSeeder');

        // $this->call('SuppliersTableSeeder');

        // // $this->call('ProductsTableSeeder');

        // //        $this->call('KantorsTableSeeder');
        // $this->call('MasterSettingsTableSeeder');
        // $this->call('PaymentTypeTableSeeder');
        // $this->call('MasterOrdersTypeTableSeeder');
        // $this->call('MasterTypePPNTableSeeder');
        // $this->call('ApprovalTypeTableSeeder');
        // // $this->call('Trx_approvalTableSeeder');

        // // $this->call('MasterSupplierPhonesTableSeeder');
        // // $this->call('TestUserTableTableSeeder');
        // $this->call('OrderStatusTableSeeder');
	}

}
