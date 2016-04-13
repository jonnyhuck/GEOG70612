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

    //Browser specific XmlHttpRequest Object
    var httpRequest = window.XMLHttpRequest ? new XMLHttpRequest() :
            new ActiveXObject("Microsoft.XMLHTTP");

    //Prepare URL to clear the database
    var strUrl = ["http://students.jonnyhuck.co.uk/store/store.php?action=store&key=",
        key, "&data=", data].join("");

    //set an event listener for when the HTTP state changes
    httpRequest.onreadystatechange = function () {

        //a successful HTTP request returns a status of 200
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                //log result to console
                console.log(httpRequest.responseText);

                //delete if finished with
                if (httpRequest.responseText === "STORE.PHP: Success!") {

                    if(dataIsStored) dataIsStored();
                }
            }
        }
    };

    //Send data to the server
    httpRequest.open("GET", strUrl, true);
    httpRequest.send(null);
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
    var strUrl = ["http://students.jonnyhuck.co.uk/store/store.php?action=retrieve&key=",
        key].join("");

    //set an event listener for when the HTTP state changes
    httpRequest.onreadystatechange = function () {

        //a successful HTTP request returns a status of 200
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

                //log the result to console
                console.log(httpRequest.responseText);

                //get the response and parse back to an array
                var jsonData = JSON.parse(httpRequest.responseText);

                //call the user response for when the data is ready
                if(dataIsReady) dataIsReady(jsonData);
            }
        }
    };

    //Send data to the server
    httpRequest.open("GET", strUrl, true);
    httpRequest.send(null);
}