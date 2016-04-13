#GIS and the Web: More Thematic Mapping
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

##Classified Symbology
This week we are going to carry on with what we started last week, and delve back into our crime data. So far, you should have something that looks like this:

![image](http://students.jonnyhuck.co.uk/images/pinkdots.png)

Now, this is all well and good, but I think we can agree that this could be more useful, for starters, lumping all crimes together like this is not a lot of use, makes murder the equivalent of shoplifting, and as a result doesn't really tell us that much about the nature of crime in Manchester.

*What approaches could we take to make this map more useful?*

<textarea></textarea>

There are a number of things that we could do to make this map better, and hopefully your ideas included using either **classified symbology** (a different symbol for each type of crime), because that is what we will do next. Specifically, we are going to change the **colour** of the dot to represent each different crime. Here's the mission:

>Classify your crime map by crime type using different coloured dots.

So how do we do this? Firstly, we need to take a closer look at the data that's coming in from the police. Here is a single crime in JSON format:

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
***Note:** As with last week, do **NOT** copy this data into your code, it is just for your information!*

*Which is the data label that we want to work with?*
<textarea></textarea>

So what we want to do is colour the dots based upon the **category**. This should be easy enough, we can do it with the **conditional** statements that we covered last week.

So far, this is the code that we have (that sets all of the dots to one colour):

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

This code is already looping through each crime, and creating a point based on them. So all we need to do is create a way of determining the type of each crime, and colouring it accordingly. 

The first thing that we need is a qualitative colour ramp. You can set a suitable one using [**Color Brewer**](http://colorbrewer2.org/), which is a tool designed for creating suitable colour schemes for thematic data on maps. Feel free to have a play with them, but here is an example that you can use:

![image](http://students.jonnyhuck.co.uk/images/brewer.png)

...and here is a copy/pastes-able version of that list:

```
#a6cee3
#1f78b4
#b2df8a
#33a02c
#fb9a99
#e31a1c
#fdbf6f
#ff7f00
#cab2d6
#6a3d9a
#ffff99
#b15928
```
Here is the exhaustive list of crime types:

```
anti-social-behaviour
bicycle-theft
burglary
criminal-damage-and-arson
drugs
other-crime
other-theft
possession-of-weapons
public-disorder-and-weapons
public-order
robbery
shoplifting
theft-from-the-person
vehicle-crime
violent-crime
```
If you want to know what they refer to, you can look it up [**here**](https://www.police.uk/about-this-site/faqs/#what-do-the-crime-categories-mean).

You will notice that there are more crimes than colours, but research suggests that the absolute maximum number of classifications that you should have to ensure a map is understandable is twelve, and in reality this is probably too many. Select as many as you like, match them to colours, and build a **switch statement** in order to set the colour variable for each one:

***NOTE: You need to be careful where you put this code!!** It needs to be INSIDE the `for` loop that loops through all of the crimes to add the markers, AFTER you populate the `crime` variable and BEFORE you create the `Marker` and add it to the `markers` array!*

```
//work out which colour it should be 
//(this needs to be put in a variable to make it work - don't use crime['category'] directly)
var category = crime['category'];
                  
//you can log out the crime types that you have to help if you like
//console.log(category);

//assign the appropriate colour
switch (category) {
	case "anti-social-behaviour":
		dotColour = "#a6cee3";
		break;
	
	//add the rest of your classes here as additional 'case' statements...
	
    default:
		//just use black for any other crimes...
		dotColour = "#000000";
}
```

Now you have everything that you need to complete this mission... Here are the remaining steps:

1. Change the colour setting for the dot to a variable rather than a string literal.
2. Set the value of the string based upon the value of `crime['category']` (as above, or according to your own classification). (***Hint:** make sure that this happens INSIDE the loop!*).

If all has gone well, it should look something like this:

![image](http://students.jonnyhuck.co.uk/images/categorised.png)

##Making a Legend
Now you have a lovely thematic map with its classified symbology, what you really need is a legend. Fortunately, I have also made you a function to help with this:

```
/**
 * This code makes a URL that can be used in an <img> tag to draw the symbol.
 * This is useful for making a legend.
 *
 * Parameters:
 *  - colour: a hex code String (hash optional) e.g.: "#ff00ff" OR "ff00ff"
 *  - diameter: the diameter of the dot in pixels
 */
 function makeDotURL(colour, diameter) { ... }
```
This is exactly the same as the `makeDot` function that you used last week, but this time it returns a URL (web address) that can be used to draw the image in HTML using the `<img>` tag. Here is an example:

```
 <!-- Set an image placeholder -->
 <img id="legend1">
 
 ...
 
 <script>
  //put the images into the placeholder
  document.getElementById("legend1").src = makeDotURL("#ff00ff", 12);
 </script>
 
```
This should draw the image symbol to your web page, and so can be used to create a legend like this:

```
 <!-- Include <img> placeholders -->
 <p><img id="legend1"> Theft</p>
 <p><img id="legend1"> Murder</p>
 ...
 <script src="http://students.jonnyhuck.co.uk/code/dots.js"></script>
 <script>
  //put the images into the placeholders
  document.getElementById("legend1").src = makeDotURL("#ff00ff", 12);
  document.getElementById("legend2").src = makeDotURL("#00ffff", 12);
 </script>
```

*Remember, you also have things such as lists (*`<ol>`*) at your disposal, and plenty of CSS skill to help you make it look good!*

##[next: Heat Mapping](./heat.html)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>