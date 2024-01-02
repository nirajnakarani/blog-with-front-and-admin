// ----- mongoose -----

var mongoose = require("mongoose");


// ----- offer schema -----

var reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    city: {
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


// ----- table  -----

var review = mongoose.model("reviewData", reviewSchema);


// ----- export model -----

module.exports = review;