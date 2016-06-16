// ---------
// Slidebars
// 0.4
//
// Written by Adam Smith
// http://www.adchsm.me/

// ----------------
// Define variables

var style, // Sets the style of the Menu Bar and Slidebars.
	slidebarLeft, // Turns the left Slidebar on or off.
	slidebarRight, // Turns the right Slidebar on or off.
	ajax,
	ajaxContentID,
	dontAjax,
	leftActive = false,
	rightActive = false,
	href = false,
	shift,
	ie;

// ----------------
// Slidebars object

var slidebars = {
	// -----------------
	// Startup Slidebars
	
	launch: function(options) {
		// Set options
		style = options.style; // Sets the style of the Menu Bar and Slidebars.
		slidebarLeft = options.slidebarLeft; // Turns the left Slidebar on or off.
		slidebarRight = options.slidebarRight; // Turns the right Slidebar on or off.
		ajax = options.ajax; // Weather to load new links via ajax or not.
		
		if (ajax) {
			ajaxContentID = options.ajaxContentID; // The id of the container to load new page content from.
			dontAjax = options.dontAjax; // Url patterns load to load via ajax.
		}
			
		// Set default options if undefined.
		if (style === undefined) {
			style = 'static';
		}
		if (slidebarLeft === undefined) {
			slidebarLeft = true;
		}
		if (slidebarRight === undefined) {
			slidebarRight = true;
		}
		if (ajax === undefined) {
			ajax = false;
			ajaxContentID = false;
			dontAjax = false;
		}
		if (ajax) {
			if (ajaxContentID === undefined) { // Make sure content id is set.
				alert('You must specify a main content id for use with ajax links.');
			}
		}
		
		// Start Slidebars
		slidebars.css();
		slidebars.ieDet();
		slidebars.disable();
		slidebars.input();
		if (ajax) {
			slidebars.ajaxSetup();
		}
		
		// Resize functions
		$(window).resize(slidebars.resize);
	},
	
	// --------------
	// Core functions
	
	css: function() {
		// Remove inline styles.
		$('#site, #slidebar-left, #slidebar-right').css({
			'height': ''
		});
	
		// Widths
		var screenWidth = $(window).width(); // Get width of screen.
		
		if (screenWidth <= 480) { // Set widths of mobile slidebars.
			shift = screenWidth * 0.7; // Set width to shift the screen by.
			$('#slidebar-left, #slidebar-right').css({
				'width': shift
			});
		} else if (screenWidth <= 768) { // Set widths of tablet slidebars.
			shift = screenWidth * 0.5; // Set width to shift the screen by.
			$('#slidebar-left, #slidebar-right').css({
				'width': shift
			});
		} else {
			shift = screenWidth * 0.25; // Set width to shift the screen by.
			$('#slidebar-left, #slidebar-right').css({ // Set widths of desktop slidebars.
				'width': shift
			});
		}
		
		// Heights
		var viewportHeight = $('#viewport').height(), // Get the viewport height.
		barHeight = $('#bar').height(), // Get height of bar.
		siteHeight = $('#site').height(), // Get height of site.
		leftHeight = $('#slidebar-left').height(), // Get height of left slidebar.
		rightHeight = $('#slidebar-right').height(), // Get height of right slidebar.
		maxHeight = Math.max(siteHeight, leftHeight, rightHeight); // Figure out the tallest element on the screen.
		
		$('#bar .wrapper').css({ // Set height of bar wrapper.
			'height': barHeight
		});
		
		$('#site').css({ // Set top margin of the site to the height of the menu bar.
			'margin-top': barHeight
		});
		
		// Set positioning
		if (style === 'static') { // Set static positioning.
			$('#site, #slidebar-left, #slidebar-right').css({ // Set heights to max.
				'height': maxHeight
			});
		} else if (style === 'fixed') { // Set fixed positioning.
			$('#bar, #slidebar-left, #slidebar-right').css({
				'position': 'fixed'
			});
			if (siteHeight > viewportHeight) {
				$('#site').css({
					'overflow-y': 'scroll'
				});
			}
			if (leftHeight > viewportHeight) {
				$('#slidebar-left').css({
					'overflow-y': 'scroll'
				});
			}
			if (rightHeight > viewportHeight) {
				$('#slidebar-right').css({
					'overflow-y': 'scroll'
				});
			}
		}
	},
	disable: function() {
		if (!slidebarLeft) {
			$('#slidebar-left, .slidebar-left-control').remove();
		}
		if (!slidebarRight) {
			$('#slidebar-right, .slidebar-right-control').remove();
		}
	},
	ieDet: function() { // Thanks to James Padolsey for this IE Detection (padolsey.com).
		ie = (function() {
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
	},
	resize: function() {
		slidebars.css();
		if (leftActive) {
			slidebars.openLeft();
		}
		if (rightActive) {
			slidebars.openRight();
		}
	},
	
	// ------------
	// Ajax Loading
	
	ajaxSetup: function() {
		dontAjax = dontAjax.split(", "); // Convert url patterns not to ajax, from string into array.
		
		// Create the loading div.
		$(ajaxContentID).parent().append('<div id="loading"><div id="spinner"></div></div>');
		
		// Kick start ajax links.
		slidebars.ajaxLinks();
	},
	ajaxLinks: function() {
		$('a').on('click', function(e) {
			e.preventDefault(); // Prevent default link behaviour.
			
			var link; // Define variables.
			href = $(this).attr('href'); // Get the url the user is going too.
				
			// Check if url contains any of the terms not to ajax.
			for(var i = 0, len = dontAjax.length; i<len; i++) {
				link = href.indexOf(dontAjax[i]);
				if (link != -1) break;
			}
				
			if (link == -1) { // The url doesn't contain any of the dontAjax strings, load it.
				// Close slidebars if open.
				if (leftActive || rightActive) {
					slidebars.close();
					setTimeout(slidebars.ajaxLoad, 400);
				} else {
					slidebars.ajaxLoad();
				}
						
			} else { // The url contains one of the not strings, just load the url as usual.
				window.location = href;
			}
		});
	},
	ajaxLoad: function() {
		// Fade out content.
		$(ajaxContentID).fadeOut(200);
			
		// Show loading animation.
		$('#loading').css({'display': 'table'});
		
		// Animating in IE.
		if (ie === 9) { // IE 9 doesn't support css animation, so we'll have to use css transform and jquery animate.
			$('#loading').append('<div id="degrees"></div>'); // Create a div to animate to hold degrees.
			$('#degress').css({ // Hide it, no one needs to see that.
				'display': 'none'
			});
			$('#spinner').css({ // Add transform css to spinnner.
				'-ms-transform': 'rotate(0)deg'
			});
			
			// Loop animation 5 times.
			for(var i = 0; i < 4; i++) {
				$('#degrees').css( // Reset the degrees.
					'marginTop', '0'
				);
				$('#degrees').animate({
					'marginTop': 359
				}, {
					duration: 200,
					step: function(now, fx) {
						$('#spinner').css({
							'-ms-transform': 'rotate(' + now + 'deg)'
						});
					}
				});
			}
			
		} else if (ie <= 8) { // IE 8 doesn't support css transform, so just going to put a loading message out instead.
			$('#loading').html('<p>Loading...</p>'); // Slightly supporting theie8countdown.com
		}
		
		$('#loading').fadeIn(100);

		// Load the page.
		$(ajaxContentID).load(href + ' ' + ajaxContentID, function() {
			// Page has loaded.
			
			// Update browser address and history.
			if (ie === undefined || ie === 10) { // IE 9 and under dont support pushState, and will prevent loading.
				history.pushState('', '', href);
			}
		
			// Hide loading animation.
			$('#loading').fadeOut(100);
			$('#loading').css({'display': 'none'});
		
			// Fade in content.
			$(ajaxContentID).fadeIn(200);
		
			// Turn off clicks.
			$('a').off('click');
		
			// Re call this function, to apply click function to newly loaded page.
			slidebars.ajaxLinks();
		});
	},
	
	// ----------
	// User Input
	
	input: function() {
		// Slidebar left control
		$('.slidebar-left-control').on('touchend click', function(e) {
			e.preventDefault(); // Prevents clicks occuring after touch events.
			if (leftActive) {
				slidebars.close();
			} else {
				slidebars.openLeft();
			}
		});
		
		// Slidebar right control
		$('.slidebar-right-control').on('touchend click', function(e) {
			e.preventDefault(); // Prevents clicks occuring after touch events.
			if (rightActive) {
				slidebars.close();
			} else {
				slidebars.openRight();
			}
		});
		
		// Close slidebars by clicking on site
		$('#site').on('touchend click', function(e) {
			if (leftActive || rightActive) {
				e.preventDefault();
				slidebars.close();
			}
		});
		
		// Stop taps and clicks on children of #site bubbling events.
		$('#site').children().on('touchend click', function(e) {
			e.stopPropagation();
		});
		
		// Close slidebars by clicking on link
		$('#slidebar-left a, #slidebar-right a').on('touchend click', function(e) {
			if (leftActive || rightActive) {
				e.preventDefault(); // Stops the link being processed.
				href = $(this).attr('href'); // Set a variable containing the url.
				slidebars.close(); // Call the closing function.
			}
		});
	},
	
	// --------------
	// User Functions
	
	openLeft: function() {
		if (slidebarLeft) { // Check to make sure the left slidebar isn't disabled.
			$('#slidebar-left').css({ // Make the slidebar visible.
				'visibility': 'visible'
			});
			
			// Detect browser.
			if (ie < 10) { // Animate, for IE versions 9 and under.
				$('#site, #bar').animate({
					left: shift + 'px'
				}, 400);
			} else { // Transform for other browsers & IE 10.
				$('#site, #bar').css({
					'-ms-transform': 'translate(' + shift + 'px)',
					'-webkit-transform': 'translate(' + shift + 'px)',
					'transform': 'translate(' + shift + 'px)'
				});
			}
			
			leftActive = true; // Set active variable.
		}
	},
	openRight: function() {
		if (slidebarRight) { // Check to make sure the right slidebar isn't disabled.
			$('#slidebar-right').css({ // Make the slidebar visible.
				'visibility': 'visible'
			});
			
			// Detect browser.
			if (ie < 10) { // Animate, for IE versions 9 and under.
				$('#site, #bar').animate({
					left: '-' + shift + 'px'
				}, 400);
			} else { // Transform for other browsers & IE 10.
				$('#site, #bar').css({
					'-ms-transform': 'translate(-' + shift + 'px)',
					'-webkit-transform': 'translate(-' + shift + 'px)',
					'transform': 'translate(-' + shift + 'px)'
				});
			}
			
			rightActive = true; // Set active variable.
		}
	},
	close: function() {
		if (leftActive || rightActive) { // Make sure one of the left or right slidebars are open.
			// Detect browser.
			if (ie < 10) { // Animate, for IE versions 9 and under.
				$('#site, #bar').animate({
					left: '0px'
				}, 400);
			} else { // Transform for other browsers & IE 10.
				$('#site, #bar').css({
					'-ms-transform': 'translate(0)',
					'-webkit-transform': 'translate(0)',
					'transform': 'translate(0)'
				});
			}
			
			setTimeout(function() {// Make the slidebars invisible.
				$('#slidebar-left, #slidebar-right').css({
					'visibility': 'hidden'
				});
			}, 400);
			
			leftActive = false; // Set inactive variable.
			rightActive = false; // Set inactive variable.
			
			if (!ajax && href) { // If ajax is false and link is set, go to it.
				window.location = href;
				href = false;
			}
		}
	},
	disableLeft: function() {
		slidebarLeft = false;
		if (leftActive) { // Check to see if the left slidebar is open first.
			slidebars.close(); // Close it.
			setTimeout(slidebars.disable, 400); // Disable it after 400ms.
		} else { // Left slidebars is not open.
			slidebars.disable(); // Disable it.
		}
	},
	disableRight: function() {
		slidebarRight = false;
		if (rightActive) { // Check to see if the right slidebar is open first.
			slidebars.close(); // Close it.
			setTimeout(slidebars.disable, 400); // Disable it after 400ms.
		} else { // Right slidebars is not open.
			slidebars.disable(); // Disable.
		}
	}
}