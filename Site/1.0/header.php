<!doctype html>
<html lang="en">
	<head>
		<!-- Meta -->
		<meta charset="utf-8">
		<title><?php echo $title; ?></title>
		<meta name="description" content="<?php echo $desc; ?>">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
		
		<!-- Stylesheets -->
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="<?php echo get_home_directory(); ?>/scripts/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="<?php echo get_home_directory(); ?>/scripts/slidebars/slidebars.min.css">
		<link rel="stylesheet" href="<?php echo get_home_directory(); ?>/style.css">
		
		<!-- Shims -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->
		
		<!-- Analytics -->
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		  ga('create', 'UA-42666109-2', 'adchsm.me');
		  ga('send', 'pageview');
		
		</script>
		
		<!-- Twitter Card -->
		<meta name="twitter:card" content="summary">
		<meta name="twitter:creator" content="@adchsm">
		<meta property="og:url" content="http://plugins.adchsm.me/slidebars/">
		<meta property="og:title" content="Slidebars">
		<meta property="og:description" content="Slidebars is a jQuery plugin for quickly and easily implementing app-style revealing menus and sidebars into your website">
		<meta property="og:image" content="http://plugins.adchsm.me/slidebars/images/twitter-card@2x.png">
		
		<!-- Web App -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		
		<!-- Favicons -->
		<link rel="icon"
			type="image/png"
			href="<?php echo get_home_directory(); ?>/images/icons/16.png">
		<link rel="icon"
			type="image/png"
			href="<?php echo get_home_directory(); ?>/images/icons/32.png"
			sizes="32x32">
		<link rel="icon"
			type="image/png"
			href="<?php echo get_home_directory(); ?>/images/icons/48.png"
			sizes="48x48">
		<link rel="icon"
			type="image/png"
			href="<?php echo get_home_directory(); ?>/images/icons/64.png"
			sizes="64x64">
		
		<!-- Apple Touch Icons -->
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/152.png"
			sizes="120x120">
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/120.png"
			sizes="152x152">
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/76.png"
			sizes="76x76">
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/114.png"
			sizes="114x114">
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/57.png"
			sizes="57x57">
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/144.png"
			sizes="144x144">
		<link rel="apple-touch-icon"
			href="<?php echo get_home_directory(); ?>/images/icons/72.png"
			sizes="72x72">
			
		<!-- Startup Images -->
		<!-- iPhone 5, 5S, 5C -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/1096.png"
			media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
			rel="apple-touch-startup-image">
		
		<!-- iPhone 4, 4S -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/920.png"
			media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
			rel="apple-touch-startup-image">
		
		<!-- iPhone, 3G, 3GS -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/460.png"
			media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
			rel="apple-touch-startup-image">
		
		<!-- iPad Retina, Mini Retina Portrait -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/2008.png"
			media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
			rel="apple-touch-startup-image">
		
		<!-- iPad Retina, Mini Retina Landscape -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/1496.png"
			media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
			rel="apple-touch-startup-image">
		
		<!-- iPad, Mini Portrait -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/1004.png"
			media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)"
			rel="apple-touch-startup-image">

		<!-- iPad, Mini Landscape -->
		<link href="<?php echo get_home_directory(); ?>/images/startup/748.png"
			media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)"
			rel="apple-touch-startup-image">
	</head>
	
	<body id="top">
		<!-- Navbar -->
		<nav class="navbar navbar-default navbar-fixed-top sb-slide" role="navigation">
			<!-- Left Control -->
			<div class="sb-toggle-left navbar-left">
				<div class="navicon-line"></div>
				<div class="navicon-line"></div>
				<div class="navicon-line"></div>
			</div><!-- /.sb-control-left -->
			
			<!-- Right Control -->
			<div class="sb-toggle-right navbar-right">
				<div class="navicon-line"></div>
				<div class="navicon-line"></div>
				<div class="navicon-line"></div>
			</div><!-- /.sb-control-right -->
			
			<div class="container">
				<!-- Logo -->
				<div id="logo" class="navbar-left">
					<a href="<?php echo get_home_directory(); ?>/"><img src="<?php echo get_home_directory(); ?>/images/slidebars-logo@2x.png" alt="Slidebars Logo" width="118" height="40"></a>
				</div><!-- /#logo -->
				
				<!-- Menu -->
				<ul class="nav navbar-nav navbar-right">
					<li><a href="<?php echo get_home_directory(); ?>/">Home</a></li>
					<li><a href="<?php echo get_home_directory(); ?>/index.php#download">Download</a></li>
					<li><a href="<?php echo get_home_directory(); ?>/usage.php">Usage</a></li>
					<li><a href="<?php echo get_home_directory(); ?>/contact.php">Contact</a></li>
					<li><a id="top-arrow" href="#top">^</a></li>
				</ul>
			</div>
		</nav>
		
		<!-- Site -->
		<div id="sb-site">
		
			<!-- Manhattan -->
			<!--<div id="manhattan">
				<a href="http://www.adchsm.me/manhattan/">
					<div id="mhtn-img"></div>
					<p class="lead">Check out Manhattan, my latest project. A clean, lightweight and customisable CSS grid.</p>
				</a>
			</div>-->
		
			<!-- Site -->
			<div class="container">
			
				<!-- Bisma -->
				<div id="bisma" class="row">
					<div class="col-xs-12 col-sm-6">
						<img src="images/meet-bisma.png" alt="Meet Bisma" class="img-responsive">
					</div>
					<div class="col-xs-12 col-sm-6">
						<h2>Meet Bisma</h2>
						<p class="lead">A beautiful, modern WordPress theme.</p>
						<p>My premium WordPress theme featuring Slidebars is now available. I set out to create a clean, focused theme that provides a consistent experience for users across all platforms and devices. Bisma prioritizes your content, equipping your website with a superior level of readability and usability.</p>
						<p><a href="https://www.mojomarketplace.com/item/bisma-a-beautiful-modern-wordpress-theme" class="btn btn-default">Purchase Bisma</a> <a class="btn btn-default" href="http://www.adchsm.me/bisma/">Preview Bisma</a></p>
					</div>
				</div>
			
			
				<div class="row">
					<div id="content" class="col-xs-12 col-sm-9">