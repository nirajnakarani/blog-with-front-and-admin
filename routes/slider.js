// ----- express -----

var express = require("express");


// ----- router -----

var routes = express.Router();


// ----- model -----

var slider = require("../models/slider")


// ----- slider controller -----

var sliderController = require("../controllers/sliderController")


// ----- add slider page -----

routes.get("/add_slider", sliderController.add_slider)


// ----- add slider -----

routes.post("/insertSlider", slider.uploadSliderImg, sliderController.insertSlider)


// ----- view slider -----

routes.get("/view_slider", sliderController.view_slider)


// ----- deactive -----

routes.get("/setDeactive", sliderController.setDeactive)


// ----- active -----

routes.get("/setActive", sliderController.setActive)


// ----- delete slider -----

routes.get("/deleteSlider", sliderController.deleteSlider)


// ----- delete many slider -----

routes.post("/deleteMany", sliderController.deleteMany)


// ----- update slider page -----

routes.get("/updateSlider", sliderController.updateSlider)


// ----- update slider data -----

routes.post("/updateSliderData", slider.uploadSliderImg, sliderController.updateSliderData)


// ----- export routes -----

module.exports = routes