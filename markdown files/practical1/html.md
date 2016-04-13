#GIS and the Web: HTML
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---
##1. Introduction to HTML
There are may technologies involved in the web, some of which you will learn about in this course. The most fundamental, however, is HTML - without this, there could be no web pages. HTML stands for **Hyper-Text Markup Language**, and is used to define the **content** of a web page. It was developed by British physicist [Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) in the late 1980's as a way for scientists to share information over the Internet (*please note the difference between the **web** and the **Internet** they are not the same thing!*).

*What is the difference between the Internet and the Web? If you don't know, [Google](http://google.co.uk) it!*

<textarea></textarea>

HTML is a **markup language**. The word markup was used by editors who marked up manuscripts when giving instructions for revisions. "Markup" now means something slightly different: a language with specific syntax that instructs a Web browser how to display a page. 

HTML separates "content" (words, images, etc.) from "presentation" (colours, fonts etc.). HTML uses a pre-defined set of elements to define content types. **Elements** contain one or more **tags** that contain or express **content**. **Tags** are enclosed by angle brackets, and the **closing tag** begins with a forward slash. Here is an illustration.

![Illustration of HTML Tags](https://mdn.mozillademos.org/files/9347/grumpy-cat-small.png)

For example, the **tag** for the **paragraph** element, which is used to hold text, looks like this: `<p>`, and it's **closing tag** looks like this:`</p>`. Here it is in use:

```
 <p>I love HTML.</p>
```
which, on a web page, would look like:

######I love HTML.

What do you reckon the closing tag for `<strong>` looks like?

<textarea></textarea>

Tags can be nested inside each other as well. The **emphasis** tag `<em>`, for example, can be used inside the **paragraph tag**:

```
 <p>I <em>love</em> HTML.</p>
```
which, on the web page would look like:

######I *love* HTML.

Some elements do not contain any text content or any other elements. These are **empty elements** and need no closing tag. This is an example:

```
<img src="smileyface.jpg" alt="Smiley face" >
```

This works using **attributes**, in this case `src` (source) and `alt` (alternative text). **Attributes** are additional information contained within **start tags**, and normally consist of 2 parts: 

 * An attribute **Name**
 * An attribute **Value**

In the case of the `<img>` tag, therefore, `src` is the **name** of the attribute, and `"smileyface.jpg"` is the value. This is telling the browser that an image goes there, and that the source (`src`) of it (the image file) is `"smileyface.jpg"`.

Two of the most important tags are `class` and `id`, as these are used by CSS and JavaScript to access the elements on your web page:

```
 <p class="key" id="principal">
```

You can set these values to anything you want, as they are only used to refer to those elements in your code, and not by the browser directly. The difference between them is that `id` must be unique for each **element**, whereas multiple elements can have the same value for `class`. This means that you have the ability to access individual **elements** from your CSS and JavaScript (using `id`), or to access them in groups (using `class`). We will discuss these attributes in more detail in the **CSS** part of the course.

####Making a web page

Basically, the browser reads the tags, and uses them to tell it how to **render** the web page, it's that simple!

Here are the bare minimum tags for a decent web page:


```
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <p>This is my first web page</p>
  </body>
</html>
```
*Lets have a go with it - copy the above code and paste it into **Notepad++**, then save it as ***firstpage.html***. Now drag it from Explorer into **Firefox** and have a look how it renders, does it work?*

Hopefully, you are now looking at a very plain and boring web page that just says "*This is my first web page*", but don't worry, it's not much of a leap from there to a full-blown Google Map!

One other thing you will come across in HTML is **Comments**. They are useful for explaining a section of markup, leaving notes for other people who might work on the page, or for leaving reminders for yourself. HTML comments are enclosed in symbols as follows:

```
 <!-- This is a comment -->
```

Anything within the `<!-- ... -->` tags around it will be ignored by the browser and will not be rendered. For example, this code:

```
 <!-- This is where I communicate my feelings about HTML -->
 <p>I <em>love</em> HTML.</p>
```
will still appear like this on the web page:

######I *love* HTML.

It is well worth commenting everything that you do, and is especially important for your assessment, so I want you to get into the habit of commenting all of your code, irrespective of what it is.

---
##2. Anatomy of a Google Map

A web page is, as you learned in the lecture, principally made up of three kinds of code: **HTML**, **CSS** and **JavaScript**. Here's what a simple Google Map looks like in code:

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
        height: 100%;
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

*Is that it?!?!* 

Let's see if it works: copy and paste the above code into a new file in **Notepad++**, and save it as ***firstmap.html***. Now double click on the resulting file to open it in a browser. *Does it work?*

It should do. This is quite surprising, right? So little code to have a fully functional Google Map with all of its layers, tools and functions that we looked at earlier! *Why do you think this is?* 

<textarea></textarea>

Well, in reality, it isn't quite as simple as that. The line that says `<script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>` is actually downloading a **LOT** of other JavaScript code from Google to run the map, but you can't do anything with that code, not even read it, so we can happily just ignore it. 

To all intents and purposes, therefore, the above is all you need to get started with a Google Map. *And even better than that, we're only part way through the first practical and you've already made your own Google Map web page!! This coding stuff is easy...*

Okay, let's have a look a this in detail... Much of the code you see above is HTML **elements** (defined by **tags**) that should be recognisable from the lecture. You have:

* `<!DOCTYPE html>`: Tells the browser that we are using HTML5 (the newest HTML).

* `<html>...</html>`: which encloses everything, letting the computer know that everything inside is HTML.

* `<head>...</head>`: which encloses the part of the HTML that you WILL NOT see on the screen (the header).

* `<body>...</body>`: which encloses the part of the HTML that you WILL see on the screen (the body).

* `<meta>...</meta>`: which contains information about the web page for the purpose of the web browser (e.g. character set).

There are also some bits that you haven't seen yet:

* `<div>...</div>`: This is an HTML placeholder, in this case, it is where the map is drawn. `div`s are intended to define different sections of documents and group together related tags to help with the organisation of web pages. They have has no physical form unless something is put in it.

* `<script>...</script>`: This holds JavaScript code. This can be either in the `<head>` (if you want the code to load before the page), or the `<body>` (if you want the code to load after the page). In this case, it's in the `<body>` as the `<div>` needs to exist before we can put a map in it!

* `<style>...</style>`: This holds **CSS** (Cascading Style Sheet) code, which defines what the website looks like. Colours, fonts, sizes etc. are all defined in CSS. We will look at this next week.

The page is essentially coded as an empty page, holding nothing but a simple empty `<div>`. Once it loads, however, the Google's JavaScript runs and loads a Google Map into the `<div>`. Finally, the page will run any code that you have added yourself, which may be used to position the map, change its appearance, add data to it, and so on...

*Now I want you to go back to **Notepad++** and **comment** the HTML, explaining exactly what each tag does. This will be a valuable revision resource for you.*

If you want to read more about these tags, or look up some others, click [here](http://www.w3schools.com/tags/) to see a complete list. There's quite a lot of them!

---
*Now, let's see how we can make that HTML look a bit nicer...*
##[next: CSS](./css.html)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>