// ----- express -----

var express = require("express");


// ----- router -----

var routes = express.Router();


// ----- model -----

var post = require("../models/post")


// ----- post controller -----

var postController = require("../controllers/postController")


// ----- add post page -----

routes.get("/add_post", postController.add_post)


// ----- insert post -----

routes.post("/insertPost", post.uploadPostImg, postController.insertPost)


// ----- view post page -----

routes.get("/view_post", postController.view_post)


// ----- deactive -----

routes.get("/setDeactive", postController.setDeactive)


// ----- active -----

routes.get("/setActive", postController.setActive)


// ----- delete post -----

routes.get("/deletePost", postController.deletePost)


// ----- delete many post -----

routes.post("/deleteMany", postController.deleteMany)


// ----- update post page -----

routes.get("/updatePost", postController.updatePost)


// ----- update post data -----

routes.post("/updatePostData", post.uploadPostImg, postController.updatePostData)


// ----- comment routing -----

routes.use("/comment", require("./comment"))


// ----- export -----

module.exports = routes