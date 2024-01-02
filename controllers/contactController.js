// ----- contact model -----

var contact = require("../models/contact")


// ----- path -----

var path = require("path")


// ----- fs -----

var fs = require("fs")


// ----- view contact -----

module.exports.view_contact = async (req, res) => {

    try {
        // search 

        var search = "";

        if (req.query.search) {
            search = req.query.search
        }

        // pagination
        if (req.query.page) {
            page = req.query.page
        }
        else {
            page = 0
        }

        var perPage = 2

        var contactData = await contact.find({
            $or: [
                { "name": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).limit(perPage).skip(perPage * page);


        var totalDocument = await contact.find({
            $or: [
                { "name": { $regex: ".*" + search + ".*", $options: "i" } }
            ]
        }).countDocuments()
        if (contactData) {

            return res.render("contact/view_contact", {
                contactData: contactData,
                search: search,
                totalDocument: Math.ceil(totalDocument / perPage)
            })
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}


// ----- deactive -----

module.exports.setDeactive = async (req, res) => {
    try {
        var change = await contact.findByIdAndUpdate(req.query.id, {
            isActive: false,
        });
        if (change) {
            console.log("deactivated...");
            return res.redirect("back");
        } else {
            console.log("not deactivated");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- active -----

module.exports.setActive = async (req, res) => {
    try {
        var change = await contact.findByIdAndUpdate(req.query.id, {
            isActive: true,
        });
        if (change) {
            console.log("activated...");
            return res.redirect("back");
        } else {
            console.log("not activated");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- delete contact -----

module.exports.deleteContact = async (req, res) => {
    try {
        var oldData = await contact.findById(req.query.id);
        if (oldData) {

            var deleteRecord = await contact.findByIdAndDelete(req.query.id);
            if (deleteRecord) {
                console.log("record deleted 2 ...");
                return res.redirect("back");
            } else {
                console.log("record not deleted 2 ...");
                return res.redirect("back");
            }
        }
        else {
            console.log("record not found");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("back");
    }
};


// ----- delete many contact -----

module.exports.deleteMany = async (req, res) => {

    try {

        var abc = await contact.deleteMany({ _id: { $in: req.body.deleteAll } });
        if (abc) {
            return res.redirect("back")

        }
        else {
            console.log("data not delete");
            return res.redirect("back")
        }

    }
    catch (err) {
        console.log(err);
        return res.redirect("back")
    }

}

