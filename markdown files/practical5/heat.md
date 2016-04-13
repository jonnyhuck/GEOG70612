#GIS and the Web: More Thematic Mapping
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

##Heat Maps
As we learned in the lecture today, many types of point data are not always as precise as the point data type leads us to believe, which can be very misleading to the map reader. The data that we have collected from the Police is no exception, and a full explanation of the problem with it can be found [**here**](https://data.police.uk/about/#location-anonymisation) (please read this before you continue).

Because we now know that the locations in our dataset are not correct, we need to be very careful how we display them so as not to make our map misleading. There are many approaches that we could use, including choropleth mapping or hex-binning, but the one that we are going to cover today is **heat mapping**; a simple but effective visualisation technique that is very similar to a density analysis.

So this is our next mission:

> Make your crime data into a heat map.

Here are the steps:

####Loading the Library

Fortunately, Google Maps has a heat map tool built-in, which makes it quite easy for us to make one from our data! Here's an example of a heat map layer from Google (remember, this is not by me, so be wary of copying source code from it - only get bits that you understand!):

<!--<iframe height="400px" width="100%" frameBorder="0" scrolling="no"
        src="https://developers.google.com/maps/documentation/javascript/examples/full/layer-heatmap"></iframe>-->
        
*Think back to your lectures - what is one large mistake that Google have made in this map?*
<textarea></textarea>

The first thing that we need to do in order to make a heat map is to import the **Google Maps JavaScript Api Visualisation Library**, which is an extra bit of the API that is not normally downloaded - this contains the tools required for heat mapping. To do this, we need to make a small adjustment to the line that we are using to download the **Google Maps JavaScript Api Visualisation**, changing:

```
 <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>
```

to:


```
 <script src="https://maps.googleapis.com/maps/api/js?libraries=visualization&callback=initMap" async defer></script>
```
The difference is simply the addition of the `libraries=visualization` parameter, which tells Google to send the visualisation code along with the rest of the API.

####Preparing your data

To make a Google Maps Heatmap, you must first create a new `HeatmapLayer` object, and provide it with your point data as an array of `LatLng` objects. Our first step, therefore is to convert our code to create an array of `LatLng` objects instead of drawing markers. *(It is best to start with the Map you made in Practical 4 - the un-classified thematic map)*.

To do this, simply edit your `crimesToMap()` function by changing this:

```
var crime;
var markers = [];
for (var i = 0; i < jsonString.length; i++) {
	crime = jsonString[i];
	markers.push(new google.maps.Marker({
		position: {lat: parseFloat(crime['location']['latitude']), 
			lng: parseFloat(crime['location']['longitude'])},
		map: map,
		icon: makeDot("#ff00ff", 12),
		clickable: false
	}));
}
```

to this:

```
var crime;
var locations = [];
for (var i = 0; i < jsonString.length; i++) {
	crime = jsonString[i];
	locations.push(new google.maps.LatLng(
		parseFloat(crime['location']['latitude']),
		parseFloat(crime['location']['longitude'])));
}
```
As you can see, all we have done is re-named the `markers` array to `locations`, and removed all of the code that creates the markers, replacing it with code to make `LatLng`s instead. Simple!

For completeness, we should also update the bit that sets the bounds of the map to fit the data, so change:

```
//set the map bounds to fit the markers
var bounds = new google.maps.LatLngBounds();
for (var i = 0; i < markers.length; i++) {
	bounds.extend(markers[i].getPosition());
}
map.fitBounds(bounds);
```

to:

```
//set the map bounds to fit the array of locations
var bounds = new google.maps.LatLngBounds();
for (var i = 0; i < locations.length; i++) {
	bounds.extend(locations[i]);
}
map.fitBounds(bounds);
```

####Building your heatmap

Adding this data array into a `Heatmap` object is then as easy as:

```
var heatmap = new google.maps.visualization.HeatmapLayer({
  data: locations
});
```

And then drawing to the heat map to the Google Map is simply a matter of:

```
heatmap.setMap(map);
```
You should now see something like this:

![image](http://students.jonnyhuck.co.uk/images/heatmap.png)

####Customising your heatmap

Okay, now the above map is certainly a good start, but it is not a good map. there are a few problems with it:

* It is not suitable for colour-blind people (because it uses a red-green gradient). 
* The heat map `radius` is too small, so it still looks a little like a point map.
* It is a bit too transparent, making it very hard to see.

We can solve this by adding `radius`, `opacity` and `gradient` options to the `Heatmap` constructor like so:

```
//build a custom gradient of colours
//(red, green, blue, alpha / opacity)
var gradient = [
	'rgba(0, 255, 255, 0)',
	'rgba(0, 255, 255, 1)',
	'rgba(0, 191, 255, 1)',
	'rgba(0, 127, 255, 1)',
	'rgba(0, 63, 255, 1)',
	'rgba(0, 0, 255, 1)',
	'rgba(0, 0, 223, 1)',
	'rgba(0, 0, 191, 1)',
	'rgba(0, 0, 159, 1)',
	'rgba(0, 0, 127, 1)',
	'rgba(63, 0, 91, 1)',
	'rgba(127, 0, 63, 1)',
	'rgba(191, 0, 31, 1)',
	'rgba(255, 0, 0, 1)'
	];

//build a heat map object
var heatmap = new google.maps.visualization.HeatmapLayer({
	data: locations,
	gradient: gradient,
	radius: 25,
	opacity: 0.7	
});

//add the heat map to the Google Map
heatmap.setMap(map);
```

You can look up the `Heatmap` in the [**Google Maps JavaScript API Reference**](https://developers.google.com/maps/documentation/javascript/reference#HeatmapLayerOptions) for more information on the options available.

Here is the result - much better!!

![image](http://students.jonnyhuck.co.uk/images/customheatmap.png)

*We've covered some good stuff here, and we're now able to download remote data, parse it automatically, and make it into useful web maps. Only one more week to go, and you're doing great!*

##[Finished!](http://students.jonnyhuck.co.uk)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>