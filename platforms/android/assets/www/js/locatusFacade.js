function addUser() {
    //check validation
    if (doValidate_frmSignUp()) {
        console.info("Validation ok");

        //if validation is successful then fetch info from input controls(textbox, radio etc)
        var username2 = $("#username2").val();
        var password2 = $("#password2").val();
        var firstName = $("#inptFirstName").val();
        var lastName = $("#inptLastName").val();
        var email = $("#inptEmail").val();
        var homeAddress = $("#inptHomeAddress").val();
        var city = $("#inptCity").val();
        var postalCode = $("#inptPostalCode").val();
        var dob = $("#inptDOB").val();
        //insert a record to the DB
        var options = [username2, password2, firstName, lastName, email, homeAddress, city, postalCode, dob];
        User.LocatusInsert(options);
    }
    else {
        console.info("Validation failed");
    }
}

function userProfile() {
    var htmlCode="";
    var activeUser= localStorage.getItem("Username");
    var options=[activeUser];

    function successSelect(tx, results) {
        var user = results.rows.item(0);

        htmlCode += "<h1>Name: " + user['firstName'] + " " + user['lastName'] + "</h1>"
            + "<h4>Username: " + activeUser + "</h4>"
            + "<h4>Email: " + user['email'] + "</h4>"
            + "<h4>Address: " + user['homeAddress'] + "</h4>"
            + "<h4>City: " + user['city'] + "</h4>"
            + "<h4>Postal Code: " + user['postalCode'] + "</h4>"
            + "<h4>DOB: " + user['dob'] + "</h4><br>";


        var lv = $("#profileShow");
        lv.html(htmlCode);
    }
    User.loginSelect(options, successSelect);
}

function showFeed() {
    var htmlCode="";
    var activeUser= localStorage.getItem("Username");

    function successSelectAll(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var feed = results.rows.item(i);
            googleLink="";

            htmlCode += "<li><a data-role='button' id='StatusButton' data-row-id=" + feed['id']+ " href='#'>"
                + "<h3>"+ feed['username'] + "</h3>"
                + "<h4>" + feed['status'] + "</h4>"
                + "<h6>Date: " + feed['date'] + "</h6>"
                + "<h6> Lat:"+feed['latitude']+"</h6><h6> Lon:"+feed['longitude']+"</h6>"
                +"</a></li>";

            var lv = $("#feed");
            lv.html(htmlCode);
            lv.listview("refresh");
            $("#feed a").on("click", clickHandler);

            function clickHandler() {
                localStorage.setItem("id", $(this).attr("data-row-id"));
                $.mobile.changePage("#ShowStatusLocation", {transition:'slide'});

            }
        }
    }
    Feed.feedSelectAll(successSelectAll);
}
function showUserPI() {
    var username = localStorage.getItem("Username");
    var options = [username];

    function successSelectOne(tx, results) {
        var row = results.rows.item(0);


        $("#chgFirstName").val(row["firstName"]);
        $("#chgLastName").val(row['lastName']);
        $("#chgEmail").val(row['email']);
        $("#chgAddress").val(row['homeAddress']);
        $("#chgCity").val(row['city']);
        $("#chgPC").val(row['postalCode']);
        $("#chgDOB").val(row['dob']);
    }

    User.LocatusSelectEdit(options, successSelectOne);
}
function showUserLI() {
    var username = localStorage.getItem("Username");
    var options = [username];

    function successSelectOne(tx, results) {
        var row = results.rows.item(0);
        console.info(" username: " + row['username'] + " password: " + row['password']);

        $("#passwordEdit").val(row['password']);
        $("#verifyPasswordEdit").val(row['password']);
    }

    User.LocatusSelectEdit(options, successSelectOne);
}
function updateUserPI() {
    if (doValidate_frmChgPI()) {
        console.info("Validation ok");
        var username = localStorage.getItem("Username");

        var firstName = $("#chgFirstName").val();
        var lastName = $("#chgLastName").val();
        var email = $("#chgEmail").val();
        var homeAddress = $("#chgAddress").val();
        var city = $("#chgCity").val();
        var postalCode = $("#chgPC").val();
        var dob = $("#chgDOB").val();

        var options = [firstName, lastName, email, homeAddress, city, postalCode, dob, username];
        User.LocatusUpdatePI(options);
    }
    else {
        console.info("Validation failed");
    }
}
function updateUserLI() {
    //check validation
    if (doValidate_frmChgLI()) {
        console.info("Validation ok");

        //if validation is successful then fetch info from input controls(textbox, radio etc)
        var username = localStorage.getItem("Username");
        var password = $("#passwordEdit").val();
        //insert a record to the DB
        var options = [password, username];
        User.LocatusUpdateLI(options);
    }
    else {
        console.info("Validation failed");
    }
}
function deleteFeedwithUser() {
    var username = localStorage.getItem("Username");
    var options = [username];

    Feed.DeleteFeedForUsername(options);

}
function deleteUser() {
    var username = localStorage.getItem("Username");
    var options = [username];

    User.LocatusDelete(options);
}


//Feed code
function addStatus() {
    getPosition();
    var latitude;
    var longitude;
    var status = $("#status").val();
    var today = new Date();
    var username=localStorage.getItem("Username");


    setTimeout(function () {

        latitude= localStorage.getItem("Lat");
        longitude= localStorage.getItem("Lon");
        var options = [status, username, latitude, longitude, today];
        Feed.FeedInsert(options);
        if(latitude== null||longitude== null)
        {
            alert("Location not yet received therefor lat & lon are null");
        }
        showFeed();

    }, 200);


}