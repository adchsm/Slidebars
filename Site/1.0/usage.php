<?php
	$title = 'Slidebars | Usage';
	$desc = 'Instructions on setting up and using Slidebars in your website.';
	require_once('functions.php');
	include('header.php');
?>
						
<!-- Usage -->
<div id="usage">
	<div class="row">
		<div class="col-xs-12">
			<h1>Usage</h1>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
	
	<div class="row">
		<div class="col-xs-12">
			<p class="lead">Implementing Slidebars into your project is easy. First of all, you'll need to <a href="index.php#download">download Slidebars</a>.</p>
			
			<h2>Basic Steps</h2>
			<p>These are the basic steps in order to get Slidebars working on your site. There are also more <a href="#in-depth">in-depth</a> descriptions and <a href="#api">API</a> usage further down the page.</p>
			<ol>
				<li>Add to your <a href="#viewport">meta viewport tag</a> to your head.</li>
				<li>Wrap your entire page design in an element with id <a href="#site-container"><code>#sb-site</code></a>.</li>
				<li>Create elements for your Slidebars, giving them a base class of <a href="#slidebars"><code>.sb-slidebar</code></a>.</li>
				<li>Set the side of your Slidebars by adding <a href="#slidebars">modifier classes</a>.</li>
				<li>Add <a href="#control-classes">control classes</a> to elements to use the Slidebars.</li>
				<li>Include <a href="#includes">jQuery</a>, <a href="#includes">slidebars.min.js</a> and <a href="#includes">slidebars.min.css</a> in your pages.</li>
				<li>Call the <a href="#initiate"><code>$.slidebars()</code></a> method.</li>
			</ol>
			
			<h3>Translated Instructions</h3>
			<p><a href="http://coliss.com/articles/build-websites/operation/javascript/jquery-plugin-slidebars.html">日本手順</a></p>
			
			<h2>Basic Template</h2>
			<p>If your just starting, here is a bare minimum template to help. This file is included with the <a href="index.php#download">download</a>.</p>
			
			<pre><code class="prettyprint">&lt;!doctype html&gt;<br>&lt;html&gt;<br>  &lt;head&gt;<br>    &lt;title&gt;Slidebars Basic Template&lt;/title&gt;<br>    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"&gt;<br><br>    &lt;!-- Slidebars CSS --&gt;<br>    &lt;link rel="stylesheet" href="path/to/slidebars.min.css"&gt;<br>  &lt;/head&gt;<br><br>  &lt;body&gt;<br>    &lt;div id="sb-site"&gt;<br>      &lt;!-- Your main site content. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;div class="sb-slidebar sb-left"&gt;<br>      &lt;!-- Your left Slidebar content. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;div class="sb-slidebar sb-right"&gt;<br>      &lt;!-- Your right Slidebar content. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;!-- jQuery --&gt;<br>    &lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"&gt;&lt;/script&gt;<br><br>    &lt;!-- Slidebars --&gt;<br>    &lt;script src="path/to/slidebars.min.js"&gt;&lt;/script&gt;<br>    &lt;script&gt;<br>      (function($) {<br>        $(document).ready(function() {<br>          $.slidebars();<br>        });<br>      }) (jQuery);<br>    &lt;/script&gt;<br>  &lt;/body&gt;<br>&lt;/html&gt;</code></pre>
		
			<h2 id="in-depth">In Depth Instructions</h2>
	
			<h3 id="viewport">01) Viewport</h3>
			<p>You'll need to include the meta viewport tag in your <code>&lt;head&gt;</code> to ensure your page renders correctly.</p>
			<pre><code class="prettyprint">&lt;meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"&gt;</code></pre>
						
			<h3 id="site-container">02) Site Container</h3>
			<p>All of your site content (except Slidebars) should be wrapped in an element with id <code>#sb-site</code> which should be a direct child of the <code>&lt;body&gt;</code>.</p>
			<pre class="pull-left"><code class="prettyprint">&lt;div id="sb-site"&gt;<br>  &lt;!-- Your main site content. --&gt;<br>&lt;/div&gt;</code></pre><div class="clearfix"></div>
			
			<h3 id="slidebars">03) Adding the Slidebars</h3>
			<p>Each Slidebar should be direct child of the <code>&lt;body&gt;</code> and must have a base class of <code>.sb-slidebar</code> and a modifer class to set its side.</p>
			<pre class="pull-left"><code class="prettyprint">&lt;div class="sb-slidebar sb-left"&gt;<br>  &lt;!-- Your left Slidebar content. --&gt;<br>&lt;/div&gt;</code></pre><div class="clearfix"></div>
			
			<h4>Base Class</h4>
			
			<p>Add base class <code>.sb-slidebar</code> to all Slidebars.</p>
			
			<h4 id="modifier-classes">Modifier Classes</h4>		
			
			<p>You can add modifier classes to your Slidebars to alter their behaviour and style. Each Slidebar must have a side set.</p>
			<p><code>.sb-left</code> Sets the Slidebar to the left hand side.</p>
			<p><code>.sb-right</code> Sets the Slidebar to the right hand side.</p>
			<p><code>.sb-static</code> Unfixes the Slidebar so it scrolls naturally with the site. <span class="text-info">Introduced in version 0.8</span></p>
			<p><code>.sb-style-push</code> Slidebar is located off-canvas and pushes the site across when opened. <span class="text-info">Introduced in version 0.9</span></p>
			<p><code>.sb-style-overlay</code> Slidebar is located off-canvas and overlays the site when opened. <span class="text-info">Introduced in version 0.9</span></p>
			<p><code>.sb-width-thin</code> An adaptive width, 15% thinner than the standard width. <span class="text-info">Introduced in version 0.9</span></p>
			<p><code>.sb-width-wide</code> An adaptive width, 15% wider than the standard width. <span class="text-info">Introduced in version 0.9</span></p>
			
			<h4 id="custom-widths">Custom Widths <small class="text-info">Introduced in version 0.8</small></h4>
			<p>To set a custom width for a Slidebar, add class <code>.sb-width-custom</code> and pass a width as a data attribute <code>data-sb-width</code>. You can pass a pixel width for a fixed layout, or a percentage for fluid. See example below:</p>
			
			<pre class="pull-left"><code class="prettyprint">&lt;div class="sb-slidebar sb-left sb-width-custom" data-sb-width="15%"&gt;<br>  &lt;!-- Your left Slidebar content. --&gt;<br>&lt;/div&gt;</code></pre><div class="clearfix"></div>
			
			<p><code>.sb-momentum-scrolling</code> Take advantage of iOS native smooth scrolling by adding this to a Slidebar. <span class="text-info">Introduced in version 0.10</span></p>
			
			<h3 id="control-classes">04) Add Control Classes</h3>
			<p>There are optional classes which when applied to elements, can be used control the Slidebars. If you do not wish to use these, you can set your own elements to control the Slidebars using the <a href="#api">API</a>.</p>
			
			<p><code>.sb-toggle-left</code> can be used to toggle the left Slidebar. If clicked when the Slidebar is closed, it will open, if clicked when open, it will close.</p>
			
			<p><code>.sb-toggle-right</code> can be used to toggle the right Slidebar. If clicked when the Slidebar is closed, it will open, if clicked when open, it will close.</p>
			
			<p><code>.sb-open-left</code> can be used to open the left Slidebar when clicked.</p>
			
			<p><code>.sb-open-right</code> can be used to open the right Slidebar when clicked.</p>
			
			<p><code>.sb-close</code> can be used to close either Slidebar when clicked.</p>
			
			<div class="alert alert-info">
				If you add the closing class to a link, or parent of a link within a Slidebar, the Slidebar will close before following the link.
			</div>
			
			<h3 id="includes">05) Including Core Files</h3>
			<p>You should include <span class="text-primary">slidebars.min.css</span> or <span class="text-primary">slidebars.css</span> in the <code>&lt;head&gt;</code> of your document. You should include this before your own stylesheets.</p>
			
			<pre><code class="prettyprint">&lt;link rel="stylesheet" href="path/to/slidebars.min.css"&gt;</code></pre>
			
			<p>Before your closing <code>&lt;/body&gt;</code> tag, you need to include <a href="http://jquery.com/">jQuery</a> (1.8+), followed by either <span class="text-primary">slidebars.min.js</span> or <span class="text-primary">slidebars.min.js</span>.</p>
			
			<pre><code class="prettyprint">&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"&gt;&lt;/script&gt;<br>&lt;script src="path/to/slidebars.min.js"&gt;&lt;/script&gt;</code></pre>
			
			<h3 id="initiate">06) Initiate Slidebars</h3>
			<p>After including jQuery and Slidebars, you need to call <code>$.slidebars()</code> to start it. You may copy and paste this code.</p>
			
			<pre><code class="prettyprint">&lt;script&gt;<br>  (function($) {<br>    $(document).ready(function() {<br>      $.slidebars();<br>    });<br>  }) (jQuery);<br>&lt;/script&gt;</code></pre>
			
			<h2 id="options">Options</h2>
			<p>There are a couple of options which you can set when initiating Slidebars.</p>
			<pre><code class="prettyprint">&lt;script&gt;<br>  (function($) {<br>    $(document).ready(function() {<br>      $.slidebars({<br>        siteClose: true, // true or false<br>        disableOver: 480, // integer or false<br>        hideControlClasses: true, // true or false<br>        scrollLock: false // true or false<br>      });<br>    });<br>  }) (jQuery);<br>&lt;/script&gt;</code></pre>
			
			<p><code>siteClose</code> Enables closing of a Slidebar by clicking on the site. Options: true, false. Default: true. <span class="text-info">Introduced in version 0.7.1</span></p>
			<p><code>disableOver</code> Disable Slidebars over specified screen width. Options: integer, false. Default: false. <span class="text-info">Introduced in version 0.8</span></p>
			<p><code>hideControlClasses</code> Hide Slidebar control classes over width specified in <code>disableOver</code>. Options: true, false. Default: false.  <span class="text-info">Introduced in version 0.8</span></p>
			<p><code>scrollLock</code> Prevent site content scrolling whilst a Slidebar is open. Options: true, false. Default: false.  <span class="text-info">Introduced in version 0.10</span></p>
			
			<h2 id="api">API</h2>
			<p>Slidebars has a few API methods. You'll need to create your own instance of Slidebars when initiating the plugin. You can then use the following to control your Slidebars:</p>
			<div class="alert alert-info">
				As of version 0.10 all Slidebars API methods are prefixed with .slidebars
			</div>
			
			<p><code>.slidebars.open(side)</code> Opens either Slidebar, specify the side: .open('left') or .open('right')</p>
			<p><code>.slidebars.toggle(side)</code> Toggles either Slidebar, specify the side: .toggle('left') or .toggle('right')</p>
			<p><code>.slidebars.close()</code> Closes whichever Slidebar is open.</p>
			<p><code>.slidebars.init</code> Returns true if Slidebars has been initiated and is operating. <span class="text-info">Introduced in version 0.9</span></p>
			<p><code>.slidebars.active(side)</code> Returns true if Slidebar is open, specify a side: .active('left') or .active('right') <span class="text-info">Introduced in version 0.9</span></p>
			<p><code>.slidebars.destroy(side)</code> Removes Slidebar from the DOM, specify a side: .destroy('left') or .destroy('right') <span class="text-info">Introduced in version 0.10</span></p>
			
			<p>Here is an example of initiating Slidebars for use with the API:</p>
			
			<pre><code class="prettyprint">&lt;script&gt;<br>  (function($) {<br>    $(document).ready(function() {<br>      var mySlidebars = new $.slidebars();<br>      $('.my-button').on('click', function() {<br>        mySlidebars.slidebars.open('left');<br>      });<br>      $('.my-other-button').on('click', function() {<br>        mySlidebars.slidebars.toggle('right');<br>      });<br>      $('.my-third-button').click(mySlidebars.slidebars.close);<br>    });<br>  }) (jQuery);<br>&lt;/script&gt;</code></pre>
			
			<h2 id="animation-class">Animation Class</h2>
			
			<p>You can add class <code>.sb-slide</code> to other elements you wish to slide. This is useful if you have elements with <a href="issues/fixed-position.php">fixed positions</a>, such as a top navigation bar.</p>
			
			<h2 id="helper-classes">Helper Classes</h2>
			<p>Slidebars adds a few classes which can aid you when styling your site.</p>
			
			<p><code>html.sb-init</code> is present when Slidebars has been initiated and is running. <span class="text-info">Introduced in version 0.8</span></p>
			
			<p><code>html.sb-active</code> is present when either Slidebar is open.</p>
			
			<p><code>html.sb-active-left</code> is present when the left Slidebar is open.</p>
			
			<p><code>html.sb-active-right</code> is present when the right Slidebar is open.</p>
			
			<p><code>html.sb-android</code> is present when Android Browser version 2.* is being used. You can use this to unfix elements with position fixed. <span class="text-info">Depreciated as of 0.9, see below.</span></p>
			
			<p><code>html.sb-static</code> is present when Android Browser &lt; 3 or iOS &lt; 5 is being used. You can use this to unfix elements with a fixed position. <span class="text-info">Introduced in version 0.9</span></p>
			
			<p>Apply class <code>.sb-disable-close</code> to a link within a Slidebar to prevent it from closing on click. <span class="text-info">Depreciated as of 0.10.</span></p>
			
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#usage -->

<?php include('footer.php'); ?>