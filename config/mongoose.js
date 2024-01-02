var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/adminPanel")

var db = mongoose.connection;

db.once("open", (err) => {
    err ? console.log(err) : console.log("DB connected")
})

module.exports = db