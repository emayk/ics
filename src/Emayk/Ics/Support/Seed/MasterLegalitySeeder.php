<?php
/**
 * Created by PhpStorm.
 * User: emayk
 * Date: 12/25/13
 * Time: 9:57 AM
 */

namespace Emayk\Ics\Support\Seed;


class MasterLegalitySeeder {
    public function run()
    {
        DB::table('master_legality')->delete();

        $legalitas = array(
            array('name' => 'PT','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'CV','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'PD','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'PERORANGAN','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'PTE LTD','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'TOKO','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'CO','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'SDN. BHD','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'PTE','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'SRL','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'LIMITED','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'GES M.B.H','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'UD','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'CORP','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'CO.KG','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'CO.LIMITED.CHINA','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'FA','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'INC, LTD','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'S.P.A','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
            array('name' => 'KC','uuid' => uniqid(), 'createby_id' => 1, 'lastupdateby_id' => 1, 'created_at' => new \DateTime(),'updated_at' => new \DateTime() ),
        );

        DB::table('master_legality')->insert($legalitas);
        $this->command->info('[Done] '.__CLASS__);

    }
} 