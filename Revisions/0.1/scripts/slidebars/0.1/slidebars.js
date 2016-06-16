// ---------
// Slidebars
// 0.1
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

var ie = (function(){
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
// Slidebars function

function slidebars(context) {
	
	// ---------------
	// Set variables
	var slidebarleftactive = false;
	var slidebarrightactive = false;
	var screenshift;
	var position = context.position || 'absolute'; // Default if not set
	var slidebarleft = context.slidebarleft;
	var slidebarright = context.slidebarright;

	// -------------
	// Run functions
	setposition();
	setscreenshift();
	disableslidebars();
	
	// ----------------
	// Resize functions
	$(window).resize(setscreenshift);
	$(window).resize(setposition);
		
	// ---------
	// Functions
		
	// Set position
	function setposition() {
		// Strip styles
		$("#slidebar-left, #slidebar-right").removeAttr("style");
		$("#viewport").removeAttr("style");
		// Set variables
		var screenheight = $(window).height();
		var siteheight = $("#site").height();
		var slidebarleftheight = $("#slidebar-left").height();
		var slidebarrightheight = $("#slidebar-right").height();
		var maxheight = Math.max(siteheight, slidebarleftheight, slidebarrightheight);
		// Set position - fixed
		if (position == "fixed") {
			// Set bar position
			$("#bar").css({
				'position': 'fixed'
			});
			// Set slidebar position
			$("#slidebar-left, #slidebar-right").css({
				'position': 'fixed'
			});
			// Set left slidebar height
			if (slidebarleftheight > screenheight) {
				$("#slidebar-left").css({
					'overflow-y': 'scroll',
					'height': '100%'
				});
			} else {
				$("#slidebar-left").css({
					'height': '100%'
				});
			}
			// Set right slidebar height
			if (slidebarrightheight > screenheight) {
				$("#slidebar-right").css({
					'overflow-y': 'scroll',
					'height': '100%'
				});
			} else {
				$("#slidebar-right").css({
					'height': '100%'
				});
			}
			// Set viewport height
			if (siteheight <= screenheight) {
				$("#viewport").css({
					'height': '100%'
				});
			} else if (siteheight > screenheight) {
				$("#viewport").css({
					'min-height': '100%'
				});
			}
		// Set position - absolute 
		} else if (position == "absolute") {
			// Set bar position
			$("#bar").css({
				'position': 'absolute'
			});
			// Set slidebar position
			$("#slidebar-left, #slidebar-right").css({
				'position': 'absolute',
				'min-height': '100%'
			});
			// Set viewport height
			if (maxheight <= screenheight) {
				$("#viewport").css({
					'height': '100%'
				});
			} else if (maxheight > screenheight) {
				$("#viewport").css({
					'min-height': maxheight
				});
			}
		}
	}
		
	// Set screen shift
	function setscreenshift() {
		// Set variables
		var screenwidth = $(window).width();
		// Determine width for screen to shift
		if (screenwidth < 481) {
			screenshift = "70%";
		} else if (screenwidth < 769) {
			screenshift = "50%";
		} else {
			screenshift = "25%";
		}
	}
		
	// Open left sidebar
	function openslidebarleft() {
		if (ie < 10) {
			// Using IE under version 10, Use jquery.animate instead of Transit
			$("#site, #bar").animate({
				left: screenshift
			}, 400);
			$("#slidebar-right").animate({
				right: '-' + screenshift
			}, 400);
		} else {
			// Using IE 10 or any other browser, use Transit.
			$("#site, #bar, #slidebar-right").transition({
				x:screenshift,
				duration: 500,
				easing: 'snap'
			});
		}
		slidebarleftactive = true;
	}
		
	// Open right sidebar
	function openslidebarright() {
		if (ie < 10) {
			$("#site, #bar, #slidebar-left").animate({
				left: '-' + screenshift
			}, 400);
		} else {
			$("#site, #bar, #slidebar-left").transition({
				x:'-' + screenshift,
				duration: 500,
				easing: 'snap'
			});
		}
		slidebarrightactive = true;
	}
		
	// Close sidebar
	function closeslidebars() {
		if (ie < 10) {
			$("#site, #bar, #slidebar-left").animate({
				left: '0'
			}, 400);
			$("#slidebar-right").animate({
				right: '0'
			}, 400);
		} else {
			$("#site, #bar, #slidebar-left, #slidebar-right").transition({
				x:'0',
				duration: 500,
				easing: 'ease'
			});
		}
		slidebarleftactive = false;
		slidebarrightactive = false;
		return false;
	}
		
	// Close sidebar via link
	function closeslidebarslink() {
		if (ie < 10) {
			$("#site, #bar, #slidebar-left").animate({
				left: '0'
			}, 400);
			$("#slidebar-right").animate({
				right: '0'
			}, 400);
		} else {
			$("#site, #bar, #slidebar-left, #slidebar-right").transition({
				x:'0',
				duration: 500,
				easing: 'ease'
			});
		}
		slidebarleftactive = false;
		slidebarrightactive = false;
		window.location = href;
	}
	
	// Disable slidears
	function disableslidebars() {
		if (!slidebarleft) {
			$(".slidebar-left-control").css({
				'display': 'none'
			});
			$("#slidebar-left").css({
				'display': 'none'
			});
		}
		if (!slidebarright) {
			$(".slidebar-right-control").css({
				'display': 'none'
			});
			$("#slidebar-right").css({
				'display': 'none'
			});
		}
	}
				
	// -------------
	// Taps & Clicks
		
	// Left sidebar
	$('.slidebar-left-control').hammer().on("tap", function() {
		if (!slidebarleftactive) {
			// Open left slidebar if enabled
			if (slidebarleft) {
				openslidebarleft();
			}
		} else {
			closeslidebars();
		}
	});
		
	// Right sidebar
	$('.slidebar-right-control').hammer().on("tap", function() {
		if (!slidebarrightactive) {
			// Open right slidebar if enabled
			if (slidebarright) {
				openslidebarright();
			}
		} else {
			closeslidebars();
		}
	});
		
	// Close any sidebar by clicking on site
	$('#site').hammer().on("tap", function(e) {
		if (slidebarleftactive || slidebarrightactive) {
			closeslidebars();
			e.preventDefault();
		}
	});
		
	// Close any sidebar by clicking on a link
	$('#slidebar-left a, #slidebar-right a').hammer().on("tap", function(e) {
		if (slidebarleftactive || slidebarrightactive) {
			e.preventDefault();
			href = $(this).attr('href');
			closeslidebarslink();
		}
	});
						
	// ------
	// Swipes
		
	// Swipe left
	$('#viewport').hammer().on("swipeleft", function() {
		if (slidebarleftactive) {
			// Close left sidebar
			closeslidebars();
		} else if (slidebarrightactive) {
			// Do nothing
		} else {
			// Open right slidebar if enabled
			if (slidebarright) {
				openslidebarright();
			}
		}
	});
		
	// Swipe right
	$('#viewport').hammer().on("swiperight", function() {
		if (slidebarleftactive) {
			// Do nothing
		} else if (slidebarrightactive) {
			// Close right sidebar
			closeslidebars();
		} else {
			// Open left slidebar if enabled
			if (slidebarleft) {
				openslidebarleft();
			}
		}
	});
	
}