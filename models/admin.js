// ----- mongoose -----

var mongoose = require("mongoose");


// ----- admin img path -----

var adminImgPath = "/uploads/adminImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- admin schema -----

var adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: Array,
        required: true
    },
    adminImg: {
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
        cb(null, path.join(__dirname, "..", adminImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

adminSchema.statics.uploadAdminImg = multer({ storage: storage }).single("adminImg");


// ----- export admin img path -----

adminSchema.statics.adminImgPath = adminImgPath;


// ----- table  -----

var admin = mongoose.model("adminData", adminSchema);


// ----- export model -----

module.exports = admin