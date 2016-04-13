#GIS and the Web: Creating Point Data in Google Maps
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

##Adding Point Data to Google Maps
For our final practical on the Google Maps JavaScript API, we are going to have a go at letting users create new point and polygon data on the map, which is vitally important if we want to be able to make a PPGIS!.

####Before you start...
*Some of your JavaScript files are getting a little messy by now, and this can lead to problems later on. I would recommend making a new file based upon the **Simple Map** that you made in **Practical 1** for this practical. Here is the plain template:*

```
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        width: 800px;
        height: 500px;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>

		var map;
		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: 53.4668406, lng: -2.2359519}, 
		    zoom: 15
		  });
		}

    </script>
    <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>
  </body>
</html>
```

### Adding Points to the Map
The goal here is simple, we want a user to click on the map, and we want to add a point marker at the location they clicked.

We have already learned to add points to a map using lists of coordinates, and you will be pleased to know that this isn't much different. The only change will be that the coordinates will be from a `click` event on the map, rather than from a JSON list.

So let's get to it... Here is a listener that listens for `click` events on the `map`:

```
 //set listener so coordinates update on the map moving
 map.addListener('click', function(e) {
 	alert(e.latLng);
 });
```

*What do you think will happen if you add this in and click on the map?*
<textarea></textarea>
*Try it - were you right?*

***Note:** you might need to check back to **Practical 2 (Coordinates JavaScript: Events)** to see where the listener should go if you're not sure*

The above listener is very similar to the listeners that you have use already, but there is one slight difference: the callback function has an argument `e`. This argument is a `google.maps.MouseEvent`, which (amongst other things) enables you to get the coordinates at which the event happened. Take a look at it in the [**Google Maps JavaScript Api Reference**](https://developers.google.com/maps/documentation/javascript/reference#MouseEvent).

Now we have the ability to collect the coordinates of mouse clicks (above), and the ability to add points at given locations (two weeks ago), we have all we need! Let's give it a go:

```
//a global array to store a reference to all of our markers
var markers = [];

/**
 * Adds a marker to the map at a given location
 * @param {google.maps.LatLng} latLng the location at which to add the point
 */
function addPoint(latLng) {
    
    //add a new marker to the markers array using the provided location
	markers.push(new google.maps.Marker({
		position: latLng,
		map: map,
		clickable: false
	}));
}
```

Add the above code **after** the `initMap()` function, and then set the **callback** for the listener from:

```
alert(e.latLng);
```
to:

```
addPoint(e.latLng);
```

Now click on the map, a new marker should be added at each location you click.

### Editing Points on the Map
Sometimes, people might want the ability to move their points. fortunately, this is very easy. All you need to do is add `draggable: true` to the marker constructor:

```
markers.push(new google.maps.Marker({
	position: latLng,
	map: map,
	clickable: false,
	draggable: true
}));
```

Now, you can move each of your markers around, which is great news!

But what if the user wants to delete them? well this is also super easy: all we need to do is set the map for each marker to `null` (thus removing them from the map) and then clear out the `markers` array. You can do this with the following simple function:

```
/**
 * Delete all of the markers
 */
function deleteMarkers() {

    //set all of the markers' map to null
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

    //set the markers array to an empty array
    markers = [];
}
```

The only problem with this, of course, is that the user needs to be able to tell the map WHEN to delete the markers. to do this, we will add a button. Firstly, add:

```
 <div id="floating-panel">
	<input onclick="deleteMarkers();" type=button value="Delete Markers">
 </div>
```

...immediately before `<div id="map"></div>`, and then add the following to your CSS:

```
 #floating-panel {
    position: absolute;
    top: 10px;
    left: 50%;
    z-index: 5;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #999;
    text-align: center;
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
}

```

You should be able to tell what this is doing by now, but basically, we have added a small floating panel onto the map, which contains a single button that says `"Delete Markers"` on it. When you press the button, its `onclick` event is triggered, and we have set the value of this to `deleteMarkers()`, which means that our `deleteMarkers()` function will be called when the button is clicked. Simple! Give it a go...

***If you are feeling adventurous:** See if you can change the symbology using what you learned in the last couple of practicals. You can either download an image or use* `dots.js` *if you like.*

##Storing Point Data in a Database
Unfortunately, we do not have time to cover the use of databases in detail, so I have created some JavaScript functions that will enable you to store and retrieve data from the database easily.

To use this, you will firstly have to load the library, which you can do by adding this line immediately before the line that imports the **Google Maps JavaScript API**:

```
 <script src="http://students.jonnyhuck.co.uk/code/store.js"></script>
```

This library contains two functions:

```
/**
 * Load the position part of a markers array into the database and remove from map if successful
 * @param key - the unique string for your website
 * @param {type} data
 * @requires the method dataIsStored() to be implemented. This is called when the data has been successfully stored
 */
function storeMarkers(key, data) { ... }

/**
 * Retrieve a markers array from the database
 * @param key - the unique string for your website
 * @requires the method dataIsReady() to be implemented. This is called when the data has been retrieved
 */
function retrieveStoredMarkers(key) { ... }

```

As should be quite obvious, one stores data in a database for you and the other gets it back so that you can draw it to the map. Specifically, `storeMarkers` takes your `markers` array, converts it to an array of locations, and stores it in a database, identified by the `key` that you give it. `retrieveStoredMarkers` gives you back al of the the lists of locations in the database that are identified by a given `key`, which you must then add to the map as markers again.

Note the importance of the `key`, you need this to be able to tell the database who the data belongs to, and then to identify your own data when you want it back. To avoid any mistakes, please select a `key` that is likely to be **unique** (*e.g. your name...*) and make save it to a global variable, which will avoid any typo's etc later on...

```
 var key = "huck";
```
***Note:** obviously, this is my name, please use your own, or some other String that is likely to be unique!*

Now, you already should have a unique `markers[]` array, but now would be a good time to check this (and double-check that it is, in fact, **global** and not declared inside a function or something!)...

Okay, now `storeMarkers` and `retrieveStoredMarkers` are doing quite a lot of complex stuff, and incorporate **asynchronous** operations as the data are transported to the database and back. As such, I have implemented them with callback-style methods that you must implement yourself. Basically, when data have been successfully stored, a function called `dataIsStored()` will be called, and when data have been successfully retrieved, `dataIsReady()` will be called. The snag is that neither of these functions exist yet, and it is up to you to do create them.

This approach may seem a little odd, but it is, in fact, quite useful, as it means that you can do whatever you like when the data are saved or returned, without having to directly interact with the library code (`store.js`).

So, let's have a go. To implement the `store.js` code, we must first add some more buttons, so that we can ask the code to save or retrieve the data. To do this, change:

```
 <div id="floating-panel">
    <input onclick="deleteMarkers();" type=button value="Delete Markers">
 </div>
```
...to:

```
 <div id="floating-panel">
    <input onclick="storeMarkers(key, markers);" type=button value="Store Markers">
    <input onclick="retrieveStoredMarkers(key);" type=button value="Retrieve Markers">
    <input onclick="deleteMarkers();" type=button value="Delete Markers">
 </div>
```

Note that these buttons call the library functions `storeMarkers(key, markers)` and `retrieveStoredMarkers(key)` respectively, passing the `key` variable (your name) and `markers` array (your markers) as required. Because these functions are covered in the library, there is nothing else that you need to do here. What we **do** need to do, however, is implement the callbacks...

In the case of `storeMarkers`, we need to implement `dataIsStored()`. We don't need to do much here, as all we are doing is storing the data in the database. What we *might* want to do, however, is clear the stored data off the map, as this makes it clear to the user that it has been submitted. As we already have a function for this, it is super-easy to do:

```
 /**
  * Called automatically when storeData has successfully stored the data
  * Clears the markers from the map
  */
  function dataIsStored() {
    deleteMarkers();
  }
```
You might even want to add an `alert()` in there to let the user know that their data are safe (*otherwise that might think it has simply disappeared!*). Add that in too.

In the case of retrieving data, things are a little more complex, so we need to work a bit harder when implementing `dataIsReady(dataIn)`. In this case, the data returned from the database are passed as an ***array of arrays of locations***. So each time you save a set of Markers, they are added into the database as an ***array of locations***, and all of those are returned (ordered from newest to oldest) in an ***array***. Accordingly, we have to loop through the *array of arrays*, and for one we must **loop through all of the locations in that array****. Complicated? Yes. 

It might help to think of it as an **outer array** that contains a number of **inner arrays**, each of which contain a set of **locations** that were uploaded to the database in sets. Here's how the code looks:


```
 /**
  * Called automatically when retrieveStoredData has returned the data
  * Draws the results to the map
  * @param jsonArray dataIn
  */
 function dataIsReady(dataIn) {

     //loop through each (inner) array in the (outer) array of (inner) arrays
     for (var i = 0; i < dataIn.length; i++) {

         //get the next (inner) array
         var points = JSON.parse(dataIn[i]);

         //loop through each location in the (inner) array
         for (var j = 0; j < points.length; j++) {

             //add to the map as a marker
             addPoint({lat: points[j].lat, lng: points[j].lng})
         }
     }
 }
```

Fortunately, we have already made the `addPoint` function that we can use to turn the locations into Markers, so once you've gotten your head around looping through the 2-dimensional array, it's fine!

If all is well, your map should now look and work something like this:
<!--<iframe height="400px" width="800px" frameBorder="0" scrolling="no"
        src="http://students.jonnyhuck.co.uk/maps/ppgis_gmap.html"></iframe>-->

If it does look like that, then well done, you've **finished**!!

##Final Mission:

> Produce a web-based PPGIS to collect data from the public relating to a real-world issue. 

*Remember to use what you have learned in these practicals, but also be inventive and use Google Search, the Google Maps JavaScript API docs, and other sources to make it as good as you can.*

#####Here is the full description:

Create a participatory GIS web-site capable of collecting geographical data from and disseminating data to the public via a Google Map interface. Marks will be awarded based upon:* The neatness and readability of the code.* The elegance and resilience of the code.* The descriptive comments provided with the JavaScript code, demonstrating justification and an understanding of the approaches used.* The design (form and function) of the website itself.* Progression from the practical material covered in this course.
*The code should be submitted as a zip file containing all of the HTML (`*.html`), JavaScript (`*.js`) and image files required to view the website.*This should be accompanied by a report reflecting upon the design process of the website, not to exceed 2,000 words.The report could include (but is not limited to):* A literature review of GIS on the Web, Neogeography and PPGIS.* Some literature context for the purpose of your website.* The rationale for the production of the website.* A reflection upon the design process of the website (screenshots!).* Some use-case scenario’s for how the website may be useful in the real world.The report should be submitted via Blackboard as per usual.

####Submission Deadline: 2pm, Thursday 28th April 2016

---

*And that's it for the JavaScript portion of this course! We hope you've had a good time, and that you continue to build upon these skills in the future!*

*Jonny & Gail*

##[Finished!](http://students.jonnyhuck.co.uk)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/).</small>