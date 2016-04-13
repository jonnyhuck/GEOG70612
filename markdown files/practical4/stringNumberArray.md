#GIS and the Web: JavaScript Arrays
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

###Arrays
Last time, when we were making **Map Styles**, what you were actually creating were **Arrays** of data. Today we are going to have a brief look over arrays in detail, as they are fundamental to how we handle geographical data in code.

Where a variable holds a single value, arrays are effectively a list of values, containing as many values as you wish. Common uses of arrays might be, for example, lists of coordinate pairs to represent the locations of a set of points that you wish to draw onto your map.

There are three main ways to create an array, all of which provide the same result:

```
var arr = new Array(element0, element1, ..., elementN);
var arr = Array(element0, element1, ..., elementN);
var arr = [element0, element1, ..., elementN];
```
where `element0, element1, ..., elementN` is a list of values for the array's elements. When these values are specified, the array is **initialised** with them as the array's elements. If you want to make an empty array (with no elements), just do the same but with no arguments:

```
var arr = new Array();
var arr = Array();
var arr = [];
```
Similarly, you may want to make an array with a particular number of elements in it that which you will populate later on. To do this, you do this:

```
var arr = new Array(10);

var arr = Array(10);

//this approach takes two steps, so you probably wouldn't use it
var arr = [];
arr.length = 10;

```

If you want to find out how many values are stored in your array, you can see this by looking at the `length` property of the array like this:

```
 arr.length
```

So, for example:

```
var fruit = ["apple", "banana", "orange"];
console.log(fruit.length);
```
would write `3` to the console, because there are three values in the array.

Once you have a number of elements in an array (either empty or with values), you will want to be able to refer to them in order to either set or retrieve a value. This is easy: each element in an array has an **index** value that you can use to refer to it. The first element has index 0, the second 1, next 2 and so on...

so:

```
var fruit = ["apple", "banana", orange];
console.log(fruit[0]]);		 // prints 'apple'
console.log(fruit[1]]);		 // prints 'banana'
console.log(fruit[2]]);		 // prints 'orange'
console.log(fruit.length);   // prints '3'
```
*Note how the *`length`* of the array is 3, but the **index** only goes up to 2. This is, obviously, because the **index** count starts at 0, but this is the cause of many many coding errors! Always remember, the highest **index** in an array is always* `length-1`*.*

Finally, you can also make **multi-dimensional arrays** (essentially an array of arrays), for example:

```
//normal arrays
var fruit = ["apple", "banana", orange];
var snacks = ["mars", "twix", "crisps"];
var lunch = ["pizza", "curry", "lasagne"]; 

//multi-dimensional arrays
var food = [fruit, snacks, lunch];
```
*Note the quote marks for the **String** values, but not for variable names.*

We'll do a bit more on arrays in the near future, that should be plenty to be going on with for now!

---

##Working with Arrays

We have covered the basics of arrays already, such as creating, populating and referencing them. The **Object** **"Array"**, however, has lots of powerful methods attached to it, and these can be used to allow you to do more complex things with your arrays without needing to write lots and lots of code. Here are some examples:

`concat()` joins two arrays and returns a new array:

```
var myArray = new Array("1", "2", "3");
myArray = myArray.concat("a", "b", "c"); 	// myArray is now ["1", "2", "3", "a", "b", "c"]
```
`join()` joins all elements of an array into a string. If you pass a string as an argument, then it will place that string as a **delimiter** between each element:

```
var myArray = new Array("Wind", "Rain", "Fire");
var list1 = myArray.join(); 		// list1 is "WindRainFire"
var list2 = myArray.join(" - "); 	// list2 is "Wind - Rain - Fire"
```

`push()` adds one or more elements to the end of an array and returns the resulting length of the array:

```
var myArray = new Array("1", "2");
myArray.push("3"); 	// myArray is now ["1", "2", "3"]
```

`pop()` removes the last element from an array and returns that element:

```
var myArray = new Array("1", "2", "3");
var last = myArray.pop(); 	// myArray is now ["1", "2"], last = "3"
```

`shift()` removes the first element from an array and returns that element:

```
var myArray = new Array ("1", "2", "3");
var first = myArray.shift(); 	// myArray is now ["2", "3"], first is "1"
```

`unshift()` adds one or more elements to the front of an array and returns the new length of the array.

```
var myArray = new Array ("1", "2", "3");
myArray.unshift("4", "5"); 		// myArray becomes ["4", "5", "1", "2", "3"]
```

`slice(start_index, end_index)` extracts a section of an array and returns it in a new array:

```
var myArray = new Array ("a", "b", "c", "d", "e");
myArray = myArray.slice(1, 4); // starts at index 1 and extracts all elements
                               // until index 3, returning [ "b", "c", "d"]
```
`splice(index, count_to_remove, addElement1, addElement2, ...)` removes elements from an array and (optionally) replaces them:

```
var myArray = new Array ("1", "2", "3", "4", "5");
myArray.splice(1, 3, "a", "b", "c", "d"); 

// myArray is now ["1", "a", "b", "c", "d", "5"]
// This code started at index one (or where the "2" was), 
// removed 3 elements there, and then inserted all consecutive
// elements in its place.
```

`reverse()` transposes the elements of an array: the first array element becomes the last and the last becomes the first:

```
var myArray = new Array ("1", "2", "3");
myArray.reverse(); 	// transposes the array so that myArray = [ "3", "2", "1" ]
```

`sort()` sorts the elements of an array (into alphabetic).

```
var myArray = new Array("Wind", "Rain", "Fire");
myArray.sort(); 	// sorts the array so that myArray = [ "Fire", "Rain", "Wind" ]
```

`indexOf(searchElement[, fromIndex])` searches the array for `searchElement` and returns the index of the first match. Optionally (hence the square brackets), you can tell it where to start searching:

```
var a = ['a', 'b', 'a', 'b', 'a'];
console.log(a.indexOf('b')); 		// logs 1

// Now try again, starting from after the last match
console.log(a.indexOf('b', 2)); 	// logs 3
console.log(a.indexOf('z')); 		// logs -1, because 'z' was not found
```
`lastIndexOf(searchElement[, fromIndex])` works like `indexOf`, but starts at the end and searches backwards:

```
var a = ['a', 'b', 'c', 'd', 'a', 'b'];
console.log(a.lastIndexOf('b')); 		// logs 5

// Now try again, starting from before the last match
console.log(a.lastIndexOf('b', 4)); 	// logs 1
console.log(a.lastIndexOf('z')); 		// logs -1
```

The above is by no means a comprehensive list, but certainly covers the basics. If you would like to see a full list, or see further examples, take a look [**here**](http://www.w3schools.com/jsref/jsref_obj_array.asp).

*Now we've got that down, lets start having a look into how we can start gaining a little more control over our code:*

##[next: Controlling JavaScript](./control.html)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>