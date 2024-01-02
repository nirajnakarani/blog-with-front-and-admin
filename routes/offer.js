// ----- express -----

var express = require("express");


// ----- server -----

var routes = express.Router();


// ----- Offer Controller -----

var offerController = require("../controllers/offerController");


// ----- add offer page -----

routes.get("/add_offer", offerController.add_offer)


// ----- insert offer -----

routes.post("/insertOffer", offerController.insertOffer)


// ----- view offer page -----

routes.get("/view_offer", offerController.view_offer)


// ----- deactive -----

routes.get("/setDeactive", offerController.setDeactive)


// ----- active -----

routes.get("/setActive", offerController.setActive)


// ----- delete offer -----

routes.get("/deleteOffer", offerController.deleteOffer)


// ----- delete many offer -----

routes.post("/deleteMany", offerController.deleteMany)

    
// ----- update offer page -----

routes.get("/updateOffer", offerController.updateOffer)


// ----- update offer data -----

routes.post("/updateOfferData", offerController.updateOfferData)


// ----- export module -----

module.exports = routes;