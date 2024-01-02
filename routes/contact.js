// ----- express -----

var express = require("express");


// ----- contact model -----

var contact = require("../models/contact")


// ----- router -----

var routes = express.Router();


// ----- comment controller -----

var contactController = require("../controllers/contactController")


// ----- view comment page -----

routes.get("/view_contact", contactController.view_contact)


// ----- deactive -----

routes.get("/setDeactive", contactController.setDeactive)


// ----- active -----

routes.get("/setActive", contactController.setActive)


// ----- delete comment -----

routes.get("/deleteContact", contactController.deleteContact)


// ----- delete many comment -----

routes.post("/deleteMany", contactController.deleteMany)


// ----- export routes -----

module.exports = routes