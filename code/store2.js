/**
 * Load a JSON array /object into the database.
 * @author jonnyhuck
 * @param key 		- the unique string for your website.
 * @param data 		- the JSON array/object containing the data you wish to store.
 * @param callback 	- the callback function for when data have been successfully stored.
 */
function storeMarkers(key, data, callback) {

    //convert the JSON data into a String
    var dataStr = JSON.stringify(data);

    //Prepare URL to clear the database
    var strUrl = ["http://students.jonnyhuck.co.uk/gisandtheweb/store/store.php?action=store&key=",
        key, "&data=", dataStr].join("");

    //make cross platform request object
    var xhr = createCORSRequest('GET', strUrl);

    //set an event listener for when successfully loaded
    xhr.onload = function () {

        //log result to console
        console.log(xhr.responseText);

        //delete if finished with
        if (xhr.responseText === "STORE.PHP: Success!") {

            if (callback) callback();
        }
    };

    //send the cross domain request
    xhr.send();
}


/**
 * Retrieve a markers array from the database
 * @author jonnyhuck
 * @param key - the unique string for your website.
 * @param callback - the callback function for when the data has been retrieved. The JSON object/array
 * 	will be passed to this function as an argument.
 */
function retrieveStoredMarkers(key, callback) {

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
        if (callback) callback(jsonData);
    };

    //send the cross domain request
    xhr.send();
}


/**
 * Cross Domain Requests
 * @author http://www.html5rocks.com/en/tutorials/cors/
 * @param String method ('GET' or 'POST')
 * @param String url
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