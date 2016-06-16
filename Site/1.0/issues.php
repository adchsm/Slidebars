<?php
	$title = 'Slidebars | Issues';
	$desc = 'Known issues with Slidebars.';
	require_once('functions.php');
	include('header.php');
?>

<!-- Contact -->
<div id="issues">
	<div class="row">
		<div class="col-xs-12">
			<h1>Issues</h1>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
	
	<div class="row">
		<div class="col-xs-12">
		<p>If you find any issues, please report them on <a class="github" href="https://github.com/adchsm/Slidebars">Github</a>.</p>
		
		<h2><a href="issues/fixed-position.php">Fixed Positions</a></h2>
		<p>Slidebars uses CSS transitions and transformations for its animation. There is a known issue about transforming elements that contain children with <code>position: fixed;</code>. You can over come this by following <a href="issues/fixed-position.php">this guide</a>.</p>
		
		<h2><a href="issues/modal.php">Modal.js</a></h2>
		<p>Modal.js (also included with Bootstrap) doesn't display correctly when sitting inside a parent with <code>position: relative;</code>. Here is a <a href="issues/modal.php">css snippet to make modals work with Slidebars</a>.</p>
		
		<h2><a href="issues/squashed-content.php">Squashed Content in Navbar</a></h2>
		<p>For those using Slidebars with Bootstrap, or any other framework that offers a full width navigation bar. You may be experiencing issues with squashed content in your navbar when using Android. This can easily be <a href="issues/squashed-content.php">fixed with a css snippet</a>.</p>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#issues -->

<?php include('footer.php'); ?>