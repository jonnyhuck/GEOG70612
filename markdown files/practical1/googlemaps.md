#GIS and the Web: Google Maps
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Because this course is called **GIS and the Web**, the practical handouts are all web pages. This is good because it means that you can access them from anywhere, and look back on them at any time if you wish. They also contain a lot of information that was given in the lectures, just in case you need to go over it again*

*Each of the 2-hour practical sessions will involve you working through one of these web pages, building up your skills as you go. I will always be in the practical with you to lend support, but you can work through it at your own speed, and take it away to complete if you find that it's too much to get done inside 2 hours*

*It's also worth noting that I am assuming that you are using Notepad++ and Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, this is not suitable for web development*

*Occasionally, I will ask you questions on these pages, followed by a text box that looks like this for you to write your answers in:*

<textarea></textarea>

*These questions are designed to make you think, and are not collected in or marked by me. I *will*, however, likely ask you to tell me your answers during the session, so make sure you fill them in!*

*Have fun...*

---

##1. Getting to know Google Maps (Basic)

The first part of this course draws heavily upon the [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/), which we will use in order to build our own web-based maps and GIS. Before we get into that, though, it's a good idea to make sure that we are fully familiar with Google Maps and all of it's functionality, before we get into the nitty gritty of exactly how it works. This is well worthwhile even if you use Google Maps regularly, as they frequently change the site and add or remove features, many of which you probably don't even notice come and go! Lets have a look...

We'll start by taking a look at the website, click [here](https://www.google.co.uk/maps) to open it up, this will take you to the UK Google Maps Homepage:

![image](http://students.jonnyhuck.co.uk/images/gmap_full.png)

Let's start with the basics...

###The map interface

Google Maps is an example of a *slippy Map* interface, meaning that you can drag the map around and it loads automatically. This may seem relatively simple and mundane nowadays, but it was a major development in web mapping when Google Maps was first released, and has become the *de facto* way in which maps behave on the web, so is well worth familiarising yourself with.

Using the mouse simply drag the map around using the left click button, and use the mouse wheel to zoom in and out. Have an explore around the map, and move around quickly, can you see how it is working (*think back to the lecture*)? Though the image-based clip mapping approach that I demonstrated is no longer used by Google, the principle is the same, it's just that they download vector data now and render it into a map image once it has arrived in the browser (rather than delivering a pre-rendered image). You can also use the zoom buttons to zoom in and out, though not many people do this anymore as the mouse wheel is so much more convenient.

![image](http://students.jonnyhuck.co.uk/images/zoom.png)

###Map layers

Google Maps and the similar desktop program Google Earth both started life completely separately as two different companies that were bought by Google at around the same time (*we talked about this in the lecture*). Over time, they have been slowly merged to feature more and more of the same features, which has largely been driven by the large increase in the capabilities of web browsers in recent years, allowing much more data to be processed and interaction to be handled. One of the main things that Google Maps draw from Google Earth is aerial photography, which covers almost the whole surface of the Earth (*more about this in Lecture 3...*). To access this, look for the **Layer Control** button in the bottom left of the screen:

![image](http://students.jonnyhuck.co.uk/images/earth.png) ![image](http://jonnyhuck.co.uk/students/images/map_photo2.png)

This enables you to switch between **Earth** (Satellite) and **Map** (Road Map) views. Have a go! The **Earth** view also provides you with a number of photographs of the area covered by the map in a panel that appears at the bottom of the screen. Have a look around, *can you see your house...*? In Earth View, you will also notice some new controls in the bottom right that enable you to tilt and rotate the map - have a play with those, *why is this useful?*

<textarea></textarea>

![image](http://students.jonnyhuck.co.uk/images/tilt_ctrl.png)

There are other **Layers** of data that you can use in Google Maps as well. Click on the **Menu Button** in the top left corner to see them:

![image](http://students.jonnyhuck.co.uk/images/menu_button.png)

Clicking this button will open a sidebar that adds layers of data to the map - click on them to turn them on, and click them again to turn them off:

![image](http://students.jonnyhuck.co.uk/images/side_panel.png)

Have a look at each of them, *what are the differences? What would each be useful for? Why aren't they all just combined into a single map?*

<textarea></textarea>

Pay particular attention to the **Terrain** and **Traffic** layers. The terrain layer includes contours and hill-shading, revealing a great deal more about the physical form of the landscape than any of the other layers. The data are drawn from NASA's freely available STRM dataset (80m resolution). The traffic layer, on the other hand, is updated in real-time based upon the driving speed of people with Android mobile phones as well as reports gleaned from elsewhere on the web. *Are there implications of collecting data in this way?*

<textarea></textarea>

Note that when you activate the **Terrain** map, a switch appears at the bottom of the screen allowing you to quickly toggle the terrain view on and off:

![image](http://students.jonnyhuck.co.uk/images/terrain_switch.png)

Use this to toggle it on and off for a city location (e.g. Manchester), then do the same for a rural location (e.g. the Lake District). *How do the maps compare for each situation?*

<textarea></textarea>

###Streetview

Finally, lets have a look at **StreetView**... . Though widely taken for granted these days, **StreetView** is is an incredible spatial dataset, giving us an unprecedented view of the world. Unlike the aerial photography (which is licensed from other companies), Google collected the photography for **StreetView** themselves, using custom cameras mounted on the roof of cars, tricycles and even backpacks.

The collection of StreetView data was very controversial both in the UK and elsewhere in the world. Why do you think this was?

<textarea></textarea>

To use StreetView, you start by grabbing **Pegman**, a little character to the bottom right of the screen:

![image](http:/students.jonnyhuck.co.uk/images/Pegman.png)

Click and drag to carry him around the map, this should make some of the roads on the map go blue, these are the roads that have StreetView data available:

![image](http://students.jonnyhuck.co.uk/images/svavailability.png)

Drop Pegman onto one of the blue tracks and StreetView will open. Use the mouse to walk the streets using StreetView, and the mouse wheel to zoom in and explore things more closely:

![image](http://students.jonnyhuck.co.uk/images/streetview.png)

Click the arrow in the top-left corner to go back to the map.

*That's about all for the basics of the map itself, now we'll look at some of the tools that are built into it...*

---

##2. Getting to know Google Maps (Advanced)

One of the main features of Google Maps is its **Geocoder**, which is a tool that converts names to coordinates and lets you view them on the map. This is accessed by the **Search Box** on the top left of the screen:

![image](http://students.jonnyhuck.co.uk/images/search_box2.png)

Type in a place name and press enter, the map should zoom to the location that you specified, it will even make suggestions to you as you type using a JavaScript technique called **AJAX**, which we'll talk about another day...

Once the map has zoomed you to your location, a sidebar will appear on the left containing imagery, weather reports and other facts and information about the location that you have asked for. It also has tools to save this location to your profile, do searches for things near it, send the result directly to your phone or share the map via a link. The most popular tool, however, is the **Directions** tool, accessed by the button towards the top right. This tool is a route planner, and was originally the main purpose of Google Maps (and remains one of its primary uses).

![image](http://students.jonnyhuck.co.uk/images/search_results2.png)

Click **Directions** and it will open a new sidebar menu, asking you for an *origin* and *destination* for your journey. Google will then calculate the fastest route between the two using a route finding algorithm. You will also see on my screenshot that Google has stored my home and work locations, giving me quick access to places that I often go to.

![image](http://students.jonnyhuck.co.uk/images/directions2.png)

Enter an origin and destination as anywhere you like and see what it comes up with, here is my commute to work (*or would be if I drove here...*):

![image](http://students.jonnyhuck.co.uk/images/directions_result.png)

A useful feature in Google Maps when you are working with directions is to allow Google to work out your current location, to save you having to type it in. Whilst this is common in the Google Maps App for various mobile devices (where location is derived using an on-board GPS receiver), people often overlook this functionality on the desktop web site (where location is derived based upon your IP address). To give Google your location, press the **Location** button just above the **Zoom Controls**. Your browser will likely check whether or not you really want to do this (as it could be malicious), but just agree and you should see a blue dot your location.

![image](http://students.jonnyhuck.co.uk/images/location_button.png)

![image](http://students.jonnyhuck.co.uk/images/location_approval.png)

![image](http://students.jonnyhuck.co.uk/images/location_dot.png) 

*And that's about all for how the Google Maps website works. I appreciate some of you will have known some or even all of that already, but it's well worth having a refresher, and making sure that you know everything about Google Maps before you start incorporating it into your own websites!*.

--- 
*Now, lets see what it looks like in it's underpants...* 
##[Next: HTML](./html.html) 

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>