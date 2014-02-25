<?php
/**
 *
 * Tempat Url untuk testing - testing
 * url format prefix_url/test
 *
 **/
Route::group(array('prefix' => 'test'), function () {



	Route::get('dat1',function(){
		$date = "2014-02-24T07:00:00";
//		$date = strpos($date,'T');
		$date = explode('T',$date);
		return str_replace('-','_',$date[0]);
	});
//	Route::get('testInsert',function(){
	Route::get('transorders',function(){

//			$tmp = \DB::table('trans_orders_tmp')->insert(
//				['trxnumber' => 'Trx-'.time()]
//			);
		$tmp = new \Emayk\Ics\Repo\Transorders\Transorders();
		return $tmp->createPOtemp();
//			return s($tmp);//->toArray();

	});
	Route::get('menuroot', function () {
		$model = new \Emayk\Ics\Repo\Menu\Menu();
//		$idsroot = \Emayk\Ics\Repo\Menu\Menu::whereParentId(0)->get(array('id', 'text')); //->lists('id','text');
		$idsroot = $model::whereParentId(0)->get(array('id', 'text')); //->lists('id','text');
//		return $idsroot;
		$menus = [];
		$checked = array(false,true);
		foreach ($idsroot as $root) {
			$children = [];
			/*Cari Child*/
			$idroot = $root->id;
			$child  = $model::whereParentId($idroot)->get(array('id', 'text'));

			foreach ($child as $c) {
				$simulasi_checked = $checked[rand(0,1)];
				$children[ ] = [
					'id'   => $c->id,
					'text' => $c->text,
					'leaf' => true,
					'checked' => $simulasi_checked
				];
			}

			$menus[ ] = [
				'id'       => $root->id,
				'text'     => $root->text,
				'cls'      => 'folder',
				'leaf'     => false,
				'children' => $children
			];
		}

		return $menus;
	});

	Route::get('count', function () {
		$a  = new \Emayk\Ics\Repo\Transorders\Transorders();
		$dt = new \Carbon\Carbon();

//		$str = "2014-01-23T07:00:00";

//		$str = \Carbon\Carbon::create($str);
//	$da =	date_format($str,'Y-m-d');
//		return $da;
		$deliverycount = $a->where('delivery_at', '2014-01-23')->count();

		return $deliverycount + 1;
	});
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


	Route::get('generate', function () {
		$fake = \Faker\Factory::create();
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
			return Response::stream(function () {
					$sep = "<br/>";
					echo "[ " . \Carbon\Carbon::create() . " ]" . "Generate Data Sample Begin";
					echo "<br/> <hr>";
//					User
//					printf("[  %s  ]  %s  %s <br/>",date('d M Y'),
//						"Generate User Admin ...Warehouse and Category Warehouse ",
//					\Emayk\Ics\Repo\Users\Users::generateUserAdmin());
					echo "Generate User Admin ...Warehouse and Category Warehouse";
					echo \Emayk\Ics\Repo\Users\Users::generateUserAdmin();
					sleep(1);
					echo $sep;
//Legalitas
					echo "Generate Legality ...";
					echo \Emayk\Ics\Repo\Legality\Legality::generateMassiveLegality();
					sleep(1);
					echo $sep;
//departement
					echo "Generate Departement ...";
					echo \Emayk\Ics\Repo\Dept\Dept::generateMassive();
					echo $sep;
					sleep(1);
//Position
					echo "Generate Position ...";
					echo \Emayk\Ics\Repo\Positions\Positions::generateMassiveDataDummy(false, 50);
					echo $sep;
					sleep(1);
//Color
					echo "Generate Color ";
					echo \Emayk\Ics\Repo\Colors\Colors::generateColorSample();
					sleep(1);
					echo $sep;
//Location
					echo "Generate Default Location ";
					echo \Emayk\Ics\Repo\Locations\Locations::createRecordCountry();
					sleep(1);
					echo $sep;
//currency
					echo "Generate Currency ";
					echo \Emayk\Ics\Repo\Currencies\Currencies::generateMassive();
					sleep(1);
					echo $sep;
//Fabric Grade
					echo "Generate Fabric Grade...";
					echo \Emayk\Ics\Repo\Fabricgrade\Fabricgrade::generateMassive();
					echo $sep;
					sleep(1);
//					fabric type
					echo "Generate  Fabric Type ...";
					echo \Emayk\Ics\Repo\Fabrictype\Fabrictype::generateMassive();
					sleep(1);
					echo $sep;
//Bank
					echo "Generate  Bank ...";
					echo \Emayk\Ics\Repo\Bank\Bank::getIdsOrCreateBanks();
					sleep(1);
					echo $sep;
//					Generate Account
					echo "Generate  Type Account Bank ...";
					echo \Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype::getDefaultBankTypeIdsOrCreate();
					sleep(1);
					echo $sep;
					//					Generate Rekening Bank
					echo "Generate   Account Bank ...";
					echo \Emayk\Ics\Repo\Bankaccount\Bankaccount::createMassiveSampleRecord(false, 100);
					sleep(1);
					echo $sep;

//					Generate Buyer Supplier and Contact Person
					echo "Generate  Buyers, Supplier, Contact Person ...";
					echo \Emayk\Ics\Repo\Contactperson\Contactperson::generateMassive(false, 100);
					sleep(1);
					echo $sep;
//					Generate Phones

					echo "Generate Phone Buyers, Supplier ...";
					echo \Emayk\Ics\Repo\Phones\Phones::generateMassivePhoneSample(false, 300);
					sleep(1);
					echo $sep;
//					Generate Product, Detail , Stock, Stock History

					echo "Generate Product , detail , Stock,stock detail ...";
					echo \Emayk\Ics\Repo\Products\Products::generateSampleProducts();
					sleep(1);
					echo $sep;
//					Generate Office


					echo "<br/> <hr>";
					sleep(1);
					echo "[ " . \Carbon\Carbon::create() . " ]" . "Finish....,Generate Done";
				}
			);
		});


		Route::get('stockhistory', function () {

			$stockId = 1;
			$total   = \Emayk\Ics\Repo\Stockproducts\Stockproducts::whereId($stockId)->pluck('total');
			return $total;

			$stock        = \Emayk\Ics\Repo\Stockproducts\Stockproducts::find($stockId);
			$stock->total = 0;
			$stock->save();

			$stockHistories = \Emayk\Ics\Repo\Stockproducthistory\Stockproducthistory::whereStockId($stockId);
			if ($stockHistories->count()) {
				$ids = $stockHistories->lists('id');
				foreach ($ids as $shId) {
					\Emayk\Ics\Repo\Stockproducthistory\Stockproducthistory::destroy($shId);
				}
				/*Update Stock Id ke 0*/
				$stock        = \Emayk\Ics\Repo\Stockproducts\Stockproducts::find($stockId);
				$stock->total = 0;
				$stock->save();
			}

			for ($history = 0; $history < 9; $history++) {
				//		Buat Stock Detail/History
				if (( $history % 2 == 0 ) || ( $history == 0 )) {
					$typeHistory = 'in';
				} else {
					$typeHistory = 'out';
				}

				$firstHistory = ( $history == 0 );
				\Emayk\Ics\Repo\Stockproducthistory\Stockproducthistory::createHistoryStockSample($stockId, $typeHistory, $firstHistory);
			}

			return "Done " . time();
		});

		Route::get('productImage', function () {
			return \Emayk\Ics\Repo\Bankaccount\Bankaccount::createMassiveSampleRecord(false, 100);
//			$image = new \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate();
//			$record = $image->createRecordImage(1,'hdsahdsah');
//			return $record;

			for ($rec = 90; $rec < 100; $rec++) {
				$ids [ ] = \Emayk\Ics\Repo\Images\Images::getIdsOrCreate($rec, 'dsadhsuadhsua112' . $rec);
			}
			return $ids;
		});
		Route::get('product', function () {
			return \Emayk\Ics\Repo\Products\Products::generateSampleProducts(1000);
		});
		Route::get('unittype', function () {
			return \Emayk\Ics\Repo\Unittypes\Unittypes::getIdsOrCreate();
		});
		Route::get('productcat', function () {

			return \Emayk\Ics\Repo\Productcategory\Productcategory::getIdsOrCreateSampelData();
//			s(count($cat));
//			return s($cat);
//			echo \Emayk\Ics\Repo\Positions\Positions::generateMassiveDataDummy(false,50);
		});
//		Route::get('banktype', function () {
//			return \Emayk\Ics\Repo\Bankaccounttype\Bankaccounttype::getDefaultBankTypeIdsOrCreate(true);
//		});

		Route::get('banks', function () {
			return \Emayk\Ics\Repo\Bank\Bank::getIdsOrCreateBanks();
		});


		/**
		 * Generate Colors
		 */
		Route::get('country', function () {
			return \Emayk\Ics\Repo\Locations\Locations::createRecordCountry();
		});


		Route::get('colors', function () use ($fake) {
			return \Emayk\Ics\Repo\Colors\Colors::generateColorSample();
		});

		/**
		 * Generate Contact Person 2000 Record
		 * Pastikan Record sebelumnya sudah ada
		 */

		Route::get('phone', function () use ($fake) {
			return \Emayk\Ics\Repo\Phones\Phones::generateMassivePhoneSample(false, 300);
			return 'generate Phones';
		});


		Route::get('contacts', function () use ($fake) {
			return \Emayk\Ics\Repo\Contactperson\Contactperson::generateMassive(false, 100);
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
		Route::get('supplier_bank_account', function () use ($fake) {
			$ba   = new \Emayk\Ics\Repo\Bankaccount\Bankaccount();
			$json = $ba->getSupplier(1)->get()->toJson();
//            $json = $ba->getBuyer(1)->get()->toJson();
			return $json;
//            $supplier = \Emayk\Ics\Repo\Suppliers\Suppliers::find(1);
//            $accountbank =$supplier->accountbank;
//

//                accountbank
//            get accountbank supplier
//            \Emayk\Ics\Repo\Bankaccount\Bankaccount::scopeSuppliers
//generate
//            return \Emayk\Ics\Repo\Suppliers\Suppliers::generateMassiveDummy(false,50);
		});
		Route::get('buyer', function () use ($fake) {
//            $fake = \Faker\Factory::create();
//            return $fake->text;
			return \Emayk\Ics\Repo\Buyers\Buyers::generateDummyData(false, 100);
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

		Route::get('useradmin', function () {
			return \Emayk\Ics\Repo\Users\Users::generateUserAdmin();
		});

		Route::get('users', function () {
			$fake = new \Emayk\Ics\Support\Dummy\Faker\AbstractGenerate();
			return $fake->getFake()->firstName;
		});


		Route::get('app.js', function () {
			$test     = time();
			$contents = View::make('ics::extjs.app', compact('test'));
			$response = Response::make($contents);
			$response->header('Content-Type', 'application/javascript');
			return $response;
		});
		Route::get('changelog', function () {
			$changelog = Icsconfig::getChangeLog();
			return $changelog;
		});
// End Genereate Section
	});


});