// ----- express -----

var express = require("express");


// ----- path -----

var path = require("path")


// ----- server -----

var app = express();


// ----- port -----

var port = 9001;


// ----- db connection -----

var db = require("./config/mongoose")


// ----- model -----

var admin = require("./models/admin")


// ----- view engine for ejs -----

app.set("view engine", "ejs");


// ----- view path -----

app.set("views", path.join(__dirname, "views"));


// ----- url encoded -----

app.use(express.urlencoded());


// ----- uploads path -----

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// ----- assets path -----

app.use(express.static(path.join(__dirname, "assets")));


// ----- user assets path -----

app.use(express.static(path.join(__dirname, "userAssets")));


// ----- cookie parser -----

var cookieParser = require("cookie-parser");

app.use(cookieParser())


// ----- session -----

var session = require("express-session")


// ----- passport -----

var passport = require("passport")


// ----- passport local stratagy -----

var passportLocal = require("./config/passport-local-stratagy")


// ----- session object -----

app.use(session({
    name: "niraj",
    secret: "niraj",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 100
    }
}))


// ----- passport initilization -----

app.use(passport.initialize())


// ----- passport session -----

app.use(passport.session())


// ----- set session data -----

app.use(passport.setAuth)


// ----- user -----

app.use("/", require("./routes/user"))


// ----- admin -----

app.use("/admin", require("./routes/admin"))


// ----- server connection -----

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`server running on port : ${port}`)
})