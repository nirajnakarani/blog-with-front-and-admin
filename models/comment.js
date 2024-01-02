// ----- mongoose -----

var mongoose = require("mongoose");


// ----- comment img path -----

var commentImgPath = "/uploads/commentImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- comment schema -----

var commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postData",
        required: true
    },
    commentImg: {
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
        cb(null, path.join(__dirname, "..", commentImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

commentSchema.statics.uploadCommentImg = multer({ storage: storage }).single("commentImg");


// ----- export comment img path -----

commentSchema.statics.commentImgPath = commentImgPath;


// ----- table  -----

var comment = mongoose.model("commentData", commentSchema);


// ----- export model -----

module.exports = comment