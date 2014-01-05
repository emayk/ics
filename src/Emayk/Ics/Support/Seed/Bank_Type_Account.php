<?php namespace Emayk\Ics\Support\Seed;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class BankTypeAccountSeeder extends Seeder
{

    public function run()
    {
        DB::table('master_type_bank')->delete();
        $data = array(
            array('name' => 'TABUNGAN', 'info' => '','uuid' => uniqid(),'created_at' => new \DateTime(), 'updated_at' => new \DateTime() ,'createby_id' => 1, 'lastupdateby_id' => 1),
            array('name' => 'GIRO', 'info' => '','uuid' => uniqid(),'created_at' => new \DateTime(), 'updated_at' => new \DateTime() ,'createby_id' => 1, 'lastupdateby_id' => 1),
            array('name' => 'DEPOSITO', 'info' => '','uuid' => uniqid(),'created_at' => new \DateTime(), 'updated_at' => new \DateTime() ,'createby_id' => 1, 'lastupdateby_id' => 1),
        );
        DB::table('master_type_bank')->insert($data);
        $this->command->info('Done ['.__CLASS__.']');
    }

}

