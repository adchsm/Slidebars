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
	 * Instances
	 */
	
	slidebars.instances = {};
	
	/**
	 * Initiation
	 */
	
	slidebars.init = function () {
		// Loop through and setup each Slidebar
		$( '[off-canvas]' ).each( function () {
			var values = $( this ).attr( 'off-canvas' ).split( ' ', 3 );
			
			slidebars.instances[ values[0] ] = {
				'id': values[0],
				'side': values[1],
				'style': values[2],
				'element': $( this ),
				'active': false
			};
		} );
		
		// Check canvas container height (test for vh support)
		if ( parseInt( $( '[canvas="container"]' ).css( 'height' ), 10 ) < parseInt( $( 'html' ).css( 'height' ), 10 ) ) {
			$( '[canvas="container"]' ).css( 'minHeight', $( 'html' ).css( 'height' ) );
		}
	};
	
	/**
	 * Animation
	 */
	
	slidebars.animate = function ( id, amount ) {
	};
	
	/**
	 * Controls
	 */
	 
	slidebars.open = function ( id ) {
	};
	
	slidebars.close = function ( id ) {
	};
	
	slidebars.toggle = function ( id ) {
	};
	
	/**
	 * Status
	 */
	 
	slidebars.active = function ( id ) {
	};
	
	/**
	 * Creation
	 */
	
	slidebars.create = function () {
	};
	
	slidebars.destroy = function () {
	};
};