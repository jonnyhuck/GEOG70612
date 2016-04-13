##Working with Numbers (Math and Date)

When working with numbers, JavaScript has two useful **Objects** that you should know about: `Math` and `Date`. Here is a quick overview of both of them:

###Math
The built-in **Math** object has properties and methods for mathematical constants and functions. For example, the **Math** object's `PI` property has the value of pi (3.141...), which you would use in an application as:

```
Math.PI;

//e.g.:
console.log(Math.PI); 	//would print 3.141...
```

Similarly, standard mathematical functions are provided by **Math** as **methods**. These include trigonometric, logarithmic, exponential, and other functions. For example, if you want to use the trigonometric function sine, you would write:

```
Math.sin(1.56);
```
Note that all trigonometric methods of Math take arguments in radians, not degrees!

Here are some of the common **methods** in **Math** (no examples, as they would be a bit meaningless for a lot of these!):

**Method** | **Description** 
:--- | :---
`abs()` | Absolute value (makes negatives positive)
`sin()`, `cos()`, `tan()` | Standard trigonometric functions; argument in radians.
`asin()`, `acos()`, `atan()`, `atan2()` | Inverse trigonometric functions; return values in radians.
`floor()`, `ceil()` | Returns largest/smallest integer (whole number) less/greater than or equal to argument.
`min()`, `max()` | Returns lesser or greater (respectively) of comma separated list of numbers arguments.
`random()` | Returns a random number between 0 and 1.
`round()`, `fround()`, `trunc()` | Rounding and truncation functions.
`sqrt()`, `cbrt()`, `hypot()` | Square root, cube root, Square root of the sum of square arguments (Pythagoras' Theorem).
`sign()` | The sign of a number, indicating whether the number is positive (1), negative (-1), zero (0) or not a number (NaN).

If you want to see a complete list, or see further examples, take a look [**here**](http://www.w3schools.com/jsref/jsref_obj_math.asp).


###Date
One thing that can prove to be an unexpected pain when programming is handling dates. Fortunately, JavaScript's **Date** object has a large number of methods for setting, getting, and manipulating dates. Like most programming languages, databases and computers, JavaScript stores dates as the number of milliseconds since midnight on January 1st 1970.

To create a **Date** object, you use the following syntax:

```
var dateObjectName = new Date([parameters]);
```
Here, `[parameters]` refers to one of a number of options:

* Nothing: creates today's date and time. For example, `today = new Date();`.
* A string representing a date in the following form: `Month day, year hours:minutes:seconds.` For example, `var Xmas95 = new Date("December 25, 1995 13:30:00")k`. If you omit hours, minutes, or seconds, the value will be set to zero.
* A set of integer values for year, month, and day. For example, `var Xmas95 = new Date(1995, 11, 25);`.
* A set of integer values for year, month, day, hour, minute, and seconds. For example, `var Xmas95 = new Date(1995, 11, 25, 9, 30, 0);`.

The Date object methods for handling dates and times fall into these broad categories:

* "set" methods, for setting date and time values in Date objects. For example: `setHours()` sets the hour of a date object.
* "get" methods, for getting date and time values from Date objects.
* "to" methods, for returning string values from Date objects.
* "parse" methods, for parsing Date strings.

Each one (with the odd exception) typically has a variant for seconds, minutes, hours, day of the month, day of the week, months, and years. I am not going to list all of the possibilities here, but if you want to see a complete list, or see further examples, take a look [**here**](http://www.w3schools.com/jsref/jsref_obj_date.asp).