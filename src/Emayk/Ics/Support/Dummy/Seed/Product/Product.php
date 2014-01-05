<?php
	 namespace Emayk\Ics\Support\Dummy\Seed\Product;

	 use \DB;
	 use \Emayk\Ics\Repo\Productcategory\Productcategory;

	 class Product extends DataSeeder
	 {
			protected $gen;
			protected $table = 'master_products';
			protected $categories = array ();
			protected $types = array ();
			protected $units = array ();
			protected $users = array ();

			function __construct ()
			{
				 $this->gen        = $this->getFaker ();
				 $this->categories = $this->category ();
			}

			/**
			 *
			 */
			public function run ()
			{
				 \DB::table ($this->table)->delete ();
				 $product = array (
						'name'         => $this->gen->name,
						'nodesign'     => $this->gen->randomLetter,
						'contruction'  => $this->gen->randomLetter,
						//'cat_id'           => $this->gen-> ,
						//'type_id'          => $this->gen-> ,
						'weight'       => $this->gen->randomNumber (),
						//'unitweight_id'    => $this->gen-> ,
						'width'        => $this->gen->randomDigit,
						//'unitwidth_id'     => $this->gen-> ,
						'codeinternal' => $this->gen->uuid,
						'parent_id'    => 0,
						'parent_type'  => __CLASS__,
						'uuid'         => $this->gen->uuid,
						//'createby_id'      => $this->gen->,
						//'lastupdateby_id'  => $this->gen->,
						'created_at'   => $this->gen->date (),
						'updated_at'   => $this->gen->date (),
				 );
				 \DB::table ($this->table)->insert ($product);
			}

			/**
			 *
			 * Mengenerate Catergory Product
			 *
			 * @param $count
			 *
			 * @return mixed
			 */
			protected function category ($count = 5)
			{
				 $cat  = new \Emayk\Ics\Repo\Productcategory\Productcategory();
				 $fake = $this->gen;
				 if (! $cat::count ()) {
						for ($c = 0; $c <= $count; $c ++) {
							 $cat::create (
									array ('name' => $fake->name,
												 'info' => $fake->name,
												 'uuid' => $fake->uuid
									)
							 );
						}

				 }

				 return $cat::lists ('id');
			}

			public function type ($count = 5)
			{
				 $cat  = new \Emayk\Ics\Repo\Productcategory\Productcategory();
				 $fake = $this->gen;
				 if (! $cat::count ()) {
						for ($c = 0; $c <= $count; $c ++) {
							 $cat::create (
									array ('name' => $fake->name,
												 'info' => $fake->name,
												 'uuid' => $fake->uuid
									)
							 );
						}

				 }

				 return $cat::lists ('id');
			}

	 }