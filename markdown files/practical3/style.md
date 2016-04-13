#GIS and the Web: Styling Google Maps
[back to index](http://students.jonnyhuck.co.uk)

---
####*A quick note about the practicals...*
*Remember to use Mozilla Firefox to do these practicals. Please do **NOT** use Microsoft Internet Explorer / Edge, as they are not suitable for web development*

---

##Google Maps API: Styled Maps
###Introduction to Styled Maps:

As you have seen in the lecture, whilst the Google Maps JavaScript API could never be said to give you full cartographic reign over the maps that you make with it, they do permit you some control over the appearance of the map. **Styled maps** essentially allow you to customise the presentation of the standard Google base maps, changing the visual display of such elements as roads, parks, and built-up areas.

This is done by the creation of what Google calls **Map Styles**, which are composed of **selectors** and **stylers**. **Selectors** specify what map components should be selected for styling, while **stylers** specify the visual modification of those elements. In a way these may be seen as similar to **CSS** in the way that they work, but beware, the syntax is not the same!

This is a little complex at first: Styled maps use two concepts to apply colours and changes to a map:

* **Map features** are the geographic elements that can be targeted on the map. These include roads, parks, bodies of water, and more, as well as their labels.
* **Stylers** are colour and visibility properties that can be applied to map features. They define the display colour through a combination of hue, colour, and lightness/gamma values.

Map features and stylers are combined into a **style array**, which is passed to the map's `MapOptions` object, or to the `StyledMapType` constructor. Here is an example of a styles array (*note that the *`''`* would need populating with values for this to work!*):

```
var stylesArray = [
  {
    featureType: '',
    elementType: '',
    stylers: [
      {hue: ''},
      {saturation: ''},
      {lightness: ''},
      // etc...
    ]
  },
  {
    featureType: '',
    // etc...
  }
]
```
Let's have a look at that in detail...

#####Map Features:
A map consists of a set of features, such as a road or park, which are specified using a `MapTypeStyleFeatureType`. Specifying the feature as `all` will select all of the map elements. Features are specified using the syntax, `featureType: "feature"`. For example:

```
{
  featureType: "road"
}
```

Some feature type categories contain sub-categories which are specified using a dot (`landscape.natural` or `road.local`, for example). Like **CSS**, if the parent feature (e.g. `road`) is specified, then styles applied to this selection will be applied to its children (e.g. `local` roads) too, unless you then override it by specifying a different style for the child feature.

Additionally, some features on a map contain different **elements**. A road, for example, consists of not only the graphical line (geometry) on the map, but also the text denoting its name (labels). **Elements** within features are selected by specifying a category of type `MapTypeStyleElementType`. 

The following element types are supported (**These are important!! you need these to be able to make your own stylers later!**):

* all (default) selects all elements of that feature.
* geometry selects all geometric elements of that feature.
	* geometry.fill selects only the fill of the feature's geometry.
    * geometry.stroke selects only the stroke of the feature's geometry.
* labels selects only textual labels associated with that feature.
    * labels.icon selects only the icon displayed within the feature's label.
    * labels.text selects only the text of the label.
    * labels.text.fill selects only the fill of the label. The fill of a label is typically rendered as a colored outline that surrounds the label text.
    * labels.text.stroke selects only the stroke of the label's text.

The following specification, for example, selects the labels for all local roads:

```
{
  featureType: "road.local",
  elementType: "labels"
}
```

#####Stylers:
Stylers are formatting options of type `MapTypeStyler` which are applied to map features. The following MapTypeStyler options are supported:

* **hue** (an RGB hex string) indicates the basic colour.
* **lightness** (a floating point value between -100 and 100) indicates the percentage change in brightness of the element. Negative values increase darkness (where -100 specifies black) while positive values increase brightness (where +100 specifies white).
* **saturation** (a floating point value between -100 and 100) indicates the percentage change in intensity of the basic colour to apply to the element.
* **gamma** (a floating point value between 0.01 and 10.0, where 1.0 applies no correction) indicates the amount of gamma correction to apply to the element. Gammas modify the lightness of hues in a non-linear fashion, while not impacting white or black values. Gammas are typically used to modify the contrast of multiple elements. For example, you could modify the gamma to increase or decrease the contrast between the edges and interiors of elements. Low gamma values (< 1) increase contrast, while high values (> 1) decrease contrast.
* **invert_lightness** (if `true`) simply inverts the existing lightness. This is useful, for example, for quickly switching to a darker map with white text.
* **visibility** (on, off, or simplified) indicates whether and how the element appears on the map. A simplified visibility removes some style features from the affected features; roads, for example, are simplified into thinner lines without outlines, while parks lose their label text but retain the label icon.
* **color** (an RGB hex string) sets the colour of the feature.
* **weight** (an integer value, greater than or equal to zero) sets the weight of the feature, in pixels. Setting the weight to a high value may result in clipping near tile borders.

The colour of a feature may be set with either a single `color`, or modified by combination of `hue`, `saturation` and `lightness`. These properties represent two different methods of representing colour but it's possible to combine the two methods. For example, you might set a colour and then alter the saturation and lightness to fade out the map (e.g. if you brought up a dialog, or wanted to accent some data that you had overlaid onto the map). 

***Note:** this is a common place to have problems, I would recommend just **color** for now. If you really want to get into HSL, then read the below section carefully and be sure to set all three components (Hue, Saturation, Lightness). If you don't set all three, you may get unexpected results!*

Styler rules are applied in the order they appear within the MapTypeStyler array. Do not combine multiple operations into a single styler operation; instead, you should define each operation as a separate entry in the styler array.

***Note:** Don't have a go just yet, wait until you get further down the page!*

###Thinking about colours:

####The Hue, Saturation, Lightness (HSL) Model

Styled maps use the **Hue, Saturation, Lightness** (**HSL**) model to denote colour within the styler operations. These operations to define colour are common within graphic design and web design. Hue indicates the basic colour, saturation indicates the intensity of that colour, and lightness indicates the relative amount of white or black in the constituent colour. This is illustrated in the below figure:

![link](https://developers.google.com/maps/documentation/javascript/images/hsl.png)

Technically, RGB hue values that consist of equal parts Red, Green and Blue — such as `#000000` (black) and `#FFFFFF` (white) and all the pure shades of grey — do not indicate a hue whatsoever. To indicate black, white or grey, you must remove all saturation (set the value to -100) and adjust lightness instead (`-100` = black; `100` = white). Additionally, when modifying existing features which already have a colour scheme, changing a value such as hue does not change its existing saturation or lightness.

***Remember:** I would recommend just **color** for now. If you really want to get into HSL, then be sure to set all three components (Hue, Saturation, Lightness). If you don't set all three, you may get unexpected results!*

Here are some examples to try and make it a little clearer:

To display a feature as bright blue:

```
stylers: [
  { hue: "#00d4ff" },
  { saturation: 60 },
  { lightness: -20 },
  { gamma: 1.51 }
]
```
To display a feature as bright green, using a single RGB value:

```
stylers: [
  { color: "#99FF33" }
]
```
To remove all color from a feature, regardless of its starting color:

```
stylers: [
  { saturation: -100 }
]
```
To hide a feature completely:

```
stylers: [
  { visibility: "off" }
]
```

###Style Array Example

The map feature selectors and the styler rules are combined into a style array. Any combination of features can be targeted in a single array; however, the number of styles that you can apply at once is limited, and if your style array exceeds the maximum number of characters then no style will be applied at all!

Let's have a look at a basic example: This `styleArray` turns all map features to grey, then colours arterial road geometry in blue, and hides business labels completely:

```
var styleArray = [
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];
```
*Do you see how those three steps take place? In particular, note the use of **saturation** to effectively turn the map to greyscale*.

<textarea></textarea>

And here is the result:

<!--<iframe src="https://developers.google.com/maps/documentation/javascript/examples/full/style-array" width='100%'
  height='300px' frameBorder="0"></iframe>-->

***Note:** Still don't have a go just yet, wait until you get further down the page!*

###Using your Style Array:

Back at the start of this page, I said that there are two approaches to styling a Google Map: 

* Passing your `styleArray` to the map's `MapOptions` object, which is effectively editing the default Google Map style.
* Using the `StyledMapType` constructor to create an entirely new map style.

Deciding which you would like to do is largely down to what you are doing. If you just want to make a few minor tweaks to the map, the `MapOptions` approach is probably easiest. If you want to make a whole new map, then that is what the `StyledMapType` is for. We will take a brief look at both approaches here:

####Changing the Default Map Style
To modify the styles of the default map type (changes to labels and roads will also affect terrain and satellite maps), set the style array in the map's MapOptions either at time of construction or by calling setOptions. 

The following example reduces the saturation on all features and disables labels on roads:

```
var styles = [
  {
    stylers: [
      { hue: "#00ffe6" },
      { saturation: -20 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

map.setOptions({styles: styles});
```
*Okay, now give the above a go, did it work? Don't feel the need to start doing your own styles yet - get to the bottom of this page first...*

For a comprehensive look at what features on the map can be styled, check out the [API Reference](https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType). Also, see [here](https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleElementType) to see what aspects of them you can change.

####Creating a new Map Style
You can create a new map type to which to apply styles, by creating a `StyledMapType` and passing the `StyleArray` information to the constructor. This approach does not affect the style of the default map types.

To create a new map type, the steps are as follows:

1. Create your array of styles (*as already described above*). 
1. Create a new `google.maps.StyledMapType` object, passing it the array of styles, as well as a name for the new map type.
1. Create your map object and, in the map options, include an identifier for the the new map type in the `mapTypeIds` array (which is a property of the `mapTypeControlOptions` object).
1. Associate the identifier in the last step with the new styled map.
1. Set the map to use the new map type.

***Note:** You can see where this needs to go based on the position of the *`map`* variable. The easiest thing to do is just replace your map variable with this (remembering to rescue your coordinates, zoom level etc!).*

```
function initialize() {

  // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(55.6468, 37.581),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  map = new google.maps.Map(document.getElementById('map'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}
```

*Can you see which parts of the code correspond to the steps listed above?*

<textarea></textarea>

And here is the result:
<!--<iframe src="https://developers.google.com/maps/documentation/javascript/examples/full/styledmaptype" width='100%' height='300px' frameBorder="0"></iframe>-->

Once again, for a comprehensive look at what features on the map can be styled, check out the [API Reference](https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleFeatureType). Also, see [here](https://developers.google.com/maps/documentation/javascript/reference#MapTypeStyleElementType) to see what aspects of them you can change.

##Making your own styles...
Creating styles by hand and testing your code to see how they look is potentially time-consuming. Instead, you can use the [Styled Map Wizard](http://googlemaps.github.io/js-samples/styledmaps/wizard/index.html) to set up the `StyleArray` for your map's styles. The wizard allows you to select features and their elements, apply operations to those features, and save the styles to an array that you can copy and paste into your code.

#####How to use it:
1: Navigate to the map region you wish to use to preview your style. Jump to a particular location using the Enter a location field in the top right.

![link](http://students.jonnyhuck.co.uk/images/sw_location.png)

2: Select a type of feature to style in the Selectors panel.

![link](http://students.jonnyhuck.co.uk/images/sw_selectors.png)

3: If you only wish to style the Geometry or Labels for the selected feature type, select the required Element Type.

![link](http://students.jonnyhuck.co.uk/images/sw_element.png)

4: Select the combination of Stylers to apply to the selected feature type.

![link](http://students.jonnyhuck.co.uk/images/sw_stylers.png)

5: Once you are happy with the styling of the feature type, click the Add button in the Map Style panel to save the style and create a new style to work on.

![link](http://students.jonnyhuck.co.uk/images/sw_add.png)

6: Repeat Steps 2 to 5 to build up the set of styles for your map. Styles are applied in the order they are listed in the Map Style panel.
7: Select an existing style in the Map Style panel to edit it.
8: Delete a style by clicking on the trashcan icon to the right of the style number.

![link](http://students.jonnyhuck.co.uk/images/sw_delete.png)

9: When you are happy with your Styled Map, click the **Show JSON** button to display the code required to apply your style to a map. Copy and paste this into your code.

![link](http://students.jonnyhuck.co.uk/images/sw_showjson.png)

##Some Examples...
Google also provide some examples of styles that you can use for inspiration:

* [Simple Style Example](https://developers.google.com/maps/documentation/javascript/examples/maptype-styled-simple)
* [Complex Style Example](https://developers.google.com/maps/documentation/javascript/examples/maptype-styled-complex)

And don't forget about these web-based colour tools:

* [HTML Colour Picker](http://www.w3schools.com/colors/colors_picker.asp)
* [Adobe Color](https://color.adobe.com)
* [Many other options from Google...](https://www.google.co.uk/search?q=html+colour+picker)

Now for your task:

>Produce your own styled map, suitable to serve as an attractive background map over which data can be layered.

*I'm looking forward to seeing some well-styled and exciting maps, good luck! Remember that the smart approach is to use Google to help you find colour hex codes and I would also recommend using the Styled Map Wizard to help you design your map - it's almost rude not to! Also remember the forum if you get stuck...! *

##[Finished!](http://students.jonnyhuck.co.uk)

---
<small>v1.0 &copy; 01/2016 [Dr Jonny Huck](http://jonnyhuck.co.uk). Some of the material on these pages is derived from the excellent [Google Developers](https://developers.google.com/maps/documentation/javascript) and [Mozilla Developers](https://developer.mozilla.org/en-US/Learn) websites. Google Developers content is licensed under the [Creative Commons Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/), and code samples are licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0). Mozilla Developers by Mozilla Contributors is licensed under [CC-BY-SA 2.5.](http://creativecommons.org/licenses/by-sa/2.5/)</small>