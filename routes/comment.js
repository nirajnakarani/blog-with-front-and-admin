// ----- express -----

var express = require("express");


// ----- comment model -----

var comment = require("../models/comment")


// ----- router -----

var routes = express.Router();


// ----- comment controller -----

var commentController = require("../controllers/commentController")


// ----- view comment page -----

routes.get("/view_comment", commentController.view_comment)


// ----- deactive -----

routes.get("/setDeactive", commentController.setDeactive)


// ----- active -----

routes.get("/setActive", commentController.setActive)


// ----- delete comment -----

routes.get("/deleteComment", commentController.deleteComment)


// ----- delete many comment -----

routes.post("/deleteMany", commentController.deleteMany)


// ----- export routes -----

module.exports = routes