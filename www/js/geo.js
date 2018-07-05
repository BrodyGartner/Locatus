
function getPosition() {
    try {
        if (navigator.geolocation != null) {
            var options={
                enableHighAccuracy:true,
                timeout: 60000,
                maximumAge: 10
            };

            function successCallback(position) {
                var coordinates = position.coords;
                var lat = coordinates.latitude;
                var lon = coordinates.longitude;
                var alt = coordinates.altitude;

                var type = google.maps.MapTypeId.ROADMAP;

                function showPosition() {
                    localStorage.setItem("Lat", lat);
                    localStorage.setItem("Lon", lon);

                    console.info("Latitude: " + lat);
                    console.info("Longitude: " + lon);
                    console.info("Altitude: " + alt);

                }
                function showPositionOnMap() {
                    var latlon = lat + "," + lon;
                    var zoom = 14;
                    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center= " +
                        latlon + "&zoom=" + zoom +
                            "&size=400x300&sensor=true";
                    $("#mapHolder").prop("src", img_url);
                }
                function showPositionOnMapWithMarker() {
                    var pos={
                        lat: lat,
                        lng: lon
                    };
                    var options ={
                        zoom:12,
                        center: pos,
                        mapTypeId: type
                    };

                    var map = new google.maps.Map(document.getElementById('PhotoMap'), options);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Map"
                    });
                }


                showPosition();
                showPositionOnMap();
                showPositionOnMapWithMarker();

            }
            function errorCallback(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.error("Error: TIMEOUT - " + error.message);
                        break;
                    case error.PERMISSION_DENIED:
                        console.error("Error: PERMISSION_DENIED - " + error.message);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Error: POSITION_UNAVAILABLE - " + error.message);
                        break;
                    default:
                        console.error("Error: Unhandled error - " + error.code + "-" + error.message);
                        break;

                }
            }
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
        else{
            console.error("HTML5 geolocation is not supported");
        }

    } catch (e) {
        console.error("Exception in getPosition() : " + e);
    }
}


function statusPosition() {
    try {
        var lat;
        var lon;
        if (navigator.geolocation != null) {
            var options={
                enableHighAccuracy:true,
                timeout: 60000,
                maximumAge: 10
            };



            function successCallback(position) {

                function getLat() {
                    var id = localStorage.getItem("id");
                    options=[id];
                    function successSelect(tx, results) {
                        var location = results.rows.item(0);
                        var sLat=location['latitude'];
                        lat=parseFloat(sLat);
                    }

                     Feed.feedSelect(options, successSelect);
                }

                function getLon() {
                    var id = localStorage.getItem("id");
                    options=[id];
                    function successSelect(tx, results) {
                        var location = results.rows.item(0);
                        var sLon=location['longitude'];
                        lon=parseFloat(sLon);

                    }

                    Feed.feedSelect(options, successSelect);
                }

                var type = google.maps.MapTypeId.ROADMAP;

                function showPosition() {
                    console.info("Latitude: " + lat);
                    console.info("Longitude: " + lon);
                }
                function showPositionOnMap() {
                    var latlon= lat+", "+ lon;
                    var zoom = 14;
                    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center= " +
                        latlon + "&zoom=" + zoom +
                        "&size=400x300&sensor=true";
                    $("#StatusMap").prop("src", img_url);
                }
                function showPositionOnMapWithMarker() {

                    var pos={
                        lat: lat,
                        lng: lon
                    };
                    var options ={
                        zoom:12,
                        center: pos,
                        mapTypeId: type
                    };

                    var map = new google.maps.Map(document.getElementById('StatusMap'), options);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Map"
                    });
                }
                getLat();
                getLon();
                setTimeout(function () {
                    showPosition();
                    showPositionOnMap();
                    showPositionOnMapWithMarker();
                },100);

            }
            function errorCallback(error) {
                switch (error.code) {
                    case error.TIMEOUT:
                        console.error("Error: TIMEOUT - " + error.message);
                        break;
                    case error.PERMISSION_DENIED:
                        console.error("Error: PERMISSION_DENIED - " + error.message);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Error: POSITION_UNAVAILABLE - " + error.message);
                        break;
                    default:
                        console.error("Error: Unhandled error - " + error.code + "-" + error.message);
                        break;

                }
            }
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        }
        else{
            console.error("HTML5 geolocation is not supported");
        }

    } catch (e) {
        console.error("Exception in getPosition() : " + e);
    }
}
