// ---------
// Slidebars
// 0.3
//
// Written by Adam Smith
// http://www.adchsm.me/
//
// Slidebars uses additional scripts:
// Transit by Rico Sta. Cruz (http://ricostacruz.com/jquery.transit/)
// IE Detection by James Padolsey (http://james.padolsey.com/)

function slidebars(context) {
	
	// ---------------
	// Setup Variables

	var leftActive = false, // Indicates when the left Slidebar is open or closed.
		rightActive = false, // Indicates when the right Slidebar is open or closed.
		screenWidth,
		screenShift, // Contains a percentage to shift the screen by, depends on screen width.
		screenHeight, // Height of the users screen.
		siteHeight, // Height of the main site content.
		leftHeight, // Height of the left Slidebar content.
		rightHeight, // Height of the right Slidebar content.
		maxHeight, // The tallest element on the site.
		ie, // Detects IE and which version.
		style = context.style, // Sets the style of the Menu Bar and Slidebars.
		slidebarLeft = context.slidebarLeft, // Turns the left Slidebar on or off.
		slidebarRight = context.slidebarRight; // Turns the right Slidebar on or off.
		
	// Set default variable values if undefined.
	if (style === undefined) {
		style = 'static';
	}
	if (slidebarLeft === undefined) {
		slidebarLeft = true;
	}
	if (slidebarRight === undefined) {
		slidebarRight = true;
	}
	
	// ---------------------
	// Objects and Functions
		
	var settings = {
		vars: function() {
			$("#slidebar-left, #slidebar-right, #viewport, #site").removeAttr("style"); // Remove styles.
			
			// Determine width of screen to set screen shift and Slidebar width.
			screenWidth = $(window).width();
			if (screenWidth <= 480) {
				screenShift = "70%";
			} else if (screenWidth <= 768) {
				screenShift = "50%";
			} else {
				screenShift = "25%";
			}
			
			$('#slidebar-left, #slidebar-right').css({
				'width': screenShift
			});
			
			screenHeight = $(window).height(); // Height of the users screen.
			siteHeight = $("#site").height(); // Height of the main site content.
			leftHeight = $("#slidebar-left").height(); // Height of the left Slidebar content.
			rightHeight = $("#slidebar-right").height(); // Height of the right Slidebar content.
			maxHeight = Math.max(siteHeight, leftHeight, rightHeight); // The tallest element on the site.
		}, // End variables function.
		disableSlidebars: function() {
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
		}, // End disableSlidebars function.
		ieDetection: function() {
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
		} // End ieDetection function.
	};
	
	
	var ops = {
		openLeft: function () {
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
		},
		openRight: function () {
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
		},
		close: function () {
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
		}, // End close function.
		closeLink: function () {
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
		}, // End closeLink function.
		closeInstant: function () {
			// Find out if user is on an IE version less than 10.
			if (ie < 10) {
				// Using IE under version 10, Use jquery.animate instead of Transit.
				$("#site, #bar, #slidebar-left").css({
					left: '0'
				});
				$("#slidebar-right").css({
					right: '0'
				});
			} else {
				// Using IE 10 or any other browser, use Transit.
				$("#site, #bar, #slidebar-left, #slidebar-right").transition({
					x:'0',
					duration: 0,
				});
			}
			
			// Set varibles to indicate left and right Slidebars are closed.
			leftActive = false;
			rightActive = false;
		} // End close function.
	};
	
	function setStyle() {
		if (style === 'static') {
			// Set the Menu Bar positioning.
			$("#bar").css({
				'position': 'absolute'
			});
			
			// Set Slidebars positioning.
			$("#slidebar-left, #slidebar-right").css({
				'position': 'absolute',
				'min-height': '100%'
			});
			
			// Set #viewport and #site height.
			if (maxHeight <= screenHeight) {
				$("#viewport, #site").css({
					'height': '100%'
				});
			} else if (maxHeight > screenHeight) {
				$("#viewport, #site").css({
					'min-height': maxHeight
				});
			}
		} else if (style === 'fixed') {	
			// Set the positioning for the Menu Bar and Slidebars.
			$("#bar, #slidebar-left, #slidebar-right").css({
				'position': 'fixed'
			});
			
			// Set Slidebar heights.
			$("#slidebar-left, #slidebar-right").css({
				'height': '100%'
			});
			
			// Set Slidebar overflows.
			if (leftHeight > screenHeight) {
				$("#slidebar-left").css({
					'overflow-y': 'scroll',
				});
			}
			if (rightHeight > screenHeight) {
				$("#slidebar-right").css({
					'overflow-y': 'scroll',
				});
			}
				
			// Set #viewport and #site height.
			if (siteHeight <= screenHeight) {
				$("#viewport, #site").css({
					'height': '100%'
				});
			} else if (siteHeight > screenHeight) {
				$("#viewport, #site").css({
					'min-height': '100%'
				});
			}
		} // End if style.
	} // End setStyle function.
	
	// ---------------
	// Setup Functions
	
	settings.vars(); // Set varibles.
	setStyle(); // CSS for styling the Menu Bar and Slidebars.
	settings.ieDetection(); // Detect if using IE and which version.
	if (!slidebarLeft || !slidebarRight) {
		settings.disableSlidebars(); // Hide Slidebars if disabled.
	}
	
	// ----------------
	// Resize Functions
	
	$(window).resize(function(){
		// If Slidebar is open, close it.
		if(leftActive || rightActive) {
			ops.closeInstant();
		}
		settings.vars(); // Reset the variables.
		setStyle(); // Reset Slidebars style.
	});
	
	// -----
	// Input
	
	// Left Slidebar Control
	if (slidebarLeft) {
		// The left Slidebar is enabled.
		$('.slidebar-left-control').click(function() {
			if (!leftActive) {
				// The left Slidebar is closed, called opening function.
				ops.openLeft();
			} else {
				// The left Slidebar is open, call closing function.
				ops.close();
			}
		});
	}
	
	// Right Slidebar Control
	if (slidebarRight) {
		// The right Slidebar is enabled.
		$('.slidebar-right-control').click(function() {
			if (!rightActive) {
				// The right Slidebar is closed, called opening function.
				ops.openRight();
			} else {
				// The right Slidebar is open, call closing function.
				ops.close();
			}
		});
	}
	
	// Close by clicking on #site.
	$('#site').click(function() {
		if (leftActive || rightActive) {
			ops.close(); // Call the closing function.
		}
	});
	
	// Close by clicking a link in the Slidebars.
	$('#slidebar-left a, #slidebar-right a').click(function() {
		if (leftActive || rightActive) {
			e.preventDefault(); // Prevent the default behaviour.
			var href = $(this).attr('href'); // Set a variable containing the url.
			ops.closeLink(); // Call the closing function.
		}
	});
	
} // End function slidebars