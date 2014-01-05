<?php
/**
 * Created by PhpStorm.
 * User: emayk
 * Date: 12/25/13
 * Time: 9:59 AM
 */

namespace Emayk\Ics\Support\Seed;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class MasterPositionSeeder extends Seeder {
    public function run(){
        DB::table('master_positions')->delete();

        $jabatans = array(
            array('id'=> 1 ,'name' => 'System', 'info' => 'System Built In','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 2 ,'name' => 'Admin', 'info' => 'Posisi Admin','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 3 ,'name' => 'Direktur', 'info' => 'Posisi Direktur','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 4 ,'name' => 'Manager', 'info' => 'Posisi Manager','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 5 ,'name' => 'Engineering', 'info' => 'Posisi Engineering','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 6 ,'name' => 'SPV', 'info' => 'Posisi Supervisor','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 7 ,'name' => 'Staff', 'info' => 'Posisi Staff','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('id'=> 8 ,'name' => 'Operator', 'info' => 'Posisi Operator','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
        );

        DB::table('master_positions')->insert($jabatans);
    }
} 