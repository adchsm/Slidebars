<?php
	$title = 'Slidebars | Issues - Modal,js';
	$desc = 'How to use Modal.js with Slidebars.';
	require_once('../functions.php');
	include('../header.php');
?>

<style type="text/css">
	body.modal-open #sb-site{
		position: static;
		-webkit-transform: none !important;
		transform: none !important;
	}
</style>
				
<!-- Modal -->
<div id="modal">
	<div class="row">
		<div class="col-xs-12">
			<h1>Issue - Modal.js</h1>
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
	
	<div class="row">
		<div class="col-xs-12">
			<p>Modal.js (also included with Bootstrap) doesn't display correctly when sitting inside a parent with <code>position: relative;</code>.</p>
			<p>Modal.js provides a helper class <code>body.modal-open</code> that indicates when a modal is open.</p>
			<p>You can add the following CSS to your site to alter the positioning for <code>#sb-site</code> when a modal is in use.</p>
			<pre class="pull-left"><code class="prettyprint">&lt;style type="text/css"&gt;<br>  body.modal-open #sb-site {<br>    position: static;<br>    -webkit-transform: none !important;<br>    transform: none !important;<br>  }<br>&lt;/style&gt;</code></pre><div class="clearfix"></div>
			<p>Another solution is to put your Modal content outside of the <code>#sb-site</code> element. If you do this, you will not need to add the CSS snippet above.</p>
			
			<!-- Modal Trigger -->
			<button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Launch Modal</button>
			
			<!-- Modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			        <h4 class="modal-title" id="myModalLabel">Modal</h4>
			      </div>
			      <div class="modal-body">
			     	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non purus quis erat egestas facilisis accumsan ut mi. Nulla in varius ipsum. Mauris sit amet est vel ante egestas semper et vitae libero. Vestibulum quis metus justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean vehicula, risus vitae blandit ornare, erat nibh tincidunt nulla, at vehicula lacus sapien eu est. Vestibulum id rutrum lectus. Integer ullamcorper elit nec luctus molestie. Fusce cursus, lorem eu vehicula commodo, lacus diam viverra leo, nec euismod orci justo id orci. Praesent varius erat at enim adipiscing, id varius est suscipit. In hac habitasse platea dictumst. Phasellus a rutrum ante, ut rhoncus dolor.</p>
			     	<p>Morbi vitae lorem eget nunc posuere consequat eu et augue. Donec tristique, leo eu laoreet dapibus, tellus felis porta risus, quis commodo justo enim ac turpis. Sed tellus urna, pretium in leo a, auctor posuere diam. Quisque at dolor eros. Integer eu facilisis nisi, auctor volutpat sapien. Aliquam tempus orci ut porta mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			      </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			
			<!-- END DEMO MODAL -->
			
		</div><!-- /.col-xs-12 -->
	</div><!-- /.row -->
</div><!-- /#modal -->

<?php include('../footer.php'); ?>