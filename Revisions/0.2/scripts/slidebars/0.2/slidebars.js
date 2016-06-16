// ---------
// Slidebars
// 0.2
//
// Written by Adam Smith
// http://www.adchsm.me/
//
// Slidebars uses additional scripts:
// Hammer.js by Eight Media (http://eightmedia.github.io/hammer.js/)
// Transit by Rico Sta. Cruz (http://ricostacruz.com/jquery.transit/)
// IE Detection by James Padolsey (http://james.padolsey.com/)

// -----------------
// IE < 10 Detection

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

// ------------------
// Slidebars Function

function slidebars(context) {
	
	// ---------------
	// Setup Variables

	var leftActive = false, // Indicates when the left Slidebar is open or closed.
		rightActive = false, // Indicates when the right Slidebar is open or closed.
		screenWidth,
		screenShift, // Contains a percentage to shift the screen by, depends on screen width.
		style = context.style, // Sets the style and behaviour of the Menu and Slidebars.
		slidebarLeft = context.slidebarLeft, // Turns the left Slidebar on or off.
		slidebarRight = context.slidebarRight, // Turns the right Slidebar on or off.
		swipes = context.swipes; // Enables touch based swipes.
		
	// Set default variable values if undefined.
	if (typeof style === 'undefined') {
		style = 'absolute';
	}
	if (typeof slidebarLeft === 'undefined') {
		slidebarLeft = true;
	}
	if (typeof slidebarRight === 'undefined') {
		slidebarRight = true;
	}
	if (typeof swipes === 'undefined') {
		swipes = true;
	}
	
	// --------------------
	// Call Setup Functions
	
	setStyle(); // CSS for styling the Menu Bar and Slidebars.
	setScreenShift(); // Sets variable ammount to shift the screen by when opening a Slidebar.
	if (!slidebarLeft || !slidebarRight) {
		disableSlidebars(); // CSS hide Slidebars if disabled.
	}
	
	// ---------------------
	// Call Resize Functions
	
	$(window).resize(setStyle); // If window is resized reset css style.
	$(window).resize(setScreenShift); // If window is resized reset the screen shift variable.
	
	// ---------------------
	// Set Activate Variable
	
	var slidebarsActive = true;
	
	// ---------
	// Functions
		
		// ---------
		// Set Style
		
		function setStyle() {
		
			// Set function variables.
			var screenHeight = $(window).height(), // Height of the users screen.
				siteHeight = $("#site").height(), // Height of the main site content.
				leftHeight = $("#slidebar-left").height(), // Height of the left Slidebar content.
				rightHeight = $("#slidebar-right").height(), // Height of the right Slidebar content.
				maxHeight = Math.max(siteHeight, leftHeight, rightHeight); // The tallest element on the site.
				
			// Remove previous inline style attributes incase this function was called before.
			$("#slidebar-left, #slidebar-right, #viewport").removeAttr("style");
		
			if (style === 'absolute') {
							
				// Set the Menu Bar positioning.
				$("#bar").css({
					'position': 'absolute'
				});
				
				// Set Slidebars positioning.
				$("#slidebar-left, #slidebar-right").css({
					'position': 'absolute',
					'min-height': '100%'
				});
				
				// Set #viewport height.
				if (maxHeight <= screenHeight) {
					$("#viewport").css({
						'height': '100%'
					});
				} else if (maxHeight > screenHeight) {
					$("#viewport").css({
						'min-height': maxHeight
					});
				}
				
			} else if (style === 'fixed') {
			
				// Set the positioning for the Menu Bar and Slidebars.
				$("#bar, #slidebar-left, #slidebar-right").css({
					'position': 'fixed'
				});
				
				// Set left Slidebar height.
				if (leftHeight > screenHeight) {
					$("#slidebar-left").css({
						'overflow-y': 'scroll',
						'height': '100%'
					});
				} else {
					$("#slidebar-left").css({
						'height': '100%'
					});
				}
				
				// Set right Slidebar height.
				if (rightHeight > screenHeight) {
					$("#slidebar-right").css({
						'overflow-y': 'scroll',
						'height': '100%'
					});
				} else {
					$("#slidebar-right").css({
						'height': '100%'
					});
				}
				
				// Set #viewport height.
				if (siteHeight <= screenHeight) {
					$("#viewport").css({
						'height': '100%'
					});
				} else if (siteHeight > screenHeight) {
					$("#viewport").css({
						'min-height': '100%'
					});
				}
				
			} // End if style.
			
		}
	
		// ----------------
		// Set Screen Shift
		
		function setScreenShift() {
		
			// Set variables
			screenWidth = $(window).width();
			
			// Determine width of screen to set screen shift.
			if (screenWidth <= 480) {
				screenShift = "70%";
			} else if (screenWidth <= 768) {
				screenShift = "50%";
			} else {
				screenShift = "25%";
			}
			
		}
		
		// -----------------
		// Disable Slidebars
		
		function disableSlidebars() {
		
			// If left Slidebar is disabled, hide it.
			if (!slidebarLeft) {
				$('#slidebar-left, .slidebar-left-control').css({
					'display': 'none'
				});
			}
			// If right Slidebar is disabled, hide it.
			if (!slidebarRight) {
				$('#slidebar-right, .slidebar-right-control').css({
					'display': 'none'
				});
			}
			
		}
		
		// ------------------
		// Open Left Slidebar
		
		function openLeft() {
		
			// Find out if user is on an IE version less than 10.
			if (ie < 10) {
				// Using IE under version 10, Use jquery.animate instead of Transit.
				$("#site, #bar").animate({
					left: screenShift
				}, 400);
				$("#slidebar-right").animate({
					right: '-' + screenShift
				}, 400);
			} else {
				// Using IE 10 or any other browser, use Transit.
				$("#site, #bar, #slidebar-right").transition({
					x: screenShift,
					duration: 500,
					easing: 'snap'
				});
			}
			
			// Set varible to indicate left Slidebar is open.
			leftActive = true;
			
		}
		
		// -------------------
		// Open Right Slidebar
		
		function openRight() {
			
			// Find out if user is on an IE version less than 10.
			if (ie < 10) {
				// Using IE under version 10, Use jquery.animate instead of Transit.
				$("#site, #bar, #slidebar-left").animate({
					left: '-' + screenShift
				}, 400);
			} else {
				// Using IE 10 or any other browser, use Transit.
				$("#site, #bar, #slidebar-left").transition({
					x: '-' + screenShift,
					duration: 500,
					easing: 'snap'
				});
			}
			
			// Set varible to indicate right Slidebar is open.
			rightActive = true;
			
		}
		
		// ---------------
		// Close Slidebars
		
		function close() {
		
			// Find out if user is on an IE version less than 10.
			if (ie < 10) {
				// Using IE under version 10, Use jquery.animate instead of Transit.
				$("#site, #bar, #slidebar-left").animate({
					left: '0'
				}, 400);
				$("#slidebar-right").animate({
					right: '0'
				}, 400);
			} else {
				// Using IE 10 or any other browser, use Transit.
				$("#site, #bar, #slidebar-left, #slidebar-right").transition({
					x:'0',
					duration: 500,
					easing: 'ease'
				});
			}
			
			// Set varibles to indicate left and right Slidebars are closed.
			leftActive = false;
			rightActive = false;
			
		}
		
		// ------------------------
		// Close Slidebars Via Link
		
		function closeLink() {
		
			// Find out if user is on an IE version less than 10.
			if (ie < 10) {
				// Using IE under version 10, Use jquery.animate instead of Transit.
				$("#site, #bar, #slidebar-left").animate({
					left: '0'
				}, 400);
				$("#slidebar-right").animate({
					right: '0'
				}, 400);
			} else {
				// Using IE 10 or any other browser, use Transit.
				$("#site, #bar, #slidebar-left, #slidebar-right").transition({
					x:'0',
					duration: 500,
					easing: 'ease'
				});
			}
			
			// Set varibles to indicate left and right Slidebars are closed.
			leftActive = false;
			rightActive = false;
			
			// Redirect browser to the link clicked.
			window.location = href;
			
		}
		
	// End Functions
	
	// -----
	// Input
	
		// Left Slidebar Control
		if (slidebarLeft) {
			// The left Slidebar is enabled.
			$('.slidebar-left-control').hammer().on("tap", function() {
				if (!leftActive) {
					// The left Slidebar is closed, called opening function.
					openLeft();
				} else {
					// The left Slidebar is open, call closing function.
					close();
				}
			});
		}
		
		// Right Slidebar Control
		if (slidebarRight) {
			// The right Slidebar is enabled.
			$('.slidebar-right-control').hammer().on("tap", function() {
				if (!rightActive) {
					// The right Slidebar is closed, called opening function.
					openRight();
				} else {
					// The right Slidebar is open, call closing function.
					close();
				}
			});
		}
		
		// Close by clicking on #site.
		$('#site').hammer().on("tap", function() {
			if (leftActive || rightActive) {
				close(); // Call the closing function.
			}
		});
		
		// Close by clicking a link in the Slidebars.
		$('#slidebar-left a, #slidebar-right a').hammer().on("tap", function(e) {
			if (leftActive || rightActive) {
				e.preventDefault(); // Prevent the default behaviour.
				var href = $(this).attr('href'); // Set a variable containing the url.
				closeLink(); // Call the closing function.
			}
		});
		
		// ------
		// Swipes
		
		if (swipes) {
		
			// Swipe Left
			$('#viewport').hammer().on("swipeleft", function() {

				if (leftActive) {
					// The left Slidebar is active, call closing function.
					close();
				} else if (rightActive) {
					// The right Slidebar is active, do nothing.
				} else {
					// Open the right Slidebar if its enabled.
					if (slidebarRight) {
						openRight();
					}
				}
				
			});
				
			// Swipe Right
			$('#viewport').hammer().on("swiperight", function() {
			
				if (leftActive) {
					// The left Slidebar is active, do nothing.
				} else if (rightActive) {
					// The right Slidebar is active, call closing function.
					close();
				} else {
					// Open the left Slidebar if its enabled.
					if (slidebarLeft) {
						openLeft();
					}
				}
			
			});
		
		}
		
	// End Input
	
} // End function slidebars