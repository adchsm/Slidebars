// -------------------------------------------------------------
// Slidebars 0.5 - http://plugins.adchsm.me/slidebars/ written by Adam Smith - http://www.adchsm.me/
//
// ---------------------
// Index of Slidebars.js
//
// 001 - Checks & Global Variables
// 002 - IE Detection
// 003 - Operations
// 004 - API
// 005 - Window Resizes
// 006 - User Input

;(function($) {

	$.slidebars = function() {
	
		// -------------------------------
		// 002 - Checks & Global Variables
		
		// Slidebars Initialisation
		this.init = true; // User check, returns true if Slidebars has been initiated.
			
		// Site Container
		if($('.sb-site').length) { // Check to see if site container exists.
			// .sb-site does exist.
			$('.sb-site').addClass('sb-slide'); // Add moving class.
	
			if (!$('.sb-site').parent().is('body')) { // Check its location and move if necessary.
				$('.sb-site').appendTo('body');
			}
		} else {
			// .sb-site doesn't exist, create it.
			$('body').children().wrapAll('<div class="sb-site sb-slide" />');
		}
		
		// Left Slidebar	
		if ($('.sb-left').length) { // Check the left Slidebar exists.
			var left = true, // Set variable.
			leftActive = false; // Used to check whether the left Slidebar is open or closed.
			if (!$('.sb-left').parent().is('body')) { // Check its location and move if necessary.
				$('.sb-left').appendTo('body');
			}
		}
		
		// Right Slidebar
		if ($('.sb-right').length) { // Check the right Slidebar exists.
			var right = true, // Set variable.
			rightActive = false; // Used to check whether the right Slidebar is open or closed.
			if (!$('.sb-right').parent().is('body')) { // Check its location and move if necessary.
				$('.sb-right').appendTo('body');
			}
		}
			
		// ------------------------------------------
		// 002 - Detect IE (Thanks to James Padolsey)
		
		var ie = (function() {
			var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');
			
			while (
				div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				all[0]
		    );
		    
		    return v > 4 ? v : undef;
		}());
		
		// ----------------
		// 003 - Operations
		
		// Open a Slidebar
		function open(side) {
			
			// Check to see if opposite Slidebar is open.
			if (side === 'left' && left && rightActive || side === 'right' && right && leftActive) {
				// It's open, close it, then continue.
				close();
				setTimeout(openSlidebar, 400);
			} else {
				// Its not open, continue.
				openSlidebar();
			}
		
			function openSlidebar() {
				if (side === 'left' && left) { // Open left Slidebar and make sure the left Slidebar is in use.
				
					leftActive = true; // Set active variables.
					var leftWidth = $('.sb-left').css('width'); // Get the width of the left Slidebar.
					
					$('.sb-left').css({'visibility': 'visible'}); // Make the slidebar visible.
						
					// Animation type by browser.
					if (ie < 10) { // jQuery .animate() for IE9 <.
						$('.sb-slide').animate({
							left: leftWidth
						}, 400);
					} else { // CSS Transform for other browsers & IE10+.
						$('.sb-slide').css({
							'-webkit-transform': 'translate(' + leftWidth + ')',
							'-moz-transform': 'translate(' + leftWidth + ')',
							'-o-transform': 'translate(' + leftWidth + ')',
							'transform': 'translate(' + leftWidth + ')'
						});
					} // End if ie.
				
				} else if (side === 'right' && right) { // Open right Slidebar and make sure the right Slidebar is in use.

					rightActive = true; // Set active variables.
					var rightWidth = $('.sb-right').css('width'); // Get the width of the right Slidebar.
					
					$('.sb-right').css({'visibility': 'visible'}); // Make the slidebar visible.
					
					// Animation type by browser.
					if (ie < 10) { // jQuery .animate() for IE9 <.
						$('.sb-slide').animate({
							left: '-' + rightWidth
						}, 400);
					} else { // CSS Transform for other browsers & IE10+.
						$('.sb-slide').css({
							'-webkit-transform': 'translate(-' + rightWidth + ')',
							'-moz-transform': 'translate(-' + rightWidth + ')',
							'-o-transform': 'translate(-' + rightWidth + ')',
							'transform': 'translate(-' + rightWidth + ')'
						});
					} // End if ie.
				
				} // End if side = left/right.
				
				// Enable closing by sb-site.
				if (side === 'left' && leftActive || side === 'right' && rightActive) { // If a Slidebar was opened.
					$('.sb-site').off('touchend click'); // Turn off click close incase this was called by a window resize.
					setTimeout(function() {
						$('.sb-site').one('touchend click', function(e) {
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
				
				$('.sb-site').off('touchend click'); // Turn off closing by .sb-site.
				
				// Animation type by browser.
				if (ie < 10) { // jQuery .animate() for IE9 <.
					$('.sb-slide').animate({
						left: '0px'
					}, 400);
				} else { // CSS Transform for other browsers & IE10+.
					$('.sb-slide').css({
						'-webkit-transform': 'translate(0px)',
						'-moz-transform': 'translate(0px)',
						'-o-transform': 'translate(0px)',
						'transform': 'translate(0px)'
					});
				} // End if ie.
				
				setTimeout(function() { // Wait for closing animation to finish.
					$('.sb-left, .sb-right').css({'visibility': 'hidden'}); // Hide the Slidebars.
					
					if (link) { // If a link has been passed to the function, go to it.
						window.location = link;
					}
				}, 400);
				
			}
		
		}
		
		// Toggle either Slidebar
		function toggle(side) {
		
			if (side == 'left' && left) { // If left Slidebar is called and in use.
				if (leftActive) {
					// Slidebar is open, close it.
					close();
				} else if (!leftActive) {
					// Slidebar is closed, open it.
					open('left');
				}	
			} else if (side === 'right' && right) { // If right Slidebar is called and in use.
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