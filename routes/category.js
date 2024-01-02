// ----- express -----

var express = require("express");


// ----- router -----

var routes = express.Router();


// ----- category controller -----

var categoryController = require("../controllers/categoryController")


// ----- add category page -----

routes.get("/add_category", categoryController.add_category)


// ----- insert category  -----

routes.post("/insertCategory", categoryController.insertCategory)


// ----- view category page -----

routes.get("/view_category", categoryController.view_category)


// ----- deactive -----

routes.get("/setDeactive", categoryController.setDeactive)


// ----- active -----

routes.get("/setActive", categoryController.setActive)


// ----- delete category -----

routes.get("/deleteCategory", categoryController.deleteCategory)


// ----- delete many category -----

routes.post("/deleteMany", categoryController.deleteMany)


// ----- update category page -----

routes.get("/updateCategory", categoryController.updateCategory)


// ----- update category data -----

routes.post("/updateCategoryData", categoryController.updateCategoryData)


// ----- export -----

module.exports = routes;