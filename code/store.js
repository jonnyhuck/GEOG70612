/**
 * Load the position part of a markers array into the database and remove from map if successful
 * @param key - the unique string for your website
 * @param {type} data
 * @requires the method dataIsStored() to be implemented. This is called when the data has been successfully stored
 */
function storeMarkers(key, data) {

    //extract the positions from the markers array
    var markerArray = [];
    for (var i = 0; i < data.length; i++) {
        markerArray.push({lat: data[i]['position'].lat(),
            lng: data[i]['position'].lng()});
    }

    //convert the array into a String
    var data = JSON.stringify(markerArray);

    //Prepare URL to clear the database
    var strUrl = ["http://students.jonnyhuck.co.uk/gisandtheweb/store/store.php?action=store&key=",
        key, "&data=", data].join("");

    //make cross platform request object
    var xhr = createCORSRequest('GET', strUrl);

    //set an event listener for when successfully loaded
    xhr.onload = function () {

        //log result to console
        console.log(xhr.responseText);

        //delete if finished with
        if (xhr.responseText === "STORE.PHP: Success!") {

            if (dataIsStored)
                dataIsStored();
        }
    };


    //send the cross domain request
    xhr.send();
}


/**
 * Retrieve a markers array from the database
 * @param key - the unique string for your website
 * @requires the method dataIsReady() to be implemented. This is called when the data has been retrieved
 */
function retrieveStoredMarkers(key) {

    //Browser specific XmlHttpRequest Object
    var httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() :
            new ActiveXObject("Microsoft.XMLHTTP");

    //Prepare URL to clear the database
    var strUrl = ["http://students.jonnyhuck.co.uk/gisandtheweb/store/store.php?action=retrieve&key=",
        key].join("");

    //make cross platform request object
    var xhr = createCORSRequest('GET', strUrl);

    //set an event listener for when successfully loaded
    xhr.onload = function () {

        //log result to console
        console.log(xhr.responseText);

        //get the response and parse back to an array
        var jsonData = JSON.parse(xhr.responseText);

        //call the user response for when the data is ready
        if (dataIsReady)
            dataIsReady(jsonData);
    };

    //send the cross domain request
    xhr.send();
}


/**
 * Cross Domain Requests
 * http://www.html5rocks.com/en/tutorials/cors/
 * @param {type} method
 * @param {type} url
 * @returns {XDomainRequest|XMLHttpRequest|createCORSRequest.xhr}
 */
function createCORSRequest(method, url) {

    //make a platform-specific cross-domain object
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;
        console.log("This browser does not support this library")
    }
    return xhr;
}