#GIS and the Web: JavaScript
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---
##JavaScript: In at the deep end

Right, let's have a closer look at the JavaScript shall we? JavaScript ("JS" for short) is a programming language that, when applied to an HTML document, can provide dynamic interactivity on websites. We already know that JavaScript is held in `<script>` tags in the HTML, and there are two lots of these in the above code. Here they again:

**1:**

```
 <script>

		var map;

		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {53.4668406, -2.2359519}, 
		    zoom: 15
		  });
		}

    </script>
```

**2:**

```
 <script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>
```

The first important thing to notice is that these two tags use very different approaches to loading JavaScript onto a web page. The first one simply encloses some JavaScript code, but the second one loads some external JavaScript from elsewhere on the web using the `src=` attribute of the `<script>` tag. The latter of these approaches is very useful for keeping your code tidy as your website grows, as it enables you to separate your page in to multiple neat files instead of one large one, but for now we are fine to use the inline (first) approach. 

So what exactly are they doing? Well the second one is downloading Google's own JavaScript code to the web page to run the basics of the Google Map (we can't read this as they use special tools to hide it so people don't copy it), but we should take note of the `?callback=initMap` part of this statement, which is telling Google's code to call the `initMap` function when it has finished loading (`callback` in programming typically means "after you've finished", a bit like if you telephoned someone who was too busy to talk, so they would "*call back*" after they've finished...). We should also note the `async` attribute, which lets the browser render the rest of your website while the Maps API loads.

The first script, on the other hand, contains two important features:

* `var map;`: A **variable** called `map` to reference the map when it has been created.
* `var latLng...;`: A **variable** called `latLng` to store the Latitude, Longitude coordinates of the desired map location.
* `function initMap() {...}`: A **function** called `initMap`, which acts as the *callback* of the second script.

To understand what these are, let's go over some of the basics of JavaScript. But first... 

---

###JavaScript: The Basics

####Variables: 
Variables are containers that you can store values in. You start by declaring a variable with the `var` keyword (short for "variable"), followed by any name you want to call it. So, for example, if I wanted a variable that held my name, I might call it `myName` like this:

```
var myName;
```
I can then store a value in it like this:

```
myName = "Jonny";
```
or, for efficiency, do both at once:

```
var myName = "Jonny";
```
*Note that every line of JavaScript has to end with a `;`, if you forget this, your script probably won't work, or you may get some unexpected results!*

*Also note that variable names can't have any spaces or characters that are not a-z, A-Z or 0-9 in them. By convention, variables in JavaScript are normally written in "camel case" (as opposed to "upper case" or "lower case"), which is demonstrated above. In camel case, the first word should start with a lower case letters, and all subsequent words should start with an upper case letter (making sure that there are no spaces!). Here are some examples:*

* *camelCase*
* *aReallyLongVariableName*
* *short*
* *jonnyHuck*

You can then retrieve the value from `myName` any time you like. For example, to open an "alert" box that says the value of `myName` you could put:

```
alert(myName);
```
Which would result in:

![image](http://students.jonnyhuck.co.uk/images/alert.png)

If you wish, you can change the value in a variable at any time:

```
myName = "Dr Huck";
```
You can store any value in a variable, but different kinds of values have different names, and it is important that you know the differences between them for when we start doing more advanced coding in the next few weeks. Here are the types:


**Variable** | **Explanation** | **Example**
:--- | :--- | :---
String | A string of text. To signify that the variable is a string, you should enclose it in quote marks. | `var myVariable = "Bob";`
Number | A number. Numbers don't have quotes around them. | `var myVariable = 10;`
Boolean | A True/False value. The words `true` and `false` are special keywords in JS, and don't need quotes. 	| `var myVariable = true;`
Array | A structure that allows you to store multiple values in one single reference. | `var myVariable = [1,'Bob','Steve',10];` Refer to each member of the array like this: `myVariable[0], myVariable[1]`, etc.
Object 	| Basically, anything else. This will include all of the Google Maps API 'Types' that you will come across. The creation of a new object often requires the `new` keyword. | `map = new google.maps.Map(...);`

A variable that does not contain a value of one of these types is said to be `null`.

---

###Comments:	
When writing code, it is normal to include **comments** that explain exactly what you are doing and why. This is important as it makes your code readable to others (*especially important for marking purposes!*) as well as providing a valuable *aide memoire* to yourself - you'll be surprised how alien even your own code can seem when you haven't looked at it for a while!

There are three ways to do a comment:

Doc comment (should be used at the top of each function):

```
 /**
  * Everything here is a comment.
  */
```
Multiline comment (should be used for sections of code):

```
/*
 Everything in between is a comment.
*/
```
Single line comment (should be used for almost every line):

```
// This is a comment
```
The top two are essentially the same - the only difference is that doc comments will appear in *docs* (documentation), and multiline comments won't. Docs are like instructions that are generated automatically by software, but we'll come back to those later...

To go back to our bit of code from earlier then, we might do something like this:

```
 <script>
		
		//create a variable to hold the map object
		var map;
		
		/**
		 * This function is called as a callback from the Google Maps script.
		 * It creates the map object and sets the centre coordinates and zoom level.
		 * The map object is stored in the map variable
		 */
		function initMap() {
		  
		  //create a Google Map object, and store it in the map variable
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {53.4668406, -2.2359519}, 
		    zoom: 15
		  });
		}

 </script>
```
This might appear a bit repetitive at the moment, but as your scripts expand this will be come a very valuable part of the code. As a rule of thumb, well-written code should be roughly one-third code, one-third comments, and one third whitespace. Whilst this doesn't affect the functionality of the code, it makes it much easier to read, and I promise it will save you a lot of time later!

*Now go back to Notepad++ and try to comment the JavaScript code as much as you can based upon the explanations above.*

---

###Operators
An operator is a mathematical symbol that produces a result based on two values (or variables) called **operands**. We will look at three different types of operator: **Assignment Operators**, **Comparison Operators** and **Arithmetic Operators**. In the following table you can see some of the simplest operators, along with some examples:

Operator | Explanation 	| Symbol(s) | Example
:--- | :--- | :--- | :---
add/concatenation | Used to add two numbers together, or glue two strings together. | `+` |	`6 + 9;` <br><br> `"Hello " + "world!"`;
subtract, multiply, divide | These do what you'd expect them to do in basic maths. | `-`, `*`, `/` | `9 - 3;` <br><br> `8 * 2;` <br><br> `9 / 3;`
assignment operator | You've seen this already, it assigns a value to a variable. | `=` | `myVariable = "Bob";`
Identity operator | Does a test to see if two values are equal to one another, and returns a true/false (Boolean) result. | `===` | `myVariable = 3;` <br><br> `myVariable === 4;` (`false`)
negation, not equal | Returns the logically opposite value of what it preceeds; it turns a true into a false, etc. <br><br> When it is used alongside the **equality** operator, the negation operator tests whether two values are not equal. |	`!, !==` 	| `myVariable = 3;` <br><br> `!(myVariable === 3);` (`false`) <br><br>`myVariable = 3;` <br><br> `myVariable !== 3;` (`false`)
greater than, less than | these operands compare the operands and determine whether the one to the left is *greater than* (`>`) or *less than* (`<`) the one on the right. <br><br> When combined with an equals  (`>=`, `<=`), the meaning changes to *greater than or equal to* or *less than or equal to* respectively. | `>`, `>=`, `<`, `<=`| `var2 > var1`<br><br>`var1 <= var2`
increment, decrement| `++`, `--` | Adds oneto and subtracts one from its operand respectively. If used as a prefix operator (`++x`), returns the value of its operand after adding one; if used as a postfix operator (`x++`), returns the value of its operand before adding one. | If `x` is 3, then `++x` sets `x` to 4 and returns 4, whereas `x++` returns 3 and, only then, sets `x` to 4.

---

###The JavaScript Console
When programming, it is often handy to be able to make your code write things out. For those times, there is the **JavaScript Console**, which is built into most browsers. To open the console in Firefox, press **Alt** to make the menu appear at the top of the screen, and go to **Tools > Web Developer > Web Console**. Alternatively, press the **menu** button and go to **Developer > Web Console**.

![image](http://students.jonnyhuck.co.uk/images/ffconsole1.png)

**--OR--**

**1.** ![image](http://students.jonnyhuck.co.uk/images/ffmenubutton.png)

**2.** ![image](http://students.jonnyhuck.co.uk/images/ffmenudeveloper.png)
**3.** ![image](http://students.jonnyhuck.co.uk/images/ffconsole2.png)

Getting your code to write to the console is as easy as using `console.log()`:

```
console.log("hello console!");
```

You can even type it right into the console, in the box next to this symbol:

![image](http://students.jonnyhuck.co.uk/images/consoleinput.png)

*Have a go, you should see this:*

![image](http://students.jonnyhuck.co.uk/images/helloconsole.png)

One reason for this might be that you simply want to keep track of where the script is up to, sending `console.log()` commands like:

```
console.log("Processing Data...");

//some data processing code here...

console.log("Complete!");
```

In reality, you are unlikely to type much into the console. You would more likely add the `console.log()` statements into your code (inside the `<script>` tags), and watch the statements print to the console as the code runs. 

Another common reason to use the console, is **debugging**, which is essentially trying to find mistakes (or **bugs**) in your code. For example, imagine that you had some code that did some basic maths:

```
var a = b * c;
var answer = a / d;
```

Now imagine that it wasn't working. How would you figure out the problem? The easiest way to solve this would be to have a look in each of the variables. Here is an example that includes comments to explain the thought process of the programmer: 

```
//first check the input variables:
console.log(b);		//prints 2
console.log(c);		//prints 5

//they seem fine, so test the result:
console.log(a);		//prints 10

//also fine (as expected), so lets test the next variable
console.log(d);		//prints "apple"

//"apple" isn't a number, so you cannot use it in an equation...
//change the value of d to a number, and it should work fine!
```

So, to print out data or information whilst you're programming, you simply need to add `console.log()` statements to your code, and watch the statements appear whilst the script runs. Simple!

---

###Functions
Functions are a way of packaging code that you want to reuse, so that whenever you want the functionality of that code you can call the function with it's name, rather than constantly rewriting the entire code.

You have already seen some functions in this practical: `initMap()` is one (it sets up a Google Map for you), and `alert()` is another (it brings up an 'alert' box on the screen). Some functions (like `alert()` or `console.log()`) already exist in the JavaScript, or are brought in with scripts that you load (such as all of the functions contained in the Google Maps API - we'll come to those later). Others, however, are created by you, and in fact, most of your code will be written in the form of functions. Fortunately, creating a function is not very hard, here is an example:

```
 /**
  * Return my name
  */
 function whatsMyName(){
 	
 	//store my name in a variable as a String
 	var myName = "Jonny";
 	
 	//return that variable
 	return myName;
 }
``` 
*Note how the code within the function is indented, this helps to make the code readable, and is important for well-written code.*

Note the use of the `return` keyword there, that tells the function to output the specified value (myName in this case). If this wasn't done, then the values created inside the function would not be accessible to the rest of the code. In the case of:

```
var nameFromFunction = whatsMyName();
```

The function `whatsMyName()` will be run, and then whatever value is passed in the `return` statement will be stored in the variable `nameFromFunction`. Simple! Not every function will need a return statement (`alert()` for example doesn't return any values, it just opens a box), and this is fine, just be sure that you have it if you need it!

As useful as the above function is, most functions require values to be given to them, with which they can do things. Values are passed to functions in the form of **arguments**, which are enclosed within the parentheses (`( )`) of the **function** and are separated by commas if there are more than one:

```
function functionName(argument1, argument2) {
  return number * number;
}
```

For example, consider:

```
/**
 * Returns the square of a number
 */
function square(number) {
  return number * number;
}
```
In this example, the function `square` contains a single **statement** that says to **return** the **argument** of the function (that is, `number`) multiplied by itself.

*What would happen if you called:* `console.log(square(6));`*?*
<textarea></textarea>

*How would you write a function to multiply two numbers together?*
<textarea></textarea>

It is important to remember that defining a function does not execute it. Defining the function simply names it and specifies what to do when it is called. **Calling** the function actually performs the specified actions with the indicated **arguments**. For example, if you define the function `square`, you could call it as follows:	

```
square(5);
```
It is also important to remember that you must have defined the function *before* you **call** it, *i.e.* it must be further ***up*** the script!

Will this code work then?

```
//open a box telling me the square of 5
square(5);

/**
 * Returns the square of a number
 */
function square(number) {
  return number * number;
}
```
<textarea></textarea>

####Variable Scope in functions

One of the most confusing things about functions is the idea of **scope**, which means the variables and functions that are able to be accessed by a function. The rule is that variables defined *inside* a function cannot be accessed from anywhere outside the function, because the variable is defined only in the **scope** of the function. However, a function can access all variables and functions defined inside the scope in which it is defined (*i.e. outside the function, but not inside another function*).

Confusing? well, yes, but don't worry, I'm going to explain it...

Consider this code:

```
//define a variable
var aNumber = 6;


/**
 * A function
 */ 
function aFunction(){
 	var anotherNumber = 2;
 }
 
 
/**
 * Returns the square of a number
 */
function square(number) {
  return number * number;
}

//open boxes giving the squares of some numbers
alert(square(aNumber));
alert(square(anotherNumber));

```

Okay, so what we have here is:

 1. The declaration of the variable `aNumber`.
 2. The declaration of the function `aFunction`, which declares the variable `anotherNumber` and does not return anything.
 3. The declaration of the function `square`, which returns the square of any number that is passed to it as an argument.
 4. Two statements that attempt to open `alert` boxes containing the square of 

In this case, three things are defined in what we call the **global scope**: `var aNumber`, `function aFunction` and `function square`. The **global scope** simply means that they are not contained within any other **blocks** of code (*i.e. within curly braces* `{ ... }`). Functions and variables in the **global scope** can be accessed by any code whatsoever (*which is why it's called **global***).

`var anotherNumber`, on the other hand, is declared within the **block** of `function aFunction`, meaning that it is in the **scope** of `function aFunction` and not the **global scope**. As such, it can only be seen by `function aFunction` and other variables and functions that are also defined within `function aFunction`. Here's the declarations from that code again, with the comments changed to explain the scope of each declaration:

```
//global scope
var aNumber = 6;

//global scope
function aFunction(){
	
	//aFunction scope
 	var anotherNumber = 2;
 }
 
 
//global scope
function square(number) {
  return number * number;
}

```

The result of this is, of course, that the statement `var anotherNumber = 2;` is completely useless, because there are no other functions or variables inside `function aFunction`, meaning that `var anotherNumber` can never be used.

*What do you think the result of the above block of code will therefore be? What will come up in the *`alert`* boxes?*
<textarea></textarea>
*give it a go in Notepad++ and see. Were you right?*

---

###Objects
For the moment, we are not going to get too bogged down in making objects, but it is important that you understand what they are, and how to use them. Basically, an **Object** is a bit of code that represents a *thing* in real life (a cat, a tree, a pair of pants, whatever). **Objects** have **Properties** associated with them. A cup, for example could be represented by a `cup` object, which would likely have properties such as `color` (blue), `material` (pottery), `capacity` (0.3l) and so on.

You will come across objects frequently when working with the Google Maps JavaScript API, and there are two ways to create them. The first is called an **Object Initializer**, and the second an **Object Constructor**. Examples of both are given below using the Google Maps JavaScript API [LatLng](https://developers.google.com/maps/documentation/javascript/reference?hl=en#LatLng) object.

An **Object Initializer** uses curly braces `{ }` in order to define an **Object Literal**, which is essentially a series of **properties** using the pattern `{property1:value1, property2: value2}`. The property name is followed by a colon (`:`) then the corresponding value, and multiple properties are separated by commas. Here's an example that uses a literal `LatLng` to set the centre of the map, by using it's `setCenter()` function:

```
 //sets the centre of the map to the Arthur Lewis Building
 var arthurLewisBuilding = {lat: 53.4668406, lng: -2.235952};
 map.setCenter(arthurLewisBuilding);
```
You could even do this without the bother of making a variable, and just use the **Object Literal** directly in the function:

```
 map.setCenter({lat: 53.4668406, lng: -2.235952});
```

Literals are a great 'quick and easy' way to create objects *on the fly* if you just want to use them once and forget about them, or even to use the same value several times (e.g. to centre the map and then place a marker there). If, however, you want to have a bit more control over what you are doing, then you might need to use a **Constructor**. A constructor is basically just a **function** that returns an **Object** based upon the values that you pass to it. The way you know that it is a constructor is that it has the `new` keyword before it. So, to repeat the same example as before:

```
 //sets the centre of the map to the Arthur Lewis Building
 var arthurLewisBuilding = new google.maps.LatLng(53.4668406, -2.235952);
 map.setCenter(arthurLewisBuilding);
```

You '**pass**' the values that you want to include (latitude and longitude in this case) to the **constructor** as **arguments**, and it uses them to **return** your object. In order to do this, of course, you need to know what order to pass the values in. Fortunately, this is simple as well, you just [look it up](https://developers.google.com/maps/documentation/javascript/reference?hl=en#LatLng) in the [**Google Maps JavaScript API Reference**](https://developers.google.com/maps/documentation/javascript/reference?hl=en#LatLng). If you have a look at that page, you will see this box:

![image](http://students.jonnyhuck.co.uk/images/constructorref.png)

This clearly tells you that the **constructor** is defined as:

```
LatLng(lat:number, lng:number, noWrap?:boolean)

```

which means that you need to **pass**:

 * A number for the latitude
 * A number for the longitude
 * Optionally (as indicated by the **?**), a boolean (`true`/`false`) value for whether or not the values should be wrapped.
 
Ignoring for now the optional value, our constructor is therefore:

```
new google.maps.LatLng(53.4668406, -2.235952);
```

The [**Google Maps JavaScript API Reference**](https://developers.google.com/maps/documentation/javascript/reference?hl=en#LatLng) is a very important tool for this course, and it is well worth getting familiar with it.

---

*I know that seems a lot to take in, but I don't expect you to memorise it all at once! remember that you can always just refer back to this website whenever you need it. Right, I think it's time to have a go...*

##[next: Dealing with coordinates](./coordinates.html)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>