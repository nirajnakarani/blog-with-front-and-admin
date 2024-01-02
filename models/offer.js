// ----- mongoose -----

var mongoose = require("mongoose");


// ----- offer schema -----

var offerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
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

var offer = mongoose.model("offerData", offerSchema);


// ----- export model -----

module.exports = offer