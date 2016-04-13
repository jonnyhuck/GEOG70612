#GIS and the Web: Controlling JavaScript
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

##JavaScript: Conditional Statements

So far we have looked into the basics of how to write JavaScript Code through the use of **variables**, **functions** and **operators**. Now we will dig a little deeper, and learn about how to gain a greater control over how your code works using **Control Statements**.

###if...else Statements

`if...else` statements are used in order to determine whether or not a particular block of code should run. Their basic form is like this:

```
if (condition) {
  statement_1;
} 
```
Let's break that down:

 * `if` tells the browser a decision needs to be made based upon the following `condition`.
 * Brackets (`()`) then identify the `condition` that is to be tested.
 * Curly braces (`{}`) then identify the block of code that runs if the `condition` evaluates to `true`.
 * `statement_1` is therefore in place of the code that would run if the if the `condition` evaluates to `true`.
 
This can also be expanded:

```
if (condition) {
  statement_1;
} else {
  statement_2;
}
```
This latter form includes:
 * `else` tells the browser that a second block of code should be run in the event that the `condition` evaluates to `false`.
 * Curly braces (`{}`) then identify the block of code that runs if the `condition` evaluates to `false`.
 * `statement_2` is therefore in place of the code that would run if the `condition` evaluates to `false`.

So, for example:

```
var iceCream = 'chocolate';
if (iceCream === 'chocolate') {
  alert('Yay, I love chocolate ice cream!');    
} else {
  alert('Awwww, but chocolate is my favorite...');    
}
```
would cause an `alert` box that said *"Yay, I love chocolate ice cream!"*. *What would happen if I changed the first line to* `var iceCream = 'vanilla';`*?*

<textarea></textarea>

There is also an extra form called `else if` that allows you to add multiple conditions tested in sequence. Here is an example:

```
if (condition_1) {
  statement_1;
} else if (condition_2) {
  statement_2;
} else if (condition_n) {
  statement_n;
} else {
  statement_last;
} 

```

In this case, if `condition_1` is true, then `statement_1` will run. If not, `condition_2` will be tested, and if it is true, then `statement_2` will run. If not, `condition_n` will be tested, and if it is true, then `statement_n` will run, and so on. Finally, if all of the above conditions were false, then the `else` keyword will mean that `statement_last` will run.

####Falsy values
It is important to understand that in JavaScript, there are number of values that considered to be the same as `false`. These are called **falsy** values, and are listed below:

 * false
 * undefined
 * null
 * 0
 * NaN (Not a Number)
 * the empty string ("")
 
*What would be the result of the below statement then?*

```
var iceCream = "";
if (iceCream) {
  alert('true!');    
} else {
  alert('false');    
}
```

<textarea></textarea>

*The below evaluates to `true`, why?*

```
var iceCream = 'strawberry';
if (iceCream = 'chocolate') {
  alert('Yay, I love chocolate ice cream!');    
} else {
  alert('Awwww, but chocolate is my favorite...');    
}
```
###switch Statements
`switch` statements are very similar to `if...else` statements, but are a little quicker to write if you are making many decisions based upon the value of a single variable. The format is like this:

```
switch (variable) {
  case value:
    statement_1
    break;
  default:
   statement_2
}
```
Let's break that down:

 * `switch` lets the browser know that it is a switch statement.
 * Brackets (`()`) identify the variable to be tested.
 * `variable` is the variable to be tested.
 * `case` indicates a potential value.
 * `value` is the potential value that we are testing the value of `variable` against.
 * `statement_1`is in place of the code that will run if `variable` is equal to `value`.
 * `break` tells the browser not to carry on running the `switch` statement. This is very important, as missing it out can mean that all of the statements will run (even if their `value` does not match that of `variable`).
 * `default` is the equivalent of `else` in an `if...else` statement, it runs if none of the `case value`s match with that of `variable`.
 * `statement_2` is the code block that will run if none of the `case value`s match with that of `variable`.
 
 Here is an example:

```
switch (fruittype) {
  case "Oranges":
    console.log("Oranges are $0.59 a pound.");
    break;
  case "Apples":
    console.log("Apples are $0.32 a pound.");
    break;
  case "Bananas":
    console.log("Bananas are $0.48 a pound.");
    break;
  case "Cherries":
    console.log("Cherries are $3.00 a pound.");
    break;
  case "Mangoes":
    console.log("Mangoes are $0.56 a pound.");
    break;
  case "Papayas":
    console.log("Mangoes and papayas are $2.79 a pound.");
    break;
  default:
   console.log("Sorry, we are out of " + fruittype + ".");
}

```

###Ternery Statements
A **ternary statement** is one that involves the use of the **conditional** (*or **ternary***)operator `?`. This is an even more shorthand way of writing a conditional statement, in the case that you want to assign either one value or another to a given variable, based upon a `condition`. Here's the form:

```
variable = (condition) ? value_1 : value_2;
```
Simply, it works like this:

 * `variable` is the variable into which the resulting value is stored.
 * `condition` is the test (resulting in `true` or `false`) that determines which value is assigned to the `variable`.
 * `value_1` is the value that will be assigned to the `variable` if the `condition` evaluates to `true`.
  * `value_2` is the value that will be assigned to the `variable` if the `condition` evaluates to `false`.
  
For example, then:
```
var status = (age >= 18) ? "adult" : "child";
```
would create a variable called `status` that contains the value `"adult"` if `age` is greater than or equal to `18`, and `"child"` if not.

---
##JavaScript: Loops and Iteration
A loop in JavaScript is a simple way of doing something multiple times. 

###for Statement

For example, if you wanted to run a statement 5 times, you could avoid using:

```
alert("Hi Jonny!");
alert("Hi Jonny!");
alert("Hi Jonny!");
alert("Hi Jonny!");
alert("Hi Jonny!");
```
with:

```
for (var i = 0; i < 5; i++) {
	alert("Hi Jonny!");
}
```
This may look a little complex, but really it's quite simple. The format may be considered as:

```
for ([initialExpression]; [condition]; [incrementExpression]) {
  statement
}
```
Here's the breakdown...
 
 * `for` tells the browser that it is a `for` statement.
 * `initialExpression` (`var i = 0`). The **initial expression** runs once, the first time that the loop is called. It is normally used to initialise a variable to be used as a loop counter variable (in the `condition`).
 * `condition` (`i < 5`). The **condition expression** runs every time that the loop runs (so 5 times in the above example). It is used to determine whether or not the loop should run again by testing the value of the loop counter variable (in this case seeing if it is below 5).
 * `incrementExpression` (`i++`). The **increment expression** runs every time that the loop runs (so 5 times in the above example). It is normally used to increment the loop counter variable (see **operators** to remind yourself exactly what `++` does). This usually involves increasing its value by 1 each time the loop is run.
 * `statement` (`alert("Hi Jonny!");`). The **statement** is the block of code that runs repeatedly until the **condition expression** determines that the loop should stop.

*Why is the **less than** operator (`<`) used in the **condition expression** in the above "Hi Jonny!" example? If it only runs if the value is <5, then how does it run 5 times and not 4?*
<textarea></textarea>

###while & do...while Statements
A `while` statement repeats for as long as a specified condition evaluates to true. It looks like this:

```
while (condition)
  statement
```

In a `while` loop, the `condition` test occurs before the `statement` in the loop is executed. If the condition returns `true`, the `statement` is executed and the `condition` is tested again. If the `condition` returns `false`, execution stops and the script will continue as normal.

If you want to make sure that the `statement` runs at least once, you should use a `do...while` statement, which is the same, but the `condition` is not tested until after the first run:

```
do
  statement
while (condition);
```

e.g.:

```
while (keepGoing === true) {
  alert("Hi Jonny!");
}
```

**With **`while`** loops, you must be very careful that the **`condition`** will eventually become **`false`**, otherwise you will create an infinitely running loop that will never finish, and so will crash your web page! Unless **`keepGoing`** is set to **`false`** elsewhere, then the above example will be an infinite loop.**

*Okay, this week has been a steep learning curve, but you're doing great! Just one more step to go...*

##[next: External Data in Google Maps](./thematic.html)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>