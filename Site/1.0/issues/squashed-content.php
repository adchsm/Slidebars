<?php
	$title = 'Slidebars | Issues - Squashed Content';
	$desc = 'How to fix squashed navigation bar content with Android.';
	require_once('../functions.php');
	include('../header.php');
?>
				
<div class="row">
	<div class="col-xs-12">
		<h1>Issue - Squashed Content</h1>
	</div><!-- /.col-xs-12 -->
</div><!-- /.row -->

<div class="row">
	<div class="col-xs-12">
		<p>If you are implementing Slidebars alongside a framework such as Bootstrap, you may come across an error with squashed navbar content on Android.</p>
		
		<p>As Android &lt; 4.4 can't translate elements with <code>postioned: fixed;</code>, Slidebars uses <code>left</code> to animate.</p>
		
		<p>The Bootstrap framework has the following styling for their <code>.navbar</code>:</p>
		<pre class="pull-left"><code class="prettyprint">.navbar {<br>  left: 0;<br>  right: 0;<br>}</code></pre><div class="clearfix"></div>
		
		<p>When a Slidebar is opened, the styling would look something like:</p>
		<pre class="pull-left"><code class="prettyprint">.navbar {<br>  left: 240px;<br>  right: 0;<br>}</code></pre><div class="clearfix"></div>
		
		<p>As you can imagine, the content within the navbar would be squashed. A solution is to over-right the frameworks default styling with:</p>
		<pre class="pull-left"><code class="prettyprint">.navbar {<br>  width: 100%<br>  left: auto;<br>  right: auto;<br>}</code></pre><div class="clearfix"></div>
	</div><!-- /.col-xs-12 -->
</div><!-- /.row -->

<?php include('../footer.php'); ?>