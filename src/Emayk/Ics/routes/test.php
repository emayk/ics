<?php
	 /**
		*
		* Tempat Url untuk testing - testing
		* url format prefix_url/test
		*
		**/
	 Route::group (array ('prefix' => 'test'), function () use ($nsController) {

			Route::get ('/', function () {
				 return 'page testing Only';
			});
			/*Testing PushOver*/
			Route::get ('pushover', function () {
				 curl_setopt_array ($ch = curl_init (), array (CURLOPT_URL => "https://api.pushover.net/1/messages.json", CURLOPT_POSTFIELDS => array ("token" => "aBRx682ejZNwMKGdiGqJ9BViYZSeHG", "user" => "ufJPbrQHgkUA8w4fwzZuG2c6Ji7v1U", "message" => "hello world",)));
				 curl_exec ($ch);
				 curl_close ($ch);

				 return 'Done';
			});

			Route::get ('pdf', function () {
				 // return Icspdf::loadView('ics::test')->download('test.pdf');
				 $test = array ('test' => date ('d-m-Y h:i:s'));
				 $view = View::make ('ics::test', $test)->withName ('done'); //->with( $test);
				 return Icspdf::loadHTML ($view)->stream ('download-invoice.pdf');

				 return Icspdf::loadView ('ics::test')->stream ('download.pdf');

				 return Icspdf::loadFile (public_path () . '/docsx/index.html')->save (public_path () . '/my_stored_file.pdf')->stream ('download.pdf');

				 return Icspdf::loadHTML ('<h1>Test ' . date ('d M Y') . '</h1>')->stream ();
				 $pdf = App::make ('dompdf');
				 $pdf->loadHTML ('<h1>Test</h1>');

				 return $pdf->stream ();

				 // $pdf = Icspdf::loadView('ics::test',array(),array());//, $data);
				 $pdf = Icspdf::loadHTML ('<h1>dsadsa</h1>');

				 // return $pdf->download('invoice.pdf');
				 return s ($pdf);

				 return s (Icspdf::loadHTML ('<h1>dsadsa</h1>'));

			});
			Route::get ('facade', function () {
				 return Icsmarkdown::render ();
				 $file = File::get (base_path () . '/vendor/phpdocumentor/reflection-docblock/README.md');

				 return Icsmarkdown::extra ($file);
//				return Icsmarkdown::load();

				 $obj       = new StdClass();
				 $obj->id   = time ();
				 $obj->name = 'Name ' . time ();
				 ChromePhp::log ($obj);
				 Icslogchrome::log ($obj); //->info($obj);
				 Icslogchrome::log ($obj, 'table'); //->info($obj);
				 // $obj = serialize($obj);
				 // Icslogchrome::log()->info($obj);
				 // ChromePhp::log('Hello console!'.time());
				 // return Icslogchrome::info('hi....');
				 return time ();
				 $arr = array ('mantap');
				 s (Icsmessage::getConfig ());
				 $channel = Icsmessage::getConfig ()['channel'];
				 s ($channel);
				 s (Icsoutput::json (array ('mantap')));
				 $json = Icsoutput::json ($arr);


				 if (is_array ($json)) {
						Icsmessage::send ($json);
				 } else {
						s ('tidak kirim karena bukan array');
				 }

				 // s(Icsmessage::about());
				 return Icsview::make ('test');

			});
			Route::get ('config', function () {
				 // return View::make('ics::home.index');

			});

			Route::get ('excel', function () {
				 // return View::make('ics::home.index');
				 // IcsExcel::load();

				 $obj       = new StdClass();
				 $obj->id   = time ();
				 $obj->name = 'Name ' . time ();

				 ChromePhp::log ($obj);
			});

			Route::get ('monitor', function () {

				 return \View::make ('ics::pusher.monitor');
			});
			/*==========  Test Format Json  ==========*/
			Route::get ('log', function () {
//            return Icslogchrome::get_caller_info();

//            $caller = array_shift($bt);
//            echo $caller['file'];
//            echo $caller['line'];
//            ChromePhp::log($caller);
//            return s($bt);
			});

			Route::get ('q', function () {
				 return DB::table ('master_locations')->where ('level', 1)->lists ('id'); //->get(array('id'));
			});


			/*==========  End /Routing   ==========*/
			Route::get ('enc', function () {
				 function encrypt_decrypt ($action, $string)
				 {
						$output = false;

						// $key = 'My strong random secret key';
						$key = Config::get ('app.key');

						// initialization vector
						$iv = md5 (md5 ($key));

						if ($action == 'encrypt') {
							 $output = mcrypt_encrypt (MCRYPT_RIJNDAEL_256, md5 ($key), $string, MCRYPT_MODE_CBC, $iv);
							 $output = base64_encode ($output);
						} else if ($action == 'decrypt') {
							 $output = mcrypt_decrypt (MCRYPT_RIJNDAEL_256, md5 ($key), base64_decode ($string), MCRYPT_MODE_CBC, $iv);
							 $output = rtrim ($output, "");
						}

						return $output;
				 }

				 $plain_txt = "This is my plain text " . str_random (10);

				 $encrypted_txt = encrypt_decrypt ('encrypt', $plain_txt);
				 echo "Encrypted Text = $encrypted_txt\n";
				 echo "<br />";
				 $decrypted_txt = encrypt_decrypt ('decrypt', $encrypted_txt);
				 echo "Decrypted Text = $decrypted_txt\n";
			});
			/*==========  Decript  ==========*/


			Route::get ('aw', function () {

				 return Icsconfig::getLicense ();
			});


			Route::get ('iron', function () {
				 for ($i = 0; $i < 10; $i ++) {
						echo 'Running ' . $i . '<br/>';
						$message = '[....] Hi...' . time ();
						Queue::push ('Emayk\Ics\Queue\iron', array ('message' => $message));
						sleep (2);
				 }
				 echo 'Done';

			});

			Route::get ('crow', function () {


//				$crawler = new \Symfony\Component\DomCrawler\Crawler(null, 'google.com');
//				$file = File::getRemote('http://www.kaskus.co.id/classified/317');
				 $file = <<<'HTML'
<!DOCTYPE html><html lang="ID" itemscope itemtype="http://schema.org/WebPage"><head><title>Komputer | Kaskus - The Largest Indonesian Community</title><meta itemprop="name" content="Komputer | Kaskus - The Largest Indonesian Community"><meta itemprop="description" content="Jual beli komputer (hardware, software) "><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" /><meta charset="utf-8"/><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="-1" /><meta http-equiv="Cache-Control" content="no-cache" /><meta name="keywords" content="Komputer, kaskus,forum,indonesia,kaskuser,kaskusradio,radio,indo,jual beli,news,berita" /><meta name="description" content="Jual beli komputer (hardware, software) " /><meta name="author" content="Darta Media Indonesia" /><meta http-equiv="content-language" content="id, en"><meta name="generator" content="DrewBull" /><meta name="revisit-after" content="7" /><meta name="webcrawlers" content="all" /><meta name="rating" content="general" /><meta name="spiders" content="all" /><meta name="robots" content="all" /><meta http-equiv="imagetoolbar" content="no" /><meta name="copyright" CONTENT="&copy; 1999â€“2014 Kaskus Networks All Right Reserved"><link href="http://www.kaskus.co.id/rss/forum/317" rel="alternate" type="application/rss+xml" title="Komputer | Kaskus - The Largest Indonesian Community"/><link href="http://cdn.kaskus.com/themes_2.0/stylesheets/style.css" rel="stylesheet" type="text/css" media="all"/><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/modernizr.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/tools.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/jknav.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/hotkeys.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/tooltip.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/selectbox.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/carousel.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/javascript/header.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/js/jquery.cookie.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/js/moderation.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/js/smilies/jquery.modalbox-1.2.0.js"></script><script type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/js/jquery.cookie.js"></script><script type="text/javascript">
	function show_forum_categories()
	{
		if($(".category-list").is('#show') === false)
		{
		 	$.getJSON('/misc/show_forum_categories', function(data)
		 	{
		 		$(".category-list").attr('id', 'show');
				$(".category-list").append(data.html);
				$('.category-tab').tabs('.category-tab-panel',{initialIndex:'1'});
		 	});
		}
	}
	</script><script type="text/javascript">
$(document).ready(function(){
	$('#carousel').carouFredSel({
		responsive: true,
		width: '100%',
		scroll: 5,
		auto:false,
		prev: '.prev',
		next: '.next',
		items: {
			visible:5
		}
	});

	$('#carousel-f').carouFredSel({
		responsive: true,
		width: '100%',
		scroll: 4,
		auto:false,
		height:130,
		prev: '.prev',
		next: '.next',
		items: {
			visible:4
		}
	});

	$('#carousel-l').carouFredSel({
		responsive: true,
		width: '100%',
		scroll: 4,
		auto:false,
		height:100,

		prev: '.prev',
		next: '.next',
		items: {
			visible:6
		}
	});
	$("input[name=searchchoice]").change(function(){
		var searchclass = $(this).val();
		if( searchclass != '')
		{
			$('#searchform').attr('action','/search/'+searchclass);
		}
		else
		{
			$('#searchform').attr('action','/search');
		}
	});
});
window.addEventListener("keydown", function(e)
{
	if(e.keyCode==65 && e.shiftKey)
		 show_forum_categories();
}, false);
</script><style></style><style></style><script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount','UA-132312-15']);

_gaq.push(['_setCustomVar',1,'FJB Section','/classified/317 Komputer',3]);

_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script></head><body class="fjb"><div id="accessibility"><a id="top"></a> <a href="#main">Skip to Main</a></div><header id="site-header" role="banner"><div class="main-site-header"><div class="row"><div class="col grid-3"><h1 id="logo"><a href="/"> <img src="http://cdn.kaskus.com/themes_2.0/img/home-logo.png" alt="Kaskus - The Largest Indonesian Community" /> <img src="http://cdn.kaskus.com/themes_2.0/img/layout/fjb-fjb.png" alt="" class="fjb-logo"> </a></h1></div><div class="col grid-4"><nav id="main-site-nav" role="navigation"><div role="menubar"><a href="/forum" class="forum" role="menuitem"> <span>Forum</span> </a> <a href="/fjb" class="fjb" role="menuitem"> <span>Jual Beli</span> </a></div></nav></div><div class="col grid-5"><div id="site-search"><form role="search" action="/search/fjb" method="get" id="searchform"><div id="search"><input type="hidden" name="f" value="fjb"> <input type="text" placeholder="Temukan yang Agan cari disini&hellip;" accesskey="s" name="q" value="" x-webkit-speech="x-webkit-speech" lang="id"/> <input type="submit" value="Search" /></div><div class="search-opt"><span><i>Search in:</i></span> <span><input type="radio" id="rad-all" class="searchchoice" name="searchchoice" value="" /> <label for="rad-all">All Site</label></span> <span><input type="radio" id="rad-forum" class="searchchoice" name="searchchoice" value="forum" /> <label for="rad-forum">Forum</label></span> <span><input type="radio" id="rad-fjb" class="searchchoice" name="searchchoice" value="fjb" checked/> <label for="rad-fjb">Jual Beli</label></span> <span><input type="radio" id="rad-groupee" class="searchchoice" name="searchchoice" value="groups" /> <label for="rad-groupee">Groupee</label></span> <span class="advanced"><a href="http://support.kaskus.co.id/kaskus-basic/layout_%26amp%3B_navigation.html#search" target="_blank">Search Tips</a></span></div></form></div></div></div></div><div class="iee-header"><div class="meta-header"><div class="row"><div class="col grid-6"><div class="meta-header-bar mobile-hide"><ul> <li><a href="/" class="nav-home"><i class="icon-home header-icon"></i></a></li> <li><a href="/forum" class="nav-forum">Forum</a></li> <li><a href="/fjb" class="nav-fjb">Jual Beli</a></li> <li><a href="/group" class="nav-groupee">Groupee</a></li> <li><a href="http://www.kaskusradio.com" target="_blank" class="nav-radio">KaskusRadio</a></li> </ul></div></div><div class="col grid-6"><div class="meta-header-bar log-bar"><ul><script language="javascript" type="text/javascript" src="http://cdn.kaskus.com/themes_2.0/js/kaskus_md5.js"></script><li class="dropdown tools-panel login-panel"> <a href="https://www.kaskus.co.id/user/login" class="tools"><i class="icon-signin"></i> Sign in</a><div class="sub-menu dropdown-menu login-form"><form action="https://www.kaskus.co.id/user/login" id="loginform" onsubmit="md5hash(password, md5password, md5password_utf, 0);" method="post"><div class="login-form-wrap"><label><span>Username</span> <input name="username" type="text"> </label> <label><span>Password</span> <input name="password" type="password"> </label> <label class="remember"> <input type="hidden" name="securitytoken" value="1388665547-464bfca7232ea869a69672bea707485c" /> <input name="url" id="url" type="hidden" value="%2Fclassified%2F317"> <input type="hidden" name="md5password" /> <input type="hidden" name="md5password_utf" /> <input type="checkbox" value="1" name="rememberme"> <span>Remember me</span> </label> <input type="submit" class="button small white" value="Sign in" ></div><div class="f-pass"><a href="/forgotpassword">Forgot password? <span>click here</span>.</a></div><div class="social-login"><span>Or sign in with:</span> <a href="/misc/twitter_redirect"> <img src="http://cdn.kaskus.com/themes_2.0/img/icon/twit.png" alt="twitter"></a> <a href="javascript:void(0);" id="fb"> <img src="http://cdn.kaskus.com/themes_2.0/img/icon/fb.png" alt="facebook"></a> <a href="/user/glogin" id="google"> <img src="http://cdn.kaskus.com/themes_2.0/img/icon/google_plus.png" alt="google"></a></div></form></div></li> <li class="register"> <a href="/register"><div><b>Register Now!</b><span>Not a Member?</span></div></a></li> </ul></div></div></div></div></div></header><nav id="hot-cat"><div class="row"><div class="col grid-12"><ul class="categories"> <li class="hot-cat-label"><span>Hot categories</span></li> <li><a href="/classified/210">Handphone & Acc</a></li><li><a href="/classified/317">Computer</a></li><li><a href="/classified/205">Otomotif</a></li><li><a href="/classified/297">Video Games</a></li><li><a href="/classified/449">Pakaian</a></li><li><a href="/classified/219">Flora & Fauna</a></li><li><a href="/classified/220">Sports</a></li><li><a href="/classified/293">Camera</a></li><li><a href="/classified/198">Toys</a></li><li><a href="/classified/600">Perhiasan</a></li> <li class="hot-cat-panel dropdown"> <a href="javascript:void(0);" class="tools" onclick="show_forum_categories()">All categories</a><div class="category-bar"><div class="row"><div class="col grid-12"><div class="category-tab"><a href="#"><i class="icon-comments"></i> Forum</a> <a href="#"><i class="icon-shopping-cart"></i> Jual Beli</a></div><div class="category-list"></div><div class="label-legend"><div><sup class="c-label new">N</sup> <span>New</span></div><div><sup class="c-label updated">U</sup> <span>Update</span></div><div><sup class="c-label promo">P</sup> <span>Promoted</span></div></div></div></div></div></li> </ul> <ul class="acc-control"> <li><a href="/" class="sec-logo"><img src="http://cdn.kaskus.com/themes_2.0/img/home-logo.png" alt="" /></a></li> <li><a href="#">Forum</a></li> <li><a href="#">FJB</a></li> <li><a href="#">Marketplace</a></li> <li><a href="#">Groupee</a></li> <li style="float:right"> <form class="search"> <input type="text" placeholder="Search something&hellip;" /> <input type="submit" value="Search" /> </form> </li> </ul></div></div></nav><div class="banner-top-wrapper"><div class="row"><div class="col grid-12"><div class="banner-top-ads" ><iframe id='ac01b8c5' name='ac01b8c5' src='http://ad.kaskus.co.id/www/delivery/afr.php?n=ac01b8c5&amp;zoneid=179&amp;cb=KSKS' framespacing='0' frameborder='no' scrolling='no' width='728' height='90'><a href='http://ad.kaskus.co.id/www/delivery/ck.php?n=a5458132&amp;cb=KSKS' target='_blank'><img src='http://ad.kaskus.co.id/www/delivery/avw.php?zoneid=179&amp;cb=KSKS&amp;n=a5458132' border='0' alt='' /></a></iframe><script type='text/javascript' src='http://ad.kaskus.co.id/www/delivery/ag.php'></script></div></div></div></div><script>
$(document).ready(function()
{
	jQuery(".openwhoposted").modalBox(
	{
			setTypeOfFadingLayer	: 'transparent', // options: white, black, disable
			killModalboxWithCloseButtonOnly : false, // options: true, false (close the modal box with close button only),
			setStylesOfFadingLayer : {// define the opacity and color of fader layer here
				white : 'background-color:#fff; filter:alpha(opacity=60); -moz-opacity:0.6; opacity:0.6;',
				black : 'background-color:#000; filter:alpha(opacity=40); -moz-opacity:0.4; opacity:0.4;',
				transparent : 'background-color:transparent;'
			},
			minimalTopSpacingOfModalbox : 500, // sets the minimum space between modalbox and visible area in the browser window
			usejqueryuidragable : false, // options: true, false (the modalbox is dragable, requieres jQueryUI-Dragable/jQueryUI-Dropable)
			positionTop			: 50,
			setWidthOfModalLayer : 700

	});

	$("#forum_marker").click(function(event)
	{
		var timestamp = (event.timeStamp).toString();
		var now 	  = timestamp.substring(0,10);
		var forum_id  = 317;

		$.cookie( 'kaskus_forum_read_'+forum_id, now, { expires: null, path: '/', domain: 'www.kaskus.co.id', secure: false });

		$(".link_thread_title").css("font-weight","400");
		$(".goto_newpost").remove();
	});

	$("#link_forumtools").click(function(event)
	{
		var position = $('#link_forumtools').position()

		$('#forumtools_menu').attr("style","clip: rect(auto auto auto auto);left: "+position.left+"px;position: absolute;top: "+(position.top+20)+"px;z-index: 50;background: #F5F5FF;border:1px solid #D1D1E1;font-size:13px;");
		$(document).one('click', function() { // close dropmenu if click outside

												$('#forumtools_menu').hide();
													}
												);
		return false;
	});
});
</script><div id="main" role="main"><div class="row"><div class="col grid-12"><div id="breadcrumbs-wrap"><div class="breadcrumbs" itemprop="breadcrumb"><a href = "/fjb" ><icon class="icon-home"> <span>Home</span></icon></a>&nbsp;<a href ="/classified/25/jual-beli">JUAL BELI</a>&nbsp;<span class="current">Komputer</span></div></div></div></div><div class="row"><div class="col grid-12"><div class="row"><div class="col grid-3a"><form action="/search/fjb" method="GET"><div class="advanced-search-sidebar"><div class="section-site"><a href="/classified/317/komputer" class="classified">Classified <span>3</span> <i class="icon-arrow-right"></i></a></div><div class="section"><label for="change-keyword">Change Keyword</label><div class="input"><input type="text" placeholder="Masukkan keyword" name="q"></div></div><div class="section"><label for="date-range">Date range</label><div class="input"><select name="date" class="selectbox"> <option value="-1" >Kapan saja</option> <option value="1" >Hari ini</option> <option value="7" >7 hari lalu</option> <option value="14" >14 hari lalu</option> <option value="30" >30 hari lalu</option> <option value="60" >60 hari lalu</option> <option value="90" >90 hari lalu</option> <option value="365" >365 hari lalu</option> </select></div></div><div class="section price-range"><label for="price-range">Price range</label><div class="input"><input type="text" id="price-range" name="ps" value=""> to <input type="text" id="price-range" name="pe" value=""></div></div><div class="section"><label>Condition</label><div class="input"><label> <input type="checkbox" name="kondisi_baru" value="1"> <span>New</span> </label> <label> <input type="checkbox" name="kondisi_bekas" value="3"> <span>Second</span> </label> <label> <input type="checkbox" name="kondisi_reject" value="4"> <span>BNWOT</span> </label> <label> <input type="checkbox" name="kondisi_refurbish" value="4"> <span>Refurbish</span> </label></div></div><div class="section"><label>Buying format</label><div class="input"><label> <input type="checkbox" name="optionsCheckboxes" value="jual"> <span>Jual</span> </label> <label> <input type="checkbox" name="optionsCheckboxes" value="beli"> <span>Beli</span> </label> <label> <input type="checkbox" name="optionsCheckboxes" value="terjual"> <span>Terjual</span> </label></div></div><div class="section"><label>Location</label><div class="input"><select name="lokasi" id = "lokasi" class="selectbox">
<option value="0" >Pilih Lokasi</option>
<option value="1" >Nanggroe Aceh Darussalam</option>
<option value="2" >Sumatera Utara</option>
<option value="3" >Sumatera Barat</option>
<option value="4" >Riau</option>
<option value="5" >Jambi</option>
<option value="6" >Sumatera Selatan</option>
<option value="7" >Bengkulu</option>
<option value="8" >Lampung</option>
<option value="9" >Kepulauan Bangka Belitung</option>
<option value="10" >Kepulauan Riau</option>
<option value="11" >DKI Jakarta</option>
<option value="12" >Jawa Barat</option>
<option value="13" >Jawa Tengah</option>
<option value="14" >Daerah Istimewa Yogyakarta</option>
<option value="15" >Jawa Timur</option>
<option value="16" >Banten</option>
<option value="17" >Bali</option>
<option value="18" >Nusa Tenggara Barat</option>
<option value="19" >Nusa Tenggara Timur</option>
<option value="20" >Kalimantan Barat</option>
<option value="21" >Kalimantan Tengah</option>
<option value="22" >Kalimantan Selatan</option>
<option value="23" >Kalimantan Timur</option>
<option value="24" >Sulawasi Utara</option>
<option value="25" >Sulawesi Tengah</option>
<option value="26" >Sulawesi Selatan</option>
<option value="27" >Sulawesi Tenggara</option>
<option value="28" >Gorontalo</option>
<option value="29" >Sulawesi Barat</option>
<option value="30" >Maluku</option>
<option value="31" >Maluku Utara</option>
<option value="32" >Papua</option>
<option value="33" >N/A</option>
</select></div></div><div class="section act"><input type="hidden" name="forumchoice" value="317"> <input type="submit" value="Refine Search" class="button small blue"></div></div></form></div><div class="col grid-13a"><div class="row"><div class="col grid-13a"><section id="fjb-listing-header"><div id="fjb-hero"><div class="row"><div class="col grid-6a"><header itemscope="" itemtype="http://schema.org/WPHeader"><img src="http://cdn.kaskus.com/img/newhomeimages/image-317.png" alt="" width="50" height="50" /><h2 itemprop="name"><a href="/classified/317/komputer" rel="bookmark">Komputer</a></h2><p class="desc" itemprop="description">Jual beli komputer (hardware, software)</p></header></div></div></div><div class="ads-610" style="margin: 0;border:0;border-radius:0;"><object width="770" height="100"><param name="movie" value="http://cdn.kaskus.com/themes_2.0/images/layout/banner-fjb-l.swf"><embed src="http://cdn.kaskus.com/themes_2.0/images/layout/banner-fjb-l.swf" width="770" height="100"></embed> </object></div><div class="subforum-table"><table class="zebra"> <thead> <tr> <th class="span10"><div>Subforum</div></th> <th><div class="">Last Post</div></th><th class="span3"><div>Statistics</div></th></tr> </thead> <tbody> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-330.png" alt=""> </figure><div class="post-title"><a href="/classified/330/aksesoris-komputer--laptop"> Aksesoris Komputer & Laptop </a></div><span>Khusus aksesoris komputer & laptop meliputi NoteBook, NetBook, LifeBook.</span> </td> <td><div class="post-title"><a href="/thread/51f95149db9248f94e000006/cat-bercahaya-fosfor-glow-in-the-dark-mantaff">cat bercahaya fosfor glow in the dark mantaff</a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">syechareup</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>134</b></div><div class="views"><span>Views:</span><b>2,582</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-328.png" alt=""> </figure><div class="post-title"><a href="/classified/328/casing-power-supply-cooling"> Casing, Power Supply, Cooling </a></div><span>Khusus casing, power supplies, cooling</span> </td> <td><div class="post-title"><a href="/thread/52c059f91f0bc3f1438b48ed/3-psu-murmer-cm-gx650w-silverstone-650w-amp-enermax-naxn-600w">3 PSU Murmer CM GX650W Silverstone 650W & Enermax NAXN 600W </a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">classofreak.jr</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>11</b></div><div class="views"><span>Views:</span><b>439</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-318.png" alt=""> </figure><div class="post-title"><a href="/classified/318/desktop"> Desktop </a></div><span>Khusus desktop</span> </td> <td><div class="post-title"><a href="/thread/52b5bb01f9ca17cc708b46a9/ygg--rakit-komputer--upgrade-komputer--tukar-tambah-part-komputer">[YGG] ? Rakit Komputer ? Upgrade Komputer ? Tukar-Tambah Part Komputer ?</a></div><time class="date" datetime="2014-01-02">Today 19:24</time> <span class="author vcard"><i>by</i> <span class="fn">riza_kasela</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>47</b></div><div class="views"><span>Views:</span><b>1,004</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-323.png" alt=""> </figure><div class="post-title"><a href="/classified/323/drives-amp-storage"> Drives &amp; Storage </a></div><span>Khusus Drives & Storage</span> </td> <td><div class="post-title"><a href="/thread/528726fbfcca175168000000/jual-new-flashdisk-sandisk-cruzer-blade-8gb-murah-abis">JUAL NEW Flashdisk Sandisk Cruzer Blade 8GB Murah abis</a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">chri5t86</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>54</b></div><div class="views"><span>Views:</span><b>518</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-327.png" alt=""> </figure><div class="post-title"><a href="/classified/327/keyboard-mouse-input"> Keyboard, Mouse, Input </a></div><span>Khusus keyboard, mouse, input</span> </td> <td><div class="post-title"><a href="/thread/000000000000000010700496/is---a4tech-gaming-gear-mouse-keyboard-headset">[IS]---A4Tech Gaming Gear (Mouse, Keyboard, Headset)---</a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">jauris</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>1,670</b></div><div class="views"><span>Views:</span><b>8,186</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-321.png" alt=""> </figure><div class="post-title"><a href="/classified/321/memory"> Memory </a></div><span>Khusus Memory</span> </td> <td><div class="post-title"><a href="/thread/52bf81c6138b460d638b465f/ddr2-vgen-2gb-pc6400">DDR2 VGEN 2GB PC6400</a></div><time class="date" datetime="2014-01-02">Today 19:23</time> <span class="author vcard"><i>by</i> <span class="fn">hendrisilvia</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>24</b></div><div class="views"><span>Views:</span><b>329</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-324.png" alt=""> </figure><div class="post-title"><a href="/classified/324/monitor-display"> Monitor, Display </a></div><span>Khusus monitor, display</span> </td> <td><div class="post-title"><a href="/thread/000000000000000011383253/is---kabel-hdmi-monster-m2000hdmurah-amp-berkualitascekidot">[IS]---Kabel HDMI [MONSTER] M2000HD...Murah & Berkualitas...Cekidot...---</a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">jauris</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>1,493</b></div><div class="views"><span>Views:</span><b>5,976</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-325.png" alt=""> </figure><div class="post-title"><a href="/classified/325/networking-communications"> Networking, Communications </a></div><span>Khusus networking, communications</span> </td> <td><div class="post-title"><a href="/thread/52be54a03ecb17b2608b462e/modem-wifi-mifi-portable-hotspot-4g-lte-thunder-bolt-zte-mf90-unlock-all-operator">modem wifi mifi portable hotspot 4G LTE Thunder BOLT ZTE MF90 UNLOCK all operator</a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">bahoel</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>9</b></div><div class="views"><span>Views:</span><b>666</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-319.png" alt=""> </figure><div class="post-title"><a href="/classified/319/notebook-laptop"> Notebook, Laptop </a></div><span>Khusus Notebook, Laptop</span> </td> <td><div class="post-title"><a href="/thread/52c55ac3bbf87b97598b4614/sony-vaio-svf1412sgp-touchscreen-core-i3-3227u">SONY VAIO SVF1412SGP TOUCHSCREEN Core i3 3227U</a></div><time class="date" datetime="2014-01-02">Today 19:25</time> <span class="author vcard"><i>by</i> <span class="fn">yoce</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>0</b></div><div class="views"><span>Views:</span><b>1</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-326.png" alt=""> </figure><div class="post-title"><a href="/classified/326/printers-scanners-amp-inks"> Printers, Scanners &amp; Inks </a></div><span>Khusus printers, scanners & inks</span> </td> <td><div class="post-title"><a href="/thread/52a56872a3cb173b6c8b4640/portable---mobile-scanner-plustek-mobileoffice-s400">portable / mobile scanner PLUSTEK MobileOffice S400</a></div><time class="date" datetime="2014-01-02">Today 19:24</time> <span class="author vcard"><i>by</i> <span class="fn">elqo</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>52</b></div><div class="views"><span>Views:</span><b>204</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-320.png" alt=""> </figure><div class="post-title"><a href="/classified/320/processors--amp-motherboards"> Processors &amp; Motherboards </a></div><span>Khusus Processors, Motherboards</span> </td> <td><div class="post-title"><a href="/thread/52c04a53bdcb17ad118b45d9/jual-paketan-amd-am3-ddr3-gigabyte-ga-ma78lmt-s2--athlon-ii-x2-240-dan-asrock-m3a770">Jual paketan AMD AM3 DDR3 Gigabyte GA-MA78LMT-S2 + Athlon II X2 240 dan Asrock M3A770</a></div><time class="date" datetime="2014-01-02">Today 19:24</time> <span class="author vcard"><i>by</i> <span class="fn">dadod</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>9</b></div><div class="views"><span>Views:</span><b>411</b></div></div></td> </tr> <tr> <td> <figure> <img src="http://cdn.kaskus.com/img/newhomeimages/image-322.png" alt=""> </figure><div class="post-title"><a href="/classified/322/sound-graphics-amp-video-cards"> Sound, Graphics &amp; Video Cards </a></div><span>Khusus sound, graphics & videocards</span> </td> <td><div class="post-title"><a href="/thread/52be502ff7ca17ad4a8b4686/headset-steelseries-siberia-v2-white-purple-navy-frost-blue-diablo-3-heat-orange">headset steelseries siberia v2 white, purple, NAVY, frost blue, diablo 3, heat orange</a></div><time class="date" datetime="2014-01-02">Today 19:23</time> <span class="author vcard"><i>by</i> <span class="fn">bahoel</span></span> </td> <td><div class="stats"><div class="replies"><span>Replies:</span><b>7</b></div><div class="views"><span>Views:</span><b>237</b></div></div></td> </tr> </tbody> </table></div></section></div></div></div></div></div></div></div><div class="banner-top-wrapper"><div class="row"><div class="col grid-12"><div class="banner-top-ads"><iframe id='a64adea0' name='a64adea0' src='http://ad.kaskus.co.id/www/delivery/afr.php?zoneid=356&amp;cb=INSERT_RANDOM_NUMBER_HERE' frameborder='0' scrolling='no' width='728' height='90'><a href='http://ad.kaskus.co.id/www/delivery/ck.php?n=a9b7ec36&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://ad.kaskus.co.id/www/delivery/avw.php?zoneid=356&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=a9b7ec36' border='0' alt='' /></a></iframe></div></div></div></div><footer id="site-footer" role="contentinfo"><div class="row"><div class="col grid-11"><div class="row"><div class="col grid-4"><div class="row"><div class="col grid-2"><h3>Navigation</h3><div class="bar10"><ul> <li><a href="/home">Home</a></li> <li><a href="/forum">Forum</a></li> <li><a href="/fjb">Jual Beli</a></li> <li><a href="/group">Groupee</a></li> <li><a href="http://www.kaskusradio.com" target="_blank">Radio</a></li> <li><a href="http://m.kaskus.co.id" target="_blank">Mobile site</a></li> <li><a href="http://archive.kaskus.co.id" target="_blank">Archive</a></li> </ul></div></div><div class="col grid-2"><h3>KASKUS Guide</h3><div class="bar10"><ul> <li><a href="http://support.kaskus.co.id" target="_blank">Help Center</a></li> <li><a href="http://support.kaskus.co.id/about/about_kaskus.html" target="_blank">About Us</a></li> <li><a href="http://support.kaskus.co.id/bussiness-ads/beriklan_di_kaskus.html" target="_blank">Advertising</a></li> <li><a href="http://cs.kaskus.co.id/ask/index//" target="_blank">Contact Us</a></li> <li><a href="/about/jobs">Careers</a></li> <li><a href="/about/general_rules">General Rules</a></li> <li><a href="/about/terms_of_use">Term of Services</a></li> </ul></div></div></div></div><div class="col grid-2"><h3>Find Us</h3><div class="bar10"><ul> <li><a href="https://twitter.com/#!/kaskus" target="_blank">Twitter</a></li> <li><a href="http://www.facebook.com/officialkaskus" target="_blank">Facebook</a></li> <li><a href="http://www.youtube.com/kaskusnetworks" target="_blank">Youtube</a></li> <li><a href="http://www.gplus.to/kaskusnetworks" target="_blank">Google+</a></li> </ul></div></div><div class="col grid-5"><h3 class="h-footer-disclaimer">Disclaimer</h3><div class="footer-disclaimer"><p>KASKUS is providing freedom of speech. By using KASKUS , you agree to the following conditions ; User expressly agrees that use of KASKUS is at the user's sole risk and it is not the risk of the owner or the webhost. User specifically acknowledges KASKUS is not liable for the defamatory, offensive or illegal conduct of other user or third-parties in cases including but not limited to any interactive communication on or through the site and that the risk from the foregoing, rests entirely with user(s).</p></div></div></div></div></div><div class="sec-footer"><div class="row"><div class="col grid-6"><small class="ncopy">Copyright Â© 1999â€“2014 Kaskus Networks All Right Reserved</small> <a id="back-to-top" href="#site-header">back to top</a></div></div></div></footer><div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js"></script><script>
$(document).ready(function(){
	FB.init({appId: '356445735231', status: true,cookie: true, xfbml: true});

	$('#fb').click(function(){
		FB.getLoginStatus(function(response) {
			if (response.status=="connected") {
				document.location ="/user/fblogin";
			}
			else
			{
				FB.login(function(response) {
					if (response.status ="connected") {
						document.location ="/user/fblogin";
					}
				}, {scope: 'email,user_birthday,user_location'});
			}
		});
	});
});
</script><script type="text/javascript">if(window.addEventListener){var kkeys=[],mantra="65,83,68,65,83,68,70";window.addEventListener("keydown",function(a){kkeys.push(a.keyCode);if(kkeys.toString().indexOf(mantra)>=0){$("html").addClass("mantra");}},true);}</script></body></html>"
HTML;


				 $cachedir = \Config::get ('cache.path');


				 $url        = 'http://www.kaskus.co.id/classified/317';
				 $url_thread = 'http://www.kaskus.co.id';


//				$html = new ThauEx\SimpleHtmlDom\SHD();//
//				$html::$fileCacheDir = $cachedir;
//				$html::getContent($url);

//				$html = new simple_html_dom();
//				$html->load($file);

				 $html       = new simple_html_dom();
				 $fileremote = File::getRemote ($url);
				 $html->load ($fileremote);


				 $baris     = 0;
				 $tds       = array ();
				 $table     = $html->find ('table.zebra', 0);
				 $a_baris   = array ();
				 $sf_href   = '';
				 $sf_text   = '';
				 $reply     = 0;
				 $viewer    = 0;
				 $last_post = '';
				 $last_by   = '';
				 $last_date = '';
				 $last_href = '';

				 foreach ($table->find ('tr') as $tr) {
						foreach ($tr->find ('td') as $k => $td) {
							 //								 Hilangkan Image
							 foreach ($td->find ('img') as $img)
									$img->outertext = '';

//								 Hilangkan Figure
							 foreach ($td->find ('figure') as $figure)
									$figure->outertext = '';
//								 Hilangkan Span
							 foreach ($td->find ('span') as $span)
									$span->outertext = $span->innertext;

							 //								 Hilangkan Post Title
							 foreach ($td->find ('.post-title') as $title)
									$title->outertext = '';

							 switch ($k) {
									case 0:
									{

										 foreach ($td->find ('a') as $b) {
												$sf_text = $b->innertext;
												$sf_href = $b->href;
										 }
										 break;
									}
									case 1:
									{
										 foreach ($td->find ('a') as $t) {
												$last_post = $t->innertext;
												$last_href = $t->href;
										 }

										 foreach ($td->find ('.date') as $d)
												$last_date = trim (str_replace ('Today', '', $d->innertext));
										 foreach ($td->find ('.fn') as $by)
												$last_by = $by->innertext;

										 break;
									}
									case 2:
									{

										 foreach ($td->find ('div.replies b') as $r)
												$reply = $r->plaintext;
										 foreach ($td->find ('div.views b') as $v)
												$viewer = $v->plaintext;
										 if (is_string ($viewer)) {
												$viewer = intval (str_replace (',', '', $viewer));
										 }
										 break;
									}
							 }


							 $a_baris = array ('subforum'      => trim ($sf_text),
																 'subforum_href' => $url . $sf_href,
																 'stats_view'    => $viewer,
																 'stats_reply'   => $reply,
																 'last_by'       => $last_by,
																 'last_date'     => $last_date,
																 'last_post'     => $last_post,
																 'last_href'     => $url_thread . $last_href
							 );
						}
						$baris ++;

						if (! empty($sf_text)) {
							 $tds[] = $a_baris;
						}

				 }

				 return Response::json ($tds);

				 s ($tds);

				 foreach ($html->find ('a') as $element)
//					 $link[]['href'] = $element->href;
						$link[] = array (
							 'tags' => $element->plaintext,
							 'href' => $element->href
						);
				 s ($link);

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


			Route::get ('stream', function () {
//				 public static function stream($callback, $status = 200, array $headers = array())
//				 Response::stream(function() use($fileContent) {
//						echo $fileContent;
//				 }, 200, $headers);
//
				 $timoty = array ('ganteng', 'jelek', 'sedeng', 'keren');

				 return Response::stream (function () use ($timoty) {
						for ($i = 0; $i <= 100; $i ++) {
							 echo "{$i} Timoty " . $timoty[rand (0, count ($timoty) - 1)] . " ";
							 sleep (1);
						}
				 });
			});


			Route::get ('grade', function () {
				 $fg = \Emayk\Ics\Repo\Fabricgrade\Fabricgrade::find (1);

				 return s ($fg->products ()->get ()->first ()->toArray ());

			});

			Route::get ('fake', function () {

//				$data = $this->app['icsfaker'];
				 $data = new \Emayk\Ics\Support\Dummy\Dummy();

//					$data = App::make('icsfaker');
//				return $data->colorName();
				 $dt = serialize ($data->dateTimeBetween ());

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

			Route::get ('create/product', function () {

				 $data                  = new \Emayk\Ics\Support\Dummy\Dummy();
				 $category              = new \Emayk\Ics\Repo\Productcategory\Productcategory();
				 $category->createby_id = $data->getFaker ()->dateTimeBetween ();
				 $product               = new \Emayk\Ics\Repo\Products\Products();
//				$product->cat_id = $data->
			});

			Route::get ('chat', function () {
//					$chat = new \Emayk\Ics\Support\Dummy\Chat();
//					$echoserver = new Ratchet\Server\EchoServer();
//				$app = new Ratchet\App('localhost', 8080);
//				$app->route('/chat', $chat);
//				$app->route('/echo', $echoserver, array('*'));
//    		$app->run();

				 return \Config::get ('socket::socket.url');
			});


			Route::get ('generate', function () {
				 $fake = \Faker\Factory::create ();

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

				 $fake = \Faker\Factory::create ();
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
				 $user = \Emayk\Ics\Repo\Users\Users::generateUserAdmin ();

				 return $user;
			});

			Route::get('readfaker',function(){
				 $filename =  '/Volumes/Data/projects/emay/vendor/fzaninotto/faker/readme.md';
				 $text = File::get($filename);

				 return Parsedown::instance()->parse($text);
			});

	 });