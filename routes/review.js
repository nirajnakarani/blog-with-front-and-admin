// ----- express -----

var express = require("express");


// ----- router -----

var routes = express.Router();


// ----- model -----

var review = require("../models/review")


// ----- review controller -----

var reviewController = require("../controllers/reviewController")


// ----- add review page -----

routes.get("/add_review", reviewController.add_review)


// ----- insert review -----

routes.post("/insertReview", reviewController.insertReview)


// ----- view review page -----

routes.get("/view_review", reviewController.view_review)


// ----- deactive -----

routes.get("/setDeactive", reviewController.setDeactive)


// ----- active -----

routes.get("/setActive", reviewController.setActive)


// ----- delete review -----

routes.get("/deleteReview", reviewController.deleteReview)


// ----- delete many review -----

routes.post("/deleteMany", reviewController.deleteMany)


// ----- update review page -----

routes.get("/updateReview", reviewController.updateReview)


// ----- update review data -----

routes.post("/updateReviewData", reviewController.updateReviewData)


// ----- model -----

module.exports = routes;