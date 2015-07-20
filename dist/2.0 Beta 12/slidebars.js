/*!
 * Slidebars - A jQuery framework for off-canvas menus and sidebars.
 * Version: 2.0 Beta 12
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

	// Variables, permitted sides, styles and transitions
	initialized = false,
	registered = false,
	sides = [ 'top', 'right', 'bottom', 'left' ],
	styles = [ 'reveal', 'push', 'overlay' ],

	// Functions
	registerSlidebar = function ( id, side, style, element ) {
		// Check to see if the Slidebar already exists
		if ( offCanvas.hasOwnProperty( id ) ) {
			throw "Error attempting to register Slidebar, a Slidebar with ID '" + id + "' already exists.";
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
		if ( offCanvas[ id ].style === 'reveal' || offCanvas[ id ].style === 'push' ) {
			elements = elements.add( canvas );
		}

		if ( offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'overlay' ) {
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
			throw 'You have already initialized Slidebars.';
		}

		// Loop through and register Slidebars
		if ( ! registered ) {
			$( '[off-canvas]' ).each( function () {
				// Get the Slidebar parameters
				var parameters = $( this ).attr( 'off-canvas' ).split( ' ', 3 );

				// Make sure a valid id, side and style are specified
				if ( parameters[ 0 ] && sides.indexOf( parameters[ 1 ] ) !== -1 && styles.indexOf( parameters[ 2 ] ) !== -1 ) {
					// Register Slidebar
					registerSlidebar( parameters[ 0 ], parameters[ 1 ], parameters[ 2 ], $( this ) );
				} else {
					throw "Error attempting to register Slidebar, please specifiy a valid space separated 'id side style'.";
				}
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
			throw 'You need to initialize Slidebars first.';
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
			throw 'You need to initialize Slidebars first.';
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
				if ( offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'overlay' ) {
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
			throw 'You need to initialize Slidebars first.';
		}

		// If no id was passed, throw error
		if ( ! id ) {
			throw "Error trying to open Slidebar, you must specify an ID.";
		}

		// Check to see if the Slidebar exists
		if ( ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error trying to open Slidebar, there is no Slidebar with ID '" + id + "'.";
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
			throw 'You need to initialize Slidebars first.';
		}

		// Check to see if the Slidebar exists
		if ( id && ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error trying to close Slidebar, there is no Slidebar with ID '" + id + "'.";
		}

		// If no id was passed, check to see if any Slidebar is open
		if ( ! id ) {
			// Loop through Slidebars to find active one
			for ( var key in offCanvas ) {
				// Check Slidebar has the correct id
				if ( offCanvas.hasOwnProperty( key ) ) {
					// If it's active, set id
					if ( offCanvas[ key ].active ) {
						id = key;
						break;
					}
				}
			}
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
			throw 'You need to initialize Slidebars first.';
		}

		// If no id was passed, throw error
		if ( ! id ) {
			throw "Error trying to toggle Slidebar, you must specify an ID.";
		}

		// Check to see if the Slidebar exists
		if ( ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error trying to toggle Slidebar, there is no Slidebar with ID '" + id + "'.";
		}

		// Check its state
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

	this.active = function ( query, callback ) {
		// Shift callback arguments
		if ( typeof query === 'function' ) {
			callback = query;
			query = null;
		}

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
				throw 'You need to initialize Slidebars first.';
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
				throw 'You need to initialize Slidebars first.';
			}

			// Check to see if the Slidebar exists
			if ( ! offCanvas.hasOwnProperty( query ) ) {
				throw "Error retrieving state of Slidebar, there is no Slidebar with ID '" + query + "'.";
			}

			// Set the active state
			active = offCanvas[ query ].active;
		}

		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}

		// Return
		return active;
	};

	/**
	 * Manage
	 */

	this.create = function ( id, side, style, content, callback ) {
		// Shift callback arguments
		if ( typeof content === 'function' ) {
			callback = content;
			content = null;
		}

		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw 'You need to initialize Slidebars first.';
		}

		// Make sure a valid id, side and style are specified
		if ( id && sides.indexOf( side ) !== -1 && styles.indexOf( style ) !== -1 ) {
			// Check to see if the Slidebar exists
			if ( offCanvas.hasOwnProperty( id ) ) {
				throw "Error attempting to create Slidebar, a Slidebar with ID '" + id + "' already exists.";
			}

			// Create new element
			$( '<div id="' + id + '" off-canvas="' + id + ' ' + side + ' ' + style + '"></div>' ).appendTo( 'body' );

			// Add content to the Slidebar
			if ( content ) {
				$( '#' + id ).html( content );
			}

			// Register the Slidebar
			registerSlidebar( id, side, style, $( '#' + id ) );

			// Reset CSS
			this.css();

			// Trigger event
			$( events ).trigger( 'created', [ offCanvas[ id ].id ] );

			// Run callback
			if ( typeof callback === 'function' ) {
				callback();
			}
		} else {
			throw "Error attempting to create Slidebar, please specifiy a valid space separated 'id side style'.";
		}
	};

	this.destroy = function ( id, callback ) {
		// Check Slidebars has been initialized
		if ( ! initialized ) {
			throw 'You need to initialize Slidebars first.';
		}

		// If no id was passed, throw error
		if ( ! id ) {
			throw "Error trying to destroy Slidebar, you must specify an ID.";
		}

		// Check to see if the Slidebar exists
		if ( ! offCanvas.hasOwnProperty( id ) ) {
			throw "Error trying to destroy Slidebar, there is no Slidebar with ID '" + id + "'.";
		}

		// Destruction
		var destroy = function () {
			// Trigger event
			$( events ).trigger( 'destroyed', [ offCanvas[ id ].id ] );

			// Remove the element
			offCanvas[ id ].element.remove();

			// Remove Slidebar from instances
			delete offCanvas[ id ];

			// Run callback
			if ( typeof callback === 'function' ) {
				callback();
			}
		};

		// Call destroy, close open Slidebar if active
		if ( offCanvas[ id ].active ) {
			this.close( id, destroy );
		} else {
			destroy();
		}
	};

	/**
	 * Events
	 */

	// Public
	this.events = {};

	// Private
	var events = this.events;

	/**
	 * Resizes
	 */

	window.onresize = this.css.bind( this );
};
