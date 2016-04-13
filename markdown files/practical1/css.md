#GIS and the Web: CSS
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---
##Cascading Style Sheets (CSS)
If you remember back to the HTML section, we learned that website content is described by HTML, whereas the **presentation** of the website (how it looks) is represented by CSS. 

Like HTML, CSS is not really a programming language. It is a style sheet language, that is, it lets you apply styles selectively to elements in HTML documents. For example, to select all the paragraph elements on an HTML page and turn the text within them red, you'd write this CSS:

```
 p {
  color: red;
}
```
This comprises a **selector** (`p`) followed by some curly braces (`{...}`) that contain a **declaration**, which in turn is made up of a **property** and a **property value** in the form: `property: value;`. Simply, the **Selector** tells the browser which **elements** to style using this **declaration**, the **property** refers to which pre-defined aspect of style should be affected (width, colour etc.), and the **property value** refers what that aspect of style should be set to. The above, therefore, sets the `colour` of the `p` elements to `red`, whereas `width: 100px;` would make the width of those elements 100 pixels.

To recap then, a CSS rule is comprised of:

* **Selector:** The HTML element name at the start of the rule set. It selects the element(s) to be styled (in this case, p elements). To style a different element, just change the selector.
* **Declaration:** A single rule like colour: red; specifying which of the element's properties you want to style.
* **Properties** Ways in which you can style a given HTML element. (In this case, color is a property of the p elements.) In CSS, you choose which properties you want to affect in your rule.
* **Property value** To the right of the property, after the colon, we have the property value, to choose one out of many possible appearances for a given property (there are many colour values besides red). 

![image](https://mdn.mozillademos.org/files/9461/css-declaration-small.png)

Note that the CSS will only work if the following syntactical conditions are met:

* Each rule set (apart from the selector) must be wrapped in curly braces ({}).
* Within each declaration, you must use a colon (:) to separate the property from its values.
* Within each rule set, you must use a semicolon (;) to separate each declaration from the next one.

You can set multiple properties at once by simply putting one **declaration** after another:

```
 p {
  color: red;
  width: 500px;
  border: 1px solid black;
}
```

You can also select multiple types of elements and apply a single rule set to all of them. Include multiple selectors separated by commas. For example, to turn all paragraphs (`<p>`), list items (`<li>`) and top-level headings (`h1`) red, you would use:

```
 p,li,h1 {
  color: red;
}
```
###Selectors:

There are a number of different types of **selector**, the above examples are all examples of **element selectors**, but there are several other kinds as well: these include:

**Selector name** |	**What does it select** | **Example**
:---|:---|:---
**Element selector** (sometimes called a tag or type selector)| All HTML element(s) of the specified type. | `p` Selects `<p>`
**Class selector** | The element(s) on the page with the specified class (multiple class instances can appear on a page). | `.my-class` Selects `<p class="my-class">` and `<a class="my-class">` etc.
**ID selector** | The element on the page with the specified ID (on a given HTML page, you're only allowed one element per ID). | `#my-id` Selects `<p id="my-id">` or `<a id="my-id">` etc.
**Attribute selector** | The element(s) on the page with the specified attribute. | `img[src]` Selects `<img src="myimage.png">` but not `<img>`.
**Pseudo class selector** | The specified element(s), but only when in the specified state, e.g. being hovered over. | `a:hover` Selects `<a>`, but only when the mouse pointer is hovering over the link.

In the [HTML](./html.html) section of this course, you learned about the attributes `id` and `class`, which can be accessed by **ID selectors** and **class selectors** respectively. To recap those attributes, they would look like this:

```
 <p class="key" id="principal">
```
where `key` and `principal` can be replaced with any values you like, just remember that the `id` value, (`principal`), must be unique in the document, but other tags in the document can have the same `class` name, (`key`). 

In CSS, this rule would then make all the elements with `class="key"` green. (They might not even all be <p> elements.)

```
.key {
  color: green;
}
```
Whereas this rule makes the one element with the id principal bold:

```
#principal {
  font-weight: bold;
}
```
If both of these rules were applied at once, then the element with `id="principal"` would be both green and bold, because the two rules refer to different properties (`color` and `font-weight`) and so are not in conflict . 

If more than one rule applies to an element and specifies the same property, then CSS gives priority to the rule that has the more specific selector. An **ID selector** is more specific than a **class selector**, which in turn is more specific than an **element selector**.

Consider this code then:

```
.key {
  color: green;
}

#principal {
  color: red;
}
```

What colour would the element with `id="principal"` be in this case?

<textarea></textarea>

If you want to see a comprehensive list of CSS selectors, see [here](http://www.w3schools.com/cssref/css_selectors.asp).

It is worth noting that, as with JavaScript, CSS can be placed in an external file, which can be handy as it means that you can keep your code a bit more organised, and (very importantly in the case of CSS), you can use a single style sheet to set the style for an entire website, rather than having to duplicate the code for each web page. This is much more efficient, as it means you can update your entire website by editing only one file! An important thing to note, however, is that you cannot do this using the `<style>` tag (like you can with the `script` tag, for example), but instead have to use the `<link>` tag, which is an **empty tag**, and looks like this:
```
 <link rel="stylesheet" type="text/css" href="theme.css">
```
The `rel="stylesheet" type="text/css"` attributes always stay the same if you are loading a CSS stylesheet, and the `href` attribute is where you put the path to your desired CSS file.


---
##Google Maps CSS

Now, let's go back to the CSS code that is within the `<style>` tags in the Google Map HTML:

```
 	html, body {
    	height: 100%;
    	margin: 0;
    	padding: 0;
    }
    
    #map {
        height: 100%;
   	}

```

This is setting the `html` and `body` elements to have a height of `100%`, and no `margin` or `padding`. It then sets the height of the element of `id="map"` to also have a height of `100%`. *What type of element has the attribute `id="map"`?*

<textarea></textarea>

To understand the effect of this code, we need to find out what all of these properties (`height`, `margin` and `padding`) mean:

* `height` refers to the height of the element in question. In the case of the above code, the `html`, `body` and `map` are all set to 100% (i.e. full screen). Because of the **cascading** way in which CSS works, what is actually happening is that `html` is being set to the size of the screen, `body` is then being set to the full size of `html` (because `body` is inside `html`),  and finally the element with `id="map"` is set to the full size of the `body` (because all of the visible elements, including the one with the property `id="map"` is inside the `body`).
* `margin` refers to the space around the outside of the element. This is illustrated in the below diagram, along with the properties `border` and `padding`.
* `padding`the space just around the content (e.g., around paragraph text). This is illustrated in the below diagram, along with the properties `border` and `margin`.

![image](https://mdn.mozillademos.org/files/9443/box-model.png)

There are far too many properties for me to list them here, but a comprehensive list is provided [here](http://www.w3schools.com/cssref/default.asp). 

###Getting your hands dirty with some CSS
Right, now we understand the basics, we can get on with making some changes. We know that the current CSS in our *firstmap.html* file essentially makes the maps fullscreen. This is useful in some circumstances, but can be annoying in others, because it prevents us from adding any other **elements** from the page. To solve this, set the `width` and `height` properties of the **element** with `id="map"`. You can see more about `width` and `height` [here](http://www.w3schools.com/cssref/pr_dim_height.asp) (*this is about `height` but they both work the same so it isn't worth looking up both of them!)*.
 
```
 html, body {
    height: 100%;
    margin: 0;
    padding: 0;
 }
      
 #map {
    width: 800px;
    height: 500px;
 }
    	
```

Now open it in *Firefox* (or refresh the page if it is already open) and see what happened. *Is that what you expected?*

Hopefully you now have a map like this:

<iframe src="http://students.jonnyhuck.co.uk/maps/simple_gmap.html" width='100%' height='500px' frameBorder="0"></iframe>

###Colours and fonts etc.

Right, we now have some whitespace to play with on the website, so lets have a play:

We'll start with the background colour of the website. Add this to the CSS for the `html` element. 

```
  background-color: #00539F;
```
Now change the colour. You will note that the colour is using what is called a **HEX Code** (`#00539F`), which is how CSS and HTML interpret colours. To help you pick one, you can use this handy [HTML Colour Picker](http://www.w3schools.com/tags/ref_colorpicker.asp). Simply select the colour that you want, and copy and paste the **HEX Code** into your CSS.

Now we can add some new HTML to our file, and we'll start with a heading. HTML has 6 types of heading built into it: `h1`, `h2`, `h3`, `h4`, `h5` and `h6`. Natively, each one of them is slightly smaller than the last, with `h1` (the largest) being intended as a main title, and `h6` (the smallest being little more than a bold version of what you have in `p`). On this page they look like this:

---

#h1
##h2
###h3
####h4
#####h5
######h6

---

Lets start with `<h1>` then: add `<h1>My First Google Map!</h1>` at the top of the `<body>` block. Refresh the page again. What you see now is the 'default appearance' of that heading. That is pretty ugly, so let's change it. We'll start with the font. Browsers have some fonts built into them, and you can see them [here](http://www.w3schools.com/cssref/css_websafe_fonts.asp).

Pick which ever font you like best for your title and add it to your CSS using the following rule (replacing `...` with your chosen set of fonts):

```
h1{
  font-family: ...;
}
```
If you want to be super-advanced, you can even bring in new fonts that aren't stored in the browser by following the instructions [here](https://www.google.com/fonts).

Now add a `color` property to it and set a colour from the [HTML Colour Picker](http://www.w3schools.com/tags/ref_colorpicker.asp) in the same way you did the `background-color` property of the `html`.

*Why do you think that you list several fonts rather than just using one?*

<textarea></textarea>

Refresh the page again. *Did it turn out like you wanted?*

Now add some `<p>` tags below the map and write some text in there about your map. set the font and colour of that as well. At this stage it does;t really matter what you write, the key is that we are practicing getting some HTML content onto a webpage and styling it using CSS. If you really don't know what to write, you could even use a [Lorem Ipsum](http://www.lipsum.com/), you can learn about and generate [**here**](http://www.lipsum.com/).

I won't be giving you too much practical experience of HTML and CSS as we go along, that's something that you'll have to figure out for yourself. Don't despair though, it's not difficult! Simply **Google** what you want to do, you will almost certainly find what you are looking for in the first result! Here's an example:

**[Centre text in CSS](https://www.google.co.uk/search?q=centre+text+in+css)**

The first page that Google gives you is [this one](http://www.w3schools.com/cssref/pr_text_text-align.asp)

which explains that the **rule** for this is:

```
h1 {
    text-align: center;
}
```

Add `text-align: center;` to your `h1` rule and refresh your page. *Did it work?*

*See what else you can add to your site, looking up **HTML Lists**, **HTML Tables* and **HTML Links** would be a good start...**

Now it's time to put some effort in: 
>have a good explore of CSS and get the website looking as professional as you can!

That's it for CSS for now, we'll visit it again later on when we look at re-styling the cartography of the Google Map itself, but in the meantime, keep googling!

##[Finished!](http://students.jonnyhuck.co.uk)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>