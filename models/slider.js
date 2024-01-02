// ----- mongoose -----

var mongoose = require("mongoose");


// ----- slider img path -----

var sliderImgPath = "/uploads/sliderImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- slider schema -----

var sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sliderImg: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    updatedDate: {
        type: String,
        required: true
    },
})


// ----- img -----

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", sliderImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

sliderSchema.statics.uploadSliderImg = multer({ storage: storage }).single("sliderImg");


// ----- export slider img path -----

sliderSchema.statics.sliderImgPath = sliderImgPath;


// ----- table  -----

var slider = mongoose.model("sliderData", sliderSchema);


// ----- export model -----

module.exports = slider