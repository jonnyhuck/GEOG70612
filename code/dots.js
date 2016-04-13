/**
 * This code makes basic 'dot' icons for a Google Map:
 *
 * Parameters:
 *  - colour: a hex code String (hash optional) e.g.: "#ff00ff" OR "ff00ff"
 *  - diameter: the diameter of the dot in pixels
 *
 * @author jonnyhuck(jonathan.huck@manchester.ac.uk)
 */
function makeDot(colour, diameter) {

    //calculate the centre of the dot
    var anchor = diameter / 2;

    //build the dot as a marker icon
    var image = {
    	//construct a URL call to the (deprecated) Google Charts API
        url: ["http://chart.googleapis.com/chart?cht=it&chs=",
            diameter, "x", diameter, "&chco=", (colour.replace("#", "")),
            ",000000ff,ffffff01&chl=&chx=000000,0&chf=bg,s,00000000&ext=.png"
        ].join(""),
        // Set the dimensions of the dot
        size: new google.maps.Size(diameter, diameter),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the centre of the dot
        anchor: new google.maps.Point(anchor, anchor)
    };
    
    //return it
    return image;
}

/**
 * This code makes a URL that can be used in an <img> tag to draw the symbol.
 * This is useful for making a legend.
 *
 * Parameters:
 *  - colour: a hex code String (hash optional) e.g.: "#ff00ff" OR "ff00ff"
 *  - diameter: the diameter of the dot in pixels
 *
 * @author jonnyhuck(jonathan.huck@manchester.ac.uk)
 */
function makeDotURL(colour, diameter) {

	//build the url and return
    return ["http://chart.googleapis.com/chart?cht=it&chs=",
            diameter, "x", diameter, "&chco=", (colour.replace("#", "")),
            ",000000ff,ffffff01&chl=&chx=000000,0&chf=bg,s,00000000&ext=.png"
        ].join("");
}