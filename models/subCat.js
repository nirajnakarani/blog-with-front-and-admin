// ----- mongoose -----

var mongoose = require("mongoose");


// ----- sub img path -----

var subCategoryImgPath = "/uploads/subCatImg";


// ----- multer -----

var multer = require("multer")


// ----- path -----

var path = require("path")


// ----- sub schema -----

var subCategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subCategoryImg: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryData",
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
        cb(null, path.join(__dirname, "..", subCategoryImgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})


// ----- single img -----

subCategorySchema.statics.uploadsubCategoryImg = multer({ storage: storage }).single("subCategoryImg");


// ----- export sub-category img path -----

subCategorySchema.statics.subCategoryImgPath = subCategoryImgPath;


// ----- table  -----

var subCategory = mongoose.model("subCatData", subCategorySchema);


// ----- export model -----

module.exports = subCategory