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
	
	slidebars = this;
	
	// Cache all canvas elements and container
	var canvas = $( '[canvas]' ),
	canvasContainer = $( '[canvas="container"]' ),
	
	// Instances of Slidebars
	offCanvas = {},
	
	// Permitted sides and styles
	sides = [ 'top', 'right', 'bottom', 'left' ],
	styles = [ 'reveal', 'push', 'overlay', 'shift' ];
	
	/**
	 * Initiation
	 */
	
	slidebars.init = function ( callback ) {
		// Loop through and register Slidebars
		$( '[off-canvas]' ).each( function () {
			// Get the Slidebar parameters
			var parameters = $( this ).attr( 'off-canvas' ).split( ' ', 3 );
			
			// Make sure a valid id, side and style are specified
			if ( typeof parameters[0] !== 'undefined' && sides.indexOf( parameters[1] ) !== -1 && styles.indexOf( parameters[2] ) !== -1 ) {
				// Check to see if the Slidebar exists
				if ( ! ( parameters[0] in offCanvas ) ) {
					// Register the Slidebar
					offCanvas[ parameters[0] ] = {
						'id': parameters[0],
						'side': parameters[1],
						'style': parameters[2],
						'element': $( this ),
						'active': false
					};
				} else {
					throw "Error attempting to register Slidebar, a Slidebar with ID '" + parameters[0] + "' already exists.";
				}
			} else {
				throw "Error attempting to register Slidebar, please specifiy a valid space separated 'id side style'.";
			}
		} );
		
		// Call CSS methodd
		slidebars.css();
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * CSS
	 */
	
	slidebars.css = function ( callback ) {
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
				
				// Shift style
				if ( offCanvas[ key ].style === 'shift' ) {
					offset = ( parseInt( offset, 10 ) / 2 ) + 'px';
					offCanvas[ key ].element.css( 'margin-' + offCanvas[ key ].side, '-' + offset );
				}
			}
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * Animation
	 */
	
	var animate = function ( id, task, callback ) {
		// Cache elements to animate by animation style
		var elements = $();
		
		if ( offCanvas[ id ].style === 'reveal' ) {
			elements = elements.add( canvas );
		}
		
		if ( offCanvas[ id ].style === 'push' ) {
			elements = elements.add( canvas ).add( offCanvas[ id ].element );
		}
		
		if ( offCanvas[ id ].style === 'overlay' ) {
			elements = elements.add( offCanvas[ id ].element );
		}
		
		if ( offCanvas[ id ].style === 'shift' ) {
			// Need to figure this out
		}
		
		// Calculate amount
		var amount;
		
		if ( task === 'open' ) {
			if ( offCanvas[ id ].side === 'top' ) {
				amount = '0px, ' + offCanvas[ id ].element.css( 'height' );
			} else if ( offCanvas[ id ].side === 'right' ) {
				amount = '-' + offCanvas[ id ].element.css( 'width' ) + ', 0px';
			} else if ( offCanvas[ id ].side === 'bottom' ) {
				amount = '0px, -' + offCanvas[ id ].element.css( 'height' );
			} else if ( offCanvas[ id ].side === 'left' ) {
				amount = offCanvas[ id ].element.css( 'width' ) + ', 0px';
			}
		} else {
			amount = '0px, 0px';
		}
		
		// Apply CSS
		elements.css( 'transform', 'translate(' + amount + ')' );
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * Controls
	 */
	 
	slidebars.open = function ( id, callback ) {
		// Check to see if the Slidebar exists
		if ( id in offCanvas ) {
			// Display the Slidebar
			offCanvas[ id ].element.css( 'display', 'block' );
			
			// Open the Slidebar
			animate( id, 'open', function () {
				// Set active to true
				offCanvas[ id ].active = true;
			} );
		} else {
			throw "Error trying to open Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	slidebars.close = function ( id, callback ) {
		// If no id was passed, close any Slidebar
		if ( typeof id === 'undefined' ) {
			// Loop through Slidebars to find active one
			for ( var key in offCanvas ) {
				// Check Slidebar has the correct id
				if ( offCanvas.hasOwnProperty( key ) ) {
					// If its active, set id to close
					if ( offCanvas[ key ].active === true ) {
						id = key;
					}
				}
			}
		}
		
		// Close the Slidebar
		if ( typeof id !== 'undefined' && id in offCanvas && offCanvas[ id ].active === true ) {
			// Close the Slidebar
			animate( id, 'close', function () {
				// Set active to false
				offCanvas[ id ].active = false;
				
				// Hide the Slidebar
				offCanvas[ id ].element.css( 'display', 'hidden' );
			} );
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	slidebars.toggle = function ( id, callback ) {
		// Check to see if the Slidebar exists
		if ( id in offCanvas ) {
			// Check its status
			if ( offCanvas[ id ].active ) {
				// It's open, close it
				slidebars.close( id );
			} else {
				// It's closed, open it
				slidebars.open( id );
			}
		} else {
			throw "Error trying to toggle Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * Status
	 */
	 
	slidebars.active = function ( id, callback ) {
		// Check to see if the Slidebar exists
		if ( id in offCanvas ) {
			// Return it's status
			return offCanvas[ id ].active;
		} else {
			throw "Error retrieving status of Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * Manage
	 */
	
	slidebars.create = function ( id, side, style, content, callback ) {
		// Make sure a valid id, side and style are specified
		if ( typeof id !== 'undefined' && sides.indexOf( side ) !== -1 && styles.indexOf( style ) !== -1 ) {
			// Check to see if the Slidebar exists
			if ( ! ( id in offCanvas ) ) {
				// Create new element
				$( '<div id="' + id + '" off-canvas="' + id + ' ' + side + ' ' + style + '"></div>' ).appendTo( 'body' );
				
				// Add content to the Slidebar
				if ( typeof content !== 'undefined' ) {
					$( '#' + id ).html( content );
				}
				
				// Register the Slidebar
				offCanvas[ id ] = {
					'id': id,
					'side': side,
					'style': style,
					'element': $( '#' + id ),
					'active': false
				};
				
				// Call CSS methodd
				slidebars.css();
			} else {
				throw "Error attempting to create Slidebar, a Slidebar with ID '" + id + "' already exists.";
			}
		} else {
			throw "Error attempting to create Slidebar, please specifiy a valid space separated 'id side style'.";
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	slidebars.destroy = function ( id, callback ) {
		// Check to see if the Slidebar exists
		if ( id in offCanvas ) {
			// Remove the element
			offCanvas[ id ].element.remove();
			
			// Remove Slidebar from instances
			delete offCanvas[ id ];
		} else {
			throw "Error trying to destroy Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
		
		// Run callback
		if ( typeof callback === 'function' ) {
			callback();
		}
	};
	
	/**
	 * Testing
	 */
	
	slidebars.offCanvas = offCanvas; // Map instances of all Slidebars to a public function
};