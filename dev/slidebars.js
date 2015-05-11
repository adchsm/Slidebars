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
	var offCanvas = {};
	
	$( '[off-canvas]' ).each( function () {
		var values = $( this ).attr( 'off-canvas' ).split( ' ', 3 );
		
		offCanvas[ values[0] ] = {
			'id': values[0],
			'side': values[1],
			'style': values[2],
			'element': $( this )
		};
	} );
	
	console.log( offCanvas );
};