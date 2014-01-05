<?php
/**
 * Created by PhpStorm.
 * User: emayk
 * Date: 12/25/13
 * Time: 9:45 AM
 */

namespace Emayk\Ics\Support\Seed;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusTypeSeeder extends  Seeder{
    public function run()
    {
        DB::table('master_status')->delete();

        $statuses = array(
            array('name' => 'Active', 'info' => 'Aktif','uuid' => uniqid(),'created_at' => new \DateTime(), 'updated_at' => new \DateTime() ,'createby_id' => 1, 'lastupdateby_id' => 1),
            array('name' => 'NoActive', 'info' => 'Non Aktif','uuid' => uniqid(),'created_at' => new \DateTime(), 'updated_at' => new \DateTime() ,'createby_id' => 1, 'lastupdateby_id' => 1),
        );


        DB::table('master_status')->insert($statuses);
         $this->command->info('[Done] '.__CLASS__.'');
    }
}

