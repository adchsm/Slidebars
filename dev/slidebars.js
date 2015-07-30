/*!
 * Slidebars - A jQuery framework for off-canvas menus and sidebars.
 * Version: 2.0 Development
 * Url: http://plugins.adchsm.me/slidebars/
 * Author: Adam Charles Smith
 * Author url: http://www.adchsm.com/
 * License: GPL General Pubic License v2.0
 * License url: http://www.gnu.org/licenses/gpl-2.0.html
 */

var slidebars = function () {

	/**
	 * Setup
	 */

	// Cache all canvas elements
	var canvas = $( '[canvas]' ),

	// Instances of Slidebars
	offCanvas = {},

	// Variables, permitted sides and styles
	initialized = false,
	registered = false,
	sides = [ 'top', 'right', 'bottom', 'left' ],
	styles = [ 'reveal', 'push', 'overlay', 'shift' ],

	// Private functions
	registerSlidebar = function ( id, side, style, element ) {
		// Check to see if the Slidebar already exists
		if ( offCanvas.hasOwnProperty( id ) ) {
			throw "Error registering Slidebar, there is already a Slidebar with id '" + id + "'.";
		}

		// Register the Slidebar
		offCanvas[ id ] = {
			'id': id,
			'side': side,
			'style': style,
			'element': element,
			'active': false
		};
	},
	getAnimationProperties = function ( id ) {
		// Set variables
		var elements = $(),
		amount = '0px, 0px',
		duration = parseFloat( offCanvas[ id ].element.css( 'transitionDuration' ), 10 ) * 1000;

		// Elements to animate
		if ( offCanvas[ id ].style === 'reveal' || offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'shift' ) {
			elements = elements.add( canvas );
		}

		if ( offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'overlay' || offCanvas[ id ].style === 'shift' ) {
			elements = elements.add( offCanvas[ id ].element );
		}

		// Amount to animate
		if ( offCanvas[ id ].active ) {
			if ( offCanvas[ id ].side === 'top' ) {
				amount = '0px, ' + offCanvas[ id ].element.css( 'height' );
			} else if ( offCanvas[ id ].side === 'right' ) {
				amount = '-' + offCanvas[ id ].element.css( 'width' ) + ', 0px';
			} else if ( offCanvas[ id ].side === 'bottom' ) {
				amount = '0px, -' + offCanvas[ id ].element.css( 'height' );
			} else if ( offCanvas[ id ].side === 'left' ) {
				amount = offCanvas[ id ].element.css( 'width' ) + ', 0px';
			}
		}

		// Return animation properties
		return { 'elements': elements, 'amount': amount, 'duration': duration };
	};

	/**
	 * Initialize
	 */

	this.init = function ( callback ) {
		// Check Slidebars hasn't been initialized
		if ( initialized ) {
			throw "Slidebars is already initialized.";
		}

		// Loop through and register Slidebars
		if ( ! registered ) {
			$( '[off-canvas]' ).each( function () {
				// Get the Slidebar parameters
				var parameters = $( this ).attr( 'off-canvas' ).split( ' ', 3 );

				// Make sure a valid id, side and style are specified
				if ( ! parameters[ 0 ] || sides.indexOf( parameters[ 1 ] ) === -1 || styles.indexOf( parameters[ 2 ] ) === -1 ) {
					throw "Error registering Slidebar, please specifiy a valid id, side and style'.";
				}

				// Register Slidebar
				registerSlidebar( parameters[ 0 ], parameters[ 1 ], parameters[ 2 ], $( this ) );
			} );

			// Set registered variable
			registered = true;
		}

		// Set init variable
		initialized = true;

		// Set CSS
		this.css();

		// Trigger event
		$( events ).trigger( 'init' );

		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};

	this.exit = function ( callback ) {
		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw "Slidebars has not been initialized.";
		}

		// Exit
		var exit = function () {
			// Set init variable
			initialized = false;

			// Trigger event
			$( events ).trigger( 'exit' );

			// Run callback
			if ( typeof callback === 'function' ) {
				callback();
			}
		};

		// Call exit, close open Slidebar if active
		if ( this.active( 'slidebar' ) ) {
			this.close( exit );
		} else {
			exit();
		}
	};

	/**
	 * CSS
	 */

	this.css = function ( callback ) {
		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw "Slidebars has not been initialized.";
		}

		// Loop through Slidebars to set negative margins
		for ( var id in offCanvas ) {
			// Check Slidebar has the correct id
			if ( offCanvas.hasOwnProperty( id ) ) {
				// Calculate offset
				var offset;

				if ( offCanvas[ id ].side === 'top' || offCanvas[ id ].side === 'bottom' ) {
					offset = offCanvas[ id ].element.css( 'height' );
				} else {
					offset = offCanvas[ id ].element.css( 'width' );
				}

				// Push and overlay style
				if ( offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'overlay' || offCanvas[ id ].style === 'shift' ) {
					offCanvas[ id ].element.css( 'margin-' + offCanvas[ id ].side, '-' + offset );
				}
			}
		}

		// Reposition open Slidebars
		if ( this.active( 'slidebar' ) ) {
			this.open( this.active( 'slidebar' ) );
		}

		// Trigger event
		$( events ).trigger( 'css' );

		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};

	/**
	 * Controls
	 */

	this.open = function ( id, callback ) {
		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw "Slidebars has not been initialized.";
		}

		// Throw error if no id was passed or doesn't exist
		if ( ! id || ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error opening Slidebar, there is no Slidebar with id '" + id + "'.";
		}

		// Open
		var open = function () {
			// Set active state to true
			offCanvas[ id ].active = true;

			// Display the Slidebar
			offCanvas[ id ].element.css( 'display', 'block' );

			// Trigger event
			$( events ).trigger( 'opening', [ offCanvas[ id ].id ] );

			// Get animation properties
			var animationProperties = getAnimationProperties( id );

			// Apply css
			animationProperties.elements.css( {
				'transition-duration': animationProperties.duration + 'ms',
				'transform': 'translate(' + animationProperties.amount + ')'
			} );

			// Transition completed
			setTimeout( function () {
				// Trigger event
				$( events ).trigger( 'opened', [ offCanvas[ id ].id ] );

				// Run callback
				if ( typeof callback === 'function' ) {
					callback();
				}
			}, animationProperties.duration );
		};

		// Call open, close open Slidebar if active
		if ( this.active( 'slidebar' ) && this.active( 'slidebar' ) !== id ) {
			this.close( open );
		} else {
			open();
		}
	};

	this.close = function ( id, callback ) {
		// Shift callback arguments
		if ( typeof id === 'function' ) {
			callback = id;
			id = null;
		}

		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw "Slidebars has not been initialized.";
		}

		// Check to see if the Slidebar exists
		if ( id && ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error closing Slidebar, there is no Slidebar with id '" + id + "'.";
		}

		// If no id was passed, get the active Slidebar
		if ( ! id ) {
			id = this.active( 'slidebar' );
		}

		// Close a Slidebar
		if ( id && offCanvas[ id ].active ) {
			// Set active state to false
			offCanvas[ id ].active = false;

			// Trigger event
			$( events ).trigger( 'closing', [ offCanvas[ id ].id ] );

			// Get animation properties
			var animationProperties = getAnimationProperties( id );

			// Apply css
			animationProperties.elements.css( 'transform', '' );

			// Transition completetion
			setTimeout( function () {
				// Remove transition duration
				animationProperties.elements.css( 'transition-duration', '' );

				// Hide the Slidebar
				offCanvas[ id ].element.css( 'display', 'none' );

				// Trigger event
				$( events ).trigger( 'closed', [ offCanvas[ id ].id ] );

				// Run callback
				if ( typeof callback === 'function' ) {
					callback();
				}
			}, animationProperties.duration );
		}
	};

	this.toggle = function ( id, callback ) {
		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw "Slidebars has not been initialized.";
		}

		// Throw error if no id was passed or doesn't exist
		if ( ! id || ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error toggling Slidebar, there is no Slidebar with id '" + id + "'.";
		}

		// Check Slidebar state
		if ( offCanvas[ id ].active ) {
			// It's open, close it
			this.close( id, function () {
				// Run callback
				if ( typeof callback === 'function' ) {
					callback();
				}
			} );
		} else {
			// It's closed, open it
			this.open( id, function () {
				// Run callback
				if ( typeof callback === 'function' ) {
					callback();
				}
			} );
		}
	};

	/**
	 * Active
	 */

	this.active = function ( query ) {
		// Variable to return
		var active = false;

		// Check init
		if ( ! query ) {
			active = initialized;
		} else

		// Check all Slidebars
		if ( query === 'slidebar' ) {
			// Check Slidebars has been initialized
			if ( ! initialized ) {
				throw "Slidebars has not been initialized.";
			}

			// Loop through Slidebars
			for ( var id in offCanvas ) {
				// Check Slidebar has the correct id
				if ( offCanvas.hasOwnProperty( id ) ) {
					// Check if it's active
					if ( offCanvas[ id ].active ) {
						// Set the active id
						active = offCanvas[ id ].id;
						break;
					}
				}
			}
		} else

		// Check specific id
		{
			// Check Slidebars has been initialized
			if ( ! initialized ) {
				throw "Slidebars has not been initialized.";
			}

			// Check to see if the Slidebar exists
			if ( ! offCanvas.hasOwnProperty( query ) ) {
				throw "Error retrieving Slidebar, there is no Slidebar with id '" + query + "'.";
			}

			// Set the active state
			active = offCanvas[ query ].active;
		}

		// Return
		return active;
	};

	/**
	 * Events
	 */

	this.events = {};
	var events = this.events;

	/**
	 * Resizes
	 */

	$( window ).on( 'resize', this.css.bind( this ) );
};
