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
	
	/**
	 * Accepted Parameters
	 */
	
	slidebars.parameters = {
		'side': [ 'top', 'right', 'bottom', 'left' ],
		'style': [ 'reveal', 'push', 'overlay', 'shift' ]
	};
	
	/**
	 * Instances
	 */
	
	slidebars.instances = {};
	
	/**
	 * Initiation
	 */
	
	slidebars.init = function () {
		// Loop through and register each Slidebar
		$( '[off-canvas]' ).each( function () {
			// Get the Slidebar parameters
			var parameters = $( this ).attr( 'off-canvas' ).split( ' ', 3 );
			
			// Make sure a valid id, side and style are specified
			if ( typeof parameters[0] !== 'undefined' && slidebars.parameters.side.indexOf( parameters[1] ) !== -1 && slidebars.parameters.style.indexOf( parameters[2] ) !== -1 ) {
				// Check to see if the Slidebar exists
				if ( ! ( parameters[0] in slidebars.instances ) ) {
					// Register the Slidebar
					slidebars.instances[ parameters[0] ] = {
						'id': parameters[0],
						'side': parameters[1],
						'style': parameters[2],
						'element': $( this ),
						'active': false
					};
				} else {
					throw "Error attempting to register a Slidebar, a Slidebar with ID '" + parameters[0] + "' already exists.";
				}
			} else {
				throw "Error attempting to register a Slidebar, please specifiy a valid space separated 'id side style'.";
			}
		} );
		
		// Check canvas container height (test for vh support)
		if ( parseInt( $( '[canvas="container"]' ).css( 'height' ), 10 ) < parseInt( $( 'html' ).css( 'height' ), 10 ) ) {
			$( '[canvas="container"]' ).css( 'minHeight', $( 'html' ).css( 'height' ) );
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
		if ( id in slidebars.instances ) {
			// Check its status
			if ( slidebars.instances[ id ].active ) {
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
		if ( id in slidebars.instances ) {
			// Return it's status
			return slidebars.instances[ id ].active;
		} else {
			throw "Error retrieving status of Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
	};
	
	/**
	 * Manage
	 */
	
	slidebars.create = function ( id, side, style, content ) {
		// Make sure a valid id, side and style are specified
		if ( typeof id !== 'undefined' && slidebars.parameters.side.indexOf( side ) !== -1 && slidebars.parameters.style.indexOf( style ) !== -1 ) {
			// Check to see if the Slidebar exists
			if ( ! ( id in slidebars.instances ) ) {
				// Create new element
				$( '<div id="' + id + '" off-canvas="' + id + ' ' + side + ' ' + style + '"></div>' ).appendTo( 'body' );
				
				// Add content to the Slidebar
				if ( typeof content !== 'undefined' ) {
					$( '#' + id ).html( content );
				}
				
				// Register the Slidebar
				slidebars.instances[ id ] = {
					'id': id,
					'side': side,
					'style': style,
					'element': $( '#' + id ),
					'active': false
				};
			} else {
				throw "Error attempting to create a Slidebar, a Slidebar with ID '" + id + "' already exists.";
			}
		} else {
			throw "Error attempting to create a Slidebar, please specifiy a valid space separated 'id side style'.";
		}
	};
	
	slidebars.destroy = function ( id ) {
		// Check to see if the Slidebar exists
		if ( id in slidebars.instances ) {
			// Remove the element
			slidebars.instances[ id ].element.remove();
			
			// Remove Slidebar from instances
			delete slidebars.instances[ id ];
		} else {
			throw "Error trying to destroy Slidebar, there is no Slidebar with ID '" + id + "'.";
		}
	};
};