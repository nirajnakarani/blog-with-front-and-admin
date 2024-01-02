// ----- express -----

var express = require("express");


// ----- comment model -----

var comment = require("../models/comment")


// ----- router -----

var routes = express.Router();


// ----- user controller -----

var userController = require("../controllers/userController")


// ----- home page -----

routes.get("/", userController.home)


// ----- single post page -----

routes.get("/singlePost", userController.singlePost)


// ----- add comment -----

routes.post("/addComment", comment.uploadCommentImg, userController.addComment)


// ----- work 3 page -----

routes.get("/work3",  userController.work3)


// ----- work 4 page -----

routes.get("/work4",  userController.work4)


// ----- contact page -----

routes.get("/contact",  userController.contact)


// ----- insert contact -----

routes.post("/insertContact",  userController.insertContact)


// ----- export routes -----

module.exports = routes