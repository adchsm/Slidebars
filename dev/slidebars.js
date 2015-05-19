/*!
 * Slidebars - A jQuery framework for off-canvas menus and sidebars.
 * Version: Development
 * Url: http://plugins.adchsm.me/slidebars/
 * Author: Adam Charles Smith
 * Author url: http://www.adchsm.me/
 * License: MIT
 * License url: http://opensource.org/licenses/MIT
 */

var slidebars = function () {
	
	/**
	 * Setup
	 */
	
	// Cache all canvas elements and container
	var canvas = $( '[canvas]' ),
	canvasContainer = $( '[canvas="container"]' ),
	
	// Instances of Slidebars
	offCanvas = {},
	
	// Variables, permitted sides, styles and transitions
	init = false,
	sides = [ 'top', 'right', 'bottom', 'left' ],
	styles = [ 'reveal', 'push', 'overlay' ],
	endTransitions = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	
	/**
	 * Initiation
	 */
	
	this.init = function ( callback ) {
		// Loop through and register Slidebars
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
		
		// Set init variable
		init = true;
		
		// Call CSS methodd
		this.css();
		
		// Trigger event
		events.trigger( 'init' );
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * Register Slidebar
	 */
	
	var registerSlidebar = function ( id, side, style, element ) {
		// Check the Slidebar doesn't already exist
		if ( ! ( id in offCanvas ) ) {
			// Register the Slidebar
			offCanvas[ id ] = {
				'id': id,
				'side': side,
				'style': style,
				'element': element,
				'active': false
			};
		} else {
			throw "Error attempting to register Slidebar, a Slidebar with ID '" + id + "' already exists.";
		}
	};
	
	/**
	 * Get Animation Properties
	 */
	
	var getAnimationProperties = function ( id ) {		
		// Set variables
		var elements = $(),
		amount = '0px, 0px';
		
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
		return { 'elements': elements, 'amount': amount };
	};
	
	/**
	 * CSS
	 */
	
	this.css = function ( callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// Check canvas container height (test for vh support)
			if ( parseInt( canvasContainer.css( 'height' ), 10 ) < parseInt( $( 'html' ).css( 'height' ), 10 ) ) {
				canvasContainer.css( 'minHeight', $( 'html' ).css( 'height' ) );
			}
			
			// Loop through Slidebars to set negative margins
			for ( var key in offCanvas ) {
				// Check Slidebar has the correct id
				if ( offCanvas.hasOwnProperty( key ) ) {
					// Calculate offset
					var offset;
					
					if ( offCanvas[ key ].side === 'top' || offCanvas[ key ].side === 'bottom' ) {
						offset =  offCanvas[ key ].element.css( 'height' );
					} else {
						offset =  offCanvas[ key ].element.css( 'width' );
					}
					
					// Push and overlay style
					if ( offCanvas[ key ].style === 'push' || offCanvas[ key ].style === 'overlay' ) {
						offCanvas[ key ].element.css( 'margin-' + offCanvas[ key ].side, '-' + offset );
					}
				}
			}
			
			// Trigger event
			events.trigger( 'css-reset' );
			
			// Run callback
			if ( typeof callback === 'function' ) {
				callback();
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	/**
	 * Controls
	 */
	 
	this.open = function ( id, callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// Check to see if the Slidebar exists
			if ( id in offCanvas ) {
				// Open
				var open = function () {
					// Set active state to true
					offCanvas[ id ].active = true;
					
					// Display the Slidebar
					offCanvas[ id ].element.css( 'display', 'block' );
					
					// Trigger event
					events.trigger( 'opening-' + offCanvas[ id ].id );
					
					// Get animation properties
					var animationProperties = getAnimationProperties( id );
					
					// Apply CSS
					animationProperties.elements.css( 'transform', 'translate(' + animationProperties.amount + ')' );
					
					// On animation completion
					animationProperties.elements.on( endTransitions, function () {
						// Trigger event
						events.trigger( 'opened-' + offCanvas[ id ].id );
						
						// Run callback
						if ( typeof callback === 'function' ) {
							callback();
						}
						
						// Off animation completion
						animationProperties.elements.off( endTransitions );
					} );
				};
				
				// Call to open the Slidebar, close any open Slidebars first ( except for current id )
				if ( this.active() && this.active() !== id ) {
					this.close( this.active(), function () {
						open();
					} );
				} else {
					open();
				}
			} else {
				throw "Error trying to open Slidebar, there is no Slidebar with ID '" + id + "'.";
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	this.close = function ( id, callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// If no id was passed, check to see if any Slidebar is open
			if ( ! id ) {
				// Loop through Slidebars to find active one
				for ( var key in offCanvas ) {
					// Check Slidebar has the correct id
					if ( offCanvas.hasOwnProperty( key ) ) {
						// If it's active, set id
						if ( offCanvas[ key ].active === true ) {
							id = key;
						}
					}
				}
			}
			
			// Close the Slidebar
			if ( id in offCanvas ) {
				// Make sure the Slidebar is open
				if ( offCanvas[ id ].active === true ) {
					// Set active state to false
					offCanvas[ id ].active = false;
					
					// Trigger event
					events.trigger( 'closing-' + offCanvas[ id ].id );
					
					// Get animation properties
					var animationProperties = getAnimationProperties( id );
					
					// Apply CSS
					animationProperties.elements.css( 'transform', 'translate(' + animationProperties.amount + ')' );
					
					// On animation completion
					animationProperties.elements.on( endTransitions, function () {
						// Hide the Slidebar
						offCanvas[ id ].element.css( 'display', 'none' );
						
						// Trigger event
						events.trigger( 'closed-' + offCanvas[ id ].id );
						
						// Run callback
						if ( typeof callback === 'function' ) {
							callback();
						}
						
						// Off animation completion
						animationProperties.elements.off( endTransitions );
					} );
				}
			} else if ( id ) {
				throw "Error trying to close Slidebar, there is no Slidebar with ID '" + id + "'.";
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	this.toggle = function ( id, callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// Check to see if the Slidebar exists
			if ( id in offCanvas ) {
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
			} else {
				throw "Error trying to toggle Slidebar, there is no Slidebar with ID '" + id + "'.";
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	/**
	 * State
	 */
	 
	this.active = function ( id, callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// If no id is passed, check to see if any Slidebar is active
			if ( ! id ) {
				// Active variable
				var active = false;
				
				// Loop through Slidebars
				for ( var key in offCanvas ) {
					// Check Slidebar has the correct id
					if ( offCanvas.hasOwnProperty( key ) ) {
						if ( offCanvas[ key ].active ) {
							// If is active return the id
							active = offCanvas[ key ].id;
							break;
						}
					}
				}
				
				// Return active
				return active;
			} else {
				// Check to see if the Slidebar exists
				if ( id in offCanvas ) {
					// Return it's state
					return offCanvas[ id ].active;
				} else {
					throw "Error retrieving state of Slidebar, there is no Slidebar with ID '" + id + "'.";
				}
			}
			
			// Run callback
			if ( typeof callback === 'function' ) {
				callback();
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	/**
	 * Manage
	 */
	
	this.create = function ( id, side, style, content, callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// Make sure a valid id, side and style are specified
			if ( id && sides.indexOf( side ) !== -1 && styles.indexOf( style ) !== -1 ) {
				// Check to see if the Slidebar exists
				if ( ! ( id in offCanvas ) ) {
					// Create new element
					$( '<div id="' + id + '" off-canvas="' + id + ' ' + side + ' ' + style + '"></div>' ).appendTo( 'body' );
					
					// Add content to the Slidebar
					if ( content ) {
						$( '#' + id ).html( content );
					}
					
					// Register the Slidebar
					registerSlidebar( id, side, style, $( '#' + id ) );
					
					// Call CSS methodd
					this.css();
					
					// Trigger event
					events.trigger( 'created-' + offCanvas[ id ].id );
					
					// Run callback
					if ( typeof callback === 'function' ) {
						callback();
					}
				} else {
					throw "Error attempting to create Slidebar, a Slidebar with ID '" + id + "' already exists.";
				}
			} else {
				throw "Error attempting to create Slidebar, please specifiy a valid space separated 'id side style'.";
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	this.destroy = function ( id, callback ) {
		// Slidebars has been initialized
		if ( init ) {
			// Check to see if the Slidebar exists
			if ( id in offCanvas ) {
				// Destruction
				var destroy = function () {
					// Trigger event
					events.trigger( 'destroyed-' + offCanvas[ id ].id );
					
					// Remove the element
					offCanvas[ id ].element.remove();
					
					// Remove Slidebar from instances
					delete offCanvas[ id ];
					
					// Run callback
					if ( typeof callback === 'function' ) {
						callback();
					}
				};
				
				// Call to destroy the Slidebar, close if the Slidebars is open first
				if ( offCanvas[ id ].active === true ) {
					this.close( id, function () {
						destroy();
					} );
				} else {
					destroy();
				}
			} else {
				throw "Error trying to destroy Slidebar, there is no Slidebar with ID '" + id + "'.";
			}
		} else {
			throw 'You need to initialize Slidebars first.';
		}
	};
	
	/**
	 * Events
	 */
	
	// Public
	this.events = $( this );
	
	// Private
	var events = this.events;
};