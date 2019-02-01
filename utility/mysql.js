const mysql = require('mysql');
const settings = require('../settings');

module.exports.createTransaction = (callback) => {
    let connection = mysql.createConnection(settings.mysql);

    connection.beginTransaction(err => {
        return callback(connection, err);
    });
}

module.exports.cancelTransaction = (connection, callback) => {
    connection.rollback(() => {
        return callback();
    });
}

module.exports.commitTransaction = (connection, callback) => {
    connection.commit(err => {      
        if (err) return callback(err);
        else return callback(null);
    });
}

module.exports.selectCountry = (connection, data, callback) => {
    if (typeof data.Country != "object") return callback(null, "ERROR: Country is not an object");
    if (typeof data.Country == "undefined") return callback(null, "ERROR: Country is undefined");

    let query = ""

    if (typeof data.Country.Name == "string") {
        query = `SELECT * FROM country WHERE Name = ${ connection.escape(data.Country.Name) }`;
    }
    else if (!isNaN(data.Country.Id)) {
        query = `SELECT * FROM country WHERE id = ${ connection.escape(data.Country.Id) }`;
    } else {
        return callback(null, "ERROR: No valid data");
    }

    connection.query(query, (err, res) => {
        if (err) return callback (null, err);
        else return callback(res, null);
    });
}

module.exports.insertCountry = (connection, data, callback) => {
    if (typeof data.Country != "object") return callback(null, "ERROR: Country is not an object");
    if (typeof data.Country.Name == "undefined") return callback(null, "ERROR: Country name is undefined");
    if (typeof data.Country.Short2Name == "undefined") return callback(null, "ERROR: Country Short2Name is undefined");

    connection.query(`INSERT INTO country (Name, Short2Name) VALUES (${connection.escape(data.Country.Name)}, ${connection.escape(data.Country.Short2Name)})`, (err, res) => {
        if (err) return callback(null, err);
        else return callback(res, null);
    });
}

module.exports.selectUser = (connection, data, callback) => {
    if (typeof data.User != "object") return callback(null, "ERROR: User is not an object"); 
    if (typeof data.User == "undefined") return callback(null, "ERROR: User is undefined");
    if (isNaN(data.User.SteamID)) return callback(null, "ERROR: Steam ID is NaN");
    if (data.User.SteamID.toString().length > 20) return callback(null, "ERROR: SteamID is too long");

    connection.query(`SELECT user.id, user.steamID, user.countryID, user.updated, user.created, country.Name, country.Short2Name FROM user INNER JOIN country on user.countryID = country.id WHERE user.id = ${ connection.escape(data.User.SteamID) } `, (err, res) => {
        if (err) return callback (null, err);
        else return callback(res, null);
    });
}

module.exports.insertUser = (connection, data, callback) => {
    if (typeof data.Country != "object") return callback(null, "ERROR: Country is not an object");
    if (typeof data.Country == "undefined") return callback(null, "ERROR: Country is undefined");
    if (isNaN(data.Country.Id)) return callback(null, "ERROR: Country ID is NaN");

    if (typeof data.User != "object") return callback(null, "ERROR: User is not an object"); 
    if (typeof data.User == "undefined") return callback(null, "ERROR: User is undefined");
    if (isNaN(data.User.SteamID)) return callback(null, "ERROR: Steam ID is NaN");
    if (data.User.SteamID.toString().length > 20) return callback(null, "ERROR: SteamID is too long");

    connection.query(`INSERT INTO user (SteamID, countryID) VALUES (${connection.escape(data.User.SteamID)}, ${connection.escape(data.Country.Id)})`, (err, res) => {
        if (err) return callback(null, err);
        else return callback(res, null);
    });
}