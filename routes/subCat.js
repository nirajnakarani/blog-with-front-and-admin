// ----- express -----

var express = require("express");


// ----- router -----

var routes = express.Router();


// ----- model -----

var subCat = require("../models/subCat")


// ----- sub category controller -----

var subCatController = require("../controllers/subCatController")


// ----- add sub category page -----

routes.get("/add_subCategory", subCatController.add_subCategory)


// ----- add sub category data -----

routes.post("/insertSubCategory", subCat.uploadsubCategoryImg, subCatController.insertSubCategory)


// ----- view sub category page -----

routes.get("/view_subCategory", subCatController.view_subCategory)


// ----- deactive -----

routes.get("/setDeactive", subCatController.setDeactive)


// ----- active -----

routes.get("/setActive", subCatController.setActive)


// ----- delete sub category -----

routes.get("/deleteSubCat", subCatController.deleteSubCat)


// ----- delete many sub category -----

routes.post("/deleteMany", subCatController.deleteMany)


// ----- update sub category page -----

routes.get("/updateSubCat", subCatController.updateSubCat)


// ----- update sub category data -----

routes.post("/updateSubCategoryData", subCat.uploadsubCategoryImg, subCatController.updateSubCategoryData)


// ----- export -----

module.exports = routes