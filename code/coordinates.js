/**
 * This code handles some basic coordinate operations for a Google Map:
 *
 * - Convert WGS84 coordinates to Web Mercator coordinates
 * - Convert WGS84 coordinates to pixel coordinates
 * - Convert pixel coordinates to a tile reference
 *
 * Much of the code is derived from:
 * - https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 * - https://alastaira.wordpress.com/2011/01/23/the-google-maps-bing-maps-spherical-mercator-projection/
 *
 * @author jonnyhuck(jonathan.huck@manchester.ac.uk)
 */

//The size of a tile in pixels
var TILE_SIZE = 256;


/**
 * This is the code to project latitude/longitude coordinates to web mercator.
 * latLng is a google.maps.LatLng object
 * returns a google.maps.Point object
 */
function getWebMercatorCoordinates(latLng) {
  var x = latLng.lng() * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + latLng.lat()) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return new google.maps.Point(x, y);
  
}


/**
 * Work out the pixel coordinates for latitude/longitude coordinates
 * latLng is a google.maps.LatLng object
 * returns a google.maps.Point object
 */
function getPixelCoordinates(latLng, zoom) { 

	// this gives the scale of the map 
	var scale = 1 << zoom;	
	
	/* The mapping between latitude, longitude and pixels is defined by the web mercator projection. */
	
	//projection step 1 (transform to world coordinates)
	var siny = Math.sin(latLng.lat() * Math.PI / 180);
	
	//this effectively rounds it to just outside the bounds of the world tile
	siny = Math.min(Math.max(siny, -0.9999), 0.9999);
	
	//projection step 2 (scale to map dimensions)
	var x = TILE_SIZE * (0.5 + latLng.lng() / 360);
	var y = TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI));

	//work out the pixel coordinates
	return new google.maps.Point(
		Math.floor(x * scale),
		Math.floor(y * scale));
}


/**
 * Work out the tile coordinates for given Web Mercator Coordinates
 * pixelCoords is a google.maps.Point object
 * returns a google.maps.Point object
 */
function getTileReference(pixelCoords, zoom) {

	// this gives the scale of the map 
	var scale = 1 << zoom;	
	
	// work out the tile reference
	return new google.maps.Point(
		Math.floor(pixelCoords.x / TILE_SIZE),
		Math.floor(pixelCoords.y / TILE_SIZE));
}