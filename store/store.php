<?php

//this is required for cross-domain
header("Access-Control-Allow-Origin: *");

//turn on error reporting
error_reporting(E_ALL);

/**
 * These methods store strings of locations for my "GIS and the Web" course
 */
//verify inputs
if (isset($_GET["action"]) && isset($_GET["key"]) && !empty($_GET["action"]) && !empty($_GET["key"])) {

//connect using mysqli
    if (!$mysqli = new mysqli("localhost", "jonny", "carter66", "webgis_store")) {
        echo "STORE.PHP: MySQL Connection Error: " . $mysqli->error;
//        exit();
    }

//get data
    $action = $mysqli->real_escape_string($_GET["action"]);
    $key = $mysqli->real_escape_string($_GET["key"]);

    //what do we want to do?
    if ($action == "store") {

        //is there any data to load?
        if (isset($_GET["data"]) && !empty($_GET["data"])) {

            //get the data string
            $data = $mysqli->real_escape_string($_GET["data"]);

            //query
            $query = "insert into `store`(`key`, `data`) values ('$key', '$data');";
            if ($mysqli->query($query)) {

                //report success
                echo "STORE.PHP: Success!";
            } else {

                //report error
                echo "STORE.PHP: MySQL Query Error: " . $mysqli->error;
                $mysqli->close();
//                exit();
            }
        } else {
            //report error
            echo "STORE.PHP: No Data Provided";
//            $mysqli->close();
//            exit();
        }
    } else if ($action == "retrieve") {

        //query
        $query = "select `data` from `store` where `key` = '$key' order by `id_store` desc;";
        if ($result = $mysqli->query($query)) {

            //load data into an output array of Strings
            $out = array();
            while ($row = $result->fetch_array(MYSQL_ASSOC)) {

                //push into array
                array_push($out, $row["data"]);
            }
            
            //encode json and echo out
            echo json_encode($out);
        } else {
            //report error
            echo "STORE.PHP: MySQL Query Error: " . $mysqli->error;
//            $mysqli->close();
//            exit();
        }
    } else {
        echo "STORE.PHP: Invalid Action. Please Use 'store' Or 'retrieve'.";
    }

    //close the db connection
    $mysqli->close();
} else {
    echo "STORE.PHP: Incorrect Parameters";
}
