/**
 * @description "Import Express Module for API's"
 */
const _EXPRESS = require("express");
const _SLOT_BOOKING_API = _EXPRESS();
const path = require("path");

const hbs = require('hbs');
const _COOKIE_PARSER = require('cookie-parser');
const _BODY_PARSER = require('body-parser');

_SLOT_BOOKING_API.set('view engine', 'hbs');
_SLOT_BOOKING_API.use("/images", _EXPRESS.static(path.join(__dirname, "/public/images")));
_SLOT_BOOKING_API.use(_EXPRESS.json());
_SLOT_BOOKING_API.use(_BODY_PARSER.json());
_SLOT_BOOKING_API.use(_BODY_PARSER.urlencoded({
    extended: true
}));

_SLOT_BOOKING_API.use(_COOKIE_PARSER());

const {getScreens, getParticularScreenData, addScreen, updateScreen, deleteScreen} = require("./slotBookingDb");


_SLOT_BOOKING_API.get("/", async(req, res) => {
    const output = await getScreens();

    res.render("cinema" , {
        data : output
    });
});

/**
 * @description "Get Particular screen data"
 */
_SLOT_BOOKING_API.get("/cinema/:_screenId", async (req, res) => {
    const _SCREEN_ID = req.params._screenId;
    const output = await getParticularScreenData(_SCREEN_ID);
    console.log(req.payload, output);

    // res.render("posts", {
    //     data: output,
    //     userInfo: req.payload
    // })
});

/**
 * @description "Add New Screen Data"
 */
_SLOT_BOOKING_API.post('/newScreen', async(req, res) => {
    const { screenName, screenShortName, movie, prize,  noOfSeats, poster} = req.body;
    // console.log(req.body);
    const _NEW_SCREEN_DB_RES = await addScreen(screenName, screenShortName, movie, prize, noOfSeats,  poster);
    res.redirect("/");
});

/**
 * @description "Update Selected Screen data"
 */
_SLOT_BOOKING_API.put('/updateScreen', async(req, res) => {
    const {idScreens, screenName, screenShortName, movie, prize,  noOfSeats, poster} = req.body;
    // console.log(req.body);

    const _UPADTE_SCREEN_DB_RES = await updateScreen(idScreens, screenName, screenShortName, movie, prize,  noOfSeats, poster);
    res.send(_UPADTE_SCREEN_DB_RES);
});

/**
 * @description "Delete Screen"
 */
_SLOT_BOOKING_API.delete('/deleteScreen/:_screenId', async(req, res) => {
    const _DELETE_SCREEN_ID = req.params._screenId;
    const _DELETED_SCREEN_DB_RES = await deleteScreen(_DELETE_SCREEN_ID);

    res.send(_DELETED_SCREEN_DB_RES);
});

/**
 * @description "Screen Registartion"
 */
_SLOT_BOOKING_API.post('/screen-registration', async(req, res) => {
    res.render("screenResgistration");
});

/**
 * @description "Server Connection Establish"
 */
_SLOT_BOOKING_API.listen(3900, () => {
    console.log("Movie Booking Server is Running.....");
});