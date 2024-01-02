// ----- express -----

var express = require("express");


// ----- router -----

var routes = express.Router();


// ----- model -----

var recent = require("../models/recent")


// ----- recent controller -----

var recentController = require("../controllers/recentController")


// ----- add recent page -----

routes.get("/add_recent", recentController.add_recent)


// ----- insert recent -----

routes.post("/insertRecent", recent.uploadRecentImg, recentController.insertRecent)


// ----- view recent page -----

routes.get("/view_recent", recentController.view_recent)


// ----- deactive -----

routes.get("/setDeactive", recentController.setDeactive)


// ----- active -----

routes.get("/setActive", recentController.setActive)


// ----- delete Recent -----

routes.get("/deleteRecent", recentController.deleteRecent)


// ----- delete many Recent -----

routes.post("/deleteMany", recentController.deleteMany)


// ----- update Recent page -----

routes.get("/updateRecent", recentController.updateRecent)


// ----- update recent data -----

routes.post("/updateRecentData", recent.uploadRecentImg, recentController.updateRecentData)


// ----- export -----

module.exports = routes