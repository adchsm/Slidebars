// -----------------------------------
// Slidebars
// Version 0.6
// http://plugins.adchsm.me/slidebars/
//
// Written by Adam Smith
// http://www.adchsm.me/
//
// Released under MIT License
// http://opensource.org/licenses/MIT
//
// ---------------------
// Index of Slidebars.js
//
// 001 - Initialisation
// 002 - Feature Detection
// 003 - User Agents
// 004 - Animation
// 005 - Operations
// 006 - API
// 007 - Window Resizes
// 008 - User Input

;(function($) {

	$.slidebars = function() {
	
		// --------------------
		// 001 - Initialisation
		
		this.init = true; // User check, returns true if Slidebars has been initiated.
			
		// Site Container
		if(!$('#sb-site').length) {
			// .sb-site doesn't exist, create it.
			$('body').children().wrapAll('<div id="sb-site" />');
		}
		var $site = $('#sb-site'); // Cache the selector.
		if (!$site.parent().is('body')) { // Check its location and move if necessary.
			$site.appendTo('body');
		}
		$site.addClass('sb-slide'); // Add animation class.
		
		// Left Slidebar	
		if ($('.sb-left').length) { // Check the left Slidebar exists.
			var $left = $('.sb-left'), // Cache the selector.
			leftActive = false; // Used to check whether the left Slidebar is open or closed.
			if (!$left.parent().is('body')) { // Check its location and move if necessary.
				$left.appendTo('body');
			}
		}
		
		// Right Slidebar
		if ($('.sb-right').length) { // Check the right Slidebar exists.
			var $right = $('.sb-right'), // Cache the selector.
			rightActive = false; // Used to check whether the right Slidebar is open or closed.
			if (!$right.parent().is('body')) { // Check its location and move if necessary.
				$right.appendTo('body');
			}
		}
		
		// Set Minimum Height
		var setMinHeight = false;
		function minHeight() {
			setMinHeight = true; // Set to true so if resize event is fired, the min-height will be re-calculated.
			// Set the minimum height to avoid showing background on short sites.
			$site.css({
				'min-height': $('html').css('height')
			});
		}
		
		// -----------------------
		// 002 - Feature Detection
		
		var test = document.createElement('div').style,
		supportTransition = false,
		supportTransform = false;
		
		// CSS Transitions
		if (test.MozTransition === '' || test.WebkitTransition === '' || test.OTransition === '' || test.transition === '') {
			supportTransition = true;
		}
		
		// CSS Transforms
		if (test.MozTransform === '' || test.WebkitTransform === '' || test.OTransform === '' || test.transform === '') {
			supportTransform = true;
		}
		
		// -----------------
		// 003 - User Agents
		
		// Get User Agent String
		var ua = navigator.userAgent;
		
		// Detect iPhone, iPad, iPod
		if (ua.match(/(iPhone|iPod|iPad)/)) {
			minHeight();
			$('html').addClass('sb-ios');
		} else
		
		// Detect Android
		if (ua.match(/Android/)) {// The user agent is Android.
			minHeight();
			var android = parseFloat(ua.slice(ua.indexOf('Android')+8)); // Get version of Android.
			var androidVersion = android * 100; // Multiple by 100 to move decimal point.
			androidVersion = parseInt(androidVersion); // Remove decimal point.
			$('html').addClass('sb-android sb-android-' + androidVersion); // Add class to body.
		}
		
		// ---------------
		// 004 - Animation
		
		var animation;
		
		// Set animation type.
		if (supportTransition && supportTransform) {
			if (android < 4.4) {
				animation = 'jquery'; // Android issues translating elements with positioned fixed.
			} else {
				animation = 'translate';
			}
		} else {
			animation = 'jquery';
		}
		
		// Cache all elements to animate.
		var $slide = $('.sb-slide');
		
		// ----------------
		// 003 - Operations
		
		// Open a Slidebar
		function open(side) {
			
			// Check to see if opposite Slidebar is open.
			if (side === 'left' && $left && rightActive || side === 'right' && $right && leftActive) {
				// It's open, close it, then continue.
				close();
				setTimeout(openSlidebar, 400);
			} else {
				// Its not open, continue.
				openSlidebar();
			}
		
			function openSlidebar() {
				if (side === 'left' && $left) { // Open left Slidebar and make sure the left Slidebar is in use.
				
					leftActive = true; // Set active variables.
					var leftWidth = $left.css('width'); // Get the width of the left Slidebar.
					
					$left.addClass('sb-visible'); // Make the slidebar visible.
						
					// Animation
					if (animation == 'translate') {
						$slide.css({
							'-webkit-transform': 'translate(' + leftWidth + ')',
							'-moz-transform': 'translate(' + leftWidth + ')',
							'-o-transform': 'translate(' + leftWidth + ')',
							'transform': 'translate(' + leftWidth + ')'
						});
					} else if (animation == 'jquery') {
						$slide.animate({
							left: leftWidth
						}, 400);
					}
					
					setTimeout(function() {
						$('html').addClass('sb-active sb-active-left'); // Add active classes.
					}, 400);
				
				} else if (side === 'right' && $right) { // Open right Slidebar and make sure the right Slidebar is in use.

					rightActive = true; // Set active variables.
					var rightWidth = $right.css('width'); // Get the width of the right Slidebar.
					
					$right.addClass('sb-visible'); // Make the slidebar visible.
					
					// Animation
					if (animation == 'translate') {
						$slide.css({
							'-webkit-transform': 'translate(-' + rightWidth + ')',
							'-moz-transform': 'translate(-' + rightWidth + ')',
							'-o-transform': 'translate(-' + rightWidth + ')',
							'transform': 'translate(-' + rightWidth + ')'
						});
					} else if (animation == 'jquery') {
						$slide.animate({
							left: '-' + rightWidth
						}, 400);
					}
					
					setTimeout(function() {
						$('html').addClass('sb-active sb-active-right'); // Add active classes.
					}, 400);
				
				} // End if side = left/right.
				
				// Enable closing by sb-site.
				if (side === 'left' && leftActive || side === 'right' && rightActive) { // If a Slidebar was opened.
					$site.off('touchend click'); // Turn off click close incase this was called by a window resize.
					setTimeout(function() {
						$site.one('touchend click', function(e) {
							e.preventDefault(); // Stops click events taking place after touchend.
							close();
						});
					}, 400);
				}
			} // End continue();
			
		}
			
		// Close either Slidebar
		function close(link) {
		
			if (leftActive || rightActive) { // If a Slidebar is open.
				
				leftActive = false; // Set active variable.
				rightActive = false; // Set active variable.
				
				$site.off('touchend click'); // Turn off closing by .sb-site.
				
				// Animation
				if (animation == 'translate') {
					$slide.css({
						'-webkit-transform': 'translate(0px)',
						'-moz-transform': 'translate(0px)',
						'-o-transform': 'translate(0px)',
						'transform': 'translate(0px)'
					});
				} else if (animation == 'jquery') {
					$slide.animate({
						left: '0px'
					}, 400);
				}
				
				setTimeout(function() { // Wait for closing animation to finish.
					// Hide the Slidebars.
					if ($left) {
						$left.removeClass('sb-visible');
					}
					
					if ($right) {
						$right.removeClass('sb-visible');
					}
					
					$('html').removeClass('sb-active sb-active-left sb-active-right'); // Remove active classes.
					
					if (link) { // If a link has been passed to the function, go to it.
						window.location = link;
					}
				}, 400);
				
			}
		
		}
		
		// Toggle either Slidebar
		function toggle(side) {
		
			if (side == 'left' && $left) { // If left Slidebar is called and in use.
				if (leftActive) {
					// Slidebar is open, close it.
					close();
				} else if (!leftActive) {
					// Slidebar is closed, open it.
					open('left');
				}	
			} else if (side === 'right' && $right) { // If right Slidebar is called and in use.
				if (rightActive) {
					// Slidebar is open, close it.
					close();
				} else if (!rightActive) {
					// Slidebar is closed, open it.
					open('right');
				}
			}
			
		}
			
		// ---------
		// 004 - API
		
		this.open = open; // Maps user variable name to the open method.
		this.close = close; // Maps user variable name to the close method.
		this.toggle = toggle; // Maps user variable name to the toggle method.
		
		// --------------------
		// 005 - Window Resizes
		
		function resize() {
			if (setMinHeight) {
				minHeight();
			}
			if (leftActive) { // Left Slidebar is open whilst the window is resized.
				open('left'); // Running the open method will ensure the slidebar is the correct width for new screen size.
			} else if (rightActive) { // Right Slidebar is open whilst the window is resized.
				open('right'); // Running the open method will ensure the slidebar is the correct width for new screen size.
			}
		}
		$(window).resize(resize);
			
		// ----------------
		// 006 - User Input
		
		// Slidebar Toggle Left
		$('.sb-toggle-left').on('touchend click', function(e) {
			e.preventDefault(); // Stops click events taking place after touchend.
			toggle('left');
		});
		
		// Slidebar Toggle Right
		$('.sb-toggle-right').on('touchend click', function(e) {
			e.preventDefault(); // Stops click events taking place after touchend.
			toggle('right');
		});
			
		// Slidebar Left Open
		$('.sb-open-left').on('touchend click', function(e) {
			e.preventDefault(); // Stops click events taking place after touchend.
			if (!leftActive) {
				// Slidebar is closed, open it.
				open('left');
			}
		});
			
		// Slidebar Right Open
		$('.sb-open-right').on('touchend click', function(e) {
			e.preventDefault(); // Stops click events taking place after touchend.
			if (!rightActive) {
				// Slidebar is closed, open it.
				open('right');
			}
		});
		
		// Slidebar Close
		$('.sb-close').on('touchend click', function(e) {
			e.preventDefault(); // Stops click events taking place after touchend.
			if (leftActive || rightActive) {
				// A Slidebar is open, close it.
				close();
			}
		});
		
		// Slidebar Close via Link
		$('.sb-slidebar a').on('touchend click', function(e) {
			e.preventDefault(); // Stop click events taking place after touchend and prevent default link behaviour.
			close( $(this).attr('href') ); // Call closing method and pass link.
		});
	
	}; // End slidebars function.

}) (jQuery);