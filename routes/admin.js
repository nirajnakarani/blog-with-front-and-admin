// ----- express -----

var express = require("express");


// ----- server -----

var routes = express.Router();


// ----- controller -----

var adminController = require("../controllers/adminController")


// ----- model -----

var admin = require("../models/admin")


// ----- passport  -----

var passport = require("passport")


// ----- login -----

routes.get("/", async (req, res) => {
    return res.render("login")
})


// ----- loginAdmin -----

routes.post("/loginAdmin", passport.authenticate("local", { failureRedirect: "/admin/" }), adminController.loginAdmin)


// ----- dashboard -----

routes.get("/dashboard", passport.checkAuth, adminController.dashboard)


// ----- add admin page -----

routes.get("/add_admin", passport.checkAuth, adminController.add_admin)


// ----- view admin -----

routes.get("/view_admin", passport.checkAuth, adminController.view_admin)


// ----- add admin form -----

routes.post("/insertAdminData", admin.uploadAdminImg, adminController.insertAdminData)


// ----- deactive -----

routes.get("/setDeactive", adminController.setDeactive)


// ----- active -----

routes.get("/setActive", adminController.setActive)


// ----- delete admin -----

routes.get("/deleteAdmin", adminController.deleteAdmin)


// ----- multi delete admin -----

routes.post("/deleteMany", adminController.deleteMany)


// ----- update admin page -----

routes.get("/updateAdmin", passport.checkAuth, adminController.updateAdmin)


// ----- update admin data -----

routes.post("/updateAdminData", admin.uploadAdminImg, adminController.updateAdminData)


// ----- change password page-----

routes.get("/changePassword", adminController.changePassword)


// ----- changeAdminPassword -----

routes.post("/changeAdminPassword", adminController.changeAdminPassword)


// ----- profile -----

routes.get("/profile", passport.checkAuth, adminController.profile)


// ----- forgot email page -----

routes.get("/forgot", async (req, res) => {

    return res.render("forgot/checkEmail")

})


// ----- check email -----

routes.post("/checkEmail", adminController.checkEmail)


// ----- OTP page -----

routes.get("/otpPage", async (req, res) => {
    return res.render("forgot/otpPage")
})


// ----- check OTP -----

routes.post("/checkOTP", adminController.checkOTP)


// ----- check pass -----

routes.post("/checkPass", adminController.checkPass)


// ----- logout -----

routes.get("/logout", adminController.logout)


// ----- slider -----

routes.use("/slider", passport.checkAuth, require("./slider"))


// ----- offer -----

routes.use("/offer", passport.checkAuth, require("./offer"))


// ----- recent -----

routes.use("/recent", passport.checkAuth, require("./recent"))


// ----- review -----

routes.use("/review", passport.checkAuth, require("./review"))


// ----- post -----

routes.use("/post", passport.checkAuth, require("./post"))


// ----- category -----

routes.use("/category", passport.checkAuth, require("./category"))


// ----- sub category -----

routes.use("/subCat", passport.checkAuth, require("./subCat"))


// ----- contact -----

routes.use("/contact", passport.checkAuth, require("./contact"))


// ----- export server -----

module.exports = routes;