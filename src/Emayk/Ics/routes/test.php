<?php
/**
 *
 * Tempat Url untuk testing - testing
 * url format prefix_url/test
 *
 **/
Route::group(array('prefix' => 'test'), function () {

	Route::get('/', function () {
		return 'page testing Only';
	});
	/*Testing PushOver*/
	Route::get('pushover', function () {
		curl_setopt_array($ch = curl_init(), array(CURLOPT_URL => "https://api.pushover.net/1/messages.json", CURLOPT_POSTFIELDS => array("token" => "aBRx682ejZNwMKGdiGqJ9BViYZSeHG", "user" => "ufJPbrQHgkUA8w4fwzZuG2c6Ji7v1U", "message" => "hello world",)));
		curl_exec($ch);
		curl_close($ch);

		return 'Done';
	});

	Route::get('pdf', function () {
		// return Icspdf::loadView('ics::test')->download('test.pdf');
		$test = array('test' => date('d-m-Y h:i:s'));
		$view = View::make('ics::test', $test)->withName('done'); //->with( $test);
		return Icspdf::loadHTML($view)->stream('download-invoice.pdf');

		return Icspdf::loadView('ics::test')->stream('download.pdf');

		return Icspdf::loadFile(public_path() . '/docsx/index.html')->save(public_path() . '/my_stored_file.pdf')->stream('download.pdf');

		return Icspdf::loadHTML('<h1>Test ' . date('d M Y') . '</h1>')->stream();
		$pdf = App::make('dompdf');
		$pdf->loadHTML('<h1>Test</h1>');

		return $pdf->stream();

		// $pdf = Icspdf::loadView('ics::test',array(),array());//, $data);
		$pdf = Icspdf::loadHTML('<h1>dsadsa</h1>');

		// return $pdf->download('invoice.pdf');
		return s($pdf);

		return s(Icspdf::loadHTML('<h1>dsadsa</h1>'));

	});
	Route::get('facade', function () {
		return Icsmarkdown::render();
		$file = File::get(base_path() . '/vendor/phpdocumentor/reflection-docblock/README.md');

		return Icsmarkdown::extra($file);
//				return Icsmarkdown::load();

		$obj       = new StdClass();
		$obj->id   = time();
		$obj->name = 'Name ' . time();
		ChromePhp::log($obj);
		Icslogchrome::log($obj); //->info($obj);
		Icslogchrome::log($obj, 'table'); //->info($obj);
		// $obj = serialize($obj);
		// Icslogchrome::log()->info($obj);
		// ChromePhp::log('Hello console!'.time());
		// return Icslogchrome::info('hi....');
		return time();
		$arr = array('mantap');
		s(Icsmessage::getConfig());
		$channel = Icsmessage::getConfig()[ 'channel' ];
		s($channel);
		s(Icsoutput::json(array('mantap')));
		$json = Icsoutput::json($arr);


		if (is_array($json)) {
			Icsmessage::send($json);
		} else {
			s('tidak kirim karena bukan array');
		}

		// s(Icsmessage::about());
		return Icsview::make('test');

	});
	Route::get('config', function () {
		// return View::make('ics::home.index');

	});

	Route::get('excel', function () {
		// return View::make('ics::home.index');
		// IcsExcel::load();

		$obj       = new StdClass();
		$obj->id   = time();
		$obj->name = 'Name ' . time();

		ChromePhp::log($obj);
	});

	Route::get('monitor', function () {

		return \View::make('ics::pusher.monitor');
	});
	/*==========  Test Format Json  ==========*/
	Route::get('log', function () {
//            return Icslogchrome::get_caller_info();

//            $caller = array_shift($bt);
//            echo $caller['file'];
//            echo $caller['line'];
//            ChromePhp::log($caller);
//            return s($bt);
	});

	Route::get('q', function () {
		return DB::table('master_locations')->where('level', 1)->lists('id'); //->get(array('id'));
	});


	/*==========  End /Routing   ==========*/
	Route::get('enc', function () {
		function encrypt_decrypt($action, $string)
		{
			$output = false;

			// $key = 'My strong random secret key';
			$key = Config::get('app.key');

			// initialization vector
			$iv = md5(md5($key));

			if ($action == 'encrypt') {
				$output = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, md5($key), $string, MCRYPT_MODE_CBC, $iv);
				$output = base64_encode($output);
			} else if ($action == 'decrypt') {
				$output = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, md5($key), base64_decode($string), MCRYPT_MODE_CBC, $iv);
				$output = rtrim($output, "");
			}

			return $output;
		}

		$plain_txt = "This is my plain text " . str_random(10);

		$encrypted_txt = encrypt_decrypt('encrypt', $plain_txt);
		echo "Encrypted Text = $encrypted_txt\n";
		echo "<br />";
		$decrypted_txt = encrypt_decrypt('decrypt', $encrypted_txt);
		echo "Decrypted Text = $decrypted_txt\n";
	});
	/*==========  Decript  ==========*/


	Route::get('aw', function () {

		return Icsconfig::getLicense();
	});


	Route::get('iron', function () {
		for ($i = 0; $i < 10; $i++) {
			echo 'Running ' . $i . '<br/>';
			$message = '[....] Hi...' . time();
			Queue::push('Emayk\Ics\Queue\iron', array('message' => $message));
			sleep(2);
		}
		echo 'Done';

	});

	Route::get('crow', function () {
		$url        = 'http://www.kaskus.co.id/classified/317';
		$url_thread = 'http://www.kaskus.co.id';

		$html       = new simple_html_dom();
		$fileremote = File::getRemote($url);
		$html->load($fileremote);


		$baris     = 0;
		$tds       = array();
		$table     = $html->find('table.zebra', 0);
		$a_baris   = array();
		$sf_href   = '';
		$sf_text   = '';
		$reply     = 0;
		$viewer    = 0;
		$last_post = '';
		$last_by   = '';
		$last_date = '';
		$last_href = '';

		foreach ($table->find('tr') as $tr) {
			foreach ($tr->find('td') as $k => $td) {
				//								 Hilangkan Image
				foreach ($td->find('img') as $img)
					$img->outertext = '';

//								 Hilangkan Figure
				foreach ($td->find('figure') as $figure)
					$figure->outertext = '';
//								 Hilangkan Span
				foreach ($td->find('span') as $span)
					$span->outertext = $span->innertext;

				//								 Hilangkan Post Title
				foreach ($td->find('.post-title') as $title)
					$title->outertext = '';

				switch ($k) {
					case 0:
					{

						foreach ($td->find('a') as $b) {
							$sf_text = $b->innertext;
							$sf_href = $b->href;
						}
						break;
					}
					case 1:
					{
						foreach ($td->find('a') as $t) {
							$last_post = $t->innertext;
							$last_href = $t->href;
						}

						foreach ($td->find('.date') as $d)
							$last_date = trim(str_replace('Today', '', $d->innertext));
						foreach ($td->find('.fn') as $by)
							$last_by = $by->innertext;

						break;
					}
					case 2:
					{

						foreach ($td->find('div.replies b') as $r)
							$reply = $r->plaintext;
						foreach ($td->find('div.views b') as $v)
							$viewer = $v->plaintext;
						if (is_string($viewer)) {
							$viewer = intval(str_replace(',', '', $viewer));
						}
						break;
					}
				}


				$a_baris = array(
					'subforum'      => trim($sf_text),
					'subforum_href' => $url . $sf_href,
					'stats_view'    => $viewer,
					'stats_reply'   => $reply,
					'last_by'       => $last_by,
					'last_date'     => $last_date,
					'last_post'     => $last_post,
					'last_href'     => $url_thread . $last_href
				);
			}
			$baris++;

			if (!empty( $sf_text )) {
				$tds[ ] = $a_baris;
			}

		}

		return Response::json($tds);

		s($tds);

		foreach ($html->find('a') as $element)
//					 $link[]['href'] = $element->href;
			$link[ ] = array(
				'tags' => $element->plaintext,
				'href' => $element->href
			);
		s($link);

//				$f = new ThauEx\SimpleHtmlDom\SimpleHtmlDom($file);
//				$sh = new ThauEx\SimpleHtmlDom\SHD();
//				$sh::$fileCacheDir = $cachedir;
//				$sh::strGetHtml($file);

//				ThauEx\SimpleHtmlDom\SHD::$fileCacheDir = $cachedir;
//				ThauEx\SimpleHtmlDom\SHD::strGetHtml($file);
//				$sh::strGetHtml($file);

//				s($sh);
//					::$fileCacheDir = $cachedir;

//				s(
//					 var_dump($html->dump()
//				);
//				return s($cachedir);

//				$h = Sunra\PhpSimple\HtmlDomParser::str_get_html($file);
//
//				foreach($h->find('tr') as $element)
//					 echo $element->innerText() . '<br>';

//				s($h);
//				s($file);

//				$crawler = new \Symfony\Component\DomCrawler\Crawler($file);
//				$html = '';
//				$nodeValues = $crawler->filter('#fjb-listing-header')->each(function (\Symfony\Component\DomCrawler\Crawler $node, $i) use($html) {
//					 return $node->text().'<br/>';
//				});
//				return $nodeValues;
//				return $crawler->html();

//				s($html);
//				s($nodeValues);

//				$crawler->filterXPath('//body/p');//->text();
//				s( $crawler->html());
//				$html = '';
//				foreach ($crawler as $domElement) {
//					 $html .= $domElement->ownerDocument->saveHTML($domElement);
//				}


//				$nodeValues = $crawler->filter('p')->each(function (\Symfony\Component\DomCrawler\Crawler $node, $i) {
//					 return $node->text();
//				});

//				s(
//					$html
//					 $nodeValues
//					 $crawler->filter('body > p')->first()
//				);

//				return $html;
	});


	Route::get('stream', function () {
//				 Response::stream(function() use($fileContent) {
//						echo $fileContent;
//				 }, 200, $headers);
//
		$timoty = array('ganteng', 'jelek', 'sedeng', 'keren');

		return Response::stream(function () use ($timoty) {
			for ($i = 0; $i <= 100; $i++) {
				echo "{$i} Timoty " . $timoty[ rand(0, count($timoty) - 1) ] . " ";
				sleep(1);
			}
		});
	});


	Route::get('grade', function () {
		$fg = \Emayk\Ics\Repo\Fabricgrade\Fabricgrade::find(1);

		return s($fg->products()->get()->first()->toArray());

	});

	Route::get('fake', function () {

//				$data = $this->app['icsfaker'];
		$data = new \Emayk\Ics\Support\Dummy\Dummy();

//					$data = App::make('icsfaker');
//				return $data->colorName();
		$dt = serialize($data->dateTimeBetween());

		return $dt;
//				return Icsdummy::get()->colorName;
//				return Icsdummy::color('rgbColodsadsarAsArray');
		$class = '\Faker\Provider\Lorem';
//				return Icsdummy::getAllClassFaker();
//				return $data->email;
//				return Icsdummy::get()->colorName;
//				return App::make('icsfaker')->colorName;
//				return Icsdummy::getColorFunctionToArray($class);
//				return Icsdummy::color('rgbColodsadsarAsArray');

	});

	Route::get('create/product', function () {

		$data                  = new \Emayk\Ics\Support\Dummy\Dummy();
		$category              = new \Emayk\Ics\Repo\Productcategory\Productcategory();
		$category->createby_id = $data->getFaker()->dateTimeBetween();
		$product               = new \Emayk\Ics\Repo\Products\Products();
//				$product->cat_id = $data->
	});

	Route::get('chat', function () {
//					$chat = new \Emayk\Ics\Support\Dummy\Chat();
//					$echoserver = new Ratchet\Server\EchoServer();
//				$app = new Ratchet\App('localhost', 8080);
//				$app->route('/chat', $chat);
//				$app->route('/echo', $echoserver, array('*'));
//    		$app->run();

		return \Config::get('socket::socket.url');
	});


	Route::get('generate', function () {
		$fake = \Faker\Factory::create();

//				$cat = new \Emayk\Ics\Repo\Productcategory\Productcategory();

//				if (!$cat::count()){
//					 for ($c=0;$c < 5;$c++)
//					 {
//							$cat::create(
//								 array('name' => $fake->name,
//											 'info' => $fake->name,
//											 'uuid' => $fake->uuid
//								 )
//							);
//					 }
//
//				}
//				return $cat::lists('id');

		$fake = \Faker\Factory::create();
//				$user = new \Emayk\Ics\Repo\Users\Users(
//					 array('username' => 'emay',
//							'fullname' => 'emayk',
//							'email' => $fake->companyEmail,
//							'pos_id' => 1,
//							'dept_id' => 1,
//							'warehouse_id' => 1,
//							'status_id' => 1,
//							'password' => 'test',
//							'createby_id' => 1,
//							'lastupdateby_id' => 1
//					 )
//				);
//				$user->save();
		$user = \Emayk\Ics\Repo\Users\Users::generateUserAdmin();

		return $user;
	});

	Route::get('readfaker', function () {
		$filename = '/Volumes/Data/projects/emay/vendor/fzaninotto/faker/readme.md';
		$text     = File::get($filename);

		return Parsedown::instance()->parse($text);
	});


	Route::get('extendfaker', function () {
		$faker        = new \Emayk\Faker\Factory();
		$bank_account = array();

		for ($i = 0; $i < 16; $i++) {
			$account_name    = $faker->unique()->bankaccountname;
			$account         = array(
				'name' => $account_name,
				'info' => "Info {$account_name}"
			);
			$bank_account[ ] = array_merge($account, $faker->fillattributes);
		}

		return $bank_account;

		\DB::table('master_bank_account_type')->insert($bank_account);

//				 return $bank_account;
		$total = $faker->totalbank - 2;
		for ($i = 0; $i < $total; $i++) {

			$bank     = array(
				'name'    => $faker->bankindonesia,
				'info'    => 'Bank',
				'address' => $faker->streetAddress,
				'notelp'  => $faker->phoneNumber,
				'uuid'    => $faker->uuid
			);
			$banks[ ] = array_merge($bank, $faker->fillattributes);
		}

//				 return $banks;
		\DB::table('master_banks')->insert($banks);

		return 'Done';
		$totalnegara = $faker->countNegara();
		$sep         = '</br>';
		for ($i = 0; $i < $totalnegara; $i++) {
			echo $faker->negara . $sep;
		}

		return $faker->streetAddress;

	});


	/*Testing Input*/
	Route::post('input', function () {


		return Input::all();
	});


	/*Debug Post*/
	Route::group(array('prefix' => 'post', 'as' => 'debugpost'), function () {

		$faker = new \Emayk\Faker\Factory();
		/*Create User */

		Route::post('createuser', function () {
//				 $dept = new Emayk\Ics\Repo\Dept\Dept(array ('id' => 1, 'name' => 'System'));
//				 $dept->save ();

//				 $pos = new Emayk\Ics\Repo\Positions\Positions(array ('id' => 1, 'name' => 'System'));
//				 $pos->save ();

			$user = new Emayk\Ics\Repo\Users\Users( array(
				'username'     => 'admin',
				'password'     => '123',
				'dept_id'      => 1,
				'pos_id'       => 1,
				'status_id'    => 1,
				'warehouse_id' => 1

			) );
			$user->save();
		});

		Route::get('create_product_category', function () use ($faker) {
			$categories = array();
			for ($i = 0; $i <= 20; $i++) {
				$category = array(
					'id'           => $i,
					'name'         => $faker->productcategory,
					'info'         => 'Category Product',
					'parent_id'    => 0,
					'parent_type'  => '',
					'kodeinternal' => $faker->uuid,
					'uuid'         => $faker->uuid,
				);

				$categories[ ] = array_merge($category, $faker->fillattributes);
			}
			$cat = new Emayk\Ics\Repo\Productcategory\Productcategory();
			$cat->insert($categories);

			return $categories;
		});

		Route::get('create_product', function () use ($faker) {
			$cat   = Emayk\Ics\Repo\Productcategory\Productcategory::create(
				array('name' => 'Category ' . $faker->productcategory));
			$catid = $cat->id;

			$fabrictype = Emayk\Ics\Repo\Fabrictype\Fabrictype::create(
				array('name' => 'Type fabric ' . $faker->jeniskain)
			);

			$type = Emayk\Ics\Repo\Producttype\Producttype::create(
				array(
					'name'          => 'Type Product ' . $faker->productcategory,
					'fabrictype_id' => $fabrictype->id
				));

			$type = $type->id;


			/*Units */
			$unit_type = Emayk\Ics\Repo\Unittypes\Unittypes::create(
				array('name' => 'Unit Type ' . $faker->randomLetter)
			);

			$unit = Emayk\Ics\Repo\Units\Units::create(
				array('name' => 'Unit ' . $faker->productcategory, 'type_id' => $unit_type->id));

			$unit = $unit->id;

			return;
//						$product = new Emayk\Ics\Repo\Products\Products(
//							 array (
//									'cat_id'          => $catid ,
//									'codeinternal'    => ,
//									'contruction'     => ,
//									'createby_id'     => ,
//									'created_at'      => ,
//									'lastupdateby_id' => ,
//									'name'            => ,
//									'nodesign'        => ,
//									'parent_id'       => ,
//									'parent_type'     => ,
//									'type_id'         => $posid,
//									'unitweight_id'   => ,
//									'unitwidth_id'    => ,
//									'updated_at'      => ,
//									'uuid'            => ,
//									'weight'          => ,
//									'width'           => ,
//								 )
//						);
//						$product->save ();


		});
	});


	$app = $this->app;
	/*Ics Debug Testing*/
	Route::get('env', function () use ($app) {
		$environment = App::environment();
		s(IcsLogger::debug('mantap bray ' . time(), array($environment)));
		s(IcsLogger::loginfailure(array('Error Si dodo ' . time(), $environment)));
		return s($environment);
	});


	/**
	 *
	 * Test Generate Data
	 *
	 */
	Route::group(array('prefix' => 'generate'), function () {
		$fake = \Faker\Factory::create();
		Route::get('/', function () {
			return 'Blank';
		});

		/**
		 * Generate Colors
		 */
		Route::get('colors', function () use ($fake) {
			$data   = new \Emayk\Ics\Support\Dummy\Faker\Colors();
			$colors = array();
			for ($color = 0; $color <= 10; $color++) {
				$colors[ ] = $data->color();
			}
			\Emayk\Ics\Repo\Colors\Colors::insert($colors);
			return ' Generate Color done';
		});

		/**
		 * Generate Contact Person 2000 Record
		 * Pastikan Record sebelumnya sudah ada
		 */

		Route::get('contacts1', function () use ($fake) {
			return ( $countryIds = \Emayk\Ics\Repo\Locations\Locations::where('parent_id',0)->lists('id') );
		});


		Route::get('contacts', function () use ($fake) {
//			return \Emayk\Ics\Repo\Suppliers\Suppliers::generateMassiveDummy();
//			return \Emayk\Ics\Repo\Positions\Positions::generateMassiveDataDummy();
			return \Emayk\Ics\Repo\Contactperson\Contactperson::generateMassive();




			$pos = \Emayk\Ics\Repo\Positions\Positions::lists('id');
			if (!count($pos)) throw new \Exception( 'Position Masih Kosong , Isi Dl' );
			$depts = \Emayk\Ics\Repo\Dept\Dept::lists('id');
			if (!count($depts)) throw new \Exception( 'Departement Masih Kosong , Isi Dl' );

			$suppliers = \Emayk\Ics\Repo\Suppliers\Suppliers::lists('id');
			if (!count($suppliers)) {
				\Emayk\Ics\Repo\Suppliers\Suppliers::generateMassiveDummy();
//				throw new \Exception( 'Supplier Masih Kosong , Isi Dl' );
			}

			$buyers = \Emayk\Ics\Repo\Buyers\Buyers::lists('id');
			if (!count($buyers)) throw new \Exception( 'Buyer Masih Kosong , Isi Dl' );

			$contactX = new \Emayk\Ics\Support\Dummy\Faker\ContactPerson();
			$contacts = array();
			for ($contact = 0; $contact < 2000; $contact++) {
				$pos_id      = $fake->randomElement($pos);
				$dept_id     = $fake->randomElement($depts);
				$supplier_id = $fake->randomElement($suppliers);
				$buyer_id    = $fake->randomElement($buyers);

				$parents = array(
					array(
						'id'   => $buyer_id,
						'type' => '\Emayk\Ics\Repo\Buyers\Buyers'
					),
					array(
						'id'   => $supplier_id,
						'type' => '\Emayk\Ics\Repo\Suppliers\Suppliers'
					)
				);

				$c           = $parents[ rand(0, 1) ];
				$parent_id   = $c[ 'id' ];
				$parent_type = $c[ 'type' ];

				$cp = \Emayk\Ics\Repo\Contactperson\Contactperson::create(
					$contactX->contact($pos_id, $dept_id, $parent_id, $parent_type)
				);
				Log::debug(memory_get_usage(true), array('id' => $cp->id, 'proses ke ' => $contact));

				$contacts[ ] = $contactX->contact($pos_id, $dept_id, $parent_id, $parent_type);
			}

			/**
			 * Jika Menggunakan Bulk Method, disimpan dl pada variable contacts
			 * baru di insert ke db
			 * pastikan config my.cnf disesuaikan
			 */
//			\Emayk\Ics\Repo\Contactperson\Contactperson::insert($contacts);

			return 'Done Generate with ' . count($contacts) . ' data';

		});

		/**
		 * Membuat Currency
		 */
		Route::get('currency', function () use ($fake) {
			return \Emayk\Ics\Repo\Currencies\Currencies::generateMassive(true);
		});

		/**
		 * Generate Departement
		 */
		Route::get('dept', function () use ($fake) {
			return \Emayk\Ics\Repo\Dept\Dept::generateMassive(true);
		});

		Route::get('fabric', function () {
//			return \Emayk\Ics\Repo\Fabricgrade\Fabricgrade::generateMassive(true);
//			return \Emayk\Ics\Repo\Fabrictype\Fabrictype::generateMassive();
		});

		/**
		 * Generate Legality
		 * $ids = true, menghasilkan array berisi id yang telah dibuat;
		 * \Emayk\Ics\Repo\Legality\Legality::generateMassiveLegality($ids)
		 */
		Route::get('legality', function () {
			return \Emayk\Ics\Repo\Legality\Legality::generateMassiveLegality();
		});

		/**
		 * Generate Locations
		 */
		Route::get('locations', function () {
			return \Emayk\Ics\Repo\Locations\Locations::generateMassiveLocation();
		});

		Route::get('useradmin',function(){
			$user = \Emayk\Ics\Repo\Users\Users::generateUserAdmin();
			return s($user);
		});

		Route::get('users',function(){

		});
// End Genereate Section
	});


});