<?php
	 namespace Emayk\Ics\Support\Seed\Menu;

	 use \Seeder;

	 class Master_menusTableSeeder extends Seeder
	 {
			public function run ()
			{

				 $menu     = array ();
				 $truncate = true;
				 $menuRoot = array ('Master', 'Transaction', 'Administrasi', 'Report', 'Charting',);

				 if ($truncate)
						DB::table ('master_menus')->truncate ();
				 for ($i = 0; $i <= count ($menuRoot) - 1; $i ++) {
						$menu[] = array (
							 'text'        => 'Menu ' . $menuRoot[$i],
							 'iconCls'     => 'home',
							 'parent_id'   => 0,
							 'leaf'        => false,
							 'ids'         => 'root',
							 'parent_type' => 'Menu',
							 'className'   => 'panel',
							 'created_at'  => date ('Y-m-d h:i:s'),
							 'updated_at'  => date ('Y-m-d h:i:s'),
						);
				 }
				 $childs = array (
						array (1, 'master_departement', 'departementGridList'),
						array (1, 'master_legalitas', 'legalitasGridList'),
						array (1, 'master_bank', 'bankListGrid'),
						array (1, 'master_color', 'colorGridList'),
						array (1, 'master_currency', 'currencyGridList'),
						array (1, 'master_gradekain', 'gradekainGridList'),
						array (1, 'master_warehouse', 'gudangGridList'),
						array (1, 'master_product', 'tabProducts'),
						array (1, 'master_supplier', 'tabSupplier'),
						array (1, 'master_type_order', 'typeorderGridList'),
						array (1, 'master_unit', 'gridAllunit'),
						array (1, 'master_contact_person', 'contactpersonList'),
						array (1, 'master_type_payment', 'gridTypePayment'),
						array (2, 'Order', 'vOrders'),
						array (3, 'Menu Editor', 'vMenuEditor'),
				 );

				 foreach ($childs as $key => $v) {
						$menu[] = $this->create_child ($v[0], $v[1], $v[2]);
				 }
				 DB::table ('master_menus')->insert ($menu);
			}


			protected function create_child ($parentId, $text = 'Menu', $class = 'class')
			{
				 return array (
						'text'        => $text,
						'iconCls'     => 'home',
						'parent_id'   => $parentId,
						'leaf'        => true,
						'ids'         => 'child',
						'parent_type' => 'Menu',
						'className'   => $class,
						'created_at'  => date ('Y-m-d h:i:s'),
						'updated_at'  => date ('Y-m-d h:i:s'),
				 );

			}
	 }
