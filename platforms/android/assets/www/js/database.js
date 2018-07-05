/**
 * Created by Brody Gartner on 2017-04-18.
 */

var db;

function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.code + ") -- " + error.message);
}

function  successTransaction(){
    console.info("Success: Transaction is successful");
}


var DB = {
    createDatabase: function () {
        var shortName = "Locatus";
        var version = "1.0";
        var displayName = "DB for our Locatus app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating Database ....");
        function dbCreateSuccess() {
            console.info("Success: Database creation successful");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);


    },
    createTables: function () {

        function txFunction(tx) {
            console.info("Creating tables ...");


            var sqlUser =  "CREATE TABLE IF NOT EXISTS user( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "username VARCHAR(20) UNIQUE NOT NULL,"
                + "password VARCHAR(20) NOT NULL,"
                + "firstName VARCHAR(20) NOT NULL,"
                + "lastName VARCHAR(20) NOT NULL,"
                + "email VARCHAR(30) NOT NULL,"
                + "homeAddress VARCHAR(30) NOT NULL,"
                + "city VARCHAR(30) NOT NULL,"
                + "postalCode VARCHAR(30) NOT NULL,"
                + "dob DATE);";

            var sqlFeed ="CREATE TABLE IF NOT EXISTS feed( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "username VARCHAR(30) NOT NULL," +
                "status VARCHAR(30) NOT NULL," +
                "longitude VARCHAR(30) DEFAULT 'Location Unreachable'," +
                "latitude VARCHAR(30) DEFAULT 'Location Unreachable'," +
                "date datetime NOT NULL);";

            var options = [];
            function successCreate() {
                console.info("Success: Table creation successful");
            }


            tx.executeSql(sqlUser, options, successCreate, errorHandler);
            tx.executeSql(sqlFeed, options, successCreate, errorHandler);

        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};