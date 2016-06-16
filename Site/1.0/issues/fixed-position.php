<?php
	$title = 'Slidebars | Moving Fixed Positioned Elements';
	$desc = 'Solutions for issues when animating elements with a fixed position.';
	require_once('../functions.php');
	include('../header.php');
?>

<!-- Issues -->
<div id="issues">
	<div class="row">
		<div class="col-xs-12">
			<h1>Issue - Moving Fixed Positioned Elements</h1>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
	
	<div class="row">
		<div class="col-xs-12">
			<p>Slidebars uses CSS transitions and transformations for its animation. There is a known issue when transforming elements that contain children with <code>position:fixed;</code>. A current solution is to put your fixed elements outside of your <a href="<?php echo get_home_directory(); ?>/usage.php#base-classes"><code>#sb-site</code></a> element, and as a direct child of the <code>&lt;body&gt;</code>. Then by giving this element the class <a href="<?php echo get_home_directory(); ?>/usage.php#animation-class"><code>.sb-slide</code></a>, it will also be animated along with the site container.</p>
			
			<div class="alert alert-warning"><p>iOS &lt; 5 and Android &lt; 3 don't support <code>position: fixed;</code>. A <a class="alert-link" href="<?php echo get_home_directory(); ?>/usage.php#helper-classes">helper class</a> <code>html.sb-static</code></a> is added for these versions, and can be used to unfix your design.</p></div>
			
			<h2>Example</h2>
			<p>Here is a modified version of our basic template, which includes a new element called 'navbar' - a navigation bar that sits at the top of the page, which we have added the class <a href="<?php echo get_home_directory(); ?>/usage.php#animation-class"><code>.sb-slide</code></a>.</p>
			
			<pre><code class="prettyprint">&lt;!doctype html&gt;<br>&lt;html&gt;<br>  &lt;head&gt;<br>    &lt;title&gt;Slidebars Basic Template&lt;/title&gt;<br>    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"&gt;<br><br>    &lt;!-- Slidebars CSS --&gt;<br>    &lt;link rel="stylesheet" href="path/to/slidebars.min.css"&gt;<br>  &lt;/head&gt;<br><br>  &lt;body&gt;<br>    &lt;div id="sb-site"&gt;<br>      &lt;!-- Your main site content. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;div class="navbar sb-slide"&gt;<br>      &lt;!-- Your navigation here. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;div class="sb-slidebar sb-left"&gt;<br>      &lt;!-- Your left Slidebar content. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;div class="sb-slidebar sb-right"&gt;<br>      &lt;!-- Your right Slidebar content. --&gt;<br>    &lt;/div&gt;<br><br>    &lt;!-- jQuery --&gt;<br>    &lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"&gt;&lt;/script&gt;<br><br>    &lt;!-- Slidebars --&gt;<br>    &lt;script src="path/to/slidebars.min.js"&gt;&lt;/script&gt;<br>    &lt;script&gt;<br>      (function($) {<br>        $(document).ready(function() {<br>          $.slidebars();<br>        });<br>      }) (jQuery);<br>    &lt;/script&gt;<br>  &lt;/body&gt;<br>&lt;/html&gt;</code></pre>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#issues -->

<?php include('../footer.php'); ?>