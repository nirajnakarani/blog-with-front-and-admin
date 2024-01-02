// ----- mongoose -----

var mongoose = require("mongoose");


// ----- post img path -----

var postImgPath = "/uploads/postImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- post schema -----

var postSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    postImg: {
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
        cb(null, path.join(__dirname, "..", postImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

postSchema.statics.uploadPostImg = multer({ storage: storage }).single("postImg");


// ----- export post img path -----

postSchema.statics.postImgPath = postImgPath;


// ----- table  -----

var post = mongoose.model("postData", postSchema);


// ----- export model -----

module.exports = post