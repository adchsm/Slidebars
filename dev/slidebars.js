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
	slidebars.canvas = $( '[canvas]' );
	slidebars.canvasContainer = $( '[canvas="container"]' );
	slidebars.offCanvas = {};
	slidebars.sides = [ 'top', 'right', 'bottom', 'left' ];
	slidebars.styles = [ 'reveal', 'push', 'overlay', 'shift' ];
	
	/**
	 * Initiation
	 */
	
	slidebars.init = function () {
		// Loop through and register Slidebars
		$( '[off-canvas]' ).each( function () {
			// Get the Slidebar parameters
			var parameters = $( this ).attr( 'off-canvas' ).split( ' ', 3 );
			
			// Make sure a valid id, side and style are specified
			if ( typeof parameters[0] !== 'undefined' && slidebars.sides.indexOf( parameters[1] ) !== -1 && slidebars.styles.indexOf( parameters[2] ) !== -1 ) {
				// Check to see if the Slidebar exists
				if ( ! ( parameters[0] in slidebars.offCanvas ) ) {
					// Register the Slidebar
					slidebars.offCanvas[ parameters[0] ] = {
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
	};
	
	/**
	 * CSS
	 */
	
	slidebars.css = function () {
		// Check canvas container height (test for vh support)
		if ( parseInt( slidebars.canvasContainer.css( 'height' ), 10 ) < parseInt( $( 'html' ).css( 'height' ), 10 ) ) {
			slidebars.canvasContainer.css( 'minHeight', $( 'html' ).css( 'height' ) );
		}
		
		// Loop through Slidebars to set negative margins
		for ( var key in slidebars.offCanvas ) {
			// Check Slidebar has the correct id
			if ( slidebars.offCanvas.hasOwnProperty( key ) ) {
				// Calculate offset
				var offset;
				
				if ( slidebars.offCanvas[ key ].side === 'top' || slidebars.offCanvas[ key ].side === 'bottom' ) {
					offset =  slidebars.offCanvas[ key ].element.css( 'height' );
				} else {
					offset =  slidebars.offCanvas[ key ].element.css( 'width' );
				}
				
				// Push and overlay style
				if ( slidebars.offCanvas[ key ].style === 'push' || slidebars.offCanvas[ key ].style === 'overlay' ) {
					slidebars.offCanvas[ key ].element.css( 'margin-' + slidebars.offCanvas[ key ].side, '-' + offset );
				}
				
				// Shift style
				if ( slidebars.offCanvas[ key ].style === 'shift' ) {
					offset = ( parseInt( offset, 10 ) / 2 ) + 'px';
					slidebars.offCanvas[ key ].element.css( 'margin-' + slidebars.offCanvas[ key ].side, '-' + offset );
				}
			}
		}
	};
	
	/**
	 * Animation
	 */
	
	slidebars.animate = function ( id ) {
	};
	
	/**
	 * Controls
	 */
	 
	slidebars.open = function ( id ) {
	};
	
	slidebars.close = function ( id ) {
	};
	
	slidebars.toggle = function ( id ) {
		// Check to see if the Slidebar exists
		if ( id in slidebars.offCanvas ) {
			// Check its status
			if ( slidebars.offCanvas[ id ].active ) {
				// It's open, close it
				slidebars.close( id );
			} else {
				// It's closed, open it
				slidebars.open( id );
			}
		} else {
			throw "Error trying to toggle Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
	};
	
	/**
	 * Status
	 */
	 
	slidebars.active = function ( id ) {
		// Check to see if the Slidebar exists
		if ( id in slidebars.offCanvas ) {
			// Return it's status
			return slidebars.offCanvas[ id ].active;
		} else {
			throw "Error retrieving status of Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
	};
	
	/**
	 * Manage
	 */
	
	slidebars.create = function ( id, side, style, content ) {
		// Make sure a valid id, side and style are specified
		if ( typeof id !== 'undefined' && slidebars.sides.indexOf( side ) !== -1 && slidebars.styles.indexOf( style ) !== -1 ) {
			// Check to see if the Slidebar exists
			if ( ! ( id in slidebars.offCanvas ) ) {
				// Create new element
				$( '<div id="' + id + '" off-canvas="' + id + ' ' + side + ' ' + style + '"></div>' ).appendTo( 'body' );
				
				// Add content to the Slidebar
				if ( typeof content !== 'undefined' ) {
					$( '#' + id ).html( content );
				}
				
				// Register the Slidebar
				slidebars.offCanvas[ id ] = {
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
	};
	
	slidebars.destroy = function ( id ) {
		// Check to see if the Slidebar exists
		if ( id in slidebars.offCanvas ) {
			// Remove the element
			slidebars.offCanvas[ id ].element.remove();
			
			// Remove Slidebar from instances
			delete slidebars.offCanvas[ id ];
		} else {
			throw "Error trying to destroy Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
	};
};