var User ={
    LocatusInsert: function (options) {
        function txFunction(tx) {
            var sql = "INSERT INTO user(username, password, firstName, lastName, email, homeAddress, city, postalCode, dob) " +
                "values(?, ?, ?, ?, ?, ?, ?, ?, ?);";

            function successInsert() {
                console.info("Success: insert successful");
                alert("Welcome to Locatus");
                window.location="login.html";
            }
            function errorHandler() {
                console.info("User Exists");
                alert("User Exists");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    loginSelect: function (options, successSelectOne) {
        function txFunction(tx) {
            var sqlSelect = "SELECT * FROM user WHERE username=?;";

            tx.executeSql(sqlSelect, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    checkLogin: function () {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM user WHERE username=? AND password=?', [username, password],
                function (tx, results) {
                    if (results.rows.length > 0) {
                        window.location = "index.html";
                        localStorage.setItem("Username", username);
                        return true;

                    } else {
                        alert("Invalid username or password");
                        return false;
                    }
                }, errorHandler);
        });
        // location.reload();
    },
    LocatusSelectEdit: function (options, successSelectOne) {
        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE username=?;";
            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    LocatusUpdatePI: function (options) {
        function txFunction(tx) {
            var sql = "UPDATE user SET firstName=?, lastName=?, email=?, homeAddress=?, city=?, postalCode=?, dob=? WHERE username=?;";


            function successUpdate() {
                console.info("Success: Update successful");
                alert("Info Updated Successfully");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    LocatusUpdateLI: function (options) {
        function txFunction(tx) {
            var sql2 = "UPDATE user SET password=? WHERE username=?;";

            function successUpdate() {
                console.info("Success: Update successful");
                alert("Info Updated Successfully");
            }

            tx.executeSql(sql2, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    LocatusDelete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM user WHERE username=?;";
            function successDelete() {
                console.info("Success: Delete successful");
                alert ("Account deleted successfully");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Feed ={
    FeedInsert: function (options) {
        function txFunction(tx) {
            var sql = "INSERT INTO feed(status, username, latitude, longitude, date) " +
                "VALUES(?, ?, ?, ?, ?);";

            function successInsert() {
                console.info("Success: insert successful");
                alert("New Status added");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    feedSelect: function (options, successSelect) {
        function txFunction(tx) {
            var sql = "SELECT * FROM feed WHERE id=?;";

                tx.executeSql(sql, options, successSelect, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    feedSelectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM feed;";
            var options = [];

            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    DeleteFeedForUsername: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM feed WHERE username=?;";
            function successDelete() {
                console.info("Success: Delete successful");
                $(location).prop('href', "login.html");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};