// ----- passport -----

var passport = require("passport")


// ----- passport local -----

var passportLocal = require("passport-local").Strategy


// ----- model -----

var admin = require("../models/admin")


// ----- create new object -----

passport.use(new passportLocal({
    usernameField: "email"
}, async (email, password, done) => {

    console.log(email, password)

    var adminData = await admin.findOne({ email: email });

    if (adminData) {
        if (adminData.password == password) {
            return done(null, adminData)
        }
        else {
            return done(null, false)
        }
    }
    else {
        return done(null, false)
    }
}))


// ----- serializeUser -----

passport.serializeUser(async (user, done) => {

    return done(null, user.id)

})


// ----- deserializeUser -----

passport.deserializeUser(async (id, done) => {

    var adminData = await admin.findById(id);
    if (adminData) {
        return done(null, adminData)
    }
    else {
        return done(null, false)
    }

})


// ----- set Auth -----

passport.setAuth = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next()
}


// ----- check Auth -----

passport.checkAuth = function (req, res, next) {

    if (req.isAuthenticated()) {
        next()
    }
    else {
        return res.redirect("/admin/")
    }

}


// ----- export passport -----

module.exports = passport;