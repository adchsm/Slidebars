<?php
	$title = 'Slidebars';
	$desc = 'Slidebars is a jQuery plugin for quickly and easily implementing app style off-canvas menus and sidebars into your website.';
	require_once('functions.php');
	include('header.php');
?>
				
<!-- About -->
<div id="about">
	<div class="row">
		<div class="col-xs-12">
			<h1>Slidebars</h1>
			<p class="lead">Slidebars is a jQuery plugin for quickly and easily implementing app style off-canvas menus and sidebars into your website.</p>
			<p>Slidebars was born from a reoccurring need to create off-canvas sliding mobile menus for responsive design. It's ultra-light at 1555 bytes (js) &amp; 660 bytes (css) when gzipped, uses hardware accelerated transitions where possible for quick and smooth animation, falling back to jQuery .animate() on un-supporting browsers.</p>
			<p>Slidebars aren't just for handheld devices, they can be used for implementing revealing content on sites and screens of all sizes. Try it now: <a class="sb-open-left" href="">open a Slidebar</a> and resize your window to see how they behave.</p>
			<p>You can also add this site to your home screen, try it and see how it can make your web apps feel native.</p>
			<p>Slidebars also handles orientation changes and resizes flawlessly.</p>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#about -->

<!-- Download -->
<div id="download">
	<div class="row">
		<div class="col-xs-12">
			<h2>Download</h2>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
	
	<div class="row">
		<div class="col-xs-12">
			<div class="alert alert-info pull-left">
				<p>Slidebars version 0.10.3 released May 7, 2015.</p>
			</div>
			<div class="clearfix"></div>
			
			<p>The original and minified versions are included in the download, along with basic templates, examples for mobile only, API usage, custom widths and animation styles. Be sure to read up the <a href="usage.php">usage documentation</a>/<a href="http://www.extrowebsite.com/javascript/279-slidebars-jquery-plugin-mostrare-menu-e-barre-laterali-in-un-sito-web-responsive">Italiano</a>/<a href="http://coliss.com/articles/build-websites/operation/javascript/jquery-plugin-slidebars.html">日本手順</a>.</p>
			<p>Slidebars is released under the <a href="http://opensource.org/licenses/MIT">MIT license</a>. It's free to use and abuse on any project, personal or commercial. If you use it <a href="contact.php">please let me know</a>, I'd love to see.</p>
			
			<p><a class="btn btn-default download-0102" href="https://github.com/adchsm/Slidebars/releases">Download</a> <a class="github btn btn-default" href="https://github.com/adchsm/Slidebars">View on GitHub</a></p>
			
			<p>You can also install via <a href="http://www.bower.io/">Bower</a></p>
			<pre class="pull-left">$ bower install Slidebars</pre><div class="clearfix"></div>
			
			<p>If you're feeling generous, you could always <a href="https://twitter.com/search?q=%23slidebars&src=typd">tweet about #Slidebars</a>, share or link to this page.</p>
			
			<p><a href="https://twitter.com/share" class="twitter-share-button" data-url="http://plugins.adchsm.me/slidebars" data-text="Check out Slidebars, a jQuery plugin for revealing menus and sidebars." data-via="adchsm" data-count="none" data-hashtags="slidebars">Tweet</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script></p>
				
			<p><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" name="hosted_button_id" value="SBAQDFBDEWQDQ">
			<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
			<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
			</form></p>
			
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#download -->

<!-- Versions -->
<div id="next-version">
	<div class="row">
		<div class="col-xs-12">
			<h2>Whats New</h2>
			<h3>0.10.3 <small>Released May 7, 2015</small> <a class="download-0103" href="https://github.com/adchsm/Slidebars/releases"><img src="images/glyphicon-download.png" alt="Download 0.10.3"></a></h3>
			<ul>
				<li>Fixes an issue with with jQuery .animate() animation methods.</li>
			</ul>
			
			<h3>0.10.2 <small>Released July 3, 2014</small></h3>
			<ul>
				<li>Fixes an issue with scrolling locking when Slidebars are closed (thanks to <a href="https://github.com/jpadua">Jay Padua</a>).</li>				
			</ul>
			
			<h3>0.10.1 <small>Released June 27, 2014</small></h3>
			<ul>
				<li>Re-written close control class.</li>
				<li>Fixes an issue with scrolling Slidebar menu items on touch devices.</li>
				<li>Improved support for scroll locking on iOS.</li>				
			</ul>
			
			<h3>0.10 <small>Released June 24, 2014</small></h3>
			<ul>
				<li>Links in Slidebars no longer close the containing Slidebar before following the link. Instead add class <code>.sb-close</code> to the <code>&lt;a&gt;</code>, or the parent of <code>&lt;a&gt;</code> to close first.</li>
				<li>Class <code>.sb-disable-close</code> has been depreciated, see above.</li>
				<li>API rework. All API methods are now prefixed with <code>.slidebars</code>. For example <code>yourVariable.slidebars.open('left');</code>.</li>
				<li>New API method <code>.destroy(side)</code>. Removes Slidebar from the DOM.</li>
				<li>New option <code>scrollLock</code> set to true or false, default: false. Prevents site scrolling when a Slidebar is open. Alternatively you may also add class <code>sb-scroll-lock</code> the <code>&lt;html&gt;</code>.</li>
				<li>You may now use class <code>.sb-site-container</code> instead of <code>#sb-site</code>.
				<li>The script no longer checks positions of site container and Slidebar elements, or moves them if located incorrectly.</li>
				<li>.NET compatible.</li>
				<li>New modifier class <code>.sb-momentum-scrolling</code> for Slidebar elements that uses <code>-webkit-overflow-scrolling: touch;</code>.</li>
				<li>Fixes an issue with minimum heights for site container.</li>
				<li>Minimum heights are no longer set for screen sizes larger than disableOver (if provided).</li>
				<li>Fixes issues with push and overlay styles on iOS 7.</li>
				<li>Inactive Slidebars now use <code>display: none;</code> instead of <code>visibility: hidden;</code> to allow for native scrolling as above.</li>
				<li>Inline styling removed after closing animation.</li>
				<li>Fixes a bug with incorrect negative margins when using custom widths and push/overlay styles.</li>
				<li>Fixes a bug where animation snapped open on Android &lt; 4.3</li>
			</ul>
		</div>
	</div>
</div>

<div id="version-history">
	<div class="row">
		<div class="col-xs-12">
			<h2>Version History</h2>
			
			<h3>0.9.4 <small>Released April 1, 2014</small></h3>
			<p>Fixes an issue which affected site locking and scrolling difficulty.</p>
			
			<h3>0.9.1, 0.9.2, 0.9.3</h3>
			<p>jQuery Plugin Registry and Bower fixes.</p>
			
			<h3>0.9 <small>Released March 10, 2014</small></h3>
			<p>Version 0.9 features new animation styles, improved support for iOS &lt; 5, increased API functions, and a few other bug fixes.</p>
			<ul>
				<li>New push animation style, add <a href="usage.php#slidebars">modifier class</a> <code>.sb-style-push</code> to a Slidebar.</li>
				<li>New overlay animation style, add <a href="usage.php#slidebars">modifier class</a> <code>.sb-style-overlay</code> to a Slidebar. <span class="sb-toggle-right text-primary">See example</span>.</li>
				<li>New thin width, add <a href="usage.php#slidebars">modifier class</a> <code>.sb-width-thin</code> to a Slidebar.</li>
				<li>New wide width, add <a href="usage.php#slidebars">modifier class</a> <code>.sb-width-wide</code> to a Slidebar.</li>
				<li>Static Slidebars support for older versions of iOS which do not support <code>position: fixed;</code></li>
				<li>More API functions, return when Slidebars has been initiated, and if either Slidebar is open or closed.</li>
				<li>Re-written window resize events.</li>
				<li>Improved static Slidebars.</li>
				<li>Improved inline <code>min-height</code> styling, to avoid additional spacing under site.</li>
				<li>Fixed a bug where control classes couldn't be hidden using CSS.</li>
				<li><a href="usage.php#helper-classes">Helper class</a> <code>html.sb-android</code> has been depreciated, see below.</li>
				<li>New <a href="usage.php#helper-classes">helper class</a> <code>html.sb-static</code> has been added, use this to un-fix your fixed elements for use on Android &lt; 3 and iOS &lt; 5.</li>
			</ul>
			<p>With regret the Slidebars theme has been dropped from version 0.9. Slidebars wasn't ever really supposed to be about components, just a reliable cross-browser plugin for drawer/sliding functionality.</p>
			
			
			<h3>0.8.2 <small>Released February 24, 2014</small></h3>
			<p>Event handling has been re-written in this update for better Android support. Also fixed an error where unnecessary space was added below the site content on a window resize.</p>
			
			<h3>0.8.1 <small>Released February 17, 2014</small></h3>
			<p>Immediate update which fixes an error which caused Slidebars to fail when only one Slidebar was being used.</p>
			
			<h3>0.8 <small>Released February 17, 2014</small></h3>
			<p>Just over a month after its initial release, Slidebars has had so much positive reception. It has been downloaded nearly 3,000 times, been listed as featured plugin on over 25 sites, starred on Github over 50 times, and forked 17 times. On this site, visitors have opened the Slidebars over 90,000 times!</p>
			<p>If your using Slidebars, and would like to be featured on this site, please let me know. I'm assembling a list of Slidebars out in wild.</p>
			<p>Version 0.8 has some great new features, and fully retains its <a href="compatibility.php">compatibility</a>.</p>
			<ul>
				<li>Links in Slidebars no longer close the containing Slidebar before following the link. Instead add class <code>.sb-close </code> to the <code>&lt;a&gt; </code>, or the parent of <code>&lt;a&gt; </code> to close first.</li>
				<li>API rework. All API methods are now prefixed with <code>.slidebars </code>. For example <code>yourVariable.slidebars.open('left'); </code>.</li>
				<li>New API method <code>.destroy(side) </code>. Removes Slidebar from the DOM.</li>
				<li>New option <code>siteLock </code> set to true or false, default: false. Locks site to prevent site scrolling when Slidebar is open. Alternatively you may also add class <code>sb-lock </code> the <code>&lt;html&gt; </code>.</li>
				<li>You may now use class <code>.sb-site-container </code> instead of <code>#sb-site </code>.</li>
				<li>The script no longer checks positions of site and Slidebar elements, or moves them if located incorrectly.</li>
				<li>.NET compatible.</li>
				<li>New modifier class <code>.sb-momentum-scrolling </code> for Slidebar elements that uses <code>-webkit-overflow-scrolling: touch; </code>.</li>
				<li>Fixes an issue with minimum heights for site container.</li>
				<li>Minimum heights are no longer set for screen sizes larger than disableOver (if provided).</li>
				<li>Fixes issues with push and overlay styles on iOS 7.</li>
				<li>Inactive Slidebars now use <code>display: none; </code> instead of <code>visibility: hidden; </code> to allow for native scrolling as above.</li>
				<li>Inline styling removed after closing animation.</li>
				<li>Fixes a bug with incorrect negative margins when using custom widths and push/overlay styles.</li>
				<li>Fixes a bug where animation snapped open on Android &lt; 4.3.</li>
			</ul>
			
			<h3>0.7.1 <small>Released January 21, 2014</small></h3>
			<ul>
				<li>Added <a href="usage.php#options">Slidebars options</a>.</li>
				<li>Added <a href="usage.php#helper-classes">helper class <code>html.sb-android</code></a> for Android Browser version 2.*. Can be used to unfix your elements with position fixed.</li>
				<li>Added <a href="usage.php#helper-classes">helper class <code>.sb-disable-close</code></a>. Apply to a link in a Slidebar to prevent it from closing on click.</li>
				<li>Smoother jQuery .animate() animations on window resize events.</li>
				<li>Cleaned up code.</li>
			</ul>
			
			<h3>0.7 <small>Released January 13, 2014</small></h3>
			<ul>
				<li>First public release.</li>
			</ul>
		</div>
	</div>
</div>

<!-- Future Development -->
<div id="development">
	<div class="row">
		<div class="col-xs-12">			
			<h2>Future Development</h2>
			<p>Below is a list of future development plans for the plugin. There are currently no expected dates. If you'd like to notified of when this plugin is updated, you can <a href="http://www.adchsm.me/mailing.php">sign up to my mailing list</a>.</p>
			<ul>
				<li>WordPress Plugin</li>
				<li>Top &amp; bottom Slidebars</li>
				<li>Swipe and drag control</li>
				<li>Further API development</li>
				<li>Clean up and further optimise code</li>
			</ul>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#development -->

<?php include('footer.php'); ?>