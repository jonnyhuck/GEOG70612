/*
 * Some simple spherical geometry functions
 * Much of this is based upon the excellent http://www.movable-type.co.uk/scripts/latlong.html, which is available open source under the MIT License (MIT).
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Offset a point by given distance and direction along a sphere
 *
 * @param lat1 - latitude
 * @param lng1 - longitude
 * @param distance - distance to offset 
 * @param bearing - direction to offset
 * @returns array: [longitude, latitude]
 */
function sphericalOffset(lat1, lon1, distance, bearing) {
	
    var radius = 6371e3;
    var δ = Number(distance) / radius; // angular distance in radians
    var θ = Number(bearing).toRadians();

    var φ1 = lat1.toRadians();
    var λ1 = lon1.toRadians();

    var φ2 = Math.asin(Math.sin(φ1)*Math.cos(δ) + Math.cos(φ1)*Math.sin(δ)*Math.cos(θ));
    var x = Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2);
    var y = Math.sin(θ) * Math.sin(δ) * Math.cos(φ1);
    var λ2 = λ1 + Math.atan2(y, x);

    return  [λ2.toDegrees(), φ2.toDegrees()];
};


/**
 * Ensure and angle is always between 0-360
 *
 * @param angle - the angle to wrap
 * @returns angle wrapped from 0-360
 */
function wrapAngle(angle) {
	return (360 + angle) % 360;
}


/**
 * Calculate the distance between two points on a sphere (Haversine formula)
 *
 * @param lat1 - the latitude of the start point
 * @param lng1 - the longitude of the start point
 * @param lat2 - the latitude of the end point
 * @param lng2 - the longitude of the end point
 * @returns the distance between the two points in metres
 */
function calcDist(lat1, lon1, lat2, lon2){
	
	var R = 6371e3; // metres
	var φ1 = lat1.toRadians();
	var φ2 = lat2.toRadians();
	var Δφ = (lat2-lat1).toRadians();
	var Δλ = (lon2-lon1).toRadians();

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;
	return d
}


/**
 * Calculate the initial bearing between two points on a sphere
 *
 * @param lat1 - the latitude of the start point
 * @param lng1 - the longitude of the start point
 * @param lat2 - the latitude of the end point
 * @param lng2 - the longitude of the end point
 * @returns the bearing between the two points in degrees
 */
function calcBearing(φ1, λ1, φ2, λ2) {
	var y = Math.sin(λ2-λ1) * Math.cos(φ2);
	var x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
	return wrapAngle(Math.atan2(y, x).toDegrees() - 90);
}


/**
 * Extend Number object with method to convert numeric degrees to radians 
 */
if (Number.prototype.toRadians === undefined) {
    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}


/** 
 * Extend Number object with method to convert radians to numeric (signed) degrees 
 */
if (Number.prototype.toDegrees === undefined) {
    Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}