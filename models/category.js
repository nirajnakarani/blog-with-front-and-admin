// ----- mongoose -----

var mongoose = require("mongoose");


// ----- category schema -----

var categorySchema = mongoose.Schema({
    category: {
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

var category = mongoose.model("categoryData", categorySchema);


// ----- export model -----

module.exports = category