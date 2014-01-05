<?php
/**
 * Created by PhpStorm.
 * User: emayk
 * Date: 12/25/13
 * Time: 2:25 AM
 */


namespace Emayk\Ics\Support\Seed;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FabricTypeSeeder extends Seeder {

    public function run()
    {
        DB::table('master_fabric_type')->delete();
        $uuid = uniqid();
        $master_fabric_type = array(
            array('name' => 'KAIN', 'info' => 'Product Kain','uuid' => $uuid, 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'UMUM', 'info' => 'Product Umum','uuid' => $uuid, 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
        );

        DB::table('master_fabric_type')->insert($master_fabric_type);
        $this->command->info('Done ['.__CLASS__.']');
    }


}

