					</div><!-- /#content-->
					
					<div id="adverts" class="col-xs-12 col-sm-3">						
						<div class="advert pull-left">
							<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
							<!-- Slidebars -->
							<ins class="adsbygoogle"
							     style="display:inline-block;width:256px;height:116px"
							     data-ad-client="ca-pub-7022862816626393"
							     data-ad-slot="7692326661"></ins>
							<script>
							(adsbygoogle = window.adsbygoogle || []).push({});
							</script>
						</div><div class="clearfix"></div>
						
						<!-- Dreamhost Ads -->
						<a id="dreamhost" href="http://www.dreamhost.com/r.cgi?678849">
							<img src="http://images.dreamhost.com/rewards/300x250-Sunny2.png" alt="DreamHost" class="img-responsive advert">
						</a>
					</div>
				
				</div><!-- /.row -->
				
				<footer>
					<div class="row">
						<div class="col-xs-12">
							<small>Slidebars &copy; 2013 - 2014 <a href="http://www.adchsm.me/">Adam Smith</a></small>
						</div>
					</div>
				</footer>
			
			</div><!-- /.container -->
		</div><!-- /#sb-site -->
		
		<!-- Slidebars -->
		<?php
			include('slidebar-left.php');
			include('slidebar-right.php');
		?>

		<!-- Scripts -->
		<!-- jQuery -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		
		<!-- Bootstrap -->
		<script src="<?php echo get_home_directory(); ?>/scripts/bootstrap/js/bootstrap.min.js"></script>
		
		<!-- Slidebars -->
		<script src="<?php echo get_home_directory(); ?>/scripts/slidebars/slidebars.min.js"></script>
		<script>
			(function($) {
				$(document).ready(function() {
					// Initiate Slidebars
					$.slidebars();
				});
			}) (jQuery);
		</script>
		
		<!-- Further Tracking -->
		<script>
			(function($) {
				$(document).ready(function() {
					// Downloads
					// 0.10.3
					$('a.download-0103').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.10.3', {'nonInteraction': 1});
					});
					// 0.10.2
					$('a.download-0102').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.10.2', {'nonInteraction': 1});
					});
					// 0.10.1
					$('a.download-0101').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.10.1', {'nonInteraction': 1});
					});
					// 0.10
					$('a.download-010').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.10', {'nonInteraction': 1});
					});
					// 0.9.4
					$('a.download-094').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.9.4', {'nonInteraction': 1});
					});
					// 0.9
					$('a.download-09').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.9', {'nonInteraction': 1});
					});
					// 0.8.2
					$('a.download-082').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.8.2', {'nonInteraction': 1});
					});
					// 0.8.1
					$('a.download-081').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.8.1', {'nonInteraction': 1});
					});
					// 0.8
					$('a.download-08').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.8', {'nonInteraction': 1});
					});
					// 0.7.1
					$('a.download-071').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.7.1', {'nonInteraction': 1});
					});
					// 0.7
					$('a.download-07').on('click', function() {
						ga('send', 'event', 'Download', 'Slidebars', '0.7', {'nonInteraction': 1});
					});
					// Github
					$('a.github').on('click', function() {
						ga('send', 'event', 'External Link', 'GitHub', {'nonInteraction': 1});
					});
					// Dreamhost
					$('a#dreamhost').on('click', function() {
						ga('send', 'event', 'External Link', 'DreamHost', {'nonInteraction': 1});
					});
					// Open Left Slidebar
					$('.sb-open-left, .sb-toggle-left').on('touchend click', function() {
						ga('send', 'event', 'Function', 'Open Slidebar', 'Open Left Slidebar', {'nonInteraction': 1});
					});
					// Open Right Slidebar
					$('.sb-open-right, .sb-toggle-right').on('touchend click', function() {
						ga('send', 'event', 'Function', 'Open Slidebar', 'Open Right Slidebar', {'nonInteraction': 1});
					});
				});
			}) (jQuery);
		</script>
		
		<!-- Prettify -->
		<script src="//google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>
		
		<!-- Smooth Page Scrolling -->
		<script>
			(function($) {
				$(document).ready(function() {
					$('a[href^="#"]').on('touchend click', function(e) {
						e.preventDefault();
						var id = $(this).attr("href");
						var offset = 70;
						var target = $(id).offset().top - offset;
						
						$('html, body').animate({scrollTop:target}, 500);
					});
				});
			}) (jQuery);
		</script>
		
		<!-- Form Validation -->
		<script src="<?php echo get_home_directory(); ?>/scripts/form-validation.js"></script>
	</body>
</html>