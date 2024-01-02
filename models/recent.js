// ----- mongoose -----

var mongoose = require("mongoose");


// ----- recent img path -----

var recentImgPath = "/uploads/recentImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- recent schema -----

var recentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recentImg: {
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
        cb(null, path.join(__dirname, "..", recentImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

recentSchema.statics.uploadRecentImg = multer({ storage: storage }).single("recentImg");


// ----- export recent img path -----

recentSchema.statics.recentImgPath = recentImgPath;


// ----- table  -----

var recent = mongoose.model("recentData", recentSchema);


// ----- export model -----

module.exports = recent