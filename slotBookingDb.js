/**
 * @description "Import MYSQL2 library for Database"
 */
const _MYSQL = require('mysql2');

/**
 * @description "Create MYSQL Connection"
 */
const _MYSQL_CONNECTION = _MYSQL.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "instrutel_iot",
    database: "slot_booking"
}).promise();


/**
 * @description "Get all Screens data from Database"
 * @returns "All Screens form DB"
 */
async function getScreens() {
    const _GET_SCREENS_QUERY = "SELECT *from screens;";
    const[output] = await _MYSQL_CONNECTION.query(_GET_SCREENS_QUERY);
    return output;
}

/**
 * @description "Get Particular Screen Data from Database"
 * @param {*} _screenId "Selected User Id"
 * @returns "Selected Scrren Data"
 */
async function getParticularScreenData(_screenId) {
    const _GET_PARTICULAR_SCREEN_QUERY = `SELECT *from screens where idScreens = ?`;
    const _SCREEN_ID = [_screenId];

    const[output] = await _MYSQL_CONNECTION.query(_GET_PARTICULAR_SCREEN_QUERY, _SCREEN_ID);
    return output;
}

/**
 * @description "Create new Screen"
 * @param {*} screenName 
 * @param {*} screenShortName 
 * @param {*} movie 
 * @param {*} prize 
 * @param {*} noOfSeats
 * @param {*} poster
 * @returns "New Screen Response from database"
 */
async function addScreen(screenName, screenShortName, movie, prize, noOfSeats, poster) {
    const _ADD_SCREEN_QUERY = `INSERT INTO screens(screenName, screenShortName, movie, prize, noOfSeats, poster) VALUES(?, ?, ?, ?, ?, ?)`;
    const _NEW_SCREEN_DATA = [screenName, screenShortName, movie, prize, noOfSeats, poster];
    // console.log("DB", _NEW_SCREEN_DATA);

    const[output] = await _MYSQL_CONNECTION.query(_ADD_SCREEN_QUERY, _NEW_SCREEN_DATA);
    return output;
}

/**
 * @description "Update Particular Screen data"
 * @param {*} idScreens 
 * @param {*} screenName 
 * @param {*} screenShortName 
 * @param {*} movie 
 * @param {*} prize 
 * @param {*} noOfSeats
 * @param {*} poster
 * @returns "Update Screen data response from Database"
 */
async function updateScreen(idScreens, screenName, screenShortName, movie, prize, noOfSeats, poster) {
    const _UPDATE_SCREEN_QUERY = `UPDATE screens SET screenName = ?, screenShortName = ?, movie = ?, prize = ?, noOfSeats = ?, poster = ? WHERE idScreens = ?`;
    const _UPDATE_SCREEN_DATA = [screenName, screenShortName, movie, prize, noOfSeats, poster, idScreens];

    // console.log(_UPDATE_SCREEN_QUERY, _UPDATE_SCREEN_DATA);
    const[output] = await _MYSQL_CONNECTION.query(_UPDATE_SCREEN_QUERY, _UPDATE_SCREEN_DATA);
    return output;
}

/**
 * @description "Delete particular screen data"
 * @param {*} idScreens 
 * @returns "Deleted Screen response form Database"
 */
async function deleteScreen(idScreens){
    const _DELETE_SCREEN_QUERY = `DELETE from screens WHERE idScreens = ?`;
    const _DELETE_SCREEN_ID = [idScreens];

    const[output] = await _MYSQL_CONNECTION.query(_DELETE_SCREEN_QUERY, _DELETE_SCREEN_ID);
    return output;
}

module.exports = {getScreens, getParticularScreenData, addScreen, updateScreen, deleteScreen};