#GIS and the Web: External Data in Google Maps
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

##JavaScript: JavaScript Object Notation
###What is JSON?

**JSON** (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write, and it is easy for machines to parse and generate. It is also used across almost all programming languages (in spite of the name), and is a great way to load data into your website.

JSON is called *JavaScript* Object Notation because it is based upon existing JavaScript data structures (even when it is used in other languages). Fortunately, these are structures that you already know about: **Arrays** and **Objects**. JSON therefore typically exists in two types:

#####JSON Objects:
**JSON Objects** are an unordered set of name/value pairs. An object begins with `{` (left brace) and ends with `}` (right brace). Each name is followed by `:` (colon) and the name/value pairs are separated by `,`(comma). This is exactly the same as the **object literals** that we covered in [practical 2](../practical2/index.html). Here is an illustration:

![image](http://json.org/object.gif)
<small>Image from [json.org](http://json.org)</small>

#####JSON Arrays:
**JSON Arrays** are an ordered collection of values. An array begins with `[` (left bracket) and ends with `]` (right bracket). Values are separated by `,` (comma). This is exactly the same as the arrays that you have looked at earlier in [this practical](./index.html). Here is an illustration:

![image](http://json.org/array.gif)
<small>Image from [json.org](http://json.org)</small>

As you would expect in JavaScript,  values in JSON can contain `objects`, `arrays`, `numbers`, `strings`, `booleans`, and `null`.

###The JSON Object
**Now this is important:** When you pass JSON, though it *LOOKS* like JavaScript, it is really just a `string`. To be able to use it, you must first convert (**parse**) it from a string to data. Likewise, if you have some data that you want to send somewhere, then you need to convert it to a string first.

Until a few years ago you needed external libraries to safely parse JSON in JavaScript, as hackers used it to send malicious code to websites. Fortunately, JavaScript now has a **JSON** object that we can use to read and encode JSON, which is much safer.

The JSON object only has two methods:

* `JSON.parse()`, which converts a JSON string into data.
* `JSON.stringify()`, which converts JSON data into a string.

So if you have a JSON string `jsonString` and you want to parse it into data, you can simply go:

```
var jsonData = JSON.parse(jsonString);
```
If you then wanted to change it back, you would go:

```
var newJsonString = JSON.stringify(jsonData);
```
Once you have used `JSON.parse(jsonString)`, you have a fully fledged **object** or **array** containing the data that you wanted. It's that simple!


##JavaScript: AJAX

One of the main purposes of a Google Maps "Mashup" is to provide a quick, easy and accessible way to view thematic data. Today, therefore, we are going to build a Google Map that shows some externally sourced data.

To do this, step 1 is, of course, to get some data! We will do this by getting Manchester crime data straight from the Greater Manchester Police, using another API - the [**Data.police.uk API**](https://data.police.uk/docs/), which is a service that allows you to download a month's worth of crimes in JSON format, with latitude/longitude coordinates attached.

To do this, however, we will need to be able to connect to elsewhere on the web from our website. To do this, we will use **AJAX**: **Asynchronous JavaScript and XML**. However, before we do, we should look a little closer at what the **A** and the **X** **AJAX** means:

* **Asynchronous:** If things happen *synchronously* they happen one after the other. Things happening *asynchronously*, on the other hand, can happen at the same time. An example that you have already seen is setting the `async` property in the `<script>` tags that you use to download the Google Maps Javascript API. This means that the Google Maps API can be downloaded at the same time as the rest of the page, giving a quicker overall download time, but at the expense of more computing power. A non-programming analogy might be the difference between stopping what you are doing to cook a pizza (*synchronous*), and continuing what you are doing and ordering a pizza to be delivered. One is slow and cheap, the other is fast and expensive.
* **XML:** XML means eXtensible Markup Language, and HTML is a variety of it. When the term AJAX was first coined, XML was the best way to encode data, and so was included in the name. Nowadays, however, JSON is a much more popular approach, and most AJAX in the modern web doesn't use XML anymore, though the 'X' still remains in the name. I guess part of this could be that **AJAJ** sounds silly...

Right, enough of the history lesson. In reality, many people who talk about AJAX don't really know what they are talking about. It is a (now inappropriate) term that was coined in an online article, and does not describe any technology, simply the act of using the `XMLHttpRequest` object in JavaScript to retrieve some data (that may or may not be XML...) from elsewhere on the web.

Here's how you make one:

```
//make an XMLHTTPRequest object
var httpRequest;
if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
}
```
*Why is the* `httpRequest` *variable defined outside of the if statement?*
<textarea></textarea>

Let's have a look at it working properly:

```

//declare the XMLHttpRequest and jsonString variables (so that it is available in the global scope)
var httpRequest;
var jsonString;

/**
 * Retrieve data asynchronousy from a given url
 */
function makeRequest(url) {

    //initialise the XMLHttpRequest object
    httpRequest = new XMLHttpRequest();

    //this will happen if the XMLHttpRequest object cannot be created (this can happen in Internet Explorer)
    if (!httpRequest) {

        //warn the user and exit the function by returning false
        alert('Warning: Cannot create an XMLHTTP instance');
        return false;
    }

    //set an event listener for when the HTTP state changes
    httpRequest.onreadystatechange = function () {

        //a successful HTTP request returns a status of 200
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                //get the response
                jsonString = httpRequest.responseText;

                /* do something with the response here... */

            }
        }
    };

    //prepare and send the request
    httpRequest.open('GET', url);
    httpRequest.send();
}

```

I know that seems like a lot of code, but it's quite simple really. All you need to understand is that you give it a url (web address), it goes and gets the JSON string that is available there, and stores in the variable `jsonString`. Most of this work is done in the `onreadystatechange` callback, which is called each time the HTTP request returns some information. It may send back several codes, which tell us both the progress of the request itself, and what happened. This is why we wait for the `XMLHttpRequest.DONE` ready state (meaning that the request is complete) and `200` status code (meaning that the data has been successfully retrieved) to come back, because any other combination of codes means that the data are either not ready yet, or could not be retrieved.


##Google Maps: Adding JSON data to a Google Map

So now we know how to get the data, and how to read it. The last step must be to put it onto the map!

This is quite simple, once you have your list of data. For each one, you just need to create a `google.maps.Marker` object, and set its `map` property to the global variable that represents your map. 

```
//get the centre of the map
var latLng = map.getCenter();

//place a marker at the centre of the map
new google.maps.Marker({
	position: latLng,
    map: map,
	clickable: false
})
```

Look it up in the [**Google Maps JavaScript API**](https://developers.google.com/maps/documentation/javascript/reference?hl=en#Marker) to make sure you fully understand the object. *What does* `clickable: false` *do?*

<textarea></textarea>

---

##Making a Google Crime Map Mashup

Okay, we have everything we need to do this now, so lets give it a go... Here's the mission:
> Create a Google Map showing crimes in Manchester downloaded asynchronously from the data.police.uk API.

The steps are:

* Get a plain Google Map (*your styled one would be good...*).
* Make sure the map is centred on Manchester city centre (`{lat: 53.4807593, lng:-2.2426305}`).
* Make a function that asynchronously gets the crime data from data.police.uk.
* When the data string is successfully returned, parse it into a JSON object.
* Call another function that adds markers to the map at each crime location.

To help you along, here are a few hints...

Here is a starter for getting your data. This is the call to `makeRequest` complete with the URL for data.police.uk API and the correct coordinates for Manchester city centre (*again, make sure that this is what your map is looking at!*).

```
/**
 * Load the crime markers onto the Google Map
 * returns JSON array of objects
 */
function getCrimes() {
    makeRequest("https://data.police.uk/api/crimes-street/all-crime?lat=53.4807593&lng=-2.2426305");
}
```
Here is the `MakeRequest()` function from above again, but adapted to add the crimes to the map:

```
var httpRequest;
var jsonString;

/**
 * Load the crime markers onto the Google Map
 * returns JSON array 
 */
function makeRequest(url) {

    //initialise the XMLHttpRequest object
    httpRequest = new XMLHttpRequest();

    //this will happen if the XMLHttpRequest object cannot be created
    if (!httpRequest) {

        //warn the user and exit the function by returning false
        alert('Warning: Cannot create an XMLHTTP instance');
        return false;
    }

    //set an event listener for when the HTTP state changes
    httpRequest.onreadystatechange = function () {

        //a successful HTTP request returns a status of 200
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                //get the json String, parse top JSON object
                jsonString = JSON.parse(httpRequest.responseText);

                //load it onto the map
                crimesToMap();
            }
        }
    };

    //prepare and send the request
    httpRequest.open('GET', url);
    httpRequest.send();
}
```

Here is a snippet that will loop through each crime in the jsonData array, and load them onto the map as Markers. Note the way in which the latitude and longitude values have to be retrieved:

```
/**
 * Load the crime markers onto the Google Map
 * returns nothing 
 */
function crimesToMap() {

    //create the markers
    var crime;
    var markers = [];
    for (var i = 0; i < jsonString.length; i++) {
        crime = jsonString[i];
        markers.push(new google.maps.Marker({
            position: {lat: parseFloat(crime['location']['latitude']), 
                lng: parseFloat(crime['location']['longitude'])},
            map: map,
            clickable: false
        }));
    }
}

```

The JSON crime data is in the form of an array of objects. This is a single crime in JSON format, take the time to have a look at the structure, does the `crime['location']['latitude']` make sense now?

```
[
    {
    category: "anti-social-behaviour",
        persistent_id: "",
        location_type: "Force",
        location_subtype: "",
        id: 20599642,
        location: {
        	latitude: "52.6269479",
            longitude: "-1.1121716"
            street: {
            		id: 882380,
            		name: "On or near Cedar Road"
                },
        },
        context: "",
        month: "2013-01",
        outcome_status: null
        }, 
        
...]
```
***Note:** Do **NOT** copy the above JSON into your code, it is just there so you can see what the data looks like!!*

*How would you get the street name?*
<textarea></textarea>

*What other information could be useful for this map?*
<textarea></textarea>

Finally, heres a cool bit of code that you can use to automatically zoom the map to the extent of your data. This is well worth including!

***Also:** note that it will need to go INSIDE the *`crimesToMap`* function. Why?*
<textarea></textarea>

```
//set the map bounds to fit the markers
var bounds = new google.maps.LatLngBounds();
for (var i = 0; i < markers.length; i++) {
	bounds.extend(markers[i].getPosition());
}
map.fitBounds(bounds);
```

*How does that bit of code work? What exactly is it doing?*
<textarea></textarea>

If it has gone well, you should be looking at a map that is along these lines in appearance...

![image](http://students.jonnyhuck.co.uk/images/thematic.png)

This is all well and good, but it looks a bit "Googley", and given that you have gone to the bother of customising your baseman, we might as well make some custom icons as well. You can add pretty much any image that you like as an icon, but for now, I have made you a script that will produce simple dots in any colour and size that you like as a Google Maps Icon, which you can easily use to replace the default Google pushpins. *If you're interested, it makes them using the [Google Charts API](https://developers.google.com/chart/), another one of Google's toolkits!*

To do this, firstly, you need to import my script, so add this line immediately before the line that imports Google Maps:

```
 <script src="http://students.jonnyhuck.co.uk/code/dots.js"></script>
```

Now, you can change the icons in a single line: simply by changing:

```
//create the markers
var crime;
var markers = [];
for (var i = 0; i < jsonString.length; i++) {
    crime = jsonString[i];
    markers.push(new google.maps.Marker({
        position: {lat: parseFloat(crime['location']['latitude']), 
            lng: parseFloat(crime['location']['longitude'])},
        map: map,
        clickable: false
    }));
}
```
to...

```
//create the markers
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

Now there should be a big pink dot for every crime, something like this:

![image](http://students.jonnyhuck.co.uk/images/pinkdots.png)

Let's have a look at how that worked: you added a single line of code there, this one:

```
 icon: makeDot("#ff00ff", 12),
```

This line makes use of my `makeDot` function, which looks like this:

```
/**
 * This code makes basic 'dot' icons for a Google Map:
 *
 * Parameters:
 *  - colour: a hex code String (hash optional) e.g.: "#ff00ff" OR "ff00ff"
 *  - diameter: the diameter of the dot in pixels
 */
function makeDot(colour, diameter) { ... }
```

The above line therefore calls the `makeDot` function, telling it that you want the dot to be pink (`#ff00ff`) and 12 pixels in diameter (`12`). 

*Have a play about with the colour and size, and see if you can make it look good alongside your styled map.*

---

*That's it for this week, we'll be continuing to play with Markers next week! Remember - anything cool you come up with, or anything you get stuck on, make sure you put it on the forum!*

##[Finished!](http://students.jonnyhuck.co.uk)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/).</small>