#GIS and the Web: Google Maps Events
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---
##JavaScript: Events

The Google Maps JavaScript API is **event driven**, meaning that JavaScript responds to interactions by generating **events**, and expects a program to listen to interesting events.

Each object in the Google Maps Javascript API exports a number of named **events** when certain things happen (like if the maps is panned, or zoomed, or the user clicks on a marker etc.). Programs interested in certain events will register JavaScript **event listeners** for those events and execute code when those events are received by registering `addListener()` event handlers.

Check out the below example, it allows you to see which events are fired based upon what you are doing on the map. Have a play with it - do you understand what they all mean? Can you get them all to fire?

<iframe src="https://google-developers.appspot.com/maps/documentation/javascript/examples/full/map-events" width='100%' height='300px' frameBorder="0"></iframe>

To be able to do something in response to an event, we have to register for event notifications. This is done by using the `addListener()` **event handler**. The `addListener` method takes an object, an event to listen for (*that will be fired by the object*), and a function to call when the event occurs. Here's an example:

```
/**
 * Create the Google Map and add a listener to it
 */
function initMap() {
	
	//set desired location
	var myLatlng = {lat: -25.363, lng: 131.044};
	
	//create the map instance
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 4,
	  center: myLatlng
	});
	
	//add the listener to the map
	map.addListener('center_changed', function() {
	  console.log(map.getCenter().toString());
	});
}

```
*What is this listener doing on the map?*
<textarea></textarea>
*Now make a Google Map and add the above listener to test your theory, were you right? (**Hint:** use your previous map as a base)*

If you want to be able to remove the listener from the map, then you need to store it in a variable like this:

```
...

//add the listener to the map
var listener = google.maps.event.addListener(map, 'center_changed', function() {
  console.log(map.getCenter().toString());
});

...
```
You can then remove it as follows:

```
//remove listener from the map
google.maps.event.removeListener(listener1);
```
Or, alternatively, you can remove all listeners from the map:

```
// Remove all listeners from the map
google.maps.event.clearInstanceListeners(map);
```

Just for your reference, here are some of the main events on a Google Map (*they also occur on markers that are placed on the map etc...*). You can find a complete list in the [**Google Maps JavaScript API Reference**](http://).

**Name** | **Description**
---|---
`bounds_changed` | This event is fired when the viewport bounds have changed.
`center_changed` | This event is fired when the map center property changes.
`click` | This event is fired when the user clicks on the map.
`dblclick` | This event is fired when the user double-clicks on the map. *Note that the click event will also fire, right before this one.*
`drag` | This event is repeatedly fired while the user drags the map.
`dragend` | This event is fired when the user stops dragging the map.
`dragstart` | This event is fired when the user starts dragging the map.
`idle` | This event is fired when the map becomes idle after panning or zooming.
`maptypeid_changed` | This event is fired when a new map type is selected (*e.g. if a user switches from the road map to the satellite map*)
`mousemove` | This event is fired whenever the user's mouse moves over the map.
`mouseout` | This event is fired when the user's mouse exits the map.
`mouseover` | This event is fired when the user's mouse enters the map.
`rightclick` | This event is fired when a user right-clicks on the map.
`tilesloaded` | This event is fired when the visible tiles have finished loading.
`zoom_changed` | This event is fired when the map is zoomed in or out.

---

##Putting it into practice: Tracking Coordinates on the map

Right, now we understand the basics, it's time to have a go for yourselves! Your mission for today is to: 

>Make a Google Map that can tell us the latitude, longitude coordinates, web mercator coordinates,  tile location of its centre point (like [**this**](http://students.jonnyhuck.co.uk/maps/coords_gmap.html)).

It's worth thinking back to lecture 1 for a moment and remembering how **clip maps** work, and how the **tiles** of data in a Google Map are structured:

![image](http://students.jonnyhuck.co.uk/images/clipmap.png)

The steps to do this will be:

* Make a Google Map (*already complete from last week*).
* Use a listener to keep track of the centre of the map.
* Make a function to work out which tile you are using.
* Dynamically write the coordinates and tile location to the web page as the map moves.

Seems simple enough, let's give it a go...

####Step 1: Get a listener working on your map
You have already made a map (last week), and have learned how to add a listener to it that keeps track of the centre of the map (above). Step 1 is to get that listener working on your map. You can test this by writing to the console with `console.log()` every time the event is fired.

####Step 2: Getting the coordinates of the centre of the map
This is where the [**Google Maps JavaScript Api Reference**](https://developers.google.com/maps/documentation/javascript/reference?hl=en#Map) comes in Handy. The `google.maps.Map` class has a function called `getCenter()`, see if you can find it, and get the console to print out the result. The result will be in the form of a `google.maps.LatLng` object, Now look this up in the reference and see if you can work out how to extract the `lat` and `lng` values from it.

####Step 3: Writing a result to the web page
JavaScript has access to a property of the HTML element called `innerHTML`. It does exactly what you would expect - you pass it some HTML, and it sets the HTML inside your selected elect to be what you passed it. Simple!

Before you can use it, however, you require an element to target, and a JavaScript reference to that element. Lets start by adding an element to your web page, you can put it wherever you like within the `<html>` block:

```
 <div id="coord_output"></div>
```
This has created a placeholder (`div`) and given it an `id` of `coord_output`. Because of this `id`, we can now access it directly using CSS (using an **ID Selector**) and JavaScript, using the method `document.getElementById(id)`. This returns a reference to the HTML element with the provided `id`, and from there you can invoke the `innerHTML()` method:

```
 //get a reference to the div
 var myDiv = document.getElementById('coord_output');
 
 //set its HTML
 myDiv.innerHTML = "Hi Mum!";
``` 

This code could also be streamlined like this:

```
 //get a reference to the div and set the inner HTML
 document.getElementById('coord_output').innerHTML = "Hi Mum!";
```
Note that in this latter form, there is no need to store the reference in a variable.

So, all you need to do is write the current centre coordinates to your div using the above method. Remember that the `+` operator can be used to concatenate Strings, and that you will need to convert your **Number** values into **Strings** using `toString()` before you can do this. You may, for example, use something like:

```
 //build your output text
 var outputText = "Map Centre (Latitude, Longitude): " + lat.toString() + ", " + lng.toString();
 
 //write to the div
 document.getElementById('coord_output').innerHTML = outputText;
```
Now move the map around a little and see what happens. If it's working, the reported coordinates should change as you pan!

####Step 4: Work out the rest of the components

The mathematics behind map projection are necessarily beyond the scope of this course. As such, I have provided this part of the code for you, which you can add with the following line of HTML, which should go immediately BEFORE the statement that loads the Google Maps API:

```
 <script src="http:students.jonnyhuck.co.uk/code/coordinates.js"></script>
```

*Why does it need to be before the statement that loads the Google Maps API?*
<textarea></textarea>

This provides you with three functions:

```
/**
 * This is the code to project latitude/longitude coordinates to web mercator.
 * latLng is a google.maps.LatLng object
 * returns a google.maps.Point object
 */
function getWebMercatorCoordinates(latLng) {...}

/**
 * Work out the pixel coordinates for given Web Mercator Coordinates
 * webMercatorCoords is a google.maps.Point object
 * returns a google.maps.Point object
 */
function getPixelCoordinates(latLng, zoom) {...}


/**
 * Work out the tile coordinates for given Web Mercator Coordinates
 * webMercatorCoords is a google.maps.Point object
 * returns a google.maps.Point object
 */
function getTileReference(pixelCoords, zoom) {...}
```

Each one of them returns a `google.maps.Point` object, which you should look up in the [**Google Maps JavaScript Api Reference**](https://developers.google.com/maps/documentation/javascript/reference?hl=en#Point) to work out how to get the coordinates out of it. You will also want to look up the [**Map**](https://developers.google.com/maps/documentation/javascript/reference?hl=en#Map) object to see how to get the zoom level.

Use of the above code should be relatively straightforward, you just need to call the functions and use the correct. So your flow of code will be something like:

1. Establish the zoom level of the map.
1. Get the `LatLng` coordinates for the centre of the map 
1. Use the `LatLng` coordinates and pass it to `getWebMercatorCoordinates(latLng)` in order to get the Web Mercator coordinates.
1. Use the `LatLng` coordinates and zoom level to calculate the pixel coordinates using `getPixelCoords(latLng, zoom)`.
1. Use the pixel coordinates to work out the tile reference for the centre of the map.
1. Use your knowledge of HTML and the operators for numbers and strings in JavaScript to make some HTML, and load it into the target `div` using the `innerHTML` property described above.

Remember that tile references should be given in the form `z,x,y`. How do you think you can get the value for `z`?

<textarea></textarea>

You should now have a map that is able to update the page with it's centre location listed in:

* Latitude and Longitude Coordinates
* Web Mercator Coordinates
* Pixel Coordinates
* Tile Reference

Hopefully, it will look somethig like this:

<iframe src="http://students.jonnyhuck.co.uk/maps/coords_gmap.html" width='100%' height='600px' frameBorder="0"></iframe>

And that's it for this week! Don't forget about it until next week though, the only way to get better at programming is to keep working on it! See what else you can come up with. If you do something good, put it on the forum!


##[Finished!](http://students.jonnyhuck.co.uk)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>